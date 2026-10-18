import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlunoService } from "../../services/usuarios/AlunoService";
import { ContratoService } from "../../services/financeiro/ContratoService";
import type { ContratoProximoVencimentoResponseDTO } from "../../types/financeiro/ContratoProximoVencimentoResponseDTO";

const alunoService: AlunoService = new AlunoService();
const contratoService: ContratoService = new ContratoService();

function RecepcionistaDashBoardPage() {
  
  const [mensagemErro, setMensagemErro] = useState<string>("Erro");
  const [quantidadeAlunos, setQuantidadeAluno] = useState<number | null>();
  const [quantidadeContratosAtivos, setQuantidadeContratosAtivos] = useState<
    number | null
  >();
  const [quantidadeAlunosAtivos, setquantidadeAlunosAtivos] = useState<
    number | null
  >();
  const [alunosContratoProximoFim, setAlunosContratoProximoFim] = useState<
    ContratoProximoVencimentoResponseDTO[] | null
  >();

  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const quantidadeAlunos: number = await alunoService.QuantidadeAlunos();
        setQuantidadeAluno(quantidadeAlunos);
      } catch (erro) {
        if (erro instanceof Error) {
          setMensagemErro(erro.message);
        }
      }
      try {
        const quantidadeAlunosContratoAtivo =
          await contratoService.ContratosAtivos();
        setQuantidadeContratosAtivos(quantidadeAlunosContratoAtivo);
      } catch (erro) {
        if (erro instanceof Error) {
          setMensagemErro(erro.message);
        }
      }
      try {
        const quantidadeAlunosAtivos =
          await alunoService.QuantidadeAlunosAtivos();
        setquantidadeAlunosAtivos(quantidadeAlunosAtivos);
      } catch (erro) {
        if (erro instanceof Error) {
          setMensagemErro(erro.message);
        }
      }
      try {
        const contratosProximoFim: ContratoProximoVencimentoResponseDTO[] =
          await contratoService.ContratosProximosVencimento();
        setAlunosContratoProximoFim(contratosProximoFim);
      } catch (erro) {
        if (erro instanceof Error) {
          setMensagemErro(erro.message);
        }
      }
    };

    void carregarUsuario();
  });
  return (
    <div className="min-h-full">
      <section className="min-w-0 flex-1 px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
        <div className="mx-auto w-full max-w-[1160px]">
          <header className="relative mb-6 overflow-hidden rounded-2xl border border-[#dcebd0] bg-gradient-to-br from-[#f3f9ed] via-white to-[#e8f5d9] px-5 py-6 shadow-[0_8px_28px_rgba(65,104,32,0.06)] sm:mb-8 sm:px-8 sm:py-8 lg:px-10 lg:py-9">
            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#cfe4bd] bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-green-800 sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                Painel da recepção
              </span>
              <h1 className="mt-4 text-2xl font-bold tracking-tight text-[#20251e] sm:text-3xl lg:text-4xl">
                Visão geral
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[#66705e] sm:text-base">
                Acompanhe os principais números dos alunos e os contratos
                próximos do vencimento.
              </p>
            </div>
            <div
              className="pointer-events-none absolute -right-10 -top-16 hidden h-72 w-72 rounded-full border-[34px] border-green-700/[0.06] sm:block"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute right-10 top-1/2 hidden -translate-y-1/2 text-green-800/[0.12] lg:block"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-28 w-28"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="8" r="3" />
                <path d="M3.5 19v-1.5A4.5 4.5 0 0 1 8 13h2a4.5 4.5 0 0 1 4.5 4.5V19h-11ZM16 5.3a3 3 0 0 1 0 5.8M17 13a4.5 4.5 0 0 1 3.5 4.4V19h-3" />
              </svg>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
            <article className="relative overflow-hidden rounded-2xl border border-[#dfe5da] bg-white p-5 shadow-[0_5px_20px_rgba(32,37,30,0.045)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(32,37,30,0.08)] sm:p-6">
              <div className="absolute inset-x-0 top-0 h-1 bg-green-600" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-[#66705e]">
                    Total de alunos
                  </p>
                  <p className="mt-4 text-4xl font-bold leading-none tracking-tight text-[#20251e] sm:text-[2.65rem]">
                    {quantidadeAlunos ?? mensagemErro}
                  </p>
                  <p className="mt-3 text-xs text-[#81897d]">
                    Alunos cadastrados na unidade
                  </p>
                </div>
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#edf7e5] text-green-800 ring-1 ring-inset ring-[#d7ebc8]"
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
                    <circle cx="9" cy="8" r="3" />
                    <path d="M3.5 19v-1.5A4.5 4.5 0 0 1 8 13h2a4.5 4.5 0 0 1 4.5 4.5V19h-11ZM16 5.3a3 3 0 0 1 0 5.8M17 13a4.5 4.5 0 0 1 3.5 4.4V19h-3" />
                  </svg>
                </div>
              </div>
            </article>

            <article className="relative overflow-hidden rounded-2xl border border-[#dfe5da] bg-white p-5 shadow-[0_5px_20px_rgba(32,37,30,0.045)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(32,37,30,0.08)] sm:p-6">
              <div className="absolute inset-x-0 top-0 h-1 bg-[#8acb58]" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-[#66705e]">
                    Alunos com contrato ativo
                  </p>
                  <p className="mt-4 text-4xl font-bold leading-none tracking-tight text-[#20251e] sm:text-[2.65rem]">
                    {quantidadeContratosAtivos ?? mensagemErro}
                  </p>
                  <p className="mt-3 text-xs text-[#81897d]">
                    Contratos vigentes
                  </p>
                </div>
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f2f8ec] text-[#5c9139] ring-1 ring-inset ring-[#dfead5]"
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

            <article className="relative overflow-hidden rounded-2xl border border-[#dfe5da] bg-white p-5 shadow-[0_5px_20px_rgba(32,37,30,0.045)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(32,37,30,0.08)] sm:p-6">
              <div className="absolute inset-x-0 top-0 h-1 bg-[#b4dc8f]" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-[#66705e]">
                    Alunos ativos
                  </p>
                  <p className="mt-4 text-4xl font-bold leading-none tracking-tight text-[#20251e] sm:text-[2.65rem]">
                    {quantidadeAlunosAtivos ?? mensagemErro}
                  </p>
                  <p className="mt-3 text-xs text-[#81897d]">
                    Alunos com cadastro ativo
                  </p>
                </div>
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f6faef] text-[#719d4d] ring-1 ring-inset ring-[#e3ecd8]"
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

          <section className="mt-6 overflow-hidden rounded-2xl border border-[#dfe5da] bg-white shadow-[0_8px_28px_rgba(32,37,30,0.05)] sm:mt-8">
            <div className="flex flex-col gap-1 border-b border-[#e7ebe3] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
              <div>
                <h2 className="text-base font-semibold text-[#20251e] sm:text-lg">
                  Alunos com contrato próximo à expiração
                </h2>
                <p className="mt-1 text-xs text-[#81897d] sm:text-sm">
                  Acompanhe os próximos vencimentos
                </p>
              </div>
              <span className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-[#f4f8ef] px-3 py-1.5 text-xs font-medium text-[#59634f] sm:mt-0">
                <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                Próximos vencimentos
              </span>
            </div>

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
                  {alunosContratoProximoFim?.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-4 py-10 text-center text-sm text-[#747c70] sm:px-6"
                      >
                        Nenhum contrato próximo do vencimento.
                      </td>
                    </tr>
                  ) : (
                    alunosContratoProximoFim?.map((contrato) => (
                      <tr
                        key={contrato.id}
                        className="transition-colors hover:bg-[#fbfcfa]"
                      >
                        <td className="px-4 py-4 font-medium text-[#20251e] sm:px-6">
                          {contrato.nomeAluno}
                        </td>
                        <td className="px-4 py-4 sm:px-6">
                          {contrato.nomePlano}
                        </td>
                        <td className="px-4 py-4 sm:px-6">
                          <span className="inline-flex items-center gap-2 text-[#535b4e]">
                            <svg
                              aria-hidden="true"
                              viewBox="0 0 24 24"
                              fill="none"
                              className="h-4 w-4 text-[#789461]"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect x="3" y="5" width="18" height="16" rx="2" />
                              <path d="M16 3v4M8 3v4M3 10h18" />
                            </svg>
                            {new Date(contrato.dataTermino).toLocaleDateString(
                              "pt-br",
                            )}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-[#edf0e9] sm:hidden">
              {alunosContratoProximoFim?.length === 0 ? (
                <p className="px-4 py-10 text-center text-sm text-[#747c70]">
                  Nenhum contrato próximo do vencimento.
                </p>
              ) : (
                alunosContratoProximoFim?.map((contrato) => (
                  <article key={contrato.id} className="space-y-3 px-4 py-4">
                    <div>
                      <h3 className="text-sm font-semibold text-[#20251e]">
                        {contrato.nomeAluno}
                      </h3>
                      <p className="mt-1 text-xs text-[#747c70]">
                        {contrato.nomePlano}
                      </p>
                    </div>
                    <p className="flex items-center gap-2 text-xs font-medium text-[#535b4e]">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-4 w-4 text-[#789461]"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="5" width="18" height="16" rx="2" />
                        <path d="M16 3v4M8 3v4M3 10h18" />
                      </svg>
                      Término em{" "}
                      {new Date(contrato.dataTermino).toLocaleDateString(
                        "pt-br",
                      )}
                    </p>
                  </article>
                ))
              )}
            </div>
          </section>

          <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-green-700 bg-white px-5 py-3 text-sm font-semibold text-green-800 shadow-sm transition-colors hover:bg-[#f2f8ec] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 sm:text-base"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="8" r="3" />
                <path d="M3.5 19v-1.5A4.5 4.5 0 0 1 8 13h2a4.5 4.5 0 0 1 4.5 4.5V19h-11ZM19 8v6M16 11h6" />
              </svg>
              Matricular alunos
            </button>
            <Link
              to="/recepcionista/gerenciamento-alunos"
              className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-green-700 bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:border-green-800 hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 sm:text-base"
            >
              Gerenciar alunos
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
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RecepcionistaDashBoardPage;
