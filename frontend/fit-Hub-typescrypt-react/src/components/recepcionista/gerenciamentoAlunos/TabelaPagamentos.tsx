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
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead className="bg-[#f7f9f4] text-[10px] font-semibold uppercase tracking-[0.12em] text-[#66705e] sm:text-xs">
            <tr>
              <th scope="col" className="px-5 py-3.5">
                Aluno
              </th>
              <th scope="col" className="px-4 py-3.5">
                Plano
              </th>
              <th scope="col" className="px-4 py-3.5">
                Vencimento
              </th>
              <th scope="col" className="px-4 py-3.5">
                Status do pagamento
              </th>
              <th scope="col" className="px-4 py-3.5 text-right">
                Contato
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#edf0e9] text-[#343a31]">
            {pagamentos.map((pagamento) => (
              <LinhaPagamento key={pagamento.id} pagamento={pagamento} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="divide-y divide-[#edf0e9] md:hidden">
        {pagamentos.map((pagamento) => (
          <CartaoPagamento key={pagamento.id} pagamento={pagamento} />
        ))}
      </div>
    </>
  );
}

export default TabelaPagamentos;

