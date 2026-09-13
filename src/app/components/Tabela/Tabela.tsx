import { blocoPermitidoInserido, colunaPermitidaInserida, linhaPermitidaInserida, verificarQualOBloco } from "@/app/utils/funcoes";
import { TabelaSudoku, TabelaSudokuProps } from "@/app/utils/tipos";
import BotaoTabela from "./BotaoTabela";

const Tabela = (props: TabelaSudokuProps) => {
  const { tabela, setTabela } = props;

  const validarCelula = (tebelaAtualizada: TabelaSudoku, linha: number, coluna: number, novoValor: number) => {
    const linhaValida = linhaPermitidaInserida(tebelaAtualizada, linha);
    const colunaValida = colunaPermitidaInserida(tebelaAtualizada, coluna);
    const blocoUtilizado = verificarQualOBloco(linha, coluna);

    if (!blocoUtilizado) return;
    const blocoValido = blocoPermitidoInserido(
      tebelaAtualizada,
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
    if(tabela[linha][coluna].valor === novoValor) return;



    setTabela((prevTabela) => {
      if (!prevTabela) return undefined;
      const novaTabela = [...prevTabela];
      novaTabela[linha] = [...novaTabela[linha]];
      novaTabela[linha][coluna] = {
        ...novaTabela[linha][coluna],
        valor: novoValor,
      };
      validarCelula(novaTabela, linha, coluna, novoValor);
      return novaTabela;
    });
  }

  return (
    <div>
      <table className="border-collapse border border-gray-400 h-112.5 w-112.5">
        <tbody>
          {tabela.map((linha, i) => (
            <tr key={i}>
              {linha.map((celula, j) => (
                <td key={j} className="border border-gray-400">
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