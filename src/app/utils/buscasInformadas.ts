import { copiarTabela } from "./funcoes";
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
  let tabelaCopia: TabelaSudoku = copiarTabela(tabela);
  calcularPossibilidades(tabelaCopia);

  let celulaAtual = MrvHCEstocastica(tabelaCopia);
  let restricaoAtual = celulaAtual?.possibilidades.length;

  while (celulaAtual && restricaoAtual && restricaoAtual > 0) {
    let restricaoAtual = celulaAtual.possibilidades.length;
    let possibilidadeAleatoria =
      celulaAtual.possibilidades[
        Math.floor(Math.random() * restricaoAtual)
      ];
    tabelaCopia[celulaAtual.linha][celulaAtual.coluna].valor =
      possibilidadeAleatoria;
    calcularPossibilidades(tabelaCopia);
    celulaAtual = MrvHCEstocastica(tabelaCopia, restricaoAtual);
  }

  return tabelaCopia;
};


export const buscaHCPrimeiraEscolha = (tabela: TabelaSudoku) => {
  let tabelaCopia: TabelaSudoku = copiarTabela(tabela);
  calcularPossibilidades(tabelaCopia);

  let celulaAtual = MrvHCPrimeiraEscolha(tabelaCopia);

  while (celulaAtual && celulaAtual?.possibilidades.length > 0) {
    let restricaoAtual = celulaAtual.possibilidades.length;
    let possibilidade = celulaAtual.possibilidades[0];
    tabelaCopia[celulaAtual.linha][celulaAtual.coluna].valor =
      possibilidade;
    calcularPossibilidades(tabelaCopia);
    celulaAtual = MrvHCPrimeiraEscolha(tabelaCopia, restricaoAtual);
  }

  return tabelaCopia;
};


export const buscaHCRecozimentoSimulado = (tabela: TabelaSudoku) => {
  let tabelaCopia: TabelaSudoku = copiarTabela(tabela);
  calcularPossibilidades(tabelaCopia);
  let temperatura = 9;

  let celulaAtual = MrvHCRecozimentoSimulado(tabelaCopia, 10,temperatura);

  while (celulaAtual && celulaAtual?.possibilidades.length > 0) {

    let restricaoAtual = celulaAtual.possibilidades.length;
    let possibilidade = celulaAtual.possibilidades[0];
    tabelaCopia[celulaAtual.linha][celulaAtual.coluna].valor =
      possibilidade;
    calcularPossibilidades(tabelaCopia);
    temperatura *= 0.95;
    celulaAtual = MrvHCRecozimentoSimulado(tabelaCopia, restricaoAtual, temperatura);
    
  }

  return tabelaCopia;
};
