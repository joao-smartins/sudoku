import { TabelaSudoku } from "./tipos";

// Busca em Largura
// função BFS(inicial, objetivo):
//   fronteira ← fila [inicial]
//   visitados ← {}
//   enquanto fronteira não vazia:
//     nó ← fronteira.remove_do_início()
//     se nó = objetivo: retorna caminho(nó)
//     visitados.adicionar(nó)
//     para cada vizinho em sucessores(nó):
//       se vizinho ∉ visitados ∪ fronteira:
//         fronteira.adiciona_no_fim(vizinho)
//   retorna falha

export const buscaPorLargura = (tabela: TabelaSudoku) => {
  
}