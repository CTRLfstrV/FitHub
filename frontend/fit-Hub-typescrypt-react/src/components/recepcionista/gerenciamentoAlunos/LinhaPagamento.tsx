import type { PagamentoResponseDTO } from "../../../types/financeiro/PagamentoResponseDTO";
import BadgeStatus from "./BadgeStatus";
import Contato from "./Contato";
import LinkVerDetalhes from "./LinkVerDetalhes";
import Pessoa from "./Pessoa";
import Vencimento from "./Vencimento";

function LinhaPagamento({ pagamento }: { pagamento: PagamentoResponseDTO }) {
  return (
    <tr className="transition-colors hover:bg-[#fbfcfa]">
      <td className="px-5 py-4">
        <Pessoa nome={pagamento.nomeAluno} email={pagamento.emailAluno} />
      </td>
      <td className="px-4 py-4 text-[#424a3d]">{pagamento.nomePlano}</td>
      <td className="px-4 py-4">
        <Vencimento data={pagamento.vencimentoParcela} />
      </td>
      <td className="px-4 py-4">
        <BadgeStatus status={pagamento.statusPagamento} />
      </td>
      <td className="px-4 py-4 text-right">
        <Contato nome={pagamento.nomeAluno} email={pagamento.emailAluno} />
      </td>
      <td className="px-4 py-4 text-center">
        <LinkVerDetalhes nomeAluno={pagamento.nomeAluno} />
      </td>
    </tr>
  );
}

export default LinhaPagamento;

