import { useState, type FormEvent } from "react";
import type { PlanoCadastroDTO } from "../../../../types/financeiro/plano/PlanoCadastroDTO";

type FormularioCadastroPlanoProps = {
  onCancelar: () => void;
  onSalvar: (plano: PlanoCadastroDTO) => Promise<void>;
};

function FormularioCadastroPlano({
  onCancelar,
  onSalvar,
}: FormularioCadastroPlanoProps) {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function enviarFormulario(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMensagemErro("");

    const nomePlano = nome.trim();
    const valorPlano = Number(valor);

    if (!nomePlano) {
      setMensagemErro("Informe o nome do plano.");
      return;
    }

    if (!Number.isFinite(valorPlano) || valorPlano <= 0) {
      setMensagemErro("Informe um valor maior que zero.");
      return;
    }

    setSalvando(true);

    try {
      await onSalvar({ nome: nomePlano, valor: valorPlano });
      onCancelar();
    } catch {
      setMensagemErro("Não foi possível cadastrar o plano. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <form className="px-6 py-7 sm:px-8 sm:py-8" onSubmit={enviarFormulario}>
      <div className="space-y-6">
        <label className="block">
          <span className="mb-2.5 block text-sm font-semibold text-[#30382c]">
            Nome do plano <span className="text-red-600">*</span>
          </span>
          <div className="relative">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#87927f]"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m20.6 13.4-7.2 7.2a2 2 0 0 1-2.8 0L3.4 13.4a2 2 0 0 1 0-2.8l7.2-7.2A2 2 0 0 1 12 2.8h7a2 2 0 0 1 2 2v7a2 2 0 0 1-.4 1.6Z" />
              <circle cx="16.5" cy="7.5" r="1" />
            </svg>
            <input
              autoFocus
              required
              maxLength={100}
              name="nome"
              type="text"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              placeholder="Ex.: Plano mensal"
              className="min-h-14 w-full rounded-2xl border border-[#e0e7dc] bg-[#f9fbf7] pl-12 pr-4 text-sm text-[#252b21] outline-none transition placeholder:text-[#9aa393] hover:border-[#cbd9c3] focus:border-[#4d8052] focus:bg-white focus:ring-4 focus:ring-[#4d8052]/10"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-2.5 block text-sm font-semibold text-[#30382c]">
            Valor do plano <span className="text-red-600">*</span>
          </span>
          <div className="flex min-h-14 items-center overflow-hidden rounded-2xl border border-[#e0e7dc] bg-[#f9fbf7] transition hover:border-[#cbd9c3] focus-within:border-[#4d8052] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#4d8052]/10">
            <span className="ml-3 inline-flex h-8 items-center rounded-lg bg-[#edf4e9] px-2.5 text-xs font-bold text-[#416b45]">
              R$
            </span>
            <input
              required
              min="0.01"
              step="0.01"
              name="valor"
              type="number"
              inputMode="decimal"
              value={valor}
              onChange={(event) => setValor(event.target.value)}
              placeholder="0,00"
              aria-describedby="ajuda-valor-plano"
              className="h-14 min-w-0 flex-1 bg-transparent px-3 text-sm text-[#252b21] outline-none placeholder:text-[#9aa393]"
            />
          </div>
          <span id="ajuda-valor-plano" className="mt-2 block text-xs text-[#7b8676]">
            Valor em reais para este plano.
          </span>
        </label>
      </div>

      {mensagemErro && (
        <p
          className="mt-5 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700"
          role="alert"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="mt-0.5 h-4 w-4 shrink-0"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v4m0 4h.01" />
          </svg>
          {mensagemErro}
        </p>
      )}

      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#edf0e9] pt-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancelar}
          disabled={salvando}
          className="min-h-12 cursor-pointer rounded-xl border border-[#dce4d7] bg-white px-5 text-sm font-semibold text-[#586252] transition hover:border-[#bdcdb4] hover:bg-[#f8faf6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4d8052] disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={salvando}
          className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#245b37] px-5 text-sm font-bold text-white shadow-[0_7px_16px_rgba(36,91,55,0.18)] transition hover:bg-[#1e4d2e] hover:shadow-[0_9px_20px_rgba(36,91,55,0.24)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4d8052] disabled:cursor-wait disabled:opacity-70"
        >
          {salvando ? "Cadastrando..." : "Cadastrar plano"}
          {!salvando && (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}

export default FormularioCadastroPlano;
