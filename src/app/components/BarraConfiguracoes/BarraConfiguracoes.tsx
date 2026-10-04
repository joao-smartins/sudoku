import BotaoControle from "../BotaoControle/BotaoControle";
import { BarraConfiguracoesProps, TabelaSudoku } from "@/app/utils/tipos";
import {
  carregarModelo,
  SUDOKU_DIFICIL,
  SUDOKU_FACIL,
  SUDOKU_MEDIO,
} from "@/app/utils/modelosSudoku";

const BarraConfiguracoes = ({
  tabela,
  isLoading,
  esvaziarTabela,
  revalidarTodasCelulas,
  handleCarregarModelo,
  handleBuscaProfundidade,
  handleBuscaHCEstocastica,
  handleBuscaHCPrimeiraEscolha,
  handleBuscaHCRecozimentoSimulado,
  handleBuscaBestFirst,
  limparMetricas,
  primeiroBotaoRef,
}: BarraConfiguracoesProps) => {
  const verificarBloqueio = (limpar: boolean = true) => {
    if (limpar && limparMetricas) {
      limparMetricas();
    }
    if (isLoading) {
      alert(
        "Aguarde a conclusão da resolução atual antes de iniciar uma nova.",
      );
      return true;
    }
    return false;
  };

  return (
    <div
      id="configurações"
      className="flex flex-col gap-2 max-w-73 sm:max-w-118"
    >
      <div className="flex flex-wrap justify-between gap-2">
        <BotaoControle
          ref={primeiroBotaoRef}
          texto="Esvaziar Tabela"
          onClick={() => !verificarBloqueio() && esvaziarTabela()}
        />
        <BotaoControle
          texto="Validar Celulas"
          onClick={() =>
            !verificarBloqueio(false) && revalidarTodasCelulas(tabela)
          }
        />
      </div>
      <div className="flex flex-wrap justify-between gap-2">
        <BotaoControle
          texto="Fácil"
          onClick={() =>
            !verificarBloqueio() && handleCarregarModelo(SUDOKU_FACIL)
          }
        />
        <BotaoControle
          texto="Médio"
          onClick={() =>
            !verificarBloqueio() && handleCarregarModelo(SUDOKU_MEDIO)
          }
        />
        <BotaoControle
          texto="Difícil"
          onClick={() =>
            !verificarBloqueio() && handleCarregarModelo(SUDOKU_DIFICIL)
          }
        />
      </div>
      <div className="flex flex-wrap justify-between gap-2">
        <BotaoControle
          texto="Resolver com Busca DFS"
          onClick={() => !verificarBloqueio() && handleBuscaProfundidade()}
        />
        <BotaoControle
          texto="Busca HC Estocastica"
          onClick={() => !verificarBloqueio() && handleBuscaHCEstocastica()}
        />
        <BotaoControle
          texto="Busca HC Primeira Escolha"
          onClick={() => !verificarBloqueio() && handleBuscaHCPrimeiraEscolha()}
        />
        <BotaoControle
          texto="Busca HC Recozimento Simulado"
          onClick={() =>
            !verificarBloqueio() && handleBuscaHCRecozimentoSimulado()
          }
        />
      </div>
      <div className="flex flex-wrap justify-between gap-2">
        <BotaoControle
          texto="Busca Best First"
          onClick={() => !verificarBloqueio() && handleBuscaBestFirst()}
        />
      </div>
    </div>
  );
};

export default BarraConfiguracoes;
