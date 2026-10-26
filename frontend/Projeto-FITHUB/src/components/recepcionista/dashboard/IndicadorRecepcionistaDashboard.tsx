import type { ReactNode } from "react";

interface IndicadorRecepcionistaDashboardProps {
  titulo: string;
  valor: number | string;
  legenda: string;
  corFaixa: string;
  corIcone: string;
  icone: ReactNode;
}

function IndicadorRecepcionistaDashboard({
  titulo,
  valor,
  legenda,
  corFaixa,
  corIcone,
  icone,
}: IndicadorRecepcionistaDashboardProps) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-[#dfe5da] bg-white p-5 shadow-[0_5px_20px_rgba(32,37,30,0.045)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(32,37,30,0.08)] sm:p-6">
      <div className={`absolute inset-x-0 top-0 h-1 ${corFaixa}`} />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#66705e]">{titulo}</p>
          <p className="mt-4 text-4xl font-bold leading-none tracking-tight text-[#20251e] sm:text-[2.65rem]">
            {valor}
          </p>
          <p className="mt-3 text-xs text-[#81897d]">{legenda}</p>
        </div>
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset ${corIcone}`}
          aria-hidden="true"
        >
          {icone}
        </div>
      </div>
    </article>
  );
}

export default IndicadorRecepcionistaDashboard;
