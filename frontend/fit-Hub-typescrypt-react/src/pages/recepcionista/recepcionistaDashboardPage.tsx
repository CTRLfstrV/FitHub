import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RedirecionadorService } from "../../services/RedirecionadorService";
import { SessaoService } from "../../services/usuarios/SessaoService";
import { AlunoService } from "../../services/usuarios/AlunoService";
import { ContratoService } from "../../services/financeiro/ContratoService";
import type { ContratoProximoVencimentoResponseDTO } from "../../types/financeiro/ContratoProximoVencimentoResponseDTO";

const alunoService: AlunoService = new AlunoService();
const contratoService: ContratoService = new ContratoService();
const sessaoService: SessaoService = new SessaoService();
let mensagemErro: string = "Erro";
let quantidadeAlunos: number | null;
let quantidadeContratosAtivos: number | null;
let quantidadeAlunosAtivos: number | null;
let alunosContratoProximoFim: ContratoProximoVencimentoResponseDTO[] | null;
try {
  quantidadeAlunos = await alunoService.QuantidadeAlunos();
} catch (erro) {
  if (erro instanceof Error) {
    mensagemErro = erro.message;
  }
}
try {
  quantidadeContratosAtivos = await contratoService.ContratosAtivos();
} catch (erro) {
  if (erro instanceof Error) {
    mensagemErro = erro.message;
  }
}
try {
  quantidadeAlunosAtivos = await alunoService.QuantidadeAlunosAtivos();
} catch (erro) {
  if (erro instanceof Error) {
    mensagemErro = erro.message;
  }
}
try {
  alunosContratoProximoFim =
    await contratoService.ContratosProximosVencimento();
} catch (erro) {
  if (erro instanceof Error) {
    mensagemErro = erro.message;
  }
}

function RecepcionistaDashBoardPage() {
  const [buttonsInverted, setButtonsInverted] = useState(false);

  const redirecionadorService: RedirecionadorService =
    new RedirecionadorService(sessaoService);
  redirecionadorService.RedirecionaPorSessao(useNavigate());

  const primaryButtonClass =
    "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-lg bg-[#c5ff62] px-5 py-3 text-sm font-semibold text-[#17200f] transition-colors hover:bg-[#b3ee4f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 sm:text-base";
  const secondaryButtonClass =
    "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-lg border border-green-700 bg-white px-5 py-3 text-sm font-semibold text-green-800 transition-colors hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 sm:text-base";

  return (
    <div className="min-h-full">
      <section className="min-w-0 flex-1 bg-[#fbfcfa] p-5 sm:p-7 md:p-10">
        <div className="w-full max-w-[1080px]">
          <div className="mb-6 sm:mb-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-green-700 sm:text-sm">
              Painel da recepção
            </p>
            <h1 className="text-2xl font-bold text-[#20251e] sm:text-3xl">
              Visão geral
            </h1>
            <p className="mt-2 text-sm text-[#747c70] sm:text-base">
              Acompanhe os principais números dos alunos.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
            <article className="rounded-xl border border-[#dfe5da] bg-white p-4 shadow-[0_4px_16px_rgba(32,37,30,0.04)] sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-sm font-medium text-[#535b4e] sm:text-base">
                    Total de alunos
                  </h2>
                  <p className="mt-2 text-3xl font-bold leading-none text-[#20251e] sm:text-4xl">
                    {quantidadeAlunos ?? mensagemErro}
                  </p>
                </div>
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <circle cx="9" cy="8" r="3" />
                    <path d="M3.5 19v-1.5A4.5 4.5 0 0 1 8 13h2a4.5 4.5 0 0 1 4.5 4.5V19h-11Z" />
                    <path d="M16 5.3a3 3 0 0 1 0 5.8M17 13a4.5 4.5 0 0 1 3.5 4.4V19h-3" />
                  </svg>
                </div>
              </div>
            </article>

            <article className="rounded-xl border border-[#dfe5da] bg-white p-4 shadow-[0_4px_16px_rgba(32,37,30,0.04)] sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-sm font-medium text-[#535b4e] sm:text-base">
                    Alunos com contrato ativo
                  </h2>
                  <p className="mt-2 text-3xl font-bold leading-none text-[#20251e] sm:text-4xl">
                    {quantidadeContratosAtivos ?? mensagemErro}
                  </p>
                </div>
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 3.75h7l4 4V20a1.25 1.25 0 0 1-1.25 1.25h-9.5A1.25 1.25 0 0 1 6 20V5a1.25 1.25 0 0 1 1-1.25Z" />
                    <path d="M14 4v4h4M9 13l2 2 4-4" />
                  </svg>
                </div>
              </div>
            </article>

            <article className="rounded-xl border border-[#dfe5da] bg-white p-4 shadow-[0_4px_16px_rgba(32,37,30,0.04)] sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-sm font-medium text-[#535b4e] sm:text-base">
                    Alunos ativos
                  </h2>
                  <p className="mt-2 text-3xl font-bold leading-none text-[#20251e] sm:text-4xl">
                    {quantidadeAlunosAtivos ?? mensagemErro}
                  </p>
                </div>
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 17 9 11l4 4 8-9" />
                    <path d="M15 6h6v6" />
                  </svg>
                </div>
              </div>
            </article>
          </div>

          <section className="mt-6 overflow-hidden rounded-xl border border-[#dfe5da] bg-white shadow-[0_4px_16px_rgba(32,37,30,0.04)] sm:mt-8">
            <h2 className="border-b border-[#e7ebe3] px-4 py-3 text-base font-semibold text-[#20251e] sm:px-5 sm:text-lg">
              Alunos com contrato próximo à expiração
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                <thead className="bg-[#f4f8ef] text-xs font-semibold uppercase tracking-wide text-[#535b4e]">
                  <tr>
                    <th className="px-4 py-3 sm:px-5">Aluno</th>
                    <th className="px-4 py-3 sm:px-5">Plano</th>
                    <th className="px-4 py-3 sm:px-5">Data fim</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#edf0e9] text-[#343a31]">
                  {alunosContratoProximoFim?.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-4 py-6 text-center text-gray-500"
                      >
                        Nenhum contrato próximo do vencimento.
                      </td>
                    </tr>
                  ) : (
                    alunosContratoProximoFim?.map((contrato) => (
                      <tr key={contrato.idContrato}>
                        <td className="px-4 py-3">{contrato.nomeAluno}</td>
                        <td className="px-4 py-3">{contrato.nomePlano}</td>
                        <td className="px-4 py-3">
                          {new Date(contrato.dataTermino).toLocaleDateString(
                            "pt-br",
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              className={
                buttonsInverted ? secondaryButtonClass : primaryButtonClass
              }
              onClick={() => setButtonsInverted((inverted) => !inverted)}
            >
              Cadastrar novo aluno
            </button>
            <button
              type="button"
              className={
                buttonsInverted ? primaryButtonClass : secondaryButtonClass
              }
              onClick={() => setButtonsInverted((inverted) => !inverted)}
            >
              Gerenciar Alunos
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RecepcionistaDashBoardPage;
