"use client";

import React from "react";
import { totalmentePreenchida } from "@/app/utils/funcoes";
import { BarraMetricasProps } from "@/app/utils/tipos";
import {
  BarChartIcon,
  CheckCircledIcon,
  ClockIcon,
  ResetIcon,
  StackIcon,
} from "@radix-ui/react-icons";
import AppTooltip from "../ui/Tooltip/Tooltip";

const BarraMetricas = (props: BarraMetricasProps) => {
  const { metricas, tabela } = props;
  const isCompleta = totalmentePreenchida(tabela);

  return (
    <div
      id="métricas"
      className="flex flex-col gap-2.5 p-3.5 rounded-xl border border-[#c5ddf5] dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm w-full sm:w-64 min-w-[200px]"
    >
      <div className="flex items-center justify-between pb-2 border-b border-[#d4e5f6] dark:border-slate-800">
        <span className="text-xs font-bold uppercase tracking-wider text-[#1e5fa8] dark:text-[#8cb8e4] flex items-center gap-1.5">
          <BarChartIcon className="w-3.5 h-3.5 text-[#1e5fa8] dark:text-[#8cb8e4]" />
          Métricas da Busca
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {/* 1. Tempo de execução */}
        <AppTooltip
          content="Tempo total decorrido (em milissegundos) para encontrar a solução"
          side="left"
        >
          <div className="flex items-center justify-between p-2 rounded-lg bg-[#f0f6fc] dark:bg-slate-800/60 hover:bg-[#d4e5f6]/40 dark:hover:bg-slate-800 transition-colors cursor-help border border-[#d4e5f6] dark:border-slate-700/60">
            <div className="flex items-center gap-2 text-[#1e3a5f] dark:text-slate-300">
              <ClockIcon className="w-4 h-4 text-[#1e5fa8] dark:text-[#7fb2e6] flex-shrink-0" />
              <span className="text-xs font-medium">Tempo:</span>
            </div>
            <span className="text-xs font-semibold font-mono text-[#0c2a4d] dark:text-slate-100">
              {metricas?.tempoExecucao !== undefined
                ? `${metricas.tempoExecucao.toFixed(2)} ms`
                : "0.00 ms"}
            </span>
          </div>
        </AppTooltip>

        {/* 2. Nós expandidos */}
        <AppTooltip
          content="Quantidade total de estados/nós gerados e avaliados na árvore ou grafo de busca"
          side="left"
        >
          <div className="flex items-center justify-between p-2 rounded-lg bg-[#f0f6fc] dark:bg-slate-800/60 hover:bg-[#d4e5f6]/40 dark:hover:bg-slate-800 transition-colors cursor-help border border-[#d4e5f6] dark:border-slate-700/60">
            <div className="flex items-center gap-2 text-[#1e3a5f] dark:text-slate-300">
              <StackIcon className="w-4 h-4 text-[#7c3aed] flex-shrink-0" />
              <span className="text-xs font-medium">Nós expandidos:</span>
            </div>
            <span className="text-xs font-semibold font-mono text-[#0c2a4d] dark:text-slate-100">
              {metricas?.nosExpandidos ?? 0}
            </span>
          </div>
        </AppTooltip>

        {/* 3. Backtracking */}
        <AppTooltip
          content="Quantidade de retrocessos realizados pelo algoritmo quando encontrou caminhos sem saída"
          side="left"
        >
          <div className="flex items-center justify-between p-2 rounded-lg bg-[#f0f6fc] dark:bg-slate-800/60 hover:bg-[#d4e5f6]/40 dark:hover:bg-slate-800 transition-colors cursor-help border border-[#d4e5f6] dark:border-slate-700/60">
            <div className="flex items-center gap-2 text-[#1e3a5f] dark:text-slate-300">
              <ResetIcon className="w-4 h-4 text-[#d97706] flex-shrink-0" />
              <span className="text-xs font-medium">Backtracking:</span>
            </div>
            <span className="text-xs font-semibold font-mono text-[#0c2a4d] dark:text-slate-100">
              {metricas?.backtracking ? metricas.backtracking : "Não"}
            </span>
          </div>
        </AppTooltip>

        {/* 4. Tabela completa */}
        <AppTooltip
          content="Indica se todas as 81 células do Sudoku estão preenchidas de forma válida"
          side="left"
        >
          <div className="flex items-center justify-between p-2 rounded-lg bg-[#f0f6fc] dark:bg-slate-800/60 hover:bg-[#d4e5f6]/40 dark:hover:bg-slate-800 transition-colors cursor-help border border-[#d4e5f6] dark:border-slate-700/60">
            <div className="flex items-center gap-2 text-[#1e3a5f] dark:text-slate-300">
              <CheckCircledIcon className="w-4 h-4 text-[#059669] flex-shrink-0" />
              <span className="text-xs font-medium">Tabela completa:</span>
            </div>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                isCompleta
                  ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300"
                  : "bg-[#d4e5f6] dark:bg-slate-700 text-[#133763] dark:text-slate-300"
              }`}
            >
              {isCompleta ? "Sim" : "Não"}
            </span>
          </div>
        </AppTooltip>
      </div>
    </div>
  );
};

export default BarraMetricas;
