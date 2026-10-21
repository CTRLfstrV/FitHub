import Icon from "./Icon";

function CabecalhoGerenciamentoAlunos() {
  return (
    <header className="relative mb-6 overflow-hidden rounded-2xl border border-[#dcebd0] bg-gradient-to-br from-[#f3f9ed] via-white to-[#e8f5d9] px-5 py-6 shadow-[0_8px_28px_rgba(65,104,32,0.06)] sm:mb-8 sm:px-8 sm:py-8 lg:px-10 lg:py-9">
      <div className="relative z-10 max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#cfe4bd] bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-green-800 sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
          Painel da recepção
        </span>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-[#20251e] sm:text-3xl lg:text-4xl">
          Gerenciamento de alunos
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-[#66705e] sm:text-base">
          Consulte os alunos e acompanhe os pagamentos dos contratos ativos.
        </p>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-16 hidden h-72 w-72 rounded-full border-[34px] border-green-700/[0.06] sm:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-10 top-1/2 hidden -translate-y-1/2 text-green-800/[0.12] lg:block"
      >
        <Icon nome="alunos" className="h-28 w-28" />
      </div>
    </header>
  );
}

export default CabecalhoGerenciamentoAlunos;
