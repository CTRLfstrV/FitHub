import getStatus from "./getStatus";

function BadgeStatus({
  status,
  compacto = false,
}: {
  status: number;
  compacto?: boolean;
}) {
  const detalhe = getStatus(status);
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full px-3 py-1.5 font-semibold leading-none ring-1 ring-inset ${compacto ? "text-sm" : "text-xs"} ${detalhe.classe}`}
    >
      <span className={`h-2 w-2 shrink-0 rounded-full ${detalhe.ponto}`} />
      {detalhe.nome}
    </span>
  );
}

export default BadgeStatus;
