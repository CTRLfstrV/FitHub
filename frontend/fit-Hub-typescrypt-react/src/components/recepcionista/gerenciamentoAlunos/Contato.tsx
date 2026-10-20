import Icon from "./Icon";

function Contato({
  nome,
  email,
  compacto = false,
}: {
  nome: string;
  email: string;
  compacto?: boolean;
}) {
  return (
    <a
      href={`mailto:${email}`}
      aria-label={`Enviar e-mail para ${nome}`}
      className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-lg px-3 py-2 font-semibold text-green-800 transition-colors focus-visible:outline-2 focus-visible:outline-green-700 ${compacto ? "border border-[#dfe5da] text-sm hover:bg-[#f2f8ec]" : "text-xs hover:bg-[#edf7e5]"}`}
    >
      <Icon nome="email" className="h-4 w-4" />
      {compacto ? "Contatar" : "Enviar e-mail"}
    </a>
  );
}

export default Contato;
