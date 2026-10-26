import type { PagamentoResponseDTO } from "../../../types/financeiro/PagamentoResponseDTO";
import CartaoPagamento from "./CartaoPagamento";
import LinhaPagamento from "./LinhaPagamento";

function TabelaPagamentos({
  pagamentos,
}: {
  pagamentos: PagamentoResponseDTO[];
}) {
  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[880px] border-separate border-spacing-0 text-left text-sm">
          <thead className="bg-[#f3f8ed] text-[10px] font-bold uppercase tracking-[0.13em] text-[#59634f] sm:text-xs">
            <tr>
              <th scope="col" className="border-y border-[#e4eadf] px-5 py-4">
                Aluno
              </th>
              <th scope="col" className="border-y border-[#e4eadf] px-4 py-4">
                Plano
              </th>
              <th scope="col" className="border-y border-[#e4eadf] px-4 py-4">
                Vencimento
              </th>
              <th scope="col" className="border-y border-[#e4eadf] px-4 py-4">
                Status do pagamento
              </th>
              <th scope="col" className="border-y border-[#e4eadf] px-4 py-4 text-right">
                Contato
              </th>
              <th scope="col" className="border-y border-[#e4eadf] px-4 py-4 text-center">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="text-[#343a31]">
            {pagamentos.map((pagamento) => (
              <LinhaPagamento key={pagamento.idPagamento} pagamento={pagamento} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="space-y-3 bg-[#fbfcfa] p-3 md:hidden">
        {pagamentos.map((pagamento) => (
          <CartaoPagamento key={pagamento.idPagamento} pagamento={pagamento} />
        ))}
      </div>
    </>
  );
}

export default TabelaPagamentos;

