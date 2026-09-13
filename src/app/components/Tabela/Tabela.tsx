import { TabelaSudokuProps } from "@/app/utils/tipos";
import BotaoTabela from "./BotaoTabela";

const Tabela = (props: TabelaSudokuProps) => {
  const { tabela } = props;
  return (
    <div>
      <table className="border-collapse border border-gray-400 h-[70vmin] w-[70vmin]">
        <tbody>
          {tabela.map((linha, i) => (
            <tr key={i}>
              {linha.map((celula, j) => (
                <td key={j} className="border border-gray-400">
                  <BotaoTabela>
                    {celula.valor}
                  </BotaoTabela>
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
