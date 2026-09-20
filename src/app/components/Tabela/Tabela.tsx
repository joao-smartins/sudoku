import { blocoPermitidoPosInsercao, colunaPermitidaPosInsercao, linhaPermitidaPosInsercao, verificarQualOBloco } from "@/app/utils/funcoes";
import { TabelaSudoku, TabelaSudokuProps } from "@/app/utils/tipos";
import BotaoTabela from "./BotaoTabela";
import { buscaPorProfundidade } from "@/app/utils/buscasCegas";

const Tabela = (props: TabelaSudokuProps) => {
  const { tabela, setTabela } = props;

  // const validarCelula = (tebelaAtualizada: TabelaSudoku, linha: number, coluna: number, novoValor: number) => {
  //   const linhaValida = linhaPermitidaInserida(tebelaAtualizada, linha);
  //   const colunaValida = colunaPermitidaInserida(tebelaAtualizada, coluna);
  //   const blocoUtilizado = verificarQualOBloco(linha, coluna);

  //   if (!blocoUtilizado) return;
  //   const blocoValido = blocoPermitidoInserido(
  //     tebelaAtualizada,
  //     blocoUtilizado.linhaInicial,
  //     blocoUtilizado.colunaInicial,
  //     novoValor
  //   );

  //   setTabela((prevTabela) => {
  //     if (!prevTabela) return undefined;
  //     const novaTabela = [...prevTabela];
  //     novaTabela[linha] = [...novaTabela[linha]];
  //     novaTabela[linha][coluna] = {
  //       ...novaTabela[linha][coluna],
  //       permitida: linhaValida && colunaValida && blocoValido,
  //     };
  //     return novaTabela;
  //   });
  // }

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
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const celula = tabela[i][j];
        if (celula.valor !== null) {
          revalidarCelula(tabela, i, j, celula.valor);
        }
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, linha: number, coluna: number) => {
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
      //validarCelula(novaTabela, linha, coluna, novoValor);
      revalidarTodasCelulas(novaTabela);
      return novaTabela;
    });
  }

  const handleBuscaProfundidade = () => {
    const tabelaResolvida = buscaPorProfundidade(tabela);
    if (tabelaResolvida) {
      setTabela(tabelaResolvida);
    } else {
      alert("Não foi possível resolver o Sudoku com busca em profundidade.");
    }
  };



  const classeBordaPorQuadrante = (linha: number, coluna: number) => {
    const bordaDireita = (coluna + 1) % 3 === 0 && coluna !== 8 ? "border-r-4" : "";
    const bordaInferior = (linha + 1) % 3 === 0 && linha !== 8 ? "border-b-4" : "";
    return `border border-gray-400 ${bordaDireita} ${bordaInferior}`;
  }

  const classeBotaoGenerico = 'py-2 bg-gray-300 hover:bg-gray-600 hover:text-white px-3 rounded';

  return (
    <div>
        <div className="flex justify-between gap-2">
          <button className={classeBotaoGenerico} onClick={() => revalidarTodasCelulas(tabela)}>Validar Celulas</button>
          <button className={classeBotaoGenerico} onClick={() => esvaziarTabela()}>Esvaziar Tabela</button>
          <button className={classeBotaoGenerico} onClick={() => handleBuscaProfundidade()}>Resolver com Busca em Profundidade</button>
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