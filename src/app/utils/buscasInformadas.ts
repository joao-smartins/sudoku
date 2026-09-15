import { TabelaSudoku } from "./tipos";

// função AEstrela(inicial, objetivo):
//   fronteira ← fila_prioridade por f(n)=g(n)+h(n)
//   fronteira.insere(inicial, h(inicial))
//   g[inicial] ← 0
//   enquanto fronteira não vazia:
//     nó ← fronteira.remove_menor_f()
//     se nó = objetivo: retorna caminho(nó)
//     para cada vizinho em sucessores(nó):
//       novo_g ← g[nó] + custo(nó,vizinho)
//       se novo_g < g[vizinho]:
//         g[vizinho] ← novo_g
//         f ← novo_g + h(vizinho)
//         fronteira.insere(vizinho, f)
//   retorna falha

export const buscaAEstrela = (tabela: TabelaSudoku) => {
    
}