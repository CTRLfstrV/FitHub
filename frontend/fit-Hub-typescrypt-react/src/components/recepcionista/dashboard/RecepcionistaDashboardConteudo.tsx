import AcoesRecepcionistaDashboard from "./AcoesRecepcionistaDashboard";
import CabecalhoRecepcionistaDashboard from "./CabecalhoRecepcionistaDashboard";
import IndicadoresRecepcionistaDashboard from "./IndicadoresRecepcionistaDashboard";
import ListaContratosProximoVencimento from "./ListaContratosProximoVencimento";
import useRecepcionistaDashboard from "./useRecepcionistaDashboard";

function RecepcionistaDashboardConteudo() {
  const dashboard = useRecepcionistaDashboard();

  return (
    <div className="min-h-full">
      <section className="min-w-0 flex-1 px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
        <div className="mx-auto w-full max-w-[1160px]">
          <CabecalhoRecepcionistaDashboard />

          <IndicadoresRecepcionistaDashboard
            quantidadeAlunos={dashboard.quantidadeAlunos}
            quantidadeContratosAtivos={dashboard.quantidadeContratosAtivos}
            quantidadeAlunosAtivos={dashboard.quantidadeAlunosAtivos}
            mensagemErro={dashboard.mensagemErro}
          />

          <ListaContratosProximoVencimento
            contratos={dashboard.alunosContratoProximoFim}
          />

          <AcoesRecepcionistaDashboard />
        </div>
      </section>
    </div>
  );
}

export default RecepcionistaDashboardConteudo;
