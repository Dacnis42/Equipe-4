// // src/MarkingContext.js
// import React, { createContext, useState, useContext, useEffect } from 'react';

// // Criando o contexto
// const MarkingContext = createContext();

// // Função para carregar as marcações do localStorage
// const loadMarcacoes = () => {
//     const savedMarcacoes = localStorage.getItem('marcacoes');
//     return savedMarcacoes ? JSON.parse(savedMarcacoes) : [];
// };

// // Criando o provider que será usado para envolver os componentes
// export const MarkingProvider = ({ children }) => {
//     const [marcacoes, setMarcacoes] = useState(loadMarcacoes);

//     // Função para adicionar uma marcação
//     const addMarcacao = (nome, data) => {
//         const novaMarcacao = { id: Date.now(), nome, data };
//         const updatedMarcacoes = [...marcacoes, novaMarcacao];
//         setMarcacoes(updatedMarcacoes);
//         localStorage.setItem('marcacoes', JSON.stringify(updatedMarcacoes)); // Salvando no localStorage
//     };

//     return (
//         <MarkingContext.Provider value={{ marcacoes, addMarcacao }}>
//             {children}
//         </MarkingContext.Provider>
//     );
// };

// // Hook para consumir o contexto
// export const useMarking = () => {
//     return useContext(MarkingContext);
// };
