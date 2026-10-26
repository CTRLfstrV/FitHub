import type { PagamentoResponseDTO } from "../../../types/financeiro/PagamentoResponseDTO";
import BadgeStatus from "./BadgeStatus";
import Contato from "./Contato";
import LinkVerDetalhes from "./LinkVerDetalhes";
import Pessoa from "./Pessoa";
import Vencimento from "./Vencimento";

function LinhaPagamento({ pagamento }: { pagamento: PagamentoResponseDTO }) {
  return (
    <tr className="transition-colors hover:bg-[#f7fbf3]">
      <td className="border-b border-[#edf0e9] px-5 py-4">
        <Pessoa nome={pagamento.nomeAluno} email={pagamento.emailAluno} />
      </td>
      <td className="border-b border-[#edf0e9] px-4 py-4 text-[#424a3d]">
        {pagamento.nomePlano}
      </td>
      <td className="border-b border-[#edf0e9] px-4 py-4">
        <Vencimento data={pagamento.vencimentoParcela} />
      </td>
      <td className="border-b border-[#edf0e9] px-4 py-4">
        <BadgeStatus status={pagamento.statusPagamento} />
      </td>
      <td className="border-b border-[#edf0e9] px-4 py-4 text-right">
        <Contato nome={pagamento.nomeAluno} email={pagamento.emailAluno} />
      </td>
      <td className="border-b border-[#edf0e9] px-4 py-4 text-center">
        <LinkVerDetalhes
          idAluno={pagamento.idAluno}
          nomeAluno={pagamento.nomeAluno}
        />
      </td>
    </tr>
  );
}

export default LinhaPagamento;

