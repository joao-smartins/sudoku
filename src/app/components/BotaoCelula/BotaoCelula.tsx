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
      className={`w-[0.5625rem] h-[0.5625rem] sm:w-[1.125rem] sm:h-[1.125rem] md:w-[1.6875rem] md:h-[1.6875rem] lg:w-[2.25rem] lg:h-[2.25rem]
 p-0 flex items-center justify-center hover:bg-blue-100 hover:cursor-pointer ${classeCelula}`}
    >
      {celula.valor}
    </button>
  );
};
export default BotaoCelula;
