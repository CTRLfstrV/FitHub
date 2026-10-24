const statusPagamento: Record<
  number,
  { nome: string; classe: string; ponto: string }
> = {
  0: {
    nome: "Pendente",
    classe: "bg-amber-50 text-amber-700 ring-amber-200",
    ponto: "bg-amber-500",
  },
  1: {
    nome: "Pago",
    classe: "bg-[#edf7e5] text-[#437524] ring-[#d7ebc8]",
    ponto: "bg-green-600",
  },
  2: {
    nome: "Em atraso",
    classe: "bg-rose-50 text-rose-700 ring-rose-200",
    ponto: "bg-rose-500",
  },
};

function getStatus(status: number) {
  return (
    statusPagamento[status] ?? {
      nome: "Indefinido",
      classe: "bg-slate-50 text-slate-600 ring-slate-200",
      ponto: "bg-slate-400",
    }
  );
}

export default getStatus;
