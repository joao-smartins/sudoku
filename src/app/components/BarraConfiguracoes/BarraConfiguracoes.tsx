import { totalmentePreenchida, validarSeHaSolucao } from "@/app/utils/funcoes";
import {
    SUDOKU_DIFICIL,
    SUDOKU_FACIL,
    SUDOKU_MEDIO
} from "@/app/utils/modelosSudoku";
import { BarraConfiguracoesProps } from "@/app/utils/tipos";
import BotaoControle from "../BotaoControle/BotaoControle";

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
  setTabelaAnterior,
  retornarEstadoAnterior,
}: BarraConfiguracoesProps) => {
  const verificarBloqueio = (
    limpar: boolean = true,
    validarSolucao: boolean = true,
  ) => {
    if (limpar && limparMetricas) {
      limparMetricas();
    }
    if (isLoading) {
      alert(
        "Aguarde a conclusão da resolução atual antes de iniciar uma nova.",
      );
      return true;
    }
    if (
      validarSolucao &&
      !totalmentePreenchida(tabela) &&
      !validarSeHaSolucao(tabela)
    ) {
      alert("A tabela não possui solução. Por favor, altere o estado inicial.");
      return true;
    }
    setTabelaAnterior?.([...tabela]);
    return false;
  };

  return (
    <div
      id="configurações"
      className="flex flex-col gap-2"
    >
      <div className="flex flex-wrap justify-between gap-2">
        <BotaoControle
          ref={primeiroBotaoRef}
          texto="Esvaziar Tabela"
          onClick={() => !verificarBloqueio(true, false) && esvaziarTabela()}
        />
        <BotaoControle
          texto="Validar Celulas"
          onClick={() =>
            !verificarBloqueio(true, false) && revalidarTodasCelulas(tabela)
          }
        />
        <BotaoControle
          texto="Retornar Estado Anterior"
          onClick={() =>
            !verificarBloqueio(true, false) && retornarEstadoAnterior?.()
          }
        />
      </div>
      <div className="flex flex-wrap justify-between gap-2">
        <BotaoControle
          texto="Fácil"
          onClick={() =>
            !verificarBloqueio(true, false) && handleCarregarModelo(SUDOKU_FACIL)
          }
        />
        <BotaoControle
          texto="Médio"
          onClick={() =>
            !verificarBloqueio(true, false) && handleCarregarModelo(SUDOKU_MEDIO)
          }
        />
        <BotaoControle
          texto="Difícil"
          onClick={() =>
            !verificarBloqueio(true, false) && handleCarregarModelo(SUDOKU_DIFICIL)
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
