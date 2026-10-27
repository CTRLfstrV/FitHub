import type { DetalhesAlunoResponseDTO } from "../../../types/financeiro/DetalhesAlunoResponseDTO";

const moeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function ResumoContratoAluno({ contrato }: { contrato: DetalhesAlunoResponseDTO }) {
  return (
    <section
      aria-label="Resumo do contrato"
      className="mb-6 grid gap-3 sm:mb-8 sm:grid-cols-3 sm:gap-4"
    >
      <article className="rounded-2xl border border-[#dcebd0] border-t-4 border-t-green-600 bg-gradient-to-br from-[#f3f9ed] to-white p-5 shadow-[0_10px_28px_rgba(65,104,32,0.08)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(65,104,32,0.12)] sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#788270]">
              Plano contratado
            </p>
            <p className="mt-3 text-xl font-bold text-[#20251e]">
              {contrato.nomePlano}
            </p>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-green-700 ring-1 ring-inset ring-[#e0ecd6]">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Z" />
              <path d="m4.5 7.8 7.5 4.4 7.5-4.4M12 21v-8.8" />
            </svg>
          </span>
        </div>
        <p className="mt-2 text-sm text-[#66705e]">Modalidade do contrato</p>
      </article>

      <article className="relative overflow-hidden rounded-2xl border border-[#dcebd0] border-t-4 border-t-[#7eaf45] bg-gradient-to-br from-white to-[#f6faef] p-5 shadow-[0_10px_28px_rgba(65,104,32,0.07)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(65,104,32,0.11)] sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#788270]">
          Valor do contrato
        </p>
        <p className="mt-3 text-2xl font-extrabold tracking-tight text-[#2f6f31] sm:text-3xl">
          {moeda.format(contrato.valorContrato)}
        </p>
        <p className="mt-2 text-sm text-[#66705e]">Valor total contratado</p>
      </article>

      <article className="relative overflow-hidden rounded-2xl border border-[#dcebd0] border-t-4 border-t-[#b2cf73] bg-gradient-to-br from-white to-[#f8faef] p-5 shadow-[0_10px_28px_rgba(65,104,32,0.07)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(65,104,32,0.11)] sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#788270]">
          Parcelas registradas
        </p>
        <p className="mt-3 text-2xl font-extrabold tracking-tight text-[#2f6f31] sm:text-3xl">
          {String(contrato.pagamentos.length).padStart(2, "0")}
        </p>
        <p className="mt-2 text-sm text-[#66705e]">No histórico de pagamentos</p>
      </article>
    </section>
  );
}

export default ResumoContratoAluno;
