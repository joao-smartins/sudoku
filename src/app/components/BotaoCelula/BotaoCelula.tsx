import { BotaoTabelaProps } from "@/app/utils/tipos";
const BotaoCelula = (props: BotaoTabelaProps) => {
  const { celula, onClick, onKeyDown, onFocus, ref, alt } = props;

  const classeCelula =
    celula.selecionada && celula.permitida
      ? "bg-blue-300 hover:bg-blue-500! text-white"
      : celula.permitida
        ? "text-black"
        : "bg-red-500  hover:bg-red-700! text-white";

  return (
    <button
      ref={ref}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      aria-label={alt}
      className={`w-2.25 h-2.25 sm:w-4.5 sm:h-4.5 md:w-6.75 md:h-6.75 lg:w-9 lg:h-9
 p-0 flex items-center justify-center hover:bg-blue-100 hover:cursor-pointer ${classeCelula}`}
    >
      {celula.valor}
    </button>
  );
};
export default BotaoCelula;
