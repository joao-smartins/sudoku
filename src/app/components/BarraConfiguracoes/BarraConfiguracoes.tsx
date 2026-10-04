"use client";

import React from "react";
import { totalmentePreenchida, validarSeHaSolucao } from "@/app/utils/funcoes";
import {
  SUDOKU_DIFICIL,
  SUDOKU_FACIL,
  SUDOKU_MEDIO,
} from "@/app/utils/modelosSudoku";
import { BarraConfiguracoesProps } from "@/app/utils/tipos";
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CornerTopLeftIcon,
  KeyboardIcon,
  LightningBoltIcon,
  MagicWandIcon,
  MixerHorizontalIcon,
  PlayIcon,
  QuestionMarkCircledIcon,
  ResetIcon,
  SunIcon,
  TargetIcon,
  TrashIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import {
  DropdownContent,
  DropdownItem,
  DropdownRoot,
  DropdownSeparator,
  DropdownTrigger,
} from "../ui/Dropdown/Dropdown";
import AppTooltip from "../ui/Tooltip/Tooltip";
import { useToast } from "../ui/Toast/ToastProvider";

const BarraConfiguracoes = ({
  tabela,
  isLoading,
  esvaziarTabela,
  revalidarTodasCelulas,
  handleCarregarModelo,
  handleBuscaProfundidade,
  handleBuscaHCEstocastica,
  handleBuscaHCPrimeiraEscolha,
  handleBuscaHCRecozimentoSimulado,
  handleBuscaBestFirst,
  limparMetricas,
  primeiroBotaoRef,
  setTabelaAnterior,
  retornarEstadoAnterior,
}: BarraConfiguracoesProps) => {
  const { toast } = useToast();

  const verificarBloqueio = (
    limpar: boolean = true,
    validarSolucao: boolean = true,
  ) => {
    if (limpar && limparMetricas) {
      limparMetricas();
    }
    if (isLoading) {
      toast.warning(
        "Aguarde a conclusão da resolução atual antes de iniciar uma nova.",
        "Processamento em andamento",
      );
      return true;
    }
    if (
      validarSolucao &&
      !totalmentePreenchida(tabela) &&
      !validarSeHaSolucao(tabela)
    ) {
      toast.error(
        "A tabela não possui solução. Por favor, altere o estado inicial.",
        "Sem Solução",
      );
      return true;
    }
    setTabelaAnterior?.([...tabela]);
    return false;
  };

  const onEsvaziar = () => {
    if (verificarBloqueio(true, false)) return;
    esvaziarTabela();
    toast.info("Todas as células foram limpas.", "Tabela Esvaziada");
  };

  const onValidar = () => {
    if (verificarBloqueio(true, false)) return;
    revalidarTodasCelulas(tabela);
    toast.info("Linhas, colunas e quadrantes foram revalidados.", "Células Validadas");
  };

  const onRetornar = () => {
    if (verificarBloqueio(true, false)) return;
    retornarEstadoAnterior?.();
    toast.info("O tabuleiro retornou ao estado imediatamente anterior.", "Desfazer");
  };

  const onCarregar = (modelo: number[][], nomeDificuldade: string) => {
    if (verificarBloqueio(true,false)) return;
    handleCarregarModelo(modelo);
    toast.success(`Tabuleiro ${nomeDificuldade} carregado com sucesso!`, "Novo Jogo");
  };

  return (
    <div
      id="configurações"
      className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 p-2 rounded-xl bg-white dark:bg-slate-900 border-2 border-[#b9d7f3] dark:border-slate-800 shadow-sm"
    >
      {/* 1. DROPDOWN DE AÇÕES */}
      <DropdownRoot>
        <AppTooltip content="Gerenciamento, validação e histórico do tabuleiro">
          <DropdownTrigger
            id="primeiro"
            ref={primeiroBotaoRef}
            label="Ações da Tabela"
            icon={<MixerHorizontalIcon className="w-4 h-4 text-[#1e5fa8] dark:text-[#8cb8e4]" />}
          />
        </AppTooltip>
        <DropdownContent align="start">
          <AppTooltip content="Limpa todos os números preenchidos na grade" side="right">
            <div>
              <DropdownItem
                onClick={onEsvaziar}
                icon={<TrashIcon className="w-4 h-4" />}
              >
                Esvaziar Tabela
              </DropdownItem>
            </div>
          </AppTooltip>

          <AppTooltip content="Verifica se há conflitos nas linhas, colunas e quadrantes 3x3" side="right">
            <div>
              <DropdownItem
                onClick={onValidar}
                icon={<CheckCircledIcon className="w-4 h-4" />}
              >
                Validar Células
              </DropdownItem>
            </div>
          </AppTooltip>

          <DropdownSeparator />

          <AppTooltip content="Desfaz a última alteração e restaura a grade anterior" side="right">
            <div>
              <DropdownItem
                onClick={onRetornar}
                icon={<ResetIcon className="w-4 h-4" />}
              >
                Retornar Estado Anterior
              </DropdownItem>
            </div>
          </AppTooltip>
        </DropdownContent>
      </DropdownRoot>

      {/* 2. DROPDOWN DE DIFICULDADE */}
      <DropdownRoot>
        <AppTooltip content="Carregar tabuleiros pré-configurados por nível">
          <DropdownTrigger
            label="Dificuldade"
            icon={<PlayIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
          />
        </AppTooltip>
        <DropdownContent align="start">
          <AppTooltip content="Tabuleiro fácil com maior quantidade de pistas iniciais" side="right">
            <div>
              <DropdownItem
                onClick={() => onCarregar(SUDOKU_FACIL, "Fácil")}
                badge="Iniciante"
                icon={<span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />}
              >
                Fácil
              </DropdownItem>
            </div>
          </AppTooltip>

          <AppTooltip content="Tabuleiro balanceado com dificuldade intermediária" side="right">
            <div>
              <DropdownItem
                onClick={() => onCarregar(SUDOKU_MEDIO, "Médio")}
                badge="Médio"
                icon={<span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />}
              >
                Médio
              </DropdownItem>
            </div>
          </AppTooltip>

          <AppTooltip content="Tabuleiro com menos números iniciais para maior desafio" side="right">
            <div>
              <DropdownItem
                onClick={() => onCarregar(SUDOKU_DIFICIL, "Difícil")}
                badge="Avançado"
                icon={<span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />}
              >
                Difícil
              </DropdownItem>
            </div>
          </AppTooltip>
        </DropdownContent>
      </DropdownRoot>

      {/* 3. DROPDOWN DE ALGORITMOS */}
      <DropdownRoot>
        <AppTooltip content="Selecione um algoritmo de IA para resolver o tabuleiro">
          <DropdownTrigger
            label="Resolver com IA"
            className="border-[#a2c8ef] dark:border-blue-500/50 bg-[#d4e5f6] dark:bg-blue-950/40 text-[#0c2a4d] dark:text-blue-300 font-semibold hover:bg-[#b9d7f3] dark:hover:bg-blue-900/50"
            icon={<LightningBoltIcon className="w-4 h-4 text-[#1e5fa8] dark:text-blue-400" />}
          />
        </AppTooltip>
        <DropdownContent align="start" className="min-w-[260px]">
          <div className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#4a7aa8] dark:text-slate-400">
            Busca Cega
          </div>

          <AppTooltip content="Algoritmo de busca em profundidade com backtracking sistemático" side="right">
            <div>
              <DropdownItem
                onClick={() => !verificarBloqueio() && handleBuscaProfundidade()}
                badge="DFS"
                icon={<ResetIcon className="w-4 h-4 text-indigo-500" />}
              >
                Busca DFS (Profundidade)
              </DropdownItem>
            </div>
          </AppTooltip>

          <DropdownSeparator />

          <div className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#4a7aa8] dark:text-slate-400">
            Busca Local (Hill Climbing)
          </div>

          <AppTooltip content="Hill Climbing que escolhe aleatoriamente entre vizinhos de melhor pontuação" side="right">
            <div>
              <DropdownItem
                onClick={() => !verificarBloqueio() && handleBuscaHCEstocastica()}
                icon={<MagicWandIcon className="w-4 h-4 text-purple-500" />}
              >
                HC Estocástica
              </DropdownItem>
            </div>
          </AppTooltip>

          <AppTooltip content="Hill Climbing que aceita o primeiro vizinho gerado que apresentar melhora" side="right">
            <div>
              <DropdownItem
                onClick={() => !verificarBloqueio() && handleBuscaHCPrimeiraEscolha()}
                icon={<UpdateIcon className="w-4 h-4 text-amber-500" />}
              >
                HC Primeira Escolha
              </DropdownItem>
            </div>
          </AppTooltip>

          <AppTooltip content="Probabilidade de aceitar estados piores para escapar de mínimos locais" side="right">
            <div>
              <DropdownItem
                onClick={() => !verificarBloqueio() && handleBuscaHCRecozimentoSimulado()}
                icon={<SunIcon className="w-4 h-4 text-orange-500" />}
              >
                HC Recozimento Simulado
              </DropdownItem>
            </div>
          </AppTooltip>

          <DropdownSeparator />

          <div className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#4a7aa8] dark:text-slate-400">
            Busca Informada (Heurística)
          </div>

          <AppTooltip content="Expande sempre o estado mais promissor avaliado pela função heurística" side="right">
            <div>
              <DropdownItem
                onClick={() => !verificarBloqueio() && handleBuscaBestFirst()}
                badge="Best First"
                icon={<TargetIcon className="w-4 h-4 text-emerald-500" />}
              >
                Busca Best First
              </DropdownItem>
            </div>
          </AppTooltip>
        </DropdownContent>
      </DropdownRoot>

      {/* 4. DROPDOWN DE AJUDA / CONTROLES */}
      <DropdownRoot>
        <AppTooltip content="Atalhos e controles do jogo">
          <DropdownTrigger
            label=""
            aria-label="Atalhos e controles do jogo"
            className="px-2.5 py-2 text-[#1e5fa8] dark:text-slate-300 hover:bg-[#d4e5f6] dark:hover:bg-slate-800"
            icon={<QuestionMarkCircledIcon className="w-4 h-4" />}
          />
        </AppTooltip>
        <DropdownContent align="start" className="min-w-[220px] p-2">
          <div className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-[#1e5fa8] dark:text-[#8cb8e4] border-b border-[#d4e5f6] dark:border-slate-800 pb-1.5 mb-1">
            <KeyboardIcon className="w-3.5 h-3.5 text-[#1e5fa8] dark:text-[#8cb8e4]" />
            Controles do Jogo
          </div>

          <div className="flex flex-col gap-1 text-xs text-[#1e3a5f] dark:text-slate-200">
            <div className="flex items-center justify-between px-2 py-1 rounded bg-[#f0f6fc] dark:bg-slate-800/60">
              <span className="flex items-center gap-2">
                <ArrowUpIcon className="w-3.5 h-3.5 text-[#4a7aa8] dark:text-slate-400" />
                <span>Cima</span>
              </span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-[#d4e5f6] dark:bg-slate-700 rounded text-[#0c2a4d] dark:text-slate-200">↑</kbd>
            </div>

            <div className="flex items-center justify-between px-2 py-1 rounded bg-[#f0f6fc] dark:bg-slate-800/60">
              <span className="flex items-center gap-2">
                <ArrowDownIcon className="w-3.5 h-3.5 text-[#4a7aa8] dark:text-slate-400" />
                <span>Baixo</span>
              </span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-[#d4e5f6] dark:bg-slate-700 rounded text-[#0c2a4d] dark:text-slate-200">↓</kbd>
            </div>

            <div className="flex items-center justify-between px-2 py-1 rounded bg-[#f0f6fc] dark:bg-slate-800/60">
              <span className="flex items-center gap-2">
                <ArrowLeftIcon className="w-3.5 h-3.5 text-[#4a7aa8] dark:text-slate-400" />
                <span>Esquerda</span>
              </span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-[#d4e5f6] dark:bg-slate-700 rounded text-[#0c2a4d] dark:text-slate-200">←</kbd>
            </div>

            <div className="flex items-center justify-between px-2 py-1 rounded bg-[#f0f6fc] dark:bg-slate-800/60">
              <span className="flex items-center gap-2">
                <ArrowRightIcon className="w-3.5 h-3.5 text-[#4a7aa8] dark:text-slate-400" />
                <span>Direita</span>
              </span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-[#d4e5f6] dark:bg-slate-700 rounded text-[#0c2a4d] dark:text-slate-200">→</kbd>
            </div>

            <div className="flex items-center justify-between px-2 py-1 rounded bg-[#f0f6fc] dark:bg-slate-800/60">
              <span className="flex items-center gap-2">
                <KeyboardIcon className="w-3.5 h-3.5 text-[#4a7aa8] dark:text-slate-400" />
                <span>Digitar número</span>
              </span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-[#d4e5f6] dark:bg-slate-700 rounded text-[#0c2a4d] dark:text-slate-200">1 - 9</kbd>
            </div>

            <div className="flex items-center justify-between px-2 py-1 rounded bg-[#f0f6fc] dark:bg-slate-800/60">
              <span className="flex items-center gap-2">
                <TrashIcon className="w-3.5 h-3.5 text-[#4a7aa8] dark:text-slate-400" />
                <span>Apagar valor</span>
              </span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-[#d4e5f6] dark:bg-slate-700 rounded text-[#0c2a4d] dark:text-slate-200">Backspace / Del</kbd>
            </div>

            <div className="flex items-center justify-between px-2 py-1 rounded bg-[#f0f6fc] dark:bg-slate-800/60">
              <span className="flex items-center gap-2">
                <CornerTopLeftIcon className="w-3.5 h-3.5 text-[#4a7aa8] dark:text-slate-400" />
                <span>Sair da célula</span>
              </span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-[#d4e5f6] dark:bg-slate-700 rounded text-[#0c2a4d] dark:text-slate-200">Esc</kbd>
            </div>
          </div>
        </DropdownContent>
      </DropdownRoot>
    </div>
  );
};

export default BarraConfiguracoes;
