import getStatus from "../gerenciamento-alunos/getStatus";
import formatarData from "../gerenciamento-alunos/formatarData";
import type { PagamentoListagemResponseDTO } from "../../../types/financeiro/PagamentoListagemResponseDTO";

const moeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function HistoricoPagamentosAluno({
  pagamentos,
}: {
  pagamentos: PagamentoListagemResponseDTO[];
}) {
  return (
    <section className="fithub-card mt-6 overflow-hidden sm:mt-8">
      <div className="flex flex-col justify-between gap-3 border-b border-[#e5eddc] bg-gradient-to-r from-[#f3f9ed] via-white to-white px-5 py-5 sm:flex-row sm:items-center sm:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-green-800">
            Financeiro
          </p>
          <h2 className="mt-1 text-lg font-extrabold text-[#20251e] sm:text-xl">
            Histórico de pagamentos
          </h2>
        </div>
        <span className="inline-flex w-fit items-center rounded-full bg-[#f3f9ed] px-3 py-1.5 text-xs font-semibold text-[#557a3a]">
          {pagamentos.length} {pagamentos.length === 1 ? "parcela" : "parcelas"}
        </span>
      </div>

      {pagamentos.length === 0 ? (
        <p className="px-5 py-8 text-center text-sm text-[#66705e] sm:px-6">
          Nenhum pagamento registrado para este contrato.
        </p>
      ) : (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-[#fbfcfa] text-xs uppercase tracking-wide text-[#788270]">
                <tr>
                  <th scope="col" className="px-6 py-3.5 font-semibold">Parcela</th>
                  <th scope="col" className="px-4 py-3.5 font-semibold">Vencimento</th>
                  <th scope="col" className="px-4 py-3.5 font-semibold">Data do pagamento</th>
                  <th scope="col" className="px-4 py-3.5 font-semibold">Valor</th>
                  <th scope="col" className="px-4 py-3.5 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf0e9]">
                {pagamentos.map((pagamento) => {
                  const status = getStatus(pagamento.statusPagamento);
                  return (
                    <tr key={pagamento.id} className="text-[#424a3d] transition-colors hover:bg-[#f7fbf3]">
                      <td className="px-6 py-4 font-semibold text-[#343b2e]">
                        Parcela {pagamento.numeroParcela}
                        <span className="ml-2 text-xs font-normal text-[#81897d]">ID {pagamento.id}</span>
                      </td>
                      <td className="px-4 py-4">{formatarData(pagamento.vencimentoParcela)}</td>
                      <td className="px-4 py-4">{formatarData(pagamento.dataPagamento)}</td>
                      <td className="px-4 py-4 font-semibold">{moeda.format(pagamento.valorParcela)}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${status.classe}`}>
                          <span className={`h-2 w-2 rounded-full ${status.ponto}`} />
                          {status.nome}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-[#edf0e9] md:hidden">
            {pagamentos.map((pagamento) => {
              const status = getStatus(pagamento.statusPagamento);
              return (
                <article key={pagamento.id} className="space-y-4 px-5 py-5 transition-colors hover:bg-[#fbfdf8]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#81897d]">Parcela</p>
                      <p className="mt-1 text-base font-bold text-[#343b2e]">{pagamento.numeroParcela}</p>
                    </div>
                    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${status.classe}`}>
                      <span className={`h-2 w-2 rounded-full ${status.ponto}`} />
                      {status.nome}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-4 border-t border-[#edf0e9] pt-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#81897d]">Vencimento</p>
                      <p className="mt-1 text-sm font-medium text-[#424a3d]">{formatarData(pagamento.vencimentoParcela)}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#81897d]">Data do pagamento</p>
                      <p className="mt-1 text-sm font-medium text-[#424a3d]">{formatarData(pagamento.dataPagamento)}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#81897d]">Valor da parcela</p>
                      <p className="mt-1 text-sm font-semibold text-[#343b2e]">{moeda.format(pagamento.valorParcela)}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#81897d]">ID do pagamento</p>
                      <p className="mt-1 text-sm font-medium text-[#424a3d]">{pagamento.id}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}

export default HistoricoPagamentosAluno;
