import type { ReactNode } from "react";

type CabecalhoSecaoConfiguracoesProps = {
  numero: string;
  titulo: string;
  descricao: string;
  acao?: ReactNode;
};

function CabecalhoSecaoConfiguracoes({
  numero,
  titulo,
  descricao,
  acao,
}: CabecalhoSecaoConfiguracoesProps) {
  return (
    <div className="mb-7 flex flex-col gap-5 border-b border-[#edf0e9] pb-6 sm:mb-8 sm:flex-row sm:items-start sm:justify-between sm:gap-7 sm:pb-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-7">
        <div className="flex items-start gap-3 sm:gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8f5d9] text-sm font-bold text-green-800">
            {numero}
          </span>
          <div>
            <h2 className="text-lg font-bold text-[#20251e] sm:text-xl">
              {titulo}
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-5 text-[#788270]">
              {descricao}
            </p>
          </div>
        </div>
        {acao}
      </div>
    </div>
  );
}

export default CabecalhoSecaoConfiguracoes;
