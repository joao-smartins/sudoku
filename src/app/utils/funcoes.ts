import { Dispatch, SetStateAction } from "react";
import { TabelaSudoku } from "./tipos";

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

export const linhaPermitida = (
  tabela: TabelaSudoku,
  linha: number,
  novoValor: number,
) => {
  for (let j = 0; j < 9; j++) {
    const celula = tabela[linha][j];
    if (celula.valor !== null && celula.valor === novoValor) {
      return false;
    }
  }
  return true;
};

export const colunaPermitida = (
  tabela: TabelaSudoku,
  coluna: number,
  novoValor: number,
) => {
  for (let i = 0; i < 9; i++) {
    const celula = tabela[i][coluna];
    if (celula.valor !== null && celula.valor === novoValor) {
      return false;
    }
  }
  return true;
};

export const blocoPermitido = (
  tabela: TabelaSudoku,
  celulaInicial: number,
  celulaFinal: number,
  novoValor: number,
) => {
  for (let i = celulaInicial; i < celulaFinal; i++) {
    for (let j = celulaInicial; j < celulaFinal; j++) {
      const celula = tabela[i][j];
      if (celula.valor !== null && celula.valor === novoValor) {
        return false;
      }
    }
  }
  return true;
};

//Verificações após inserir o valor na célula

export const linhaPermitidaInserida = (tabela: TabelaSudoku, linha: number) => {
  for (let j = 0; j < 9; j++) {
    const celula = tabela[linha][j];
    if (celula.valor !== null) {
      for (let k = 0; k < 9; k++) {
        if (k !== j && tabela[linha][k].valor === celula.valor) {
          return false;
        }
      }
    }
  }
  return true;
};

export const colunaPermitidaInserida = (
  tabela: TabelaSudoku,
  coluna: number,
) => {
  for (let i = 0; i < 9; i++) {
    const celula = tabela[i][coluna];
    if (celula.valor !== null) {
      for (let k = 0; k < 9; k++) {
        if (k !== i && tabela[k][coluna].valor === celula.valor) {
          return false;
        }
      }
    }
  }
  return true;
};

export const blocoPermitidoInserido = (
  tabela: TabelaSudoku,
  blocoLinha: number,
  blocoColuna: number,
  novoValor: number
) => {

  let quantidadeDeValoresIguais = 0;
  for (let i = blocoLinha; i < blocoLinha + 3 && quantidadeDeValoresIguais <= 1; i++) {
    for (let j = blocoColuna; j < blocoColuna + 3 && quantidadeDeValoresIguais <= 1; j++) {
      const celula = tabela[i][j];
      if (celula.valor !== null && celula.valor === novoValor) {
        quantidadeDeValoresIguais++;
      }
    }
  }
  return quantidadeDeValoresIguais <= 1; 
};