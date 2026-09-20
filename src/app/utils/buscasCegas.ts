import {
  copiarTabela,
  proximaCelulaNaoPreenchida,
  retornarCelulaAnteriorVisitada,
  verificarCelulaPreInsercao,
} from "./funcoes";
import { CelulaSudoku, TabelaSudoku } from "./tipos";
const LIMITE = 9;

// Busca em Profundidade
// função DFS(inicial, objetivo):
//   fronteira ← pilha [inicial]
//   visitados ← {}
//   enquanto fronteira não vazia:
//     nó ← fronteira.remove_do_topo()
//     se nó = objetivo: retorna caminho(nó)
//     se nó ∉ visitados:
//       visitados.adicionar(nó)
//       para cada vizinho em sucessores(nó):
//         fronteira.empilha(vizinho)
//   retorna falha

export const buscaPorProfundidade = (tabela: TabelaSudoku) => {
  let tabelaCopia: TabelaSudoku = copiarTabela(tabela);
  let fronteira: CelulaSudoku[] = [];
  let visitados: CelulaSudoku[] = [];
  let encontrouSolucao = false;

  for (let i = 0; i < LIMITE && !encontrouSolucao; i++) {
    for (let j = 0; j < LIMITE && !encontrouSolucao; j++) {
      if (tabelaCopia[i][j].valor === null) {
        fronteira.push({
          linha: i,
          coluna: j,
          valor: null,
          permitida: tabelaCopia[i][j].permitida,
          selecionada: tabelaCopia[i][j].selecionada,
          possibilidades: tabelaCopia[i][j].possibilidades,
        });
        encontrouSolucao = true;
      }
    }
  }

  while (fronteira.length > 0) {
    const celulaAtual = fronteira.pop()!;
    if (celulaAtual) {
      let nenhumaCelulaValida = true;

      if (celulaAtual.possibilidades.length > 0) {
        for (let i = 0; i < celulaAtual.possibilidades.length && nenhumaCelulaValida; i++) {
          const valor = celulaAtual.possibilidades[i];
          let celulaValida = verificarCelulaPreInsercao(
            tabelaCopia,
            celulaAtual.linha,
            celulaAtual.coluna,
            valor,
          );
          if (celulaValida) {
            nenhumaCelulaValida = false;
            tabelaCopia[celulaAtual.linha][celulaAtual.coluna].valor = valor;
            celulaAtual.valor = valor;
          }
        }
      }

      if (nenhumaCelulaValida) {
        tabelaCopia[celulaAtual.linha][celulaAtual.coluna].valor = null;

        const anterior = retornarCelulaAnteriorVisitada(
          tabelaCopia,
          celulaAtual.linha,
          celulaAtual.coluna,
          visitados,
        );

        if (anterior) {
          let valorAnterior =
            tabelaCopia[anterior.linha][anterior.coluna].valor;

          tabelaCopia[anterior.linha][anterior.coluna].valor = null;
          anterior.possibilidades = anterior.possibilidades.filter(
            (p) => p !== valorAnterior,
          );

          fronteira.push(anterior);
        }
      } else {
        visitados.push(celulaAtual);

        const proximaCelula = proximaCelulaNaoPreenchida(tabelaCopia);
        if (proximaCelula) {
          fronteira.push(proximaCelula);
        } else {
          console.log("Solução encontrada!");
          console.log(tabelaCopia);
          return tabelaCopia;
        }
      }
    }
  }
  console.log(tabela);
  console.log(tabelaCopia);
  return null;
};
