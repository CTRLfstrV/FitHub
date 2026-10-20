import type { ReactNode } from "react";

const coresIndicador = {
  green: {
    faixa: "bg-green-600",
    icone: "bg-[#edf7e5] text-green-800 ring-[#d7ebc8]",
  },
  amber: {
    faixa: "bg-amber-400",
    icone: "bg-amber-50 text-amber-700 ring-amber-200",
  },
  rose: {
    faixa: "bg-rose-400",
    icone: "bg-rose-50 text-rose-700 ring-rose-200",
  },
};

export type CorIndicador = keyof typeof coresIndicador;

function Indicador({
  titulo,
  valor,
  legenda,
  cor,
  icone,
}: {
  titulo: string;
  valor: string | number;
  legenda: string;
  cor: CorIndicador;
  icone: ReactNode;
}) {
  const cores = coresIndicador[cor];
  return (
    <article className="relative overflow-hidden rounded-2xl border border-[#dfe5da] bg-white p-5 shadow-[0_5px_20px_rgba(32,37,30,0.045)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(32,37,30,0.08)] sm:p-6">
      <div className={`absolute inset-x-0 top-0 h-1 ${cores.faixa}`} />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#66705e]">{titulo}</p>
          <p className="mt-4 text-4xl font-bold leading-none tracking-tight text-[#20251e] sm:text-[2.65rem]">
            {valor}
          </p>
          <p className="mt-3 text-sm text-[#81897d] sm:text-xs">{legenda}</p>
        </div>
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset ${cores.icone}`}
          aria-hidden="true"
        >
          {icone}
        </span>
      </div>
    </article>
  );
}

export default Indicador;
