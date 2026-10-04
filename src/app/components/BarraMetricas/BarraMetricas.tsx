import { totalmentePreenchida } from "@/app/utils/funcoes";
import { BarraMetricasProps } from "@/app/utils/tipos";

const BarraMetricas = (props: BarraMetricasProps) => {
  const { metricas, tabela } = props;

  return (
    <div
      id="métricas"
      className="flex flex-col gap-1 flex-wrap"
    >
      <span className="text-sm sm:text-base">
        Tempo de execução: {metricas?.tempoExecucao.toFixed(2)} ms
      </span>
      <br />
      <span className="text-sm sm:text-base">
        Nós expandidos: {metricas?.nosExpandidos}
      </span>
      <br />
      <span className="text-sm sm:text-base">
        Backtracking: {metricas?.backtracking ? metricas?.backtracking : "Não"}
      </span>
      <br />
      <span className="text-sm sm:text-base">
        Tabela completa: {totalmentePreenchida(tabela) ? "Sim" : "Não"}
      </span>
    </div>
  );
};

export default BarraMetricas;
