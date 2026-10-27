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
  const pagamentosPendentes = detalhes.pagamentos.filter(
    (pagamento) => pagamento.statusPagamento === 0,
  ).length;
  const pagamentosAtrasados = detalhes.pagamentos.filter(
    (pagamento) => pagamento.statusPagamento === 2,
  ).length;
  const percentualPagos = detalhes.pagamentos.length
    ? Math.round((pagamentosPagos / detalhes.pagamentos.length) * 100)
    : 0;

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
          <div className="relative isolate overflow-hidden rounded-2xl border border-[#2f7132] bg-gradient-to-br from-[#245a28] via-[#347b32] to-[#6a9e3e] p-5 text-white shadow-[0_16px_36px_rgba(44,100,42,0.2)] sm:p-6">
            <div aria-hidden="true" className="absolute -right-10 -top-16 h-48 w-48 rounded-full border-[24px] border-white/10" />
            <div aria-hidden="true" className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-white/5 blur-xl" />
            <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/75">
              Acompanhamento
            </p>
            <h2 className="mt-1 text-lg font-bold text-white sm:text-xl">
              Visão do contrato
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/80">
              Acompanhe o período contratado e a situação das parcelas de{" "}
              {detalhes.nomeAluno}.
            </p>
            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                <span className="font-medium text-white/85">
                  {detalhes.pagamentos.length === 0
                    ? "Nenhuma parcela registrada"
                    : `${pagamentosPagos} de ${detalhes.pagamentos.length} parcelas pagas`}
                </span>
                <span className="font-extrabold tabular-nums">{percentualPagos}%</span>
              </div>
              <div
                className="h-2.5 overflow-hidden rounded-full bg-black/20 ring-1 ring-inset ring-white/15"
                role="progressbar"
                aria-label="Progresso dos pagamentos"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percentualPagos}
              >
                <div
                  className="h-full rounded-full bg-[#d7f1a8] shadow-[0_0_12px_rgba(215,241,168,0.6)] transition-all"
                  style={{ width: `${percentualPagos}%` }}
                />
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
              <div className="rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur-sm">
                <p className="text-xl font-extrabold tabular-nums text-white">{pagamentosPagos}</p>
                <p className="mt-0.5 text-[11px] font-semibold text-white/75 sm:text-xs">Pagos</p>
              </div>
              <div className="rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur-sm">
                <p className="text-xl font-extrabold tabular-nums text-white">{pagamentosPendentes}</p>
                <p className="mt-0.5 text-[11px] font-semibold text-white/75 sm:text-xs">Pendentes</p>
              </div>
              <div className="rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur-sm">
                <p className="text-xl font-extrabold tabular-nums text-white">{pagamentosAtrasados}</p>
                <p className="mt-0.5 text-[11px] font-semibold text-white/75 sm:text-xs">Em atraso</p>
              </div>
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
