import iniciais from "./iniciais";

function Pessoa({
  nome,
  email,
  compacto = false,
}: {
  nome: string;
  email: string;
  compacto?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span
        className={`flex shrink-0 items-center justify-center rounded-full bg-[#e8f5d9] font-bold text-green-800 ${compacto ? "h-11 w-11 text-sm" : "h-10 w-10 text-xs"}`}
      >
        {iniciais(nome)}
      </span>
      <span className="min-w-0">
        <span
          className={`block font-semibold text-[#20251e] ${compacto ? "truncate text-sm" : "text-sm"}`}
        >
          {nome}
        </span>
        <span
          className={`mt-0.5 block truncate text-[#81897d] ${compacto ? "text-sm" : "text-xs"}`}
        >
          {email}
        </span>
      </span>
    </div>
  );
}

export default Pessoa;
