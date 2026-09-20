import { Dispatch, SetStateAction } from "react";
import { CelulaSudoku, TabelaSudoku } from "./tipos";

//Utilidades

export const preencherTabela = (
  setTabela: Dispatch<SetStateAction<TabelaSudoku | undefined>>,
) => {
  let novaTabela: TabelaSudoku = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      novaTabela[i] = novaTabela[i] || [];
      novaTabela[i][j] = {
        valor: null,
        coluna: j,
        linha: i,
        permitida: true,
        selecionada: false,
        possibilidades: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      };
    }
  }
  setTabela(novaTabela);
};

const blocos = [
  { linhaInicial: 0, linhaFinal: 2, colunaInicial: 0, colunaFinal: 2 },
  { linhaInicial: 0, linhaFinal: 2, colunaInicial: 3, colunaFinal: 5 },
  { linhaInicial: 0, linhaFinal: 2, colunaInicial: 6, colunaFinal: 8 },
  { linhaInicial: 3, linhaFinal: 5, colunaInicial: 0, colunaFinal: 2 },
  { linhaInicial: 3, linhaFinal: 5, colunaInicial: 3, colunaFinal: 5 },
  { linhaInicial: 3, linhaFinal: 5, colunaInicial: 6, colunaFinal: 8 },
  { linhaInicial: 6, linhaFinal: 8, colunaInicial: 0, colunaFinal: 2 },
  { linhaInicial: 6, linhaFinal: 8, colunaInicial: 3, colunaFinal: 5 },
  { linhaInicial: 6, linhaFinal: 8, colunaInicial: 6, colunaFinal: 8 },
];

export const verificarQualOBloco = (linha: number, coluna: number) => {
  for (const bloco of blocos) {
    if (
      linha >= bloco.linhaInicial &&
      linha <= bloco.linhaFinal &&
      coluna >= bloco.colunaInicial &&
      coluna <= bloco.colunaFinal
    ) {
      return bloco;
    }
  }
  return null;
};

//Verificações antes de inserir o valor na célula

export const linhaPermitidaPosInsercao = (
  tabela: TabelaSudoku,
  linha: number,
  novoValor: number,
) => {
  let quantidadeDeValoresIguais = 0;
  for (let j = 0; j < 9 && quantidadeDeValoresIguais <= 1; j++) {
    const celula = tabela[linha][j];
    if (celula.valor !== null && celula.valor === novoValor) {
      quantidadeDeValoresIguais++;
    }
  }
  return quantidadeDeValoresIguais <= 1;
};

export const colunaPermitidaPosInsercao = (
  tabela: TabelaSudoku,
  coluna: number,
  novoValor: number,
) => {
  let quantidadeDeValoresIguais = 0;
  for (let i = 0; i < 9 && quantidadeDeValoresIguais <= 1; i++) {
    const celula = tabela[i][coluna];
    if (celula.valor !== null && celula.valor === novoValor) {
      quantidadeDeValoresIguais++;
    }
  }
  return quantidadeDeValoresIguais <= 1;
};

export const blocoPermitidoPosInsercao = (
  tabela: TabelaSudoku,
  blocoLinha: number,
  blocoColuna: number,
  novoValor: number,
) => {
  let quantidadeDeValoresIguais = 0;
  for (
    let i = blocoLinha;
    i < blocoLinha + 3 && quantidadeDeValoresIguais <= 1;
    i++
  ) {
    for (
      let j = blocoColuna;
      j < blocoColuna + 3 && quantidadeDeValoresIguais <= 1;
      j++
    ) {
      const celula = tabela[i][j];
      if (celula.valor !== null && celula.valor === novoValor) {
        quantidadeDeValoresIguais++;
      }
    }
  }
  return quantidadeDeValoresIguais <= 1;
};

// //Verificações após inserir o valor na célula

// export const linhaPermitidaInserida = (tabela: TabelaSudoku, linha: number) => {
//   for (let j = 0; j < 9; j++) {
//     const celula = tabela[linha][j];
//     if (celula.valor !== null) {
//       for (let k = 0; k < 9; k++) {
//         if (k !== j && tabela[linha][k].valor === celula.valor) {
//           return false;
//         }
//       }
//     }
//   }
//   return true;
// };

// export const colunaPermitidaInserida = (
//   tabela: TabelaSudoku,
//   coluna: number,
// ) => {
//   for (let i = 0; i < 9; i++) {
//     const celula = tabela[i][coluna];
//     if (celula.valor !== null) {
//       for (let k = 0; k < 9; k++) {
//         if (k !== i && tabela[k][coluna].valor === celula.valor) {
//           return false;
//         }
//       }
//     }
//   }
//   return true;
// };

// export const blocoPermitidoInserido = (
//   tabela: TabelaSudoku,
//   blocoLinha: number,
//   blocoColuna: number,
//   novoValor: number
// ) => {

//   let quantidadeDeValoresIguais = 0;
//   for (let i = blocoLinha; i < blocoLinha + 3 && quantidadeDeValoresIguais <= 1; i++) {
//     for (let j = blocoColuna; j < blocoColuna + 3 && quantidadeDeValoresIguais <= 1; j++) {
//       const celula = tabela[i][j];
//       if (celula.valor !== null && celula.valor === novoValor) {
//         quantidadeDeValoresIguais++;
//       }
//     }
//   }
//   return quantidadeDeValoresIguais <= 1;
// };

export const linhaPermitidaPreInsercao = (
  tabela: TabelaSudoku,
  linha: number,
  coluna: number,
  novoValor: number,
) => {
  for (let j = 0; j < 9; j++) {
    if (j !== coluna && tabela[linha][j].valor === novoValor) {
      return false;
    }
  }
  return true;
};

export const colunaPermitidaPreInsercao = (
  tabela: TabelaSudoku,
  linha: number,
  coluna: number,
  novoValor: number,
) => {
  for (let i = 0; i < 9; i++) {
    if (i !== linha && tabela[i][coluna].valor === novoValor) {
      return false;
    }
  }
  return true;
};

export const blocoPermitidoPreInsercao = (
  tabela: TabelaSudoku,
  linha: number,
  coluna: number,
  novoValor: number,
) => {
  const bloco = verificarQualOBloco(linha, coluna);
  if (bloco) {
    for (let i = bloco.linhaInicial; i <= bloco.linhaFinal; i++) {
      for (let j = bloco.colunaInicial; j <= bloco.colunaFinal; j++) {
        if ((i !== linha || j !== coluna) && tabela[i][j].valor === novoValor) {
          return false;
        }
      }
    }
  } else return false;
  return true;
};

export const copiarTabela = (tabela: TabelaSudoku): TabelaSudoku => {
  return tabela.map((linha) =>
    linha.map((celula) => ({
      ...celula,
      possibilidades: [...celula.possibilidades],
    })),
  );
};

export const verificarCelulaPreInsercao = (
  tabela: TabelaSudoku,
  linha: number,
  coluna: number,
  novoValor: number,
) => {
  const linhaValida = linhaPermitidaPreInsercao(
    tabela,
    linha,
    coluna,
    novoValor,
  );
  const colunaValida = colunaPermitidaPreInsercao(
    tabela,
    linha,
    coluna,
    novoValor,
  );
  const blocoValido = blocoPermitidoPreInsercao(
    tabela,
    linha,
    coluna,
    novoValor,
  );
  return linhaValida && colunaValida && blocoValido;
};

export const ultimaCelulaNaoPreenchida = (tabela: TabelaSudoku) => {
  let encontrada = false;
  let ultimaCelula = null;
  for (let i = 8; i >= 0 && !encontrada; i--) {
    for (let j = 8; j >= 0 && !encontrada; j--) {
      if (tabela[i][j].valor === null) {
        encontrada = true;
        ultimaCelula = {
          linha: i,
          coluna: j,
          valor: null,
          possibilidades: tabela[i][j].possibilidades,
          permitida: tabela[i][j].permitida,
          selecionada: tabela[i][j].selecionada,
        };
      }
    }
  }
  return ultimaCelula;
};

export const verificarTodasCelulasPreenchidas = (tabela: TabelaSudoku) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (tabela[i][j].valor === null) {
        return false;
      }
    }
  }
  return true;
};

export const proximaCelulaNaoPreenchida: (
  tabela: TabelaSudoku,
) => CelulaSudoku | null = (tabela: TabelaSudoku) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (tabela[i][j].valor === null) {
        const celulaCopiada: CelulaSudoku = {
          linha: i,
          coluna: j,
          valor: null,
          permitida: tabela[i][j].permitida,
          selecionada: tabela[i][j].selecionada,
          possibilidades: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        };
        return celulaCopiada;
      }
    }
  }
  return null;
};


export const retornarCelulaAnteriorVisitada = (
  tabela: TabelaSudoku,
  linha: number,
  coluna: number,
  visitados: CelulaSudoku[],
) => {
  // for (let i = visitados.length - 1; i >= 0; i--) {
  //   const celula = visitados[i];
  //   if (celula.linha === linha && celula.coluna === coluna) {
  //     return celula;
  //   }
  // }
  if (visitados.length > 0) {
    const ultimaCelula = visitados.pop()!;
    return ultimaCelula;
  }
  return null;
}