// test.ts

import { TimeManipulator, manipulator } from './src/index';

console.log('--- Testando a Lib TimeManipulator ---');

// Exemplo 1: Usando o construtor estático 'parse'
const tempoA = TimeManipulator.parse('01:30'); // 90 minutos
console.log(`Tempo A (01:30) em minutos: ${tempoA.getMinutes()}`); // Deve ser 90
console.log(`Tempo A formatado: ${tempoA.formatWithColonSeparation(true)}`); // Deve ser +01:30

// Exemplo 2: Usando a função auxiliar 'manipulator'
const tempoB = manipulator(120); // 120 minutos
console.log(`Tempo B formatado tecnicamente: ${tempoB.formatWithTechinicalTimeNotation(true)}`); // Deve ser +2h0min
tempoB.invertSign()
console.log(`Tempo B invertido: ${tempoB.formatWithTechinicalTimeNotation(true)}`); // Deve ser -2h0min

// Exemplo 3: Invertendo sinal
const tempoC = manipulator('-02:45');
console.log(`Tempo C (negativo): ${tempoC.formatWithColonSeparation(true)}`); // Deve ser 02:45
tempoC.invertSign();
console.log(`Tempo C invertido: ${tempoC.formatWithColonSeparation(true)}`); // Deve ser +02:45
console.log(`Tempo C é positivo? ${tempoC.isPositiveTime()}`); // Deve ser true