import IndicadorRecepcionistaDashboard from "./IndicadorRecepcionistaDashboard";

interface IndicadoresRecepcionistaDashboardProps {
  quantidadeAlunos: number | null | undefined;
  quantidadeContratosAtivos: number | null | undefined;
  quantidadeAlunosAtivos: number | null | undefined;
  mensagemErro: string;
}

function IndicadoresRecepcionistaDashboard({
  quantidadeAlunos,
  quantidadeContratosAtivos,
  quantidadeAlunosAtivos,
  mensagemErro,
}: IndicadoresRecepcionistaDashboardProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
      <IndicadorRecepcionistaDashboard
        titulo="Total de alunos"
        valor={quantidadeAlunos ?? mensagemErro}
        legenda="Alunos cadastrados na unidade"
        corFaixa="bg-green-600"
        corIcone="bg-[#edf7e5] text-green-800 ring-[#d7ebc8]"
        icone={
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="8" r="3" />
            <path d="M3.5 19v-1.5A4.5 4.5 0 0 1 8 13h2a4.5 4.5 0 0 1 4.5 4.5V19h-11ZM16 5.3a3 3 0 0 1 0 5.8M17 13a4.5 4.5 0 0 1 3.5 4.4V19h-3" />
          </svg>
        }
      />
      <IndicadorRecepcionistaDashboard
        titulo="Alunos com contrato ativo"
        valor={quantidadeContratosAtivos ?? mensagemErro}
        legenda="Contratos vigentes"
        corFaixa="bg-[#8acb58]"
        corIcone="bg-[#f2f8ec] text-[#5c9139] ring-[#dfead5]"
        icone={
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 3.75h7l4 4V20a1.25 1.25 0 0 1-1.25 1.25h-9.5A1.25 1.25 0 0 1 6 20V5a1.25 1.25 0 0 1 1-1.25Z" />
            <path d="M14 4v4h4M9 13l2 2 4-4" />
          </svg>
        }
      />
      <IndicadorRecepcionistaDashboard
        titulo="Alunos ativos"
        valor={quantidadeAlunosAtivos ?? mensagemErro}
        legenda="Alunos ativos no sistema"
        corFaixa="bg-[#b4dc8f]"
        corIcone="bg-[#f6faef] text-[#719d4d] ring-[#e3ecd8]"
        icone={
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 17 9 11l4 4 8-9" />
            <path d="M15 6h6v6" />
          </svg>
        }
      />
    </div>
  );
}

export default IndicadoresRecepcionistaDashboard;
