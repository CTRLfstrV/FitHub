function CabecalhoVisaoGeralPlanos() {
  return (
    <header className="mb-7 rounded-2xl border border-[#dcebd0] bg-gradient-to-br from-[#f3f9ed] via-white to-[#e8f5d9] px-5 py-6 shadow-[0_8px_28px_rgba(65,104,32,0.06)] sm:mb-8 sm:px-8 sm:py-8 lg:px-10 lg:py-9">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="min-w-0 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#cfe4bd] bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-green-800 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
            Gestão de planos
          </span>
          <h1 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-[#20251e] sm:text-3xl lg:text-4xl">
            Planos e pacotes
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#66705e] sm:text-base">
            Consulte os planos disponíveis e seus valores cadastrados.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-green-700 bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:border-green-800 hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 sm:w-auto"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Adicionar plano
        </button>
      </div>
    </header>
  );
}

export default CabecalhoVisaoGeralPlanos;
