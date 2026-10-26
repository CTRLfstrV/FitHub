import CabecalhoDetalhesAluno from "./CabecalhoDetalhesAluno";
import EstadoDetalhesAluno from "./EstadoDetalhesAluno";
import HistoricoPagamentosAluno from "./HistoricoPagamentosAluno";
import InformacoesContratoAluno from "./InformacoesContratoAluno";
import ResumoContratoAluno from "./ResumoContratoAluno";
import useDetalhesAluno from "./useDetalhesAluno";

function DetalhesAlunoConteudo({ idAluno }: { idAluno: number | null }) {
  const {
    detalhes,
    carregando,
    mensagemErro,
    tentarNovamente,
  } = useDetalhesAluno(idAluno);

  if (carregando || !detalhes) {
    return (
      <EstadoDetalhesAluno
        carregando={carregando}
        mensagemErro={mensagemErro}
        permiteNovaTentativa={idAluno !== null}
        onTentarNovamente={tentarNovamente}
      />
    );
  }

  const pagamentosPagos = detalhes.pagamentos.filter(
    (pagamento) => pagamento.statusPagamento === 1,
  ).length;

  return (
    <section className="min-w-0 flex-1 px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
      <div className="mx-auto w-full max-w-[1160px]">
        <CabecalhoDetalhesAluno
          nomeAluno={detalhes.nomeAluno}
          statusContrato={detalhes.statusContrato}
        />
        <ResumoContratoAluno contrato={detalhes} />

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
          <InformacoesContratoAluno contrato={detalhes} />
          <div className="rounded-2xl border border-[#dcebd0] bg-gradient-to-br from-[#f3f9ed] via-white to-[#f7fbf3] p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-green-800">
              Acompanhamento
            </p>
            <h2 className="mt-1 text-lg font-bold text-[#20251e] sm:text-xl">
              Visão do contrato
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#66705e]">
              Acompanhe o período contratado e a situação das parcelas de{" "}
              {detalhes.nomeAluno}.
            </p>
            <div className="mt-5 flex items-center gap-3 rounded-xl border border-[#e4ebdc] bg-white/80 p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f5d9] text-green-800">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 12.5 4.5 4L19 7" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-[#343b2e]">
                  Pagamentos registrados
                </p>
                <p className="mt-0.5 text-xs text-[#788270]">
                  {pagamentosPagos} de {detalhes.pagamentos.length} pagos
                </p>
              </div>
            </div>
          </div>
        </div>

        <HistoricoPagamentosAluno pagamentos={detalhes.pagamentos} />
      </div>
    </section>
  );
}

export default DetalhesAlunoConteudo;
