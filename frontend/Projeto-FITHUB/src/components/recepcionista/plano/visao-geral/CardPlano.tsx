import type { PlanoResponseDTO } from "../../../../types/financeiro/PlanoResponseDTO";
import IconePlano from "./IconePlano";

type CardPlanoProps = {
  plano: PlanoResponseDTO;
};

const moeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function CardPlano({ plano }: CardPlanoProps) {
  return (
    <article className="group relative flex h-full min-h-[304px] flex-col overflow-hidden rounded-[1.75rem] border border-[#dfe6dc] bg-white p-4 shadow-[0_2px_5px_rgba(30,49,32,0.035),0_10px_28px_rgba(30,49,32,0.045)] transition-[transform,box-shadow,border-color] duration-300 motion-safe:hover:-translate-y-1 hover:border-[#c8d9c0] hover:shadow-[0_5px_12px_rgba(30,49,32,0.05),0_20px_42px_rgba(30,70,42,0.11)] motion-reduce:transition-none sm:p-5">
      <div className="relative flex items-center justify-between overflow-hidden rounded-[1.25rem] bg-[#eff5eb] px-4 py-3.5">
        <span
          className="pointer-events-none absolute -right-5 -top-10 h-28 w-28 rounded-full bg-[#dcebd3]/70 transition-transform duration-500 group-hover:scale-110 motion-reduce:transition-none"
          aria-hidden="true"
        />
        <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#3f7846] shadow-[0_2px_8px_rgba(40,76,43,0.09)] ring-1 ring-inset ring-[#e1eadd]">
          <IconePlano className="h-9 w-9" />
        </span>
        <span className="relative inline-flex min-h-8 items-center rounded-full bg-white/85 px-3 text-xs font-semibold tracking-wide text-[#4b6750] ring-1 ring-inset ring-[#dce7d7]">
          Plano #{plano.id}
        </span>
      </div>

      <div className="mt-5 min-w-0 px-1">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#708073]">
          FitHub · plano
        </p>
        <h2 className="mt-1.5 min-h-[3.5rem] break-words text-xl font-bold leading-snug tracking-[-0.025em] text-[#202a22] sm:text-[1.35rem]">
          {plano.nome}
        </h2>
      </div>

      <div className="mt-4 rounded-2xl bg-[#f6f8f4] px-4 py-3.5 ring-1 ring-inset ring-[#edf0ea]">
        <p className="text-xs font-medium text-[#68776b]">Valor cadastrado</p>
        <p className="mt-1 text-[1.8rem] font-extrabold leading-tight tracking-[-0.05em] text-[#2e693d] tabular-nums sm:text-[1.95rem]">
          {moeda.format(plano.valor)}
        </p>
      </div>

      <div className="mt-auto flex items-center gap-1 border-t border-[#edf0ea] pt-3.5">
        <button
          type="button"
          aria-label={`Ver detalhes do plano ${plano.nome}`}
          className="inline-flex min-h-11 min-w-0 flex-1 items-center justify-start gap-2 rounded-full px-3 text-sm font-bold text-[#356b3e] transition-colors hover:bg-[#edf5e9] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#527d3e] motion-reduce:transition-none"
        >
          Ver detalhes
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14m-6-6 6 6-6 6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label={`Editar plano ${plano.nome}`}
          title="Editar plano"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#5e7561] transition-colors hover:bg-[#edf5e9] hover:text-[#326735] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#527d3e] motion-reduce:transition-none"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-[1.15rem] w-[1.15rem]"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m14.5 5.5 4 4M4.5 19.5l4-.8L18.8 8.4a2.05 2.05 0 0 0-2.9-2.9L5.3 16.1l-.8 3.4Z" />
          </svg>
        </button>
        <button
          type="button"
          aria-label={`Excluir plano ${plano.nome}`}
          title="Excluir plano"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#69776c] transition-colors hover:bg-[#fbefec] hover:text-[#9b5144] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b4437] motion-reduce:transition-none"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-[1.15rem] w-[1.15rem]"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4.5 7h15M9 7V5.2c0-.4.3-.7.7-.7h4.6c.4 0 .7.3.7.7V7M6.5 7.5l.8 11.1c.1.8.7 1.4 1.5 1.4h6.4c.8 0 1.4-.6 1.5-1.4l.8-11.1M10 10.5v5.8m4-5.8v5.8" />
          </svg>
        </button>
      </div>
    </article>
  );
}

export default CardPlano;
