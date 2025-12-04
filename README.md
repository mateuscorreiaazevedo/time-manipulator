# Time Manipulator

Uma biblioteca TypeScript leve e intuitiva para manipulação e formatação de tempo. Perfeita para aplicações que precisam trabalhar com duração de tempo, cálculos de horas trabalhadas, ou qualquer tipo de manipulação temporal.

## 🚀 Instalação

```bash
npm install time-manipulator
```

## 📋 Características

- 🕐 **Parse flexível**: Aceita strings no formato `HH:MM` ou valores numéricos em minutos
- ➕ **Suporte a tempos negativos**: Trabalhe com débitos ou créditos de tempo
- 🎨 **Múltiplos formatos de saída**: Formatação com dois pontos (`12:30`) ou notação técnica (`12h30m`)
- 🔢 **Operações matemáticas**: Calcule diferenças de tempo facilmente
- 📦 **Zero dependências**: Biblioteca leve e sem dependências externas
- 💪 **TypeScript nativo**: Totalmente tipada para melhor experiência de desenvolvimento

## 📖 Uso Básico

### Importação

```typescript
import { TimeManipulator, manipulator } from 'time-manipulator';
```

### Parsing de Tempo

A biblioteca oferece duas formas de criar instâncias:

```typescript
// Usando o método estático parse
const time1 = TimeManipulator.parse('12:30'); // 12 horas e 30 minutos
const time2 = TimeManipulator.parse(750);      // 750 minutos = 12 horas e 30 minutos

// Usando a função auxiliar manipulator
const time3 = manipulator('08:15');
const time4 = manipulator(495); // 495 minutos = 8 horas e 15 minutos
```

### Trabalhando com Tempos Negativos

```typescript
const negativeTime = TimeManipulator.parse('-02:30'); // -2 horas e 30 minutos
const positiveTime = TimeManipulator.parse('+05:00'); // +5 horas

console.log(negativeTime.getMinutes()); // -150
console.log(positiveTime.getMinutes());  // 300
```

## 🎯 Funcionalidades Principais

### 1. Formatação com Dois Pontos

Converte o tempo para o formato `HH:MM`:

```typescript
const time = manipulator(90); // 90 minutos

console.log(time.formatWithColonSeparation());      // '01:30'
console.log(time.formatWithColonSeparation(true));  // '+01:30' (com símbolo)

const negative = manipulator(-45);
console.log(negative.formatWithColonSeparation(true)); // '-00:45'
```

**Parâmetros:**
- `withSymbols` (opcional, default: `false`): Adiciona `+` ou `-` antes do valor

### 2. Formatação com Notação Técnica

Converte o tempo para o formato técnico `Hh Mm`:

```typescript
const time = manipulator('01:30');

console.log(time.formatWithTechinicalTimeNotation());      // '01h30m'
console.log(time.formatWithTechinicalTimeNotation(true));  // '+01h30m'

const justMinutes = manipulator('00:45');
console.log(justMinutes.formatWithTechinicalTimeNotation()); // '00h45m'
```

**Parâmetros:**
- `withSymbols` (opcional, default: `false`): Adiciona `+` ou `-` antes do valor

### 3. Operações Matemáticas

#### Diferença de Tempo

Subtraia minutos do tempo atual:

```typescript
const time = manipulator('02:00'); // 2 horas = 120 minutos

const result = time.difference(30); // Subtrai 30 minutos
console.log(result.formatWithColonSeparation()); // '01:30'

// Encadeamento de operações
const final = manipulator('05:00')
    .difference(60)  // 5h - 1h = 4h
    .difference(45); // 4h - 45min = 3h15min
console.log(final.formatWithColonSeparation()); // '03:15'
```

#### Inverter Sinal

Converte positivo em negativo e vice-versa:

```typescript
const time = manipulator('02:30');
time.invertSign();
console.log(time.formatWithColonSeparation(true)); // '-02:30'

time.invertSign(); // Inverte novamente
console.log(time.formatWithColonSeparation(true)); // '+02:30'
```

### 4. Verificações de Estado

```typescript
const positive = manipulator('01:30');
const negative = manipulator('-01:30');
const zero = manipulator(0);

// Verificar se é positivo
console.log(positive.isPositiveTime()); // true
console.log(negative.isPositiveTime()); // false
console.log(zero.isPositiveTime());     // false

// Verificar se é negativo
console.log(positive.isNegativeTime()); // false
console.log(negative.isNegativeTime()); // true
console.log(zero.isNegativeTime());     // false
```

### 5. Obter Valor em Minutos

```typescript
const time1 = manipulator('01:30');
console.log(time1.getMinutes()); // 90

const time2 = manipulator('-02:15');
console.log(time2.getMinutes()); // -135

const time3 = manipulator(0);
console.log(time3.getMinutes()); // 0
```

## 📚 Exemplos Práticos

### Calculando Banco de Horas

```typescript
const horasContratadas = manipulator('08:00');  // 8 horas por dia
const horasTrabalhadas = manipulator('09:30'); // Trabalhou 9h30

const saldo = manipulator(horasTrabalhadas.getMinutes())
    .difference(horasContratadas.getMinutes());

console.log(saldo.formatWithColonSeparation(true)); // '+01:30'
```

### Somando Múltiplos Períodos

```typescript
const manha = manipulator('04:00').getMinutes();      // 4 horas
const tarde = manipulator('04:30').getMinutes();      // 4 horas e 30 min
const extra = manipulator('01:15').getMinutes();      // 1 hora e 15 min

const total = manipulator(manha + tarde + extra);
console.log(total.formatWithColonSeparation());           // '09:45'
console.log(total.formatWithTechinicalTimeNotation());    // '09h45m'
```

### Validação de Jornada de Trabalho

```typescript
const jornadaMaxima = manipulator('10:00').getMinutes(); // 10 horas máximo
const jornadaTrabalhada = manipulator('11:30');

if (jornadaTrabalhada.getMinutes() > jornadaMaxima) {
    const extra = manipulator(jornadaTrabalhada.getMinutes())
        .difference(jornadaMaxima);
    
    console.log(`Hora extra: ${extra.formatWithColonSeparation()}`);
    // Saída: "Hora extra: 01:30"
}
```

## 🔧 API Completa

### Métodos Estáticos

#### `TimeManipulator.parse(value: string | number): TimeManipulator`

Cria uma instância de TimeManipulator a partir de uma string ou número.

**Parâmetros:**
- `value`: String no formato `HH:MM` (pode ter prefixo `-` ou `+`) ou número representando minutos

**Retorna:** Instância de `TimeManipulator`

**Exemplos:**
```typescript
TimeManipulator.parse('12:30')   // 12h30min
TimeManipulator.parse('-01:15')  // -1h15min
TimeManipulator.parse(90)        // 90 minutos (1h30min)
```

### Métodos de Instância

#### `formatWithColonSeparation(withSymbols?: boolean): string`

Formata o tempo no padrão `HH:MM`.

**Retorna:** String formatada

#### `formatWithTechinicalTimeNotation(withSymbols?: boolean): string`

Formata o tempo no padrão técnico `HhMm`.

**Retorna:** String formatada

#### `getMinutes(): number`

Retorna o valor total em minutos.

**Retorna:** Número de minutos (pode ser negativo)

#### `difference(minutesToSubtract: number): TimeManipulator`

Subtrai minutos do valor atual.

**Parâmetros:**
- `minutesToSubtract`: Quantidade de minutos a subtrair

**Retorna:** A própria instância (permite encadeamento)

#### `invertSign(): number`

Inverte o sinal do tempo (positivo ↔ negativo).

**Retorna:** O novo valor em minutos

#### `isPositiveTime(): boolean`

Verifica se o tempo é maior que zero.

**Retorna:** `true` se positivo, `false` caso contrário

#### `isNegativeTime(): boolean`

Verifica se o tempo é menor que zero.

**Retorna:** `true` se negativo, `false` caso contrário

### Função Auxiliar

#### `manipulator(value: string | number): TimeManipulator`

Atalho para `TimeManipulator.parse()`.

## ⚠️ Tratamento de Erros

A biblioteca trata graciosamente entradas inválidas:

```typescript
const invalid1 = manipulator('');           // Retorna 0 minutos
const invalid2 = manipulator('invalid');    // Retorna 0 minutos (com warning no console)
const invalid3 = manipulator('12:');        // Retorna 0 minutos (com warning no console)
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📄 Licença

MIT

## 👨‍💻 Autor

[Seu Nome]

---

Feito com ❤️ para facilitar a manipulação de tempo em TypeScript
