import type { PlanoResponseDTO } from "../../../types/financeiro/plano/PlanoResponseDTO";

type OpcoesPlanoMatriculaProps = {
  planos: PlanoResponseDTO[];
  planoSelecionado: number | null;
  carregando: boolean;
  onSelecionar: (plano: number) => void;
};

const moeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function OpcoesPlanoMatricula({
  planos,
  planoSelecionado,
  carregando,
  onSelecionar,
}: OpcoesPlanoMatriculaProps) {
  return (
    <fieldset className="sm:col-span-2">
      <legend className="mb-3 text-sm font-semibold text-[#343b2e]">
        Selecione o pacote / plano <span className="text-red-600">*</span>
      </legend>
      {carregando ? (
        <p className="rounded-xl border border-[#e1e7dc] bg-white px-4 py-5 text-sm text-[#788270]">
          Carregando planos...
        </p>
      ) : planos.length === 0 ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-5 text-sm text-amber-800">
          Nenhum plano disponível.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {planos.map((plano) => {
            const selecionado = plano.id === planoSelecionado;

            return (
              <label key={plano.id} className="group relative block cursor-pointer">
                <input
                  className="peer sr-only"
                  type="radio"
                  name="idPlano"
                  value={plano.id}
                  checked={selecionado}
                  onChange={() => onSelecionar(plano.id)}
                  required
                />
                <span
                  className={`relative flex min-h-[132px] flex-col items-center justify-center rounded-2xl border px-4 py-5 text-center transition duration-200 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-green-700 ${
                    selecionado
                      ? "border-green-700 bg-[#f3f9ed] shadow-[0_8px_22px_rgba(65,104,32,0.10)]"
                      : "border-[#e1e7dc] bg-white hover:-translate-y-0.5 hover:border-[#a8c88b] hover:bg-[#fbfdf9]"
                  }`}
                >
                  <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#4c5843]">
                    {plano.nome}
                  </span>
                  <span className="mt-2 text-xl font-extrabold tracking-tight text-green-800 sm:text-2xl">
                    {moeda.format(plano.valor)}
                  </span>
                  <span className="mt-2 text-xs text-[#788270]">
                    Valor cadastrado para este plano
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      )}
    </fieldset>
  );
}

export default OpcoesPlanoMatricula;
