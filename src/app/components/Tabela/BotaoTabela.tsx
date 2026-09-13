import { BotaoTabelaProps } from "@/app/utils/tipos";
const BotaoTabela = (props: BotaoTabelaProps) => {
  const { celula, onClick, onKeyDown, onFocus } = props;

  const classeCelula = celula.selecionada && celula.permitida
    ? "bg-blue-300 hover:bg-blue-700 text-white"
    : celula.permitida
      ? "text-black"
      : "bg-red-600 text-white";

  return (
    <button
      onClick={onClick}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      className={`h-12.5 w-12.5 p-0 flex items-center justify-center hover:bg-gray-200 ${classeCelula}`}
    >
      {celula.valor}
    </button>
  );
};
export default BotaoTabela;
