# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2025-12-04

### Adicionado
- Classe `TimeManipulator` para manipulação de tempo
- Método estático `parse()` para converter strings (HH:MM) e números (minutos) em instâncias
- Suporte para tempos negativos e positivos (prefixos `-` e `+`)
- Método `formatWithColonSeparation()` para formatação no padrão HH:MM
- Método `formatWithTechinicalTimeNotation()` para formatação no padrão técnico (Xh Ym)
- Método `getMinutes()` para obter o valor em minutos
- Método `difference()` para calcular diferença entre tempos
- Método `invertSign()` para inverter o sinal do tempo
- Métodos `isPositiveTime()` e `isNegativeTime()` para verificação de estado
- Função auxiliar `manipulator()` como atalho para `TimeManipulator.parse()`
- Tratamento gracioso de entradas inválidas com warnings no console
- Suporte completo a TypeScript com tipagem
- Documentação completa no README.md
- Licença MIT
- Arquivo de configuração TypeScript otimizado
- Scripts de build e prepublish

### Recursos
- Zero dependências em runtime
- Biblioteca leve e performática
- API fluente com suporte a encadeamento de métodos
- Compatível com Node.js e navegadores (quando transpilado)

[1.0.0]: https://github.com/mateuscorreiaazevedo/time-manipulator/releases/tag/v1.0.0
