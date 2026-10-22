export const planosMatricula = [
  {
    id: "mensal",
    nome: "Mensal",
    valorMensal: 129.9,
    duracaoMeses: 1,
    descricao: "Cobrança recorrente",
  },
  {
    id: "trimestral",
    nome: "Trimestral",
    valorMensal: 109.9,
    duracaoMeses: 3,
    descricao: "3 meses garantidos",
  },
  {
    id: "anual-vip",
    nome: "Anual VIP",
    valorMensal: 89.9,
    duracaoMeses: 12,
    descricao: "Acesso total + avaliação",
  },
] as const;

export type CodigoPlanoMatricula = (typeof planosMatricula)[number]["id"];

type OpcoesPlanoMatriculaProps = {
  planoSelecionado: CodigoPlanoMatricula;
  onSelecionar: (plano: CodigoPlanoMatricula) => void;
};

const moeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function OpcoesPlanoMatricula({
  planoSelecionado,
  onSelecionar,
}: OpcoesPlanoMatriculaProps) {
  return (
    <fieldset className="sm:col-span-2">
      <legend className="mb-3 text-sm font-semibold text-[#343b2e]">
        Selecione o pacote / plano <span className="text-red-600">*</span>
      </legend>
      <div className="grid gap-6 md:grid-cols-3 md:gap-8">
        {planosMatricula.map((plano) => {
          const selecionado = plano.id === planoSelecionado;

          return (
            <label key={plano.id} className="group relative block cursor-pointer">
              <input
                className="peer sr-only"
                type="radio"
                name="plano_selecionado"
                value={plano.id}
                checked={selecionado}
                onChange={() => onSelecionar(plano.id)}
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
                  {moeda.format(plano.valorMensal)}
                  {plano.duracaoMeses > 1 && (
                    <span className="ml-1 text-xs font-medium text-[#788270]">
                      /mês
                    </span>
                  )}
                </span>
                <span className="mt-2 text-xs text-[#788270]">
                  {plano.descricao}
                </span>
                <span className="mt-1 text-[11px] font-medium text-[#788270]">
                  {plano.duracaoMeses} {plano.duracaoMeses === 1 ? "mês" : "meses"}
                </span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default OpcoesPlanoMatricula;
