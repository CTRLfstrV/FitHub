import type { ContratoProximoVencimentoResponseDTO } from "../../../types/financeiro/ContratoProximoVencimentoResponseDTO";
import IconeCalendario from "./IconeCalendario";

interface TabelaContratosProximoVencimentoProps {
  contratos: ContratoProximoVencimentoResponseDTO[] | null | undefined;
}

function TabelaContratosProximoVencimento({
  contratos,
}: TabelaContratosProximoVencimentoProps) {
  return (
    <div className="hidden overflow-x-auto sm:block">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">
        <thead className="bg-[#f7f9f4] text-[10px] font-semibold uppercase tracking-[0.12em] text-[#66705e] sm:text-xs">
          <tr>
            <th scope="col" className="px-4 py-3.5 sm:px-6">
              Aluno
            </th>
            <th scope="col" className="px-4 py-3.5 sm:px-6">
              Plano
            </th>
            <th scope="col" className="px-4 py-3.5 sm:px-6">
              Data de término
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#edf0e9] text-[#343a31]">
          {contratos?.length === 0 ? (
            <tr>
              <td
                colSpan={3}
                className="px-4 py-10 text-center text-sm text-[#747c70] sm:px-6"
              >
                Nenhum contrato próximo do vencimento.
              </td>
            </tr>
          ) : (
            contratos?.map((contrato) => (
              <tr
                key={contrato.id}
                className="transition-colors hover:bg-[#fbfcfa]"
              >
                <td className="px-4 py-4 font-medium text-[#20251e] sm:px-6">
                  {contrato.nomeAluno}
                </td>
                <td className="px-4 py-4 sm:px-6">{contrato.nomePlano}</td>
                <td className="px-4 py-4 sm:px-6">
                  <span className="inline-flex items-center gap-2 text-[#535b4e]">
                    <IconeCalendario />
                    {new Date(contrato.dataTermino).toLocaleDateString("pt-br")}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TabelaContratosProximoVencimento;
