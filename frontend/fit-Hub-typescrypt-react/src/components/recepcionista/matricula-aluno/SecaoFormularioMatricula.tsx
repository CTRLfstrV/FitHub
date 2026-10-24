import type { ReactNode } from "react";

type SecaoFormularioMatriculaProps = {
  numero: string;
  titulo: string;
  descricao: string;
  children: ReactNode;
  resumo?: ReactNode;
};

function SecaoFormularioMatricula({
  numero,
  titulo,
  descricao,
  children,
  resumo,
}: SecaoFormularioMatriculaProps) {
  return (
    <section className="rounded-2xl border border-[#e4e9df] bg-white p-6 shadow-[0_8px_24px_rgba(34,44,27,0.035)] sm:p-7 lg:p-8">
      <div className="mb-7 flex flex-col gap-5 border-b border-[#edf0e9] pb-6 sm:mb-8 sm:flex-row sm:items-start sm:justify-between sm:gap-7 sm:pb-7">
        <div className="flex items-start gap-3 sm:gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8f5d9] text-sm font-bold text-green-800">
            {numero}
          </span>
          <div>
            <h2 className="text-lg font-bold text-[#20251e] sm:text-xl">{titulo}</h2>
            <p className="mt-1 text-sm leading-5 text-[#788270]">{descricao}</p>
          </div>
        </div>
        {resumo}
      </div>
      <div className="grid gap-x-7 gap-y-7 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-8">
        {children}
      </div>
    </section>
  );
}

export default SecaoFormularioMatricula;
