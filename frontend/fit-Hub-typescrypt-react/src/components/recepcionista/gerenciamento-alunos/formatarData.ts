function formatarData(data: string) {
  const valor = new Date(data);
  return Number.isNaN(valor.getTime())
    ? "Data não informada"
    : new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }).format(valor);
}

export default formatarData;
