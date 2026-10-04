type BotaoControleProps = {
  texto: string;
  onClick: () => void;
  id?: string;
  ref?: React.Ref<HTMLButtonElement>;
};
const BotaoControle = (props: BotaoControleProps) => {
  const { texto, onClick, ref, id } = props;
  const classeBotaoGenerico =
    "flex-1 py-1 bg-gray-300 hover:bg-gray-600 hover:text-white px-2 rounded hover:cursor-pointer";
  return (
    <button id={id} ref={ref} className={classeBotaoGenerico} onClick={onClick}>
      {texto}
    </button>
  );
};

export default BotaoControle;
