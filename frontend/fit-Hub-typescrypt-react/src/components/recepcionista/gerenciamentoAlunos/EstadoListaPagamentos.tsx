interface EstadoListaPagamentosProps {
  carregando: boolean;
  mensagemErro: string | null;
  estadoVazio: string;
  onTentarNovamente: () => void;
}

function EstadoListaPagamentos({
  carregando,
  mensagemErro,
  estadoVazio,
  onTentarNovamente,
}: EstadoListaPagamentosProps) {
  return (
    <div className="flex min-h-44 flex-col items-center justify-center gap-3 px-5 py-10 text-center">
      {carregando && (
        <span
          className="h-7 w-7 animate-spin rounded-full border-2 border-[#dcebd0] border-t-green-700"
          role="status"
          aria-label="Carregando pagamentos"
        />
      )}
      <p
        className={`max-w-lg text-sm ${mensagemErro ? "text-rose-700" : "text-[#747c70]"}`}
        role={mensagemErro ? "alert" : "status"}
      >
        {estadoVazio}
      </p>
      {mensagemErro && (
        <button
          type="button"
          onClick={onTentarNovamente}
          className="inline-flex min-h-10 items-center justify-center rounded-lg border border-green-700 bg-white px-4 py-2 text-sm font-semibold text-green-800 transition-colors hover:bg-[#f2f8ec] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}

export default EstadoListaPagamentos;
