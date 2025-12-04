export class TimeManipulator {
    private timeInMinutes: number = 0;

    /**
     * Converte um valor para uma instância da classe TimeManipulator
     *
     * @param value - O valor a ser convertido. Pode ser um número ou uma string no formato HH:MM
     * @returns Uma instância da classe TimeManipulator com o valor convertido
     *
     * Exemplos:
     * - TimeManipulator.parse('12:30') -> TimeManipulator com o valor 12 horas e 30 minutos
     * - TimeManipulator.parse(12 * 60 + 30) -> TimeManipulator com o valor 12 horas e 30 minutos
     * - TimeManipulator.parse('-12:30') -> TimeManipulator com o valor -12 horas e -30 minutos
     */
    static parse(value: string | number): TimeManipulator {
        const manipulatorInstance = new TimeManipulator();

        if (typeof value === 'string') {
            if (value.trim() === '') {
                manipulatorInstance.timeInMinutes = 0;
                return manipulatorInstance;
            }

            const isNegativeTime = value.startsWith('-');
            const stringToParse = isNegativeTime || value.startsWith('+') ? value.slice(1) : value;

            const parts = stringToParse.split(':');

            if (parts.length !== 2) {
                // Lidar com formato inválido (ou lançar erro)
                console.warn(`Formato de tempo inválido: ${value}. Definindo para 0.`);
                manipulatorInstance.timeInMinutes = 0;
                return manipulatorInstance;
            }

            const hours = Number(parts[0]);
            const minutes = Number(parts[1]);

            if (isNaN(hours) || isNaN(minutes)) {
                console.warn(`Componentes de tempo inválidos em ${value}. Definindo para 0.`);
                manipulatorInstance.timeInMinutes = 0;
                return manipulatorInstance;
            }

            const timeNumber = hours * 60 + minutes;

            manipulatorInstance.timeInMinutes = isNegativeTime ? timeNumber * -1 : timeNumber;

        } else {
            manipulatorInstance.timeInMinutes = value;
        }

        return manipulatorInstance;
    }

    // Método auxiliar (melhor mover para dentro da classe se for usado por vários métodos)
    private isNegativeTime(): boolean {
        return this.timeInMinutes < 0;
    }

    /**
     * Formata o tempo em minutos para uma string no formato HH:MM
     * ... (JSDoc atualizado com TimeManipulator)
     */
    public formatWithColonSeparation(withSymbols = false): string {
        const isNegative = this.isNegativeTime();
        let symbol = '';

        if (withSymbols) {
            if (this.timeInMinutes > 0) {
                symbol = '+';
            } else if (isNegative) {
                symbol = '-';
            }
        }

        const absoluteMinutes = Math.abs(this.timeInMinutes);

        const hours = Math.floor(absoluteMinutes / 60);
        const stringHours = hours.toString().padStart(2, '0');

        const minutes = absoluteMinutes % 60;
        const stringMinutes = minutes.toString().padStart(2, '0');

        return `${symbol}${stringHours}:${stringMinutes}`;
    }

    /**
     * Formata o tempo em minutos para uma string usando notação técnica (ex: 1h30min)
     * ... (JSDoc atualizado com TimeManipulator)
     */
    public formatWithTechinicalTimeNotation(withSymbols = false): string {
      const isNegativeTime = this.isNegativeTime();
          let symbol = '';

          if (withSymbols) {
              if (this.timeInMinutes > 0) {
                  symbol = '+';
              } else if (isNegativeTime) {
                  symbol = '-';
              } else {
                  symbol = '';
              }
          }

          const hours = Math.floor(
              (isNegativeTime ? this.timeInMinutes * -1 : this.timeInMinutes) / 60,
          );
          const stringHours = hours.toString().padStart(2, '0');

          const minutes = (isNegativeTime ? this.timeInMinutes * -1 : this.timeInMinutes) % 60;
          const stringMinutes = minutes.toString().padStart(2, '0');

          return `${symbol}${stringHours}h${stringMinutes}m`;
      }

    /**
     * Inverte o sinal do tempo em minutos (positivo para negativo ou vice-versa)
     * ... (JSDoc atualizado com TimeManipulator)
     */
    public invertSign(): number {
        this.timeInMinutes *= -1;
        return this.timeInMinutes;
    }

    // Métodos isNegativeTime, isPositiveTime, getMinutes, difference não alterados
    public isPositiveTime(): boolean {
        return this.timeInMinutes > 0;
    }

    public getMinutes(): number {
        return this.timeInMinutes;
    }

    public difference(minutesToSubtract: number): TimeManipulator {
        this.timeInMinutes = this.timeInMinutes - minutesToSubtract;
        return this;
    }
}

export const manipulator = (value: string | number) => TimeManipulator.parse(value);