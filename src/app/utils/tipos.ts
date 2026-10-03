export type CelulaSudoku = {
  valor: number | null;
  coluna: number;
  linha: number;
  permitida: boolean;
  selecionada: boolean;
  possibilidades: number[];
};

export type TabelaSudoku = CelulaSudoku[][];

export interface TabelaSudokuProps {
  tabela: TabelaSudoku;
  setTabela: React.Dispatch<React.SetStateAction<TabelaSudoku | undefined>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  metricas?: Metricas;
  setMetricas?: React.Dispatch<React.SetStateAction<Metricas | undefined>>;
}

export interface BotaoTabelaProps {
  celula: CelulaSudoku;
  selecionada?: boolean;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  onFocus?: () => void;
}

export type Metricas = {
  tempoExecucao: number;
  nosExpandidos: number;
  backtracking: number | null;
}

export interface ParametrosMetricas {
  tabela: TabelaSudoku;
  tempoInicial: number;
  tempoFinal: number;
  nosExpandidos: number;
  backtracking?: number | null;
  setMetricas?: React.Dispatch<React.SetStateAction<Metricas | undefined>>;
}