import { useMemo, useState } from "react";

type StatusPagamento = "Em dia" | "Pendente" | "Atrasado";

type Aluno = {
  id: string;
  nome: string;
  email: string;
  plano: string;
  status: StatusPagamento;
  vencimento: string;
  iniciais: string;
};

// Dados estáticos para validar o visual da tela.
const alunos: Aluno[] = [
  {
    id: "001",
    nome: "Mariana Costa",
    email: "mariana.costa@email.com",
    plano: "Fit mensal",
    status: "Em dia",
    vencimento: "12 nov, 2026",
    iniciais: "MC",
  },
  {
    id: "002",
    nome: "Lucas Almeida",
    email: "lucas.almeida@email.com",
    plano: "Fit anual",
    status: "Pendente",
    vencimento: "18 nov, 2026",
    iniciais: "LA",
  },
  {
    id: "003",
    nome: "Beatriz Oliveira",
    email: "beatriz.oliveira@email.com",
    plano: "Fit mensal",
    status: "Atrasado",
    vencimento: "02 out, 2026",
    iniciais: "BO",
  },
  {
    id: "004",
    nome: "Rafael Santos",
    email: "rafael.santos@email.com",
    plano: "Fit premium",
    status: "Em dia",
    vencimento: "25 nov, 2026",
    iniciais: "RS",
  },
  {
    id: "005",
    nome: "Isabela Ferreira",
    email: "isabela.ferreira@email.com",
    plano: "Fit trimestral",
    status: "Em dia",
    vencimento: "04 dez, 2026",
    iniciais: "IF",
  },
  {
    id: "006",
    nome: "Pedro Ribeiro",
    email: "pedro.ribeiro@email.com",
    plano: "Fit mensal",
    status: "Pendente",
    vencimento: "20 nov, 2026",
    iniciais: "PR",
  },
];

const statusStyles: Record<StatusPagamento, string> = {
  "Em dia": "bg-[#edf7e5] text-[#437524] ring-[#d7ebc8]",
  Pendente: "bg-amber-50 text-amber-700 ring-amber-200",
  Atrasado: "bg-rose-50 text-rose-700 ring-rose-200",
};

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4.5 4.5" strokeLinecap="round" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <circle cx="12" cy="5" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="19" r="1.5" />
    </svg>
  );
}

function RecepcionistaGerenciamentoAlunoPage() {
  const [busca, setBusca] = useState("");
  const alunosFiltrados = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase("pt-BR");
    if (!termo) return alunos;
    return alunos.filter((aluno) =>
      [aluno.nome, aluno.email, aluno.id, aluno.plano, aluno.status]
        .join(" ")
        .toLocaleLowerCase("pt-BR")
        .includes(termo),
    );
  }, [busca]);

  return (
    <section className="min-w-0 flex-1 px-4 py-7 sm:px-7 sm:py-9 lg:px-10 lg:py-10">
      <div className="mx-auto w-full max-w-[1160px]">
        <div className="mb-7 flex flex-col gap-5 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-green-700 sm:text-sm">
              Unidade FitHub
            </p>
            <h1 className="text-2xl font-bold leading-tight text-[#20251e] sm:text-3xl lg:text-[2rem]">
              Gerenciamento de alunos
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#747c70] sm:text-base">
              Consulte os alunos, acompanhe os pagamentos e mantenha os cadastros em dia.
            </p>
          </div>
          <div className="flex w-fit items-center gap-3 rounded-xl border border-[#dfe5da] bg-white px-4 py-3 shadow-[0_4px_16px_rgba(32,37,30,0.04)]">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#edf7e5] text-green-700" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="8" r="3" />
                <path d="M3.5 19v-1.5A4.5 4.5 0 0 1 8 13h2a4.5 4.5 0 0 1 4.5 4.5V19h-11ZM16 5.3a3 3 0 0 1 0 5.8M17 13a4.5 4.5 0 0 1 3.5 4.4V19h-3" />
              </svg>
            </span>
            <span>
              <span className="block text-2xl font-bold leading-none text-[#20251e]">{alunos.length}</span>
              <span className="mt-1 block text-xs text-[#747c70]">alunos cadastrados</span>
            </span>
          </div>
        </div>

        <section aria-label="Lista de alunos" className="overflow-hidden rounded-2xl border border-[#dfe5da] bg-white shadow-[0_8px_28px_rgba(32,37,30,0.06)]">
          <div className="flex flex-col gap-4 border-b border-[#e7ebe3] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">
            <div>
              <h2 className="text-base font-semibold text-[#20251e] sm:text-lg">Alunos da unidade</h2>
              <p className="mt-1 text-xs text-[#747c70] sm:text-sm">Dados de exemplo para visualização</p>
            </div>
            <label className="relative block w-full sm:max-w-[340px]">
              <span className="sr-only">Buscar alunos</span>
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[#747c70]"><SearchIcon /></span>
              <input
                type="search"
                value={busca}
                onChange={(event) => setBusca(event.target.value)}
                placeholder="Buscar por nome, plano ou status"
                className="h-11 w-full rounded-lg border border-[#dfe5da] bg-[#fbfcfa] pl-10 pr-3 text-sm text-[#20251e] outline-none transition placeholder:text-[#92998e] focus:border-green-600 focus:ring-2 focus:ring-green-600/15"
              />
            </label>
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead className="bg-[#f4f8ef] text-xs font-semibold uppercase tracking-[0.08em] text-[#59634f]">
                <tr>
                  <th scope="col" className="px-5 py-3.5">Aluno</th>
                  <th scope="col" className="px-4 py-3.5">Status do pagamento</th>
                  <th scope="col" className="px-4 py-3.5">Plano</th>
                  <th scope="col" className="px-4 py-3.5">Próximo vencimento</th>
                  <th scope="col" className="px-4 py-3.5 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf0e9]">
                {alunosFiltrados.map((aluno) => (
                  <tr key={aluno.id} className="transition-colors hover:bg-[#fbfcfa]">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f5d9] text-xs font-bold text-green-800">{aluno.iniciais}</span>
                        <span className="min-w-0">
                          <span className="block font-semibold text-[#20251e]">{aluno.nome}</span>
                          <span className="mt-0.5 block text-xs text-[#81897d]">ID {aluno.id} · {aluno.email}</span>
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[aluno.status]}`}>{aluno.status}</span></td>
                    <td className="px-4 py-4 text-[#424a3d]">{aluno.plano}</td>
                    <td className="px-4 py-4 text-[#424a3d]">{aluno.vencimento}</td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-1">
                        <button type="button" aria-label={`Editar ${aluno.nome}`} className="rounded-lg p-2 text-[#66705e] transition hover:bg-[#edf7e5] hover:text-green-800 focus-visible:outline-2 focus-visible:outline-green-700"><EditIcon /></button>
                        <button type="button" aria-label={`Mais ações para ${aluno.nome}`} className="rounded-lg p-2 text-[#66705e] transition hover:bg-[#edf7e5] hover:text-green-800 focus-visible:outline-2 focus-visible:outline-green-700"><MoreIcon /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-[#edf0e9] md:hidden">
            {alunosFiltrados.map((aluno) => (
              <article key={aluno.id} className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e8f5d9] text-xs font-bold text-green-800">{aluno.iniciais}</span>
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-[#20251e]">{aluno.nome}</h3>
                      <p className="mt-1 truncate text-xs text-[#81897d]">ID {aluno.id} · {aluno.email}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-0.5">
                    <button type="button" aria-label={`Editar ${aluno.nome}`} className="rounded-lg p-2 text-[#66705e] hover:bg-[#edf7e5] hover:text-green-800"><EditIcon /></button>
                    <button type="button" aria-label={`Mais ações para ${aluno.nome}`} className="rounded-lg p-2 text-[#66705e] hover:bg-[#edf7e5] hover:text-green-800"><MoreIcon /></button>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 border-t border-[#edf0e9] pt-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-[#81897d]">Pagamento</p>
                    <span className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[aluno.status]}`}>{aluno.status}</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-[#81897d]">Plano</p>
                    <p className="mt-1 text-xs font-medium text-[#424a3d]">{aluno.plano}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-[#81897d]">Próximo vencimento</p>
                    <p className="mt-1 text-xs font-medium text-[#424a3d]">{aluno.vencimento}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {alunosFiltrados.length === 0 && (
            <p className="px-4 py-12 text-center text-sm text-[#747c70]">
              Nenhum aluno encontrado para “{busca}”.
            </p>
          )}

          <div className="flex flex-col gap-2 border-t border-[#e7ebe3] bg-[#fbfcfa] px-4 py-3 text-xs text-[#747c70] sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <span>Exibindo {alunosFiltrados.length} de {alunos.length} alunos</span>
            <span>Lista estática para validação do layout</span>
          </div>
        </section>
      </div>
    </section>
  );
}

export default RecepcionistaGerenciamentoAlunoPage;
