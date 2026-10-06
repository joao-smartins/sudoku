import { BotaoTabelaProps } from "@/app/utils/tipos";
const BotaoCelula = (props: BotaoTabelaProps) => {
  const { celula, onClick, onKeyDown, onFocus, ref, alt } = props;

  const classeCelula =
    celula.selecionada && celula.permitida
      ? "bg-[#d4e5f6] dark:bg-[#1e3a5f] hover:bg-[#b9d7f3]! dark:hover:bg-[#2a4d7c]! text-[#0c2a4d]! dark:text-[#d4e5f6]! font-bold ring-2 ring-[#7fb2e6] ring-inset"
      : celula.permitida
        ? "text-slate-800 dark:text-slate-100"
        : "bg-red-400 dark:bg-red-600 hover:bg-red-500! dark:hover:bg-red-700! text-white!";

  return (
    <button
      ref={ref}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      aria-label={alt}
      className={`w-6.75 h-6.75 lg:w-9 lg:h-9
 p-0 flex items-center justify-center hover:bg-[#d4e5f6]/50 dark:hover:bg-slate-800 hover:cursor-pointer hover:text-[#0c2a4d] dark:hover:text-white transition-colors duration-150 ${classeCelula}`}
    >
      {celula.valor}
    </button>
  );
};
export default BotaoCelula;
