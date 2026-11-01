import type { ReactNode } from "react";

interface IndicadorRecepcionistaDashboardProps {
  titulo: string;
  valor: number | string;
  legenda: string;
  corIcone: string;
  icone: ReactNode;
}

function IndicadorRecepcionistaDashboard({
  titulo,
  valor,
  legenda,
  corIcone,
  icone,
}: IndicadorRecepcionistaDashboardProps) {
  return (
    <article className="fithub-card fithub-card-interactive relative overflow-hidden p-4 sm:p-5">
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
