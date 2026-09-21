"use client"
import { useEffect, useState } from "react";
import { TabelaSudoku } from "./utils/tipos";
import Tabela from "./components/Tabela/Tabela";
import { preencherTabela } from "./utils/funcoes";

export default function Home() {
  const [sudokuTable, setSudokuTable] = useState<TabelaSudoku | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    preencherTabela(setSudokuTable);
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      {sudokuTable && <Tabela tabela={sudokuTable} setTabela={setSudokuTable} isLoading={isLoading} setIsLoading={setIsLoading} />}
    </div>
  );
}
