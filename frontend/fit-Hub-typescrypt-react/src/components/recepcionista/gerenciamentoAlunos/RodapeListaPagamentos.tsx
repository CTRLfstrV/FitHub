function RodapeListaPagamentos({
  carregando,
  mensagemErro,
  quantidadeExibida,
  total,
}: {
  carregando: boolean;
  mensagemErro: string | null;
  quantidadeExibida: number;
  total: number;
}) {
  return (
    <div className="flex flex-col gap-2 border-t border-[#e7ebe3] bg-[#fbfcfa] px-4 py-3 text-sm text-[#747c70] sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-xs">
      <span>
        Exibindo {carregando || mensagemErro ? 0 : quantidadeExibida} de {total} parcelas
      </span>
      <span>Dados dos contratos ativos</span>
    </div>
  );
}

export default RodapeListaPagamentos;
