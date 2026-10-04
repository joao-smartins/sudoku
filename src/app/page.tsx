"use client";
import { useEffect, useState } from "react";
import { Metricas, TabelaSudoku } from "./utils/tipos";
import Tabela from "./components/Tabela/Tabela";
import { preencherTabela } from "./utils/funcoes";
import ThemeToggle from "./components/ui/ThemeToggle/ThemeToggle";

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
    <main className="relative min-h-screen flex flex-col justify-center items-center p-4">
      <div className="fixed top-4 right-4 z-40">
        <ThemeToggle />
      </div>

      <section className="flex flex-col flex-1 justify-center items-center w-full">
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
      </section>
    </main>
  );
}
