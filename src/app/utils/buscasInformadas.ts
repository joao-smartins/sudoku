import { copiarTabela } from "./funcoes";
import {
  calcularPossibilidades,
  maiorGrauDeRestricaoHillClimbing,
} from "./heuristicas";
import { TabelaSudoku } from "./tipos";

// ---------------- Hill Climbing ----------------

// função HillClimbing(inicial, objetivo):
//   atual ← inicial
//   enquanto verdadeiro:
//     vizinho ← melhor_vizinho(atual)  // menor h
//     se h(vizinho) ≥ h(atual):
//       retorna atual  // ótimo local (ou global)
//     atual ← vizinho
//     se atual = objetivo: retorna atual

export const buscaHillClimbingEstocastica = (tabela: TabelaSudoku) => {
  let tabelaCopia: TabelaSudoku = copiarTabela(tabela);
  calcularPossibilidades(tabelaCopia);

  let celulaAtual = maiorGrauDeRestricaoHillClimbing(tabelaCopia);

  while (celulaAtual) {
    let possibilidadeAleatoria =
      celulaAtual.possibilidades[
        Math.floor(Math.random() * celulaAtual.possibilidades.length)
      ];
    tabelaCopia[celulaAtual.linha][celulaAtual.coluna].valor =
      possibilidadeAleatoria;
    calcularPossibilidades(tabelaCopia);
    celulaAtual = maiorGrauDeRestricaoHillClimbing(tabelaCopia);
  }

  return tabelaCopia;
};
