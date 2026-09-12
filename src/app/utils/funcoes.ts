import { Dispatch, SetStateAction } from "react";
import { TabelaSudoku } from "./tipos";

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
      };
    }
  }
  console.log("Tabela preenchida:", novaTabela);
  setTabela(novaTabela);
};

export const linhaPermitida = (tabela: TabelaSudoku, linha: number) => {
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
}


export const colunaPermitida = (tabela: TabelaSudoku, coluna: number) => {
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
}