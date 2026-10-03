import {
  copiarTabela,
  totalmentePreenchida,
  tabelaPossuiCelulaInvalida,
} from "./funcoes";
import {
  calcularPossibilidades,
  mrvBestFirst,
  MrvHCEstocastica,
  MrvHCPrimeiraEscolha,
  MrvHCRecozimentoSimulado,
} from "./heuristicas";
import { CelulaSudoku, TabelaSudoku } from "./tipos";
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
      celulaAtual.possibilidades[Math.floor(Math.random() * restricaoAtual)];
    tabelaCopia[celulaAtual.linha][celulaAtual.coluna].valor =
      possibilidadeAleatoria;
    calcularPossibilidades(tabelaCopia);
    celulaAtual = MrvHCEstocastica(tabelaCopia, restricaoAtual);
    nosExpandidos++;
  }

  const tempoTotalMs = performance.now() - tempoInicial;
  const tabelaCompleta = totalmentePreenchida(tabelaCopia);
  const solucaoValida =
    tabelaCompleta && !tabelaPossuiCelulaInvalida(tabelaCopia);

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
    tabelaCopia[celulaAtual.linha][celulaAtual.coluna].valor = possibilidade;
    calcularPossibilidades(tabelaCopia);
    celulaAtual = MrvHCPrimeiraEscolha(tabelaCopia, restricaoAtual);
    nosExpandidos++;
  }

  const tempoTotalMs = performance.now() - tempoInicial;
  const tabelaCompleta = totalmentePreenchida(tabelaCopia);
  const solucaoValida =
    tabelaCompleta && !tabelaPossuiCelulaInvalida(tabelaCopia);

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
    tabelaCopia[celulaAtual.linha][celulaAtual.coluna].valor = possibilidade;
    calcularPossibilidades(tabelaCopia);
    temperatura *= 0.95;
    celulaAtual = MrvHCRecozimentoSimulado(
      tabelaCopia,
      restricaoAtual,
      temperatura,
    );
    nosExpandidos++;
  }

  const tempoTotalMs = performance.now() - tempoInicial;
  const tabelaCompleta = totalmentePreenchida(tabelaCopia);
  const solucaoValida =
    tabelaCompleta && !tabelaPossuiCelulaInvalida(tabelaCopia);

  console.log("Tabela:", tabelaCopia);
  console.log("Nós expandidos (iterações):", nosExpandidos);
  console.log("Tabela completa:", tabelaCompleta);
  console.log("Solução válida:", solucaoValida);
  console.log("Tempo de execução:", `${tempoTotalMs.toFixed(2)} ms`);
  console.log("Backtracking:", null, "(N/A para busca local)");

  return tabelaCopia;
};

// ---------------- Best First ----------------

// função Guloso(inicial, objetivo):
//   fronteira ← fila_prioridade por h(n)
//   fronteira.insere(inicial, h(inicial))
//   enquanto fronteira não vazia:
//     nó ← fronteira.remove_menor_h()p
//     se nó = objetivo: retorna caminho(nó)
//     para cada vizinho em sucessores(nó):
//       fronteira.insere(vizinho, h(vizinho))
//   retorna falha

export const buscaBestFirst = (tabela: TabelaSudoku) => {
  let tabelaCopia: TabelaSudoku = copiarTabela(tabela);
  calcularPossibilidades(tabelaCopia);

  let fronteira: CelulaSudoku[] = [];
  fronteira.push(mrvBestFirst(tabelaCopia));

  while (fronteira.length > 0) {
    let celulaAtual = fronteira.shift();
    if (celulaAtual && celulaAtual.possibilidades.length > 0) {
      //let possibilidade = celulaAtual.possibilidades[Math.floor(Math.random() * celulaAtual.possibilidades.length)]; teste com selecao de possibilidade aleatoria
      let possibilidade = celulaAtual.possibilidades[0];
      tabelaCopia[celulaAtual.linha][celulaAtual.coluna].valor = possibilidade;
      calcularPossibilidades(tabelaCopia);
      let novaCelula = mrvBestFirst(tabelaCopia);
      if (novaCelula !== null) {
        fronteira.push(novaCelula);
      }
    }
  }
  console.log(tabelaCopia);
  return tabelaCopia;
};