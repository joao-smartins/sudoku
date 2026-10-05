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
import { CelulaSudoku, Metricas, ParametrosMetricas, TabelaSudoku } from "./tipos";
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

export const buscaHCEstocastica = (
  tabela: TabelaSudoku,
  setMetricas?: React.Dispatch<React.SetStateAction<Metricas | undefined>>
) => {
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
  let tempoFinal = performance.now();
  processarMetricas({
    tabela: tabelaCopia,
    tempoInicial,
    tempoFinal: tempoFinal,
    nosExpandidos,
    setMetricas,
  });

  return tabelaCopia;
};

export const buscaHCPrimeiraEscolha = (
  tabela: TabelaSudoku,
  setMetricas?: React.Dispatch<React.SetStateAction<Metricas | undefined>>
) => {
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
  let tempoFinal = performance.now();
  processarMetricas({
    tabela: tabelaCopia,
    tempoInicial,
    tempoFinal,
    nosExpandidos,
    setMetricas,
  });

  return tabelaCopia;
};

export const buscaHCRecozimentoSimulado = (
  tabela: TabelaSudoku,
  setMetricas?: React.Dispatch<React.SetStateAction<Metricas | undefined>>
) => {
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
  let tempoFinal = performance.now();
  processarMetricas({
    tabela: tabelaCopia,
    tempoInicial,
    tempoFinal: tempoFinal,
    nosExpandidos,
    setMetricas,
  });

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

export const buscaBestFirst = (
  tabela: TabelaSudoku,
  setMetricas?: React.Dispatch<React.SetStateAction<Metricas | undefined>>
) => {
  const tempoInicial = performance.now();
  let tabelaCopia: TabelaSudoku = copiarTabela(tabela);
  calcularPossibilidades(tabelaCopia);

  let nosExpandidos = 0;
  let fronteira: CelulaSudoku[] = [];
  let primeiraCelula = mrvBestFirst(tabelaCopia);
  if (primeiraCelula ) {
    fronteira.push(primeiraCelula);
  }
  while (fronteira.length > 0) {
    let celulaAtual = fronteira.shift();
    if (celulaAtual && celulaAtual.possibilidades.length > 0) {
      //let possibilidade = celulaAtual.possibilidades[Math.floor(Math.random() * celulaAtual.possibilidades.length)]; teste com selecao de possibilidade aleatoria
      let possibilidade = celulaAtual.possibilidades[0];
      tabelaCopia[celulaAtual.linha][celulaAtual.coluna].valor = possibilidade;
      calcularPossibilidades(tabelaCopia);
      let novaCelula = mrvBestFirst(tabelaCopia);
      if (novaCelula) {
        fronteira.push(novaCelula);
      }
      nosExpandidos++;
    }
  }
  let tempoFinal = performance.now();
  processarMetricas({
    tabela: tabelaCopia,
    tempoInicial,
    tempoFinal,
    nosExpandidos,
    setMetricas,
  });

  return tabelaCopia;
};



export const processarMetricas = ({
  tabela,
  tempoInicial,
  tempoFinal,
  nosExpandidos,
  backtracking = null,
  setMetricas,
}: ParametrosMetricas) => {
  const tempoTotalMs = tempoFinal - tempoInicial;
  const tabelaCompleta = totalmentePreenchida(tabela);
  const solucaoValida = tabelaCompleta && !tabelaPossuiCelulaInvalida(tabela);

  // console.log("Tabela:", tabela);
  // console.log("Nós expandidos:", nosExpandidos);
  // console.log("Tabela completa:", tabelaCompleta);
  // console.log("Solução válida:", solucaoValida);
  // console.log("Tempo de execução:", `${tempoTotalMs.toFixed(2)} ms`);
  // console.log(
  //   "Backtracking:",
  //   backtracking !== null ? backtracking : "N/A"
  // );

  if (setMetricas) {
    setMetricas({
      tempoExecucao: tempoTotalMs,
      nosExpandidos: nosExpandidos,
      backtracking: backtracking,
    });
  }
};