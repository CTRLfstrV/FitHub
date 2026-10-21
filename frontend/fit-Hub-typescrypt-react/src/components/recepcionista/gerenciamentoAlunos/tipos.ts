export type FiltroStatus = "todos" | "pendente" | "pago" | "atrasado";

export interface FiltroPagamento {
  id: FiltroStatus;
  label: string;
  quantidade: number;
}

export const codigoStatus: Record<Exclude<FiltroStatus, "todos">, number> = {
  pendente: 0,
  pago: 1,
  atrasado: 2,
};
