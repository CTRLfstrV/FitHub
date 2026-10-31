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
    <article className="group relative flex min-h-[272px] flex-col overflow-hidden rounded-[1.35rem] border border-[#d9dedb] bg-gradient-to-br from-white via-white to-[#f3f8ee] p-5 shadow-[0_2px_8px_rgba(32,37,30,0.04),0_12px_28px_rgba(32,37,30,0.035)] transition duration-300 hover:-translate-y-1 hover:border-[#d9dedb] hover:shadow-[0_8px_18px_rgba(32,37,30,0.055),0_20px_38px_rgba(55,91,39,0.11)] sm:p-6">
      <div
        className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#a6ca83] via-[#4d873f] to-[#b7d892]"
        aria-hidden="true"
      />

      <div className="flex items-center justify-between gap-3 pt-1">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4f8843] to-[#2f6938] text-white shadow-[0_5px_12px_rgba(52,104,54,0.2)] ring-1 ring-inset ring-[#d9dedb] transition duration-300 group-hover:from-[#5b964b] group-hover:to-[#34723d]">
          <IconePlano className="h-9 w-9" />
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-[#edf5e6] px-3 py-1.5 text-xs font-bold tabular-nums text-[#3f6e38] ring-1 ring-inset ring-[#d9dedb]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#579247]" aria-hidden="true" />
          Plano #{plano.id}
        </span>
      </div>

      <div className="mt-5 min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8a9384]">
          Plano FitHub
        </p>
        <h2 className="mt-1.5 min-h-[3.25rem] break-words text-lg font-bold leading-snug tracking-tight text-[#252b21] sm:text-xl">
          {plano.nome}
        </h2>
      </div>

      <div className="mt-4 rounded-2xl border border-[#d9dedb] bg-gradient-to-br from-[#f1f7e9] to-[#e9f3df] px-4 py-3.5 transition-colors group-hover:border-[#d9dedb] group-hover:from-[#edf5e4] group-hover:to-[#e3f0d8]">
        <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#55714d]">
          Valor cadastrado
        </p>
        <p className="mt-1 text-[1.7rem] font-extrabold leading-tight tracking-[-0.045em] text-[#2e6938] tabular-nums sm:text-[1.85rem]">
          {moeda.format(plano.valor)}
        </p>
      </div>

      <div className="mt-auto flex items-center gap-1 border-t border-[#d9dedb] pt-3.5">
        <button
          type="button"
          aria-label={`Ver detalhes do plano ${plano.nome}`}
          className="inline-flex min-h-10 min-w-0 flex-1 items-center justify-start gap-2 rounded-xl bg-[#eaf3e2] px-3 text-sm font-bold text-[#356b37] transition-colors hover:bg-[#dceccd] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#527d3e]"
        >
          Ver detalhes
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14m-6-6 6 6-6 6" />
          </svg>
        </button>
        <span className="h-6 w-px bg-[#d9dedb]" aria-hidden="true" />
        <button
          type="button"
          aria-label={`Editar plano ${plano.nome}`}
          title="Editar plano"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[#5e7d55] transition-colors hover:bg-[#e5f0dc] hover:text-[#326735] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#527d3e]"
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
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[#74836e] transition-colors hover:bg-[#fbf0ec] hover:text-[#9b5144] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b4437]"
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
