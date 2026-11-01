import type { PlanoDetalhesResponseDTO } from "../../../../types/financeiro/plano/PlanoDetalhesResponseDTO";

const moeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function ResumoDetalhesPlano({ plano }: { plano: PlanoDetalhesResponseDTO }) {
  return (
    <section
      aria-label="Resumo do plano"
      className="mb-6 grid gap-3 sm:mb-8 sm:grid-cols-2 sm:gap-4"
    >
      <article className="fithub-card fithub-card-interactive p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#788270]">
              Valor cadastrado
            </p>
            <p className="mt-3 text-2xl font-extrabold tracking-tight text-[#2f6f31] sm:text-3xl">
              {moeda.format(plano.valor)}
            </p>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-green-700 ring-1 ring-inset ring-[#e0ecd6]">
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
              <path d="M12 2.75v18.5M16.5 7.25c0-1.8-1.8-3-4.5-3s-4.5 1.2-4.5 3 1.8 2.75 4.5 3.5 4.5 1.7 4.5 3.5-1.8 3-4.5 3-4.5-1.2-4.5-3" />
            </svg>
          </span>
        </div>
        <p className="mt-2 text-sm text-[#66705e]">Preço informado no cadastro</p>
      </article>

      <article className="fithub-card fithub-card-interactive p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#788270]">
          Contratos vinculados
        </p>
        <p className="mt-3 text-2xl font-extrabold tracking-tight text-[#2f6f31] sm:text-3xl">
          {String(plano.contratos.length).padStart(2, "0")}
        </p>
        <p className="mt-2 text-sm text-[#66705e]">
          {plano.contratos.length === 1
            ? "Contrato associado ao plano"
            : "Contratos associados ao plano"}
        </p>
      </article>
    </section>
  );
}

export default ResumoDetalhesPlano;
