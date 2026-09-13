export type CelulaSudoku = {
  valor: number | null;
  coluna: number;
  linha: number;
  permitida: boolean;
  selecionada: boolean;
};

export type TabelaSudoku = CelulaSudoku[][];

export interface TabelaSudokuProps {
  tabela: TabelaSudoku;
}

export interface BotaoTabelaProps {
  children?: React.ReactNode;
  selecionada?: boolean;
}