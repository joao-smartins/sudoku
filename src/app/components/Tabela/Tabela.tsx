import { buscaPorProfundidade } from "@/app/utils/buscasCegas";
import { buscaHCEstocastica, buscaHCPrimeiraEscolha, buscaHCRecozimentoSimulado } from "@/app/utils/buscasInformadas";
import { blocoPermitidoPosInsercao, colunaPermitidaPosInsercao, linhaPermitidaPosInsercao, tabelaPossuiCelulaInvalida, totalmentePreenchida, verificarQualOBloco } from "@/app/utils/funcoes";
import { TabelaSudoku, TabelaSudokuProps } from "@/app/utils/tipos";
import {
  carregarModelo,
  SUDOKU_DIFICIL,
  SUDOKU_FACIL,
  SUDOKU_MEDIO,
} from "@/app/utils/modelosSudoku";
import BotaoTabela from "../Botao/BotaoTabela";

const DELAY = 100; // Tempo de atraso em milissegundos

const Tabela = (props: TabelaSudokuProps) => {
  const { tabela, setTabela } = props;

  const semMaisPossibilidades = (linha: number, coluna: number) => {
    const celula = tabela[linha][coluna];
    setTabela((prevTabela) => {
      if (!prevTabela) return undefined;
      const novaTabela = [...prevTabela];
      novaTabela[linha] = [...novaTabela[linha]];
      novaTabela[linha][coluna] = {
        ...novaTabela[linha][coluna],
        permitida: celula.possibilidades.length !== 0,
      };
      return novaTabela;
    })
  }

  const alocaoAnimadaComTimeout = (novaTabela: TabelaSudoku, delay: number, duracao: number = delay) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const indice = i * 9 + j;
        const tempoAtivacao = delay * indice;
        const tempoDesativacao = tempoAtivacao + duracao;

        setTimeout(() => {
          let jaPossuiValor = tabela[i][j].valor === null || tabela[i][j].valor === undefined;
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
  };


  const revalidarCelula = (tabela: TabelaSudoku, linha: number, coluna: number, novoValor: number) => {

    const linhaValida = linhaPermitidaPosInsercao(tabela, linha, novoValor);
    const colunaValida = colunaPermitidaPosInsercao(tabela, coluna, novoValor);
    const blocoUtilizado = verificarQualOBloco(linha, coluna);

    if (!blocoUtilizado) return;
    const blocoValido = blocoPermitidoPosInsercao(
      tabela,
      blocoUtilizado.linhaInicial,
      blocoUtilizado.colunaInicial,
      novoValor
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
  }

  const revalidarTodasCelulas = (tabela: TabelaSudoku) => {
    console.log(tabela)
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const celula = tabela[i][j];
        if (celula.valor !== null && celula.valor !== undefined) {
          revalidarCelula(tabela, i, j, celula.valor);
        }
        // else{
        //   semMaisPossibilidades(i, j);
        // }
      }
    }
  }

  const limparSelecionadas = () => {
    setTabela((prevTabela) => {
      if (!prevTabela) return undefined;
      const novaTabela = prevTabela.map((linha) =>
        linha.map((celula) => ({
          ...celula,
          selecionada: false,
        }))
      );
      return novaTabela;
    });
  }

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
        }))
      );
      return novaTabela;
    });
  }

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
  }

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
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, linha: number, coluna: number) => {
    if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") {
      handleDeletarValorCelula(linha, coluna);
    }
    if (Number.isNaN(Number(e.key))) return;
    const novoValor = Number(e.key);
    if (novoValor < 1 || novoValor > 9) return;
    if(tabela[linha][coluna].valor === novoValor) {
      revalidarTodasCelulas(tabela);
      console.log(tabela)
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
  }

  const verificarTabelaValida = () => {
    if (totalmentePreenchida(tabela)) {
      alert("A tabela já está totalmente preenchida. Não é necessário resolver o Sudoku.");
      return false;
    }
    const tabelaInvalida = tabelaPossuiCelulaInvalida(tabela);
    if (tabelaInvalida) {
      alert("A tabela possui células inválidas. Por favor, corrija-as antes de tentar resolver o Sudoku.");
      return false;
    }
    return true;
  }

  const modoExibicao = (animado: boolean, tabela: TabelaSudoku) => {
    if (animado) {
      alocaoAnimadaComTimeout(tabela, DELAY);
    }
    else {
      setTabela(tabela);
    }
  }

  const handleBuscaProfundidade = () => {
    if (!verificarTabelaValida()) return;
    const tabelaResolvida = buscaPorProfundidade(tabela);
    if (tabelaResolvida) {
      //setTabela(tabelaResolvida);
      modoExibicao(true, tabelaResolvida);
    } else {
      alert("Não foi possível resolver o Sudoku com busca em profundidade.");
    }
  };

  const handleBuscaHCEstocastica = () => {
    if (!verificarTabelaValida()) return;
    const tabelaResolvida = buscaHCEstocastica(tabela);
    if (tabelaResolvida) {
      //setTabela(tabelaResolvida);
      modoExibicao(true, tabelaResolvida);
    } else {
      alert("Não foi possível resolver o Sudoku com busca Hill Climbing.");
    }
  }

  const handleBuscaHCPrimeiraEscolha = () => {
    if (!verificarTabelaValida()) return;
    const tabelaResolvida = buscaHCPrimeiraEscolha(tabela);
    if (tabelaResolvida) {
      //setTabela(tabelaResolvida);
      modoExibicao(true, tabelaResolvida);
    } else {
      alert("Não foi possível resolver o Sudoku com busca Hill Climbing.");
    }
  };

  const handleBuscaHCRecozimentoSimulado = () => {
    if (!verificarTabelaValida()) return;
    const tabelaResolvida = buscaHCRecozimentoSimulado(tabela);
    if (tabelaResolvida) {
      //setTabela(tabelaResolvida);
      modoExibicao(true, tabelaResolvida);
    } else {
      alert("Não foi possível resolver o Sudoku com busca Hill Climbing.");
    }
  }

  const handleCarregarModelo = (modelo: number[][]) => {
    setTabela(carregarModelo(modelo));
  };

  const classeBordaPorQuadrante = (linha: number, coluna: number) => {
    const bordaDireita = (coluna + 1) % 3 === 0 && coluna !== 8 ? "border-r-4" : "";
    const bordaInferior = (linha + 1) % 3 === 0 && linha !== 8 ? "border-b-4" : "";
    return `border border-gray-400 ${bordaDireita} ${bordaInferior}`;
  }

  const classeBotaoGenerico = 'flex-1 py-2 bg-gray-300 hover:bg-gray-600 hover:text-white px-3 rounded';

  return (
    <div>
        <div className="flex flex-col gap-2 max-w-73 sm:max-w-118">
          <div className="flex flex-wrap justify-between gap-2">
            <button className={classeBotaoGenerico} onClick={() => revalidarTodasCelulas(tabela)}>Validar Celulas</button>
            <button className={classeBotaoGenerico} onClick={() => esvaziarTabela()}>Esvaziar Tabela</button>
          </div>
          <div className="flex flex-wrap justify-between gap-2">
            <button className={classeBotaoGenerico} onClick={() => handleCarregarModelo(SUDOKU_FACIL)}>Fácil</button>
            <button className={classeBotaoGenerico} onClick={() => handleCarregarModelo(SUDOKU_MEDIO)}>Médio</button>
            <button className={classeBotaoGenerico} onClick={() => handleCarregarModelo(SUDOKU_DIFICIL)}>Difícil</button>
          </div>
          <div  className="flex flex-wrap justify-between gap-2">
              <button className={classeBotaoGenerico} onClick={() => handleBuscaProfundidade()}>Resolver com Busca DFS</button>
              <button className={classeBotaoGenerico} onClick={() => handleBuscaHCEstocastica()}>Busca HC Estocastica</button>
              <button className={classeBotaoGenerico} onClick={() => handleBuscaHCPrimeiraEscolha()}>Busca HC Primeira Escolha</button>
              <button className={classeBotaoGenerico} onClick={() => handleBuscaHCRecozimentoSimulado()}>Busca HC Recozimento Simulado</button>
          </div>
        </div>
      <br />
      <br />
      <table className="border-collapse border-4 border-gray-400 h-67.5 w-67.5 sm:h-112.5 sm:w-112.5">
        <tbody>
          {tabela.map((linha, i) => (
            <tr key={i}>
              {linha.map((celula, j) => (
                <td key={j} className={classeBordaPorQuadrante(i, j)}>
                  <BotaoTabela celula={celula} onFocus={() => handleClick(i, j)}  onClick={() => handleClick(i, j)} onKeyDown={(e) => handleKeyDown(e, i, j)} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Tabela;