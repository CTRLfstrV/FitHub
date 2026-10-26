import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessaoInvalidaException } from "../../../exceptions/SessaoInvalidaException";
import { RedirecionadorService } from "../../../services/RedirecionadorService";
import { ContratoService } from "../../../services/financeiro/ContratoService";
import { PagamentoService } from "../../../services/financeiro/PagamentoService";
import type { PagamentoResponseDTO } from "../../../types/financeiro/PagamentoResponseDTO";
import getStatus from "./getStatus";
import normalizarTexto from "./normalizarTexto";
import { codigoStatus, type FiltroPagamento, type FiltroStatus } from "./tipos";

const pagamentoService = new PagamentoService();
const contratoService = new ContratoService();

function useGerenciamentoAlunos() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>("todos");
  const [quantidadeContratosAtivos, setQuantidadeContratosAtivos] = useState<
    number | null
  >(null);
  const [quantidadeContratosPendentes, setQuantidadeContratosPendentes] =
    useState<number | null>(null);
  const [listaPagamentos, setListaPagamentos] = useState<
    PagamentoResponseDTO[] | null
  >(null);
  const [mensagemErro, setMensagemErro] = useState<string | null>(null);
  const [erroContratos, setErroContratos] = useState(false);
  const [erroContratosPendentes, setErroContratosPendentes] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let componenteAtivo = true;

    const carregarDados = async () => {
      setCarregando(true);
      setMensagemErro(null);
      setErroContratos(false);
      setErroContratosPendentes(false);

      const [contratos, contratosPendentes, pagamentos] = await Promise.allSettled([
        contratoService.ContratosAtivos(),
        contratoService.ContratosPendentes(),
        pagamentoService.ListarPagamentos(),
      ]);
      if (!componenteAtivo) return;

      const sessaoInvalida = [contratos, contratosPendentes, pagamentos].some(
        (resultado) =>
          resultado.status === "rejected" &&
          resultado.reason instanceof SessaoInvalidaException,
      );

      if (sessaoInvalida) {
        new RedirecionadorService().RedirecionaPorCaminho("/login", navigate);
        return;
      }

      if (contratos.status === "fulfilled")
        setQuantidadeContratosAtivos(contratos.value);
      else setErroContratos(true);

      if (contratosPendentes.status === "fulfilled")
        setQuantidadeContratosPendentes(contratosPendentes.value);
      else setErroContratosPendentes(true);

      if (pagamentos.status === "fulfilled")
        setListaPagamentos(pagamentos.value);
      else
        setMensagemErro(
          "Não foi possível carregar os pagamentos. Tente novamente.",
        );

      setCarregando(false);
    };

    void carregarDados();
    return () => {
      componenteAtivo = false;
    };
  }, [tentativa, navigate]);

  const resumo = useMemo(() => {
    const pagamentos = listaPagamentos ?? [];
    return {
      total: pagamentos.length,
      pendentes: pagamentos.filter((pagamento) => pagamento.statusPagamento === 0)
        .length,
      pagos: pagamentos.filter((pagamento) => pagamento.statusPagamento === 1)
        .length,
      atrasados: pagamentos.filter((pagamento) => pagamento.statusPagamento === 2)
        .length,
    };
  }, [listaPagamentos]);

  const pagamentosFiltrados = useMemo(() => {
    const termo = normalizarTexto(busca.trim());
    return (listaPagamentos ?? []).filter((pagamento) => {
      const statusCorresponde =
        filtroStatus === "todos" ||
        pagamento.statusPagamento === codigoStatus[filtroStatus];
      const dados = normalizarTexto(
        [
          pagamento.nomeAluno,
          pagamento.emailAluno,
          pagamento.nomePlano,
          getStatus(pagamento.statusPagamento).nome,
        ].join(" "),
      );
      return statusCorresponde && dados.includes(termo);
    });
  }, [busca, filtroStatus, listaPagamentos]);

  const filtros: FiltroPagamento[] = [
    { id: "todos", label: "Todos", quantidade: resumo.total },
    { id: "pendente", label: "Pendentes", quantidade: resumo.pendentes },
    { id: "pago", label: "Pagos", quantidade: resumo.pagos },
    { id: "atrasado", label: "Em atraso", quantidade: resumo.atrasados },
  ];

  const estadoVazio = carregando
    ? "Carregando pagamentos..."
    : mensagemErro
      ? mensagemErro
      : resumo.total === 0
        ? "Nenhum pagamento encontrado para contratos ativos."
        : `Nenhum resultado para os filtros selecionados${busca.trim() ? ` e a busca “${busca.trim()}”` : ""}.`;

  return {
    busca,
    setBusca,
    filtroStatus,
    setFiltroStatus,
    quantidadeContratosAtivos,
    quantidadeContratosPendentes,
    mensagemErro,
    erroContratos,
    erroContratosPendentes,
    carregando,
    resumo,
    filtros,
    estadoVazio,
    pagamentosFiltrados,
    setTentativa,
  };
}

export default useGerenciamentoAlunos;

