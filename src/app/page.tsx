"use client";
import { useEffect, useState } from "react";
import { Metricas, TabelaSudoku } from "./utils/tipos";
import Tabela from "./components/Tabela/Tabela";
import { preencherTabela } from "./utils/funcoes";

export default function Home() {
  const [sudokuTable, setSudokuTable] = useState<TabelaSudoku | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [metricas, setMetricas] = useState<Metricas | undefined>();
  const [tabelaAnterior, setTabelaAnterior] = useState<
    TabelaSudoku | undefined
  >();
  useEffect(() => {
    preencherTabela(setSudokuTable);
  }, []);

  return (
    <main className="flex flex-col flex-1 justify-center items-center">
      {sudokuTable && (
        <Tabela
          tabela={sudokuTable}
          setTabela={setSudokuTable}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          metricas={metricas}
          setMetricas={setMetricas}
          tabelaAnterior={tabelaAnterior}
          setTabelaAnterior={setTabelaAnterior}
        />
      )}
    </main>
  );
}
