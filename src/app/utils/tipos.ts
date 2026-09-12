export type CelulaSudoku = {
  valor: number | null;
  coluna: number;
  linha: number;
  permitida: boolean;
};

export type TabelaSudoku = CelulaSudoku[][];

export interface TabelaSudokuProps {
  tabela: TabelaSudoku;
}
