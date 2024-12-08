const express = require('express');
const nodemailer = require('nodemailer');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');


// Carregar variáveis de ambiente do arquivo .env
dotenv.config();


const app = express();
const port = 5000;


app.use(express.json());
app.use(cors());


// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Substitua com sua senha do MySQL
  database: 'consultas',
});


// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL!');
});


// Função para enviar e-mails
const enviarEmail = async (nome, email, dataConsulta, horarioConsulta) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.PSICOLOGA_EMAIL) {
    console.error("Erro: As variáveis de ambiente para o e-mail não estão configuradas corretamente.");
    return;
  }


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,  // E-mail da psicóloga
      pass: process.env.EMAIL_PASS,  // Senha de aplicativo
    },
  });


  const psicologaEmail = process.env.PSICOLOGA_EMAIL;  // E-mail da psicóloga


  // Verificar se o e-mail da psicóloga está correto
  if (!psicologaEmail) {
    console.error("Erro: O e-mail da psicóloga não foi definido.");
    return;
  }


  const psicologaMessage = {
    from: process.env.EMAIL_USER,
    to: psicologaEmail,
    subject: `Consulta marcada: ${nome}`,
    text: `Uma nova consulta foi marcada para o paciente ${nome} (${email}) no dia ${dataConsulta} às ${horarioConsulta}.`,
  };


  const pacienteMessage = {
    from: process.env.EMAIL_USER,
    to: email,  // E-mail do paciente
    subject: `Confirmação de Consulta`,
    text: `Olá ${nome},\n\nSua consulta está marcada para o dia ${dataConsulta} às ${horarioConsulta}.\nObrigado por marcar uma consulta conosco!\n\nAtenciosamente,\nPsicóloga.`,
  };


  try {
    // Enviar e-mails
    await transporter.sendMail(psicologaMessage);
    await transporter.sendMail(pacienteMessage);
    console.log('E-mails enviados com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar e-mails:', error);
    console.error('Erro detalhado:', error.response || error);
  }
};


// Verificar se já existem 8 consultas no mesmo dia (limitar agendamentos)
const verificarLimiteDeConsultas = (dataConsulta, callback) => {
  const query = 'SELECT COUNT(*) AS total FROM agendamentos WHERE data_consulta = ?';
  db.query(query, [dataConsulta], (err, result) => {
    if (err) {
      console.error('Erro ao verificar o limite de consultas:', err);
      return callback(err);
    }
    const totalConsultas = result[0].total;
    callback(null, totalConsultas < 8); // Permite agendamento se for menor que 8
  });
};


// Criar um novo agendamento (POST)
app.post('/api/agendamentos', (req, res) => {
  const { nome, sobrenome, sexo, email, idade, telefone, descricao, dataConsulta, horarioConsulta } = req.body;


  if (idade < 14) {
    return res.status(400).send('A idade mínima para agendar é 14 anos.');
  }


  // Verificar se já existem 8 consultas no mesmo dia
  verificarLimiteDeConsultas(dataConsulta, (err, podeAgendar) => {
    if (err) {
      return res.status(500).send('Erro ao verificar o limite de consultas.');
    }
    if (!podeAgendar) {
      return res.status(400).send('Limite de 8 consultas atingido para este dia.');
    }


    const query =
      'INSERT INTO agendamentos (nome, sobrenome, sexo, email, idade, telefone, descricao, data_consulta, horario_consulta) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';


    db.query(query, [nome, sobrenome, sexo, email, idade, telefone, descricao, dataConsulta, horarioConsulta], (err, result) => {
      if (err) {
        console.error('Erro ao criar agendamento:', err);
        return res.status(500).send('Erro ao criar agendamento');
      }


      // Enviar e-mails
      enviarEmail(nome, email, dataConsulta, horarioConsulta);


      res.status(201).send('Agendamento criado com sucesso!');
    });
  });
});


// Atualizar agendamento (PUT)
app.put('/api/agendamentos/:id', (req, res) => {
  const id = req.params.id;
  const { nome, sobrenome, sexo, email, idade, telefone, descricao, dataConsulta, horarioConsulta } = req.body;


  if (idade < 14) {
    return res.status(400).send('A idade mínima para agendar é 14 anos.');
  }


  // Verificar se já existem 8 consultas no mesmo dia (antes de atualizar)
  verificarLimiteDeConsultas(dataConsulta, (err, podeAgendar) => {
    if (err) {
      return res.status(500).send('Erro ao verificar o limite de consultas.');
    }
    if (!podeAgendar) {
      return res.status(400).send('Limite de 8 consultas atingido para este dia.');
    }


    const query =
      'UPDATE agendamentos SET nome = ?, sobrenome = ?, sexo = ?, email = ?, idade = ?, telefone = ?, descricao = ?, data_consulta = ?, horario_consulta = ? WHERE id = ?';


    db.query(query, [nome, sobrenome, sexo, email, idade, telefone, descricao, dataConsulta, horarioConsulta, id], (err, result) => {
      if (err) {
        console.error('Erro ao atualizar agendamento:', err);
        return res.status(500).send('Erro ao atualizar agendamento');
      }


      // Enviar e-mails (caso haja alteração importante, pode ser necessário reenviar)
      enviarEmail(nome, email, dataConsulta, horarioConsulta);


      res.status(200).send('Agendamento atualizado com sucesso!');
    });
  });
});


// Buscar todos os agendamentos (GET)
app.get('/api/agendamentos', (req, res) => {
  const query = 'SELECT * FROM agendamentos';


  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar agendamentos:', err);
      return res.status(500).send('Erro ao buscar agendamentos');
    }
    res.status(200).json(results);
  });
});


// Buscar agendamento por ID (GET)
app.get('/api/agendamentos/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM agendamentos WHERE id = ?';


  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar agendamento:', err);
      return res.status(500).send('Erro ao buscar agendamento');
    }


    if (results.length === 0) {
      return res.status(404).send('Agendamento não encontrado.');
    }


    res.status(200).json(results[0]);
  });
});


// Deletar agendamento (DELETE)
app.delete('/api/agendamentos/:id', (req, res) => {
  const id = req.params.id;


  const query = 'DELETE FROM agendamentos WHERE id = ?';


  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar agendamento:', err);
      return res.status(500).send('Erro ao deletar agendamento');
    }


    if (result.affectedRows === 0) {
      return res.status(404).send('Agendamento não encontrado.');
    }


    res.status(200).send('Agendamento deletado com sucesso!');
  });
});


// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});


