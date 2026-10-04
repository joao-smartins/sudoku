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
  ref?: React.Ref<HTMLButtonElement>;
  alt?: string;
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

export type BarraMetricasProps = {
  metricas?: Metricas;
  tabela: TabelaSudoku;
};


export interface BarraConfiguracoesProps {
  tabela: TabelaSudoku;
  isLoading: boolean;
  esvaziarTabela: () => void;
  revalidarTodasCelulas: (tabela: TabelaSudoku) => void;
  handleCarregarModelo: (modelo: number[][]) => void;
  handleBuscaProfundidade: () => void;
  handleBuscaHCEstocastica: () => void;
  handleBuscaHCPrimeiraEscolha: () => void;
  handleBuscaHCRecozimentoSimulado: () => void;
  handleBuscaBestFirst: () => void;
  limparMetricas?: () => void;
  primeiroBotaoRef?: React.Ref<HTMLButtonElement>;
}