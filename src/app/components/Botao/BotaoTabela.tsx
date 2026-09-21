import { BotaoTabelaProps } from "@/app/utils/tipos";
const BotaoTabela = (props: BotaoTabelaProps) => {
  const { celula, onClick, onKeyDown, onFocus } = props;

  const classeCelula = celula.selecionada && celula.permitida
    ? "bg-blue-300 hover:bg-blue-500! text-white"
    : celula.permitida
      ? "text-black"
      : "bg-red-500  hover:bg-red-700! text-white";

  return (
    <button
      onClick={onClick}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      className={`h-7.5 w-7.5 sm:h-12.5 sm:w-12.5 p-0 flex items-center justify-center hover:bg-blue-100 ${classeCelula}`}
    >
      {celula.valor}
    </button>
  );
};
export default BotaoTabela;
