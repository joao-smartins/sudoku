import { retornarCelulaNaoPreenchidaAleatoria, verificarCelulaPreInsercao } from "./funcoes";
import { CelulaSudoku, TabelaSudoku } from "./tipos";
const LIMITE = 9;
const POSSIBILIDADES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// A Fazer -> MRV
export const calcularPossibilidades = (tabela: TabelaSudoku) => {
  for (let i = 0; i < LIMITE; i++) {
    for (let j = 0; j < LIMITE; j++) {
      const celula = tabela[i][j];
      if (celula.valor === null) {
        let novaListaPossibilidades: number[] = [];
        for (let k = 1; k <= LIMITE; k++) {
          const celulaValida = verificarCelulaPreInsercao(tabela, i, j, k);
          if (celulaValida) {
            novaListaPossibilidades.push(k);
          }
        }
        tabela[i][j].possibilidades = novaListaPossibilidades;
      }
    }
  }
};

export const MrvHCEstocastica = (
  tabela: TabelaSudoku,
  restricaoAnterior: number = 10
) => {
  let maiorRestricao = restricaoAnterior;
  let celulasComMaiorRestricao: CelulaSudoku[] = [];
  for (let i = 0; i < LIMITE; i++) {
    for (let j = 0; j < LIMITE; j++) {
        const celula = tabela[i][j];
        if (celula.valor === null && celula.possibilidades.length < maiorRestricao) {
            celulasComMaiorRestricao.push(celula);
        }
    }
  }
  if (celulasComMaiorRestricao.length === 0) {
    return null;
  }
  const celulaAleatoria = celulasComMaiorRestricao[Math.floor(Math.random() * celulasComMaiorRestricao.length)];
  return celulaAleatoria;
};



export const MrvHCPrimeiraEscolha = (
  tabela: TabelaSudoku,
  restricaoAnterior: number = 10
) => {
  let maiorRestricao = restricaoAnterior;

  let celulasComMaiorRestricao: CelulaSudoku | null = null;
  let encontrou = false;
  for (let i = 0; i < LIMITE && !encontrou; i++) {
    for (let j = 0; j < LIMITE && !encontrou; j++) {
        const celula = tabela[i][j];
        if (celula.valor === null && celula.possibilidades.length < maiorRestricao) {
            celulasComMaiorRestricao = celula;
            encontrou = true;
        }
    }
  }

  return celulasComMaiorRestricao;
};



export const MrvHCReinicioAleatorio = (
  tabela: TabelaSudoku,
  restricaoAnterior: number = 10
) => {
  let maiorRestricao = restricaoAnterior;
//   for (let i = 0; i < LIMITE; i++) {
//     for (let j = 0; j < LIMITE; j++) {
//       const celula = tabela[i][j];
//       if (celula.valor === null) {
//         const restricao = celula.possibilidades
//           ? celula.possibilidades.length
//           : 0;
//         if (restricao < maiorRestricao && restricao > 0) {
//           maiorRestricao = restricao;
//         }else if(restricao === 0){
//             return null;
//         }
//       }
//     }
//   }

  let celulasComMaiorRestricao: CelulaSudoku | null = null;
  let encontrou = false;
  for (let i = 0; i < LIMITE && !encontrou; i++) {
    for (let j = 0; j < LIMITE && !encontrou; j++) {
        const celula = tabela[i][j];
        if (celula.valor === null && celula.possibilidades.length < maiorRestricao) {
            celulasComMaiorRestricao = celula;
            encontrou = true;
        }
    }
  }

  return celulasComMaiorRestricao;

  
};

// def SimulatedAnnealing():
//   s0 = solucaoInicial()
//   T = 100
//   while T > eps:
//   s = estadoVizinhoAleatorio(s0)
//   if f(s) > f(s0):
//      s0 = s
//   else:
//      if random() <= exp((f(s)-f(s0))/T):
//         s0 = s
//    T = reduz(T)



export const MrvHCRecozimentoSimulado = (
  tabela: TabelaSudoku,
  restricaoAnterior: number = 10,
  temperatura: number
) => {
  const celulaAleatoria: {celula: CelulaSudoku | null; tamanho: number} | null = retornarCelulaNaoPreenchidaAleatoria(tabela);

  if(restricaoAnterior === 0 || celulaAleatoria === null || temperatura <= 0){
    return null;
  }
  
  if( celulaAleatoria.celula && celulaAleatoria.celula.possibilidades.length < restricaoAnterior){
    return celulaAleatoria.celula;
  }else{
    //Calcula de temperatura e decide se aceita a celula mesmo com maior restrição
    const celula = celulaAleatoria.celula;
    if(celula === null) return null;
    const calculo =  (restricaoAnterior - celula.possibilidades.length)/temperatura;

    const probabilidade = Math.exp(calculo);

    if(Math.random() <= probabilidade){
      return celula;
    }else{
      return null;
    }

  }

};