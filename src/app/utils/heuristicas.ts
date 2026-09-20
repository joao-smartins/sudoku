import { verificarCelulaPreInsercao } from "./funcoes";
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

export const maiorGrauDeRestricaoHillClimbing = (
  tabela: TabelaSudoku,
) => {
  let maiorRestricao = 10;
  for (let i = 0; i < LIMITE; i++) {
    for (let j = 0; j < LIMITE; j++) {
      const celula = tabela[i][j];
      if (celula.valor === null) {
        const restricao = celula.possibilidades
          ? celula.possibilidades.length
          : 0;
        if (restricao < maiorRestricao && restricao > 0) {
          maiorRestricao = restricao;
        }else if(restricao === 0){
            return null;
        }
      }
    }
  }

  let celulasComMaiorRestricao: CelulaSudoku[] = [];
  for (let i = 0; i < LIMITE; i++) {
    for (let j = 0; j < LIMITE; j++) {
        const celula = tabela[i][j];
        if (celula.valor === null && celula.possibilidades.length === maiorRestricao) {
            celulasComMaiorRestricao.push(celula);
        }
    }
  }

  if (celulasComMaiorRestricao.length === 0) {
    return null;
  }

  const celulaAleatoria = celulasComMaiorRestricao[Math.floor(Math.random() * celulasComMaiorRestricao.length)];

  if (celulaAleatoria) {
    return celulaAleatoria;
  }
  return null;
};