import { useState } from "react";
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

function BotaoAtivarContrato({
  contrato,
  onAtivarContrato,
}: {
  contrato: ContratoPendenteResponseDTO;
  onAtivarContrato: (idContrato: number) => Promise<void>;
}) {
  const [ativando, setAtivando] = useState(false);
  const [erro, setErro] = useState(false);

  async function ativar() {
    setAtivando(true);
    setErro(false);

    try {
      await onAtivarContrato(contrato.idContrato);
    } catch {
      setErro(true);
    } finally {
      setAtivando(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        type="button"
        onClick={ativar}
        disabled={ativando}
        aria-label={`Ativar contrato de ${contrato.nomeAluno}`}
        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-green-700 bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-800 disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
      >
        {ativando ? (
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-white/50 border-t-white"
            role="status"
            aria-label="Ativando contrato"
          />
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m5 12 4 4L19 6" />
          </svg>
        )}
        {ativando ? "Ativando" : "Ativar"}
      </button>
      {erro && (
        <span className="max-w-40 text-center text-xs text-rose-700" role="alert">
          Falha ao ativar o contrato. Tente novamente.
        </span>
      )}
    </div>
  );
}

function TabelaContratosPendentes({
  contratos,
  onAtivarContrato,
}: {
  contratos: ContratoPendenteResponseDTO[];
  onAtivarContrato: (idContrato: number) => Promise<void>;
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
                  <div className="flex items-center justify-center gap-2">
                    <BotaoAtivarContrato
                      contrato={contrato}
                      onAtivarContrato={onAtivarContrato}
                    />
                    <LinkVerDetalhes
                      idAluno={contrato.idAluno}
                      nomeAluno={contrato.nomeAluno}
                    />
                  </div>
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
                <div className="flex flex-col items-end gap-2">
                  <BotaoAtivarContrato
                    contrato={contrato}
                    onAtivarContrato={onAtivarContrato}
                  />
                  <LinkVerDetalhes
                    idAluno={contrato.idAluno}
                    nomeAluno={contrato.nomeAluno}
                  />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

export default TabelaContratosPendentes;
