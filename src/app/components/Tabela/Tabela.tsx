import { buscaPorProfundidade } from "@/app/utils/buscasCegas";
import {
  buscaBestFirst,
  buscaHCEstocastica,
  buscaHCPrimeiraEscolha,
  buscaHCRecozimentoSimulado,
} from "@/app/utils/buscasInformadas";
import {
  blocoPermitidoPosInsercao,
  colunaPermitidaPosInsercao,
  linhaPermitidaPosInsercao,
  tabelaPossuiCelulaInvalida,
  totalmentePreenchida,
  verificarQualOBloco,
} from "@/app/utils/funcoes";
import { carregarModelo } from "@/app/utils/modelosSudoku";
import { TabelaSudoku, TabelaSudokuProps } from "@/app/utils/tipos";
import { useRef } from "react";
import BarraConfiguracoes from "../BarraConfiguracoes/BarraConfiguracoes";
import BarraMetricas from "../BarraMetricas/BarraMetricas";
import BotaoTabela from "../BotaoCelula/BotaoCelula";

const DELAY = 50;
const ANIMADO = false;

const Tabela = (props: TabelaSudokuProps) => {
  const {
    tabela,
    setTabela,
    isLoading,
    setIsLoading,
    metricas,
    setMetricas,
    tabelaAnterior,
    setTabelaAnterior,
  } = props;
  const celulasRef = useRef<(HTMLButtonElement | null)[][]>([]);
  const primeiroBotaoRef = useRef<HTMLButtonElement>(null);

  const retornarEstadoAnterior = () => {
    if (!tabelaAnterior) return;
    if (!tabela) return;
    setTabelaAnterior?.(tabela);
    setTabela(tabelaAnterior);
  };

  const limparMetricas = () => {
    setMetricas &&
      setMetricas({
        tempoExecucao: 0,
        nosExpandidos: 0,
        backtracking: null,
      });
  };

  const alocaoAnimadaComTimeout = (
    novaTabela: TabelaSudoku,
    delay: number,
    duracao: number = delay,
  ) => {
    setIsLoading(true);
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const indice = i * 9 + j;
        const tempoAtivacao = delay * indice;
        const tempoDesativacao = tempoAtivacao + duracao;

        setTimeout(() => {
          let jaPossuiValor =
            tabela[i][j].valor === null || tabela[i][j].valor === undefined;
          setTabela((prevTabela) => {
            if (!prevTabela) return undefined;
            const tabelaAtualizada = [...prevTabela];
            tabelaAtualizada[i] = [...tabelaAtualizada[i]];
            tabelaAtualizada[i][j] = {
              ...novaTabela[i][j],
              valor: novaTabela[i][j].valor,
              selecionada: jaPossuiValor,
            };
            return tabelaAtualizada;
          });
        }, tempoAtivacao);

        setTimeout(() => {
          setTabela((prevTabela) => {
            if (!prevTabela) return undefined;
            const tabelaAtualizada = [...prevTabela];
            tabelaAtualizada[i] = [...tabelaAtualizada[i]];
            tabelaAtualizada[i][j] = {
              ...novaTabela[i][j],
              valor: novaTabela[i][j].valor,
              selecionada: false,
            };
            return tabelaAtualizada;
          });
        }, tempoDesativacao);
      }
    }
    setTimeout(
      () => {
        setIsLoading(false);
      },
      delay * 81 + duracao,
    );
  };

  const revalidarCelula = (
    tabela: TabelaSudoku,
    linha: number,
    coluna: number,
    novoValor: number,
  ) => {
    const linhaValida = linhaPermitidaPosInsercao(tabela, linha, novoValor);
    const colunaValida = colunaPermitidaPosInsercao(tabela, coluna, novoValor);
    const blocoUtilizado = verificarQualOBloco(linha, coluna);

    if (!blocoUtilizado) return;
    const blocoValido = blocoPermitidoPosInsercao(
      tabela,
      blocoUtilizado.linhaInicial,
      blocoUtilizado.colunaInicial,
      novoValor,
    );

    setTabela((prevTabela) => {
      if (!prevTabela) return undefined;
      const novaTabela = [...prevTabela];
      novaTabela[linha] = [...novaTabela[linha]];
      novaTabela[linha][coluna] = {
        ...novaTabela[linha][coluna],
        permitida: linhaValida && colunaValida && blocoValido,
      };
      return novaTabela;
    });
  };

  const revalidarTodasCelulas = (tabela: TabelaSudoku) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const celula = tabela[i][j];
        if (celula.valor !== null && celula.valor !== undefined) {
          revalidarCelula(tabela, i, j, celula.valor);
        }
      }
    }
  };

  const limparSelecionadas = () => {
    setTabela((prevTabela) => {
      if (!prevTabela) return undefined;
      const novaTabela = prevTabela.map((linha) =>
        linha.map((celula) => ({
          ...celula,
          selecionada: false,
        })),
      );
      return novaTabela;
    });
  };

  const esvaziarTabela = () => {
    setTabela((prevTabela) => {
      if (!prevTabela) return undefined;
      const novaTabela = prevTabela.map((linha) =>
        linha.map((celula) => ({
          ...celula,
          valor: null,
          permitida: true,
          selecionada: false,
          possibilidades: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        })),
      );
      return novaTabela;
    });
  };

  const handleClick = (linha: number, coluna: number) => {
    limparSelecionadas();
    setTabela((prevTabela) => {
      if (!prevTabela) return undefined;
      const novaTabela = [...prevTabela];
      novaTabela[linha] = [...novaTabela[linha]];
      novaTabela[linha][coluna] = {
        ...novaTabela[linha][coluna],
        selecionada: !novaTabela[linha][coluna].selecionada,
      };
      return novaTabela;
    });
  };

  const handleDeletarValorCelula = (linha: number, coluna: number) => {
    setTabela((prevTabela) => {
      if (!prevTabela) return undefined;
      const novaTabela = [...prevTabela];
      novaTabela[linha] = [...novaTabela[linha]];
      novaTabela[linha][coluna] = {
        ...novaTabela[linha][coluna],
        valor: null,
        permitida: true,
      };
      revalidarTodasCelulas(novaTabela);
      return novaTabela;
    });
  };

  const handleMoverSeta = (direcao: string, linha: number, coluna: number) => {
    let novaLinha = linha;
    let novaColuna = coluna;
    switch (direcao) {
      case "ArrowUp":
        novaLinha = linha === 0 ? linha : linha - 1;
        break;
      case "ArrowDown":
        novaLinha = linha === 8 ? linha : linha + 1;
        break;
      case "ArrowLeft":
        novaColuna = coluna === 0 ? coluna : coluna - 1;
        break;
      case "ArrowRight":
        novaColuna = coluna === 8 ? coluna : coluna + 1;
        break;
    }
    // O foco dispara o onFocus do botão, que já seleciona a célula via handleClick.
    celulasRef.current[novaLinha]?.[novaColuna]?.focus();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    linha: number,
    coluna: number,
  ) => {
    if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") {
      handleDeletarValorCelula(linha, coluna);
      return;
    }
    if (
      e.key == "ArrowUp" ||
      e.key == "ArrowDown" ||
      e.key == "ArrowLeft" ||
      e.key == "ArrowRight"
    ) {
      handleMoverSeta(e.key, linha, coluna);
      return;
    }

    if (e.key === "Escape") {
      limparSelecionadas();
      (document.activeElement as HTMLElement)?.blur();
      document.getElementById("primeiro")?.focus();
      primeiroBotaoRef.current?.focus();
      return;
    }

    if (Number.isNaN(Number(e.key))) return;
    const novoValor = Number(e.key);
    if (novoValor < 1 || novoValor > 9) return;
    if (tabela[linha][coluna].valor === novoValor) {
      revalidarTodasCelulas(tabela);
      return;
    }

    setTabela((prevTabela) => {
      if (!prevTabela) return undefined;
      const novaTabela = [...prevTabela];
      novaTabela[linha] = [...novaTabela[linha]];
      novaTabela[linha][coluna] = {
        ...novaTabela[linha][coluna],
        valor: novoValor,
      };
      revalidarTodasCelulas(novaTabela);
      return novaTabela;
    });
  };

  const verificarTabelaValida = () => {
    if (isLoading) {
      alert(
        "Aguarde a conclusão da resolução atual antes de iniciar uma nova.",
      );
    }
    if (totalmentePreenchida(tabela)) {
      alert(
        "A tabela já está totalmente preenchida. Não é necessário resolver o Sudoku.",
      );
      return false;
    }
    const tabelaInvalida = tabelaPossuiCelulaInvalida(tabela);
    if (tabelaInvalida) {
      alert(
        "A tabela possui células inválidas. Por favor, corrija-as antes de tentar resolver o Sudoku.",
      );
      return false;
    }
    return true;
  };

  const modoExibicao = (tabela: TabelaSudoku) => {
    if (ANIMADO) {
      alocaoAnimadaComTimeout(tabela, DELAY);
    } else {
      setTabela(tabela);
    }
  };

  const handleBuscaProfundidade = () => {
    if (!verificarTabelaValida()) return;
    const tabelaResolvida = buscaPorProfundidade(tabela, setMetricas);
    if (tabelaResolvida) {
      modoExibicao(tabelaResolvida);
    } else {
      alert("Não foi possível resolver o Sudoku com busca em profundidade.");
    }
  };

  const handleBuscaHCEstocastica = () => {
    if (!verificarTabelaValida()) return;
    const tabelaResolvida = buscaHCEstocastica(tabela, setMetricas);
    if (tabelaResolvida) {
      modoExibicao(tabelaResolvida);
    } else {
      alert("Não foi possível resolver o Sudoku com busca Hill Climbing.");
    }
  };

  const handleBuscaHCPrimeiraEscolha = () => {
    if (!verificarTabelaValida()) return;
    const tabelaResolvida = buscaHCPrimeiraEscolha(tabela, setMetricas);
    if (tabelaResolvida) {
      modoExibicao(tabelaResolvida);
    } else {
      alert("Não foi possível resolver o Sudoku com busca Hill Climbing.");
    }
  };

  const handleBuscaHCRecozimentoSimulado = () => {
    if (!verificarTabelaValida()) return;
    const tabelaResolvida = buscaHCRecozimentoSimulado(tabela, setMetricas);
    if (tabelaResolvida) {
      modoExibicao(tabelaResolvida);
    } else {
      alert("Não foi possível resolver o Sudoku com busca Hill Climbing.");
    }
  };

  const handleBuscaBestFirst = () => {
    if (!verificarTabelaValida()) return;
    const tabelaResolvida = buscaBestFirst(tabela, setMetricas);
    if (tabelaResolvida) {
      modoExibicao(tabelaResolvida);
    } else {
      alert("Não foi possível resolver o Sudoku com busca Best First.");
    }
  };

  const handleCarregarModelo = (modelo: number[][]) => {
    setTabela(carregarModelo(modelo));
  };

  const classeBordaPorQuadrante = (linha: number, coluna: number) => {
    const bordaDireita =
      (coluna + 1) % 3 === 0 && coluna !== 8 ? "border-r-4" : "";
    const bordaInferior =
      (linha + 1) % 3 === 0 && linha !== 8 ? "border-b-4" : "";
    return `border border-gray-400 ${bordaDireita} ${bordaInferior}`;
  };

  return (
    <div id="tabela-container" className="flex flex-col">
      <BarraConfiguracoes
        tabela={tabela}
        isLoading={isLoading}
        esvaziarTabela={esvaziarTabela}
        revalidarTodasCelulas={revalidarTodasCelulas}
        handleCarregarModelo={handleCarregarModelo}
        handleBuscaProfundidade={handleBuscaProfundidade}
        handleBuscaHCEstocastica={handleBuscaHCEstocastica}
        handleBuscaHCPrimeiraEscolha={handleBuscaHCPrimeiraEscolha}
        handleBuscaHCRecozimentoSimulado={handleBuscaHCRecozimentoSimulado}
        handleBuscaBestFirst={handleBuscaBestFirst}
        limparMetricas={limparMetricas}
        primeiroBotaoRef={primeiroBotaoRef}
        setTabelaAnterior={setTabelaAnterior}
        retornarEstadoAnterior={retornarEstadoAnterior}
      />
      <br />
      <div className="flex flex-row gap-4">
        <table
          id="tabela"
          className="border-collapse border-4 border-gray-400  w-[16.875rem] h-[16.875rem] lg:w-[22.5rem] lg:h-[22.5rem]"
        >
          <tbody>
            {tabela.map((linha, i) => (
              <tr key={i}>
                {linha.map((celula, j) => (
                  <td key={j} className={classeBordaPorQuadrante(i, j)}>
                    <BotaoTabela
                      ref={(el) => {
                        (celulasRef.current[i] ??= [])[j] = el;
                      }}
                      alt={`linha ${i}, coluna ${j}`}
                      celula={celula}
                      onFocus={() => handleClick(i, j)}
                      onClick={() => handleClick(i, j)}
                      onKeyDown={(e) => handleKeyDown(e, i, j)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <BarraMetricas metricas={metricas} tabela={tabela} />
      </div>
    </div>
  );
};
export default Tabela;
