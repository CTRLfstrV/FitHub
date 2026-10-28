import type { ReactNode } from "react";

type CampoConfiguracoesUsuarioProps = {
  id: string;
  rotulo: string;
  children: ReactNode;
  className?: string;
};

export const classesInputConfiguracoesSemMargem =
  "h-12 w-full rounded-xl border border-[#d9dfd5] bg-white px-3.5 text-sm text-[#20251e] outline-none transition placeholder:text-[#939a8e] focus:border-[#83b943] focus:ring-[3px] focus:ring-[#79b82d]/15 disabled:cursor-not-allowed disabled:bg-[#f6f8f4] disabled:text-[#81897d]";

export const classesInputConfiguracoes = `mt-3 ${classesInputConfiguracoesSemMargem}`;

function CampoConfiguracoesUsuario({
  id,
  rotulo,
  children,
  className = "",
}: CampoConfiguracoesUsuarioProps) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-[#343b2e]"
      >
        {rotulo}
      </label>
      {children}
    </div>
  );
}

export default CampoConfiguracoesUsuario;
