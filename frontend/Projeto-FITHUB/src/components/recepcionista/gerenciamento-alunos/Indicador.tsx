import type { ReactNode } from "react";

const coresIndicador = {
  green: {
    icone: "bg-[#edf7e5] text-green-800 ring-[#d7ebc8]",
  },
  amber: {
    icone: "bg-amber-50 text-amber-700 ring-amber-200",
  },
  rose: {
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
    <article className="fithub-card fithub-card-interactive relative overflow-hidden p-4 sm:p-5">
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
