import type { ReactNode } from "react";

type CampoFormularioMatriculaProps = {
  id: string;
  rotulo: string;
  dica?: string;
  children: ReactNode;
  className?: string;
};

const classesControleMatricula =
  "h-12 w-full rounded-xl border border-[#d9dfd5] bg-white px-3.5 text-sm text-[#20251e] outline-none transition placeholder:text-[#939a8e] focus:border-[#83b943] focus:ring-[3px] focus:ring-[#79b82d]/15 disabled:cursor-not-allowed disabled:bg-[#f6f8f4] disabled:text-[#81897d]";

export const classesCampoMatricula = `mt-3 ${classesControleMatricula}`;
export const classesCampoMatriculaSemMargem = classesControleMatricula;

function CampoFormularioMatricula({
  id,
  rotulo,
  dica,
  children,
  className = "",
}: CampoFormularioMatriculaProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-semibold text-[#343b2e]">
        {rotulo}
      </label>
      {children}
      {dica && (
        <p id={`${id}-dica`} className="mt-1.5 text-xs leading-5 text-[#788270]">
          {dica}
        </p>
      )}
    </div>
  );
}

export default CampoFormularioMatricula;
