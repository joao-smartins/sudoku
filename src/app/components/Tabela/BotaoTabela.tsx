"use client";
import { BotaoTabelaProps } from "@/app/utils/tipos";
import { useState } from "react";

const BotaoTabela = (props: BotaoTabelaProps) => {
  const { children } = props;
  const [selecionada, setSelecionada] = useState<boolean>(false);

  const handleClick = () => {
    setSelecionada(!selecionada);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
     event.preventDefault();
    if(!Number.isNaN(Number(event.key))) {
     const numero = Number(event.key);
     console.log('Número pressionado:', numero);
    }else if (event.key === "Enter") {
      handleClick();
    }
  }

  
  return (
    <button
      onClick={handleClick}
      onKeyDown={onKeyDown}
      className={` font-bold h-full w-full  ${selecionada ? 'bg-blue-300 !hover:bg-blue-700 text-white' : 'text-black bg'}`}
    >
      {children}
    </button>
  );
}
export default BotaoTabela