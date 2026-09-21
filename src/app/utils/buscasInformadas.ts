import { copiarTabela, totalmentePreenchida, tabelaPossuiCelulaInvalida } from "./funcoes";
import {
  calcularPossibilidades,
  MrvHCEstocastica,
  MrvHCPrimeiraEscolha,
  MrvHCRecozimentoSimulado,
} from "./heuristicas";
import { TabelaSudoku } from "./tipos";
const LIMITE = 9;

// ---------------- Hill Climbing ----------------

// função HillClimbing(inicial, objetivo):
//   atual ← inicial
//   enquanto verdadeiro:
//     vizinho ← melhor_vizinho(atual)  // menor h
//     se h(vizinho) ≥ h(atual):
//       retorna atual  // ótimo local (ou global)
//     atual ← vizinho
//     se atual = objetivo: retorna atual

export const buscaHCEstocastica = (tabela: TabelaSudoku) => {
  const tempoInicial = performance.now();
  let tabelaCopia: TabelaSudoku = copiarTabela(tabela);
  calcularPossibilidades(tabelaCopia);

  let nosExpandidos = 0;

  let celulaAtual = MrvHCEstocastica(tabelaCopia);

  while (celulaAtual && celulaAtual?.possibilidades.length > 0) {
    let restricaoAtual = celulaAtual.possibilidades.length;
    let possibilidadeAleatoria =
      celulaAtual.possibilidades[
        Math.floor(Math.random() * restricaoAtual)
      ];
    tabelaCopia[celulaAtual.linha][celulaAtual.coluna].valor =
      possibilidadeAleatoria;
    calcularPossibilidades(tabelaCopia);
    celulaAtual = MrvHCEstocastica(tabelaCopia, restricaoAtual);
    nosExpandidos++;
  }

  const tempoTotalMs = performance.now() - tempoInicial;
  const tabelaCompleta = totalmentePreenchida(tabelaCopia);
  const solucaoValida = tabelaCompleta && !tabelaPossuiCelulaInvalida(tabelaCopia);

  console.log("Tabela:", tabelaCopia);
  console.log("Nós expandidos (iterações):", nosExpandidos);
  console.log("Tabela completa:", tabelaCompleta);
  console.log("Solução válida:", solucaoValida);
  console.log("Tempo de execução:", `${tempoTotalMs.toFixed(2)} ms`);
  console.log("Backtracking:", null, "(N/A para busca local)");
  return tabelaCopia;
};


export const buscaHCPrimeiraEscolha = (tabela: TabelaSudoku) => {
  const tempoInicial = performance.now();
  let tabelaCopia: TabelaSudoku = copiarTabela(tabela);
  calcularPossibilidades(tabelaCopia);

  let nosExpandidos = 0;

  let celulaAtual = MrvHCPrimeiraEscolha(tabelaCopia);

  while (celulaAtual && celulaAtual?.possibilidades.length > 0) {
    let restricaoAtual = celulaAtual.possibilidades.length;
    let possibilidade = celulaAtual.possibilidades[0];
    tabelaCopia[celulaAtual.linha][celulaAtual.coluna].valor =
      possibilidade;
    calcularPossibilidades(tabelaCopia);
    celulaAtual = MrvHCPrimeiraEscolha(tabelaCopia, restricaoAtual);
    nosExpandidos++;
  }

  const tempoTotalMs = performance.now() - tempoInicial;
  const tabelaCompleta = totalmentePreenchida(tabelaCopia);
  const solucaoValida = tabelaCompleta && !tabelaPossuiCelulaInvalida(tabelaCopia);

  console.log("Tabela:", tabelaCopia);
  console.log("Nós expandidos (iterações):", nosExpandidos);
  console.log("Tabela completa:", tabelaCompleta);
  console.log("Solução válida:", solucaoValida);
  console.log("Tempo de execução:", `${tempoTotalMs.toFixed(2)} ms`);
  console.log("Backtracking:", null, "(N/A para busca local)");

  return tabelaCopia;
};


export const buscaHCRecozimentoSimulado = (tabela: TabelaSudoku) => {
  const tempoInicial = performance.now();
  let tabelaCopia: TabelaSudoku = copiarTabela(tabela);
  calcularPossibilidades(tabelaCopia);
  let temperatura = 9;

  let nosExpandidos = 0;

  let celulaAtual = MrvHCRecozimentoSimulado(tabelaCopia, 10, temperatura);

  while (celulaAtual && celulaAtual?.possibilidades.length > 0) {
    let restricaoAtual = celulaAtual.possibilidades.length;
    let possibilidade = celulaAtual.possibilidades[0];
    tabelaCopia[celulaAtual.linha][celulaAtual.coluna].valor =
      possibilidade;
    calcularPossibilidades(tabelaCopia);
    temperatura *= 0.95;
    celulaAtual = MrvHCRecozimentoSimulado(tabelaCopia, restricaoAtual, temperatura);
    nosExpandidos++;
  }

  const tempoTotalMs = performance.now() - tempoInicial;
  const tabelaCompleta = totalmentePreenchida(tabelaCopia);
  const solucaoValida = tabelaCompleta && !tabelaPossuiCelulaInvalida(tabelaCopia);

  console.log("Tabela:", tabelaCopia);
  console.log("Nós expandidos (iterações):", nosExpandidos);
  console.log("Tabela completa:", tabelaCompleta);
  console.log("Solução válida:", solucaoValida);
  console.log("Tempo de execução:", `${tempoTotalMs.toFixed(2)} ms`);
  console.log("Backtracking:", null, "(N/A para busca local)");

  return tabelaCopia;
};
