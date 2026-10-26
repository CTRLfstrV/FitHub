import type { ContratoPendenteResponseDTO } from "../../../types/financeiro/ContratoPendenteResponseDTO";
import formatarData from "./formatarData";
import LinkVerDetalhes from "./LinkVerDetalhes";
import Pessoa from "./Pessoa";

function BadgeContratoPendente() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800">
      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
      Pendente
    </span>
  );
}

function TabelaContratosPendentes({
  contratos,
}: {
  contratos: ContratoPendenteResponseDTO[];
}) {
  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left text-sm">
          <thead className="bg-[#f3f8ed] text-[10px] font-bold uppercase tracking-[0.13em] text-[#59634f] sm:text-xs">
            <tr>
              <th scope="col" className="border-y border-[#e4eadf] px-5 py-4">
                Aluno
              </th>
              <th scope="col" className="border-y border-[#e4eadf] px-4 py-4">
                Plano
              </th>
              <th scope="col" className="border-y border-[#e4eadf] px-4 py-4">
                Início do contrato
              </th>
              <th scope="col" className="border-y border-[#e4eadf] px-4 py-4">
                Status do contrato
              </th>
              <th scope="col" className="border-y border-[#e4eadf] px-4 py-4 text-center">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="text-[#343a31]">
            {contratos.map((contrato) => (
              <tr
                key={contrato.idContrato}
                className="transition-colors hover:bg-[#f7fbf3]"
              >
                <td className="border-b border-[#edf0e9] px-5 py-4">
                  <Pessoa nome={contrato.nomeAluno} email={contrato.emailAluno} />
                </td>
                <td className="border-b border-[#edf0e9] px-4 py-4 text-[#424a3d]">
                  {contrato.nomePlano}
                </td>
                <td className="border-b border-[#edf0e9] px-4 py-4 text-[#424a3d]">
                  {formatarData(contrato.dataInicio)}
                </td>
                <td className="border-b border-[#edf0e9] px-4 py-4">
                  <BadgeContratoPendente />
                </td>
                <td className="border-b border-[#edf0e9] px-4 py-4 text-center">
                  <LinkVerDetalhes
                    idAluno={contrato.idAluno}
                    nomeAluno={contrato.nomeAluno}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="space-y-3 bg-[#fbfcfa] p-3 md:hidden">
        {contratos.map((contrato) => (
          <article
            key={contrato.idContrato}
            className="space-y-4 rounded-xl border border-[#e4eadf] bg-white p-4 shadow-[0_2px_8px_rgba(32,37,30,0.035)] transition-shadow hover:shadow-[0_6px_14px_rgba(32,37,30,0.06)]"
          >
            <Pessoa
              nome={contrato.nomeAluno}
              email={contrato.emailAluno}
              compacto
            />
            <div className="grid grid-cols-2 gap-x-3 gap-y-4 border-t border-[#edf0e9] pt-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#81897d] sm:text-xs">
                  Plano
                </p>
                <p className="mt-1 text-sm font-medium text-[#424a3d]">
                  {contrato.nomePlano}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#81897d] sm:text-xs">
                  Status do contrato
                </p>
                <div className="mt-1">
                  <BadgeContratoPendente />
                </div>
              </div>
              <div className="col-span-2 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#81897d] sm:text-xs">
                    Início do contrato
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#424a3d]">
                    {formatarData(contrato.dataInicio)}
                  </p>
                </div>
                <LinkVerDetalhes
                  idAluno={contrato.idAluno}
                  nomeAluno={contrato.nomeAluno}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

export default TabelaContratosPendentes;
