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
      <article className="fithub-card fithub-card-interactive p-4 sm:p-5">
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

      <article className="fithub-card fithub-card-interactive p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#788270]">
          Valor do contrato
        </p>
        <p className="mt-3 text-2xl font-extrabold tracking-tight text-[#2f6f31] sm:text-3xl">
          {moeda.format(contrato.valorContrato)}
        </p>
        <p className="mt-2 text-sm text-[#66705e]">Valor total contratado</p>
      </article>

      <article className="fithub-card fithub-card-interactive p-4 sm:p-5">
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
