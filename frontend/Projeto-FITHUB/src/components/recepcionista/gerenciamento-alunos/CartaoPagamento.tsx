import type { PagamentoResponseDTO } from "../../../types/financeiro/PagamentoResponseDTO";
import BadgeStatus from "./BadgeStatus";
import Contato from "./Contato";
import LinkVerDetalhes from "./LinkVerDetalhes";
import Pessoa from "./Pessoa";
import Vencimento from "./Vencimento";

function CartaoPagamento({ pagamento }: { pagamento: PagamentoResponseDTO }) {
  return (
    <article className="space-y-4 rounded-xl border border-[#e4eadf] bg-white p-4 shadow-[0_2px_8px_rgba(32,37,30,0.035)] transition-shadow hover:shadow-[0_6px_14px_rgba(32,37,30,0.06)]">
      <Pessoa
        nome={pagamento.nomeAluno}
        email={pagamento.emailAluno}
        compacto
      />
      <div className="grid grid-cols-2 gap-x-3 gap-y-4 border-t border-[#edf0e9] pt-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#81897d] sm:text-xs">
            Plano
          </p>
          <p className="mt-1 text-sm font-medium text-[#424a3d]">
            {pagamento.nomePlano}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#81897d] sm:text-xs">
            Pagamento
          </p>
          <div className="mt-1">
            <BadgeStatus status={pagamento.statusPagamento} compacto />
          </div>
        </div>
        <div className="col-span-2 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#81897d] sm:text-xs">
              Vencimento
            </p>
            <p className="mt-1 text-sm font-medium">
              <Vencimento data={pagamento.vencimentoParcela} />
            </p>
          </div>
          <div className="flex items-center gap-1">
            <LinkVerDetalhes
              idAluno={pagamento.idAluno}
              nomeAluno={pagamento.nomeAluno}
            />
            <Contato
              nome={pagamento.nomeAluno}
              email={pagamento.emailAluno}
              compacto
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export default CartaoPagamento;

