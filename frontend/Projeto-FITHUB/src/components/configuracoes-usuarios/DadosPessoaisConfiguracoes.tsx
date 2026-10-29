import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { SessaoInvalidaException } from "../../exceptions/SessaoInvalidaException";
import { RedirecionadorService } from "../../services/RedirecionadorService";
import { PessoaService } from "../../services/usuarios/PessoaService";
import type { AlteracaoDadosDTO } from "../../types/usuarios/AlteracaoDadosDTO";
import type { PessoaDadosResponseDTO } from "../../types/usuarios/PessoaDadosResponseDTO";
import type { SexoPessoaResponseDTO } from "../../types/usuarios/SexoPessoaResponseDTO";
import CampoConfiguracoesUsuario, {
  classesInputConfiguracoes,
} from "./CampoConfiguracoesUsuario";
import CabecalhoSecaoConfiguracoes from "./CabecalhoSecaoConfiguracoes";

const pessoaService = new PessoaService();

type MensagemFormulario = {
  tipo: "sucesso" | "erro";
  texto: string;
};

type ContextoLayoutRecepcionista = {
  atualizarNomeUsuario: (nome: string) => void;
};

function normalizarDataNascimento(dataNascimento: string) {
  const dataISO = dataNascimento.slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(dataISO) ? dataISO : "";
}

function DadosPessoaisConfiguracoes() {
  const navigate = useNavigate();
  const { atualizarNomeUsuario } =
    useOutletContext<ContextoLayoutRecepcionista>();
  const [dadosPessoais, setDadosPessoais] =
    useState<PessoaDadosResponseDTO | null>(null);
  const [carregandoDadosPessoais, setCarregandoDadosPessoais] = useState(true);
  const [erroDadosPessoais, setErroDadosPessoais] = useState("");
  const [tentativaDadosPessoais, setTentativaDadosPessoais] = useState(0);
  const [sexos, setSexos] = useState<SexoPessoaResponseDTO[]>([]);
  const [carregandoSexos, setCarregandoSexos] = useState(true);
  const [erroSexos, setErroSexos] = useState("");
  const [tentativa, setTentativa] = useState(0);
  const [edicaoAtiva, setEdicaoAtiva] = useState(false);
  const [mensagem, setMensagem] = useState<MensagemFormulario | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function alterarDados(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMensagem(null);

    if (!dadosPessoais) return;

    const novosDados: AlteracaoDadosDTO = {
      novoNome: dadosPessoais.nome.trim(),
      novoEmail: dadosPessoais.email.trim(),
      novoTelefone: dadosPessoais.telefone.trim(),
    };

    setEnviando(true);
    try {
      const resposta = await pessoaService.AlterarDados(novosDados);
      const sucesso = resposta === "Dados salvos com sucesso";

      setMensagem({
        tipo: sucesso ? "sucesso" : "erro",
        texto: resposta || "Não foi possível alterar seus dados.",
      });

      if (sucesso) {
        atualizarNomeUsuario(novosDados.novoNome);
        setDadosPessoais((dadosAtuais) =>
          dadosAtuais
            ? {
                ...dadosAtuais,
                nome: novosDados.novoNome,
                email: novosDados.novoEmail,
                telefone: novosDados.novoTelefone,
              }
            : dadosAtuais,
        );
        setEdicaoAtiva(false);
      }
    } catch (erro: unknown) {
      if (erro instanceof SessaoInvalidaException) {
        new RedirecionadorService().RedirecionaPorCaminho(
          "/login",
          navigate,
        );
        return;
      }

      setMensagem({
        tipo: "erro",
        texto:
          erro instanceof Error
            ? erro.message
            : "Não foi possível alterar seus dados.",
      });
    } finally {
      setEnviando(false);
    }
  }

  useEffect(() => {
    let componenteAtivo = true;

    const carregarDadosPessoais = async () => {
      setCarregandoDadosPessoais(true);
      setErroDadosPessoais("");

      try {
        const resposta = await pessoaService.DadosPessoais();
        if (!componenteAtivo) return;

        if (typeof resposta === "string") {
          setErroDadosPessoais(
            resposta || "NÃ£o foi possÃ­vel carregar seus dados pessoais.",
          );
          return;
        }

        setDadosPessoais({
          ...resposta,
          dataNascimento: normalizarDataNascimento(resposta.dataNascimento),
        });
      } catch (erro: unknown) {
        if (!componenteAtivo) return;

        if (erro instanceof SessaoInvalidaException) {
          new RedirecionadorService().RedirecionaPorCaminho(
            "/login",
            navigate,
          );
          return;
        }

        setErroDadosPessoais(
          erro instanceof Error
            ? erro.message
            : "NÃ£o foi possÃ­vel carregar seus dados pessoais.",
        );
      } finally {
        if (componenteAtivo) setCarregandoDadosPessoais(false);
      }
    };

    void carregarDadosPessoais();

    return () => {
      componenteAtivo = false;
    };
  }, [tentativaDadosPessoais, navigate]);

  useEffect(() => {
    let componenteAtivo = true;

    const carregarSexos = async () => {
      setCarregandoSexos(true);
      setErroSexos("");

      try {
        const opcoes = await pessoaService.ListarSexos();
        if (componenteAtivo) setSexos(opcoes);
      } catch (erro: unknown) {
        if (!componenteAtivo) return;

        if (erro instanceof SessaoInvalidaException) {
          new RedirecionadorService().RedirecionaPorCaminho(
            "/login",
            navigate,
          );
          return;
        }

        setErroSexos(
          erro instanceof Error
            ? erro.message
            : "Não foi possível carregar as opções de sexo.",
        );
      } finally {
        if (componenteAtivo) setCarregandoSexos(false);
      }
    };

    void carregarSexos();

    return () => {
      componenteAtivo = false;
    };
  }, [tentativa, navigate]);

  return (
    <section className="rounded-2xl border border-[#e4e9df] bg-white p-6 shadow-[0_8px_24px_rgba(34,44,27,0.035)] sm:p-7 lg:p-8">
      <CabecalhoSecaoConfiguracoes
        numero="01"
        titulo="Dados pessoais"
        descricao="Informações básicas vinculadas à sua conta FitHub."
        acao={
          <button
            type="button"
            aria-pressed={edicaoAtiva}
            disabled={!dadosPessoais || carregandoDadosPessoais || enviando}
            onClick={() => setEdicaoAtiva((ativa) => !ativa)}
            className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#cfe4bd] bg-[#f3f9ed] px-4 py-2 text-sm font-semibold text-green-800 transition-colors hover:bg-[#e8f5d9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {edicaoAtiva ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="5" y="10" width="14" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 1 1 8 0v3m-4 5v2" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m14.5 6.5 3 3M4 20l4.5-.9L19 8.6a2.1 2.1 0 0 0-3-3L5.5 16.1 4 20Z" />
              </svg>
            )}
            {edicaoAtiva ? "Bloquear edição" : "Editar dados"}
          </button>
        }
      />

      {carregandoDadosPessoais && (
        <p className="mb-5 text-sm text-[#687064]" role="status">
          Carregando seus dados pessoais...
        </p>
      )}
      {erroDadosPessoais && (
        <div
          className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#a33b2e]"
          role="alert"
        >
          <span>{erroDadosPessoais}</span>
          <button
            type="button"
            className="font-bold underline underline-offset-2"
            onClick={() => setTentativaDadosPessoais((valor) => valor + 1)}
          >
            Tentar novamente
          </button>
        </div>
      )}

      <form
        className="grid gap-x-7 gap-y-7 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-8"
        onSubmit={alterarDados}
        noValidate
      >
        <CampoConfiguracoesUsuario id="id" rotulo="ID do usuário">
          <input
            className={classesInputConfiguracoes}
            id="id"
            name="id"
            type="text"
            value={dadosPessoais?.id ?? ""}
            placeholder="—"
            disabled
          />
        </CampoConfiguracoesUsuario>

        <CampoConfiguracoesUsuario id="nome" rotulo="Nome completo">
          <input
            className={classesInputConfiguracoes}
            id="nome"
            name="nome"
            type="text"
            autoComplete="name"
            minLength={2}
            maxLength={100}
            required
            placeholder="Seu nome completo"
            value={dadosPessoais?.nome ?? ""}
            onChange={(evento) => {
              setMensagem(null);
              setDadosPessoais((dadosAtuais) =>
                dadosAtuais
                  ? { ...dadosAtuais, nome: evento.target.value }
                  : dadosAtuais,
              );
            }}
            disabled={!edicaoAtiva || !dadosPessoais}
          />
        </CampoConfiguracoesUsuario>

        <CampoConfiguracoesUsuario id="email" rotulo="E-mail">
          <input
            className={classesInputConfiguracoes}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={100}
            required
            placeholder="voce@email.com"
            value={dadosPessoais?.email ?? ""}
            onChange={(evento) => {
              setMensagem(null);
              setDadosPessoais((dadosAtuais) =>
                dadosAtuais
                  ? { ...dadosAtuais, email: evento.target.value }
                  : dadosAtuais,
              );
            }}
            disabled={!edicaoAtiva || !dadosPessoais}
          />
        </CampoConfiguracoesUsuario>

        <CampoConfiguracoesUsuario id="telefone" rotulo="Telefone">
          <input
            className={classesInputConfiguracoes}
            id="telefone"
            name="telefone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={20}
            required
            placeholder="(00) 00000-0000"
            value={dadosPessoais?.telefone ?? ""}
            onChange={(evento) => {
              setMensagem(null);
              setDadosPessoais((dadosAtuais) =>
                dadosAtuais
                  ? { ...dadosAtuais, telefone: evento.target.value }
                  : dadosAtuais,
              );
            }}
            disabled={!edicaoAtiva || !dadosPessoais}
          />
        </CampoConfiguracoesUsuario>

        <CampoConfiguracoesUsuario
          id="dataNascimento"
          rotulo="Data de nascimento"
        >
          <input
            className={classesInputConfiguracoes}
            id="dataNascimento"
            name="dataNascimento"
            type="date"
            autoComplete="bday"
            value={dadosPessoais?.dataNascimento ?? ""}
            disabled
          />
        </CampoConfiguracoesUsuario>

        <CampoConfiguracoesUsuario id="sexo" rotulo="Sexo">
          <select
            className={`${classesInputConfiguracoes} matricula-combobox`}
            id="sexo"
            name="sexo"
            value={dadosPessoais ? String(dadosPessoais.sexo) : ""}
            disabled
          >
            <option value="" disabled>
              {carregandoSexos
                ? "Carregando opções..."
                : sexos.length > 0
                  ? "Selecione uma opção"
                  : "Nenhuma opção disponível"}
            </option>
            {sexos.map((sexo) => (
              <option key={sexo.sexo} value={sexo.sexo}>
                {sexo.descricao}
              </option>
            ))}
          </select>
          {erroSexos && (
            <div
              className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#a33b2e]"
              role="alert"
            >
              <span>{erroSexos}</span>
              <button
                type="button"
                className="font-bold underline underline-offset-2"
                onClick={() => setTentativa((valor) => valor + 1)}
              >
                Tentar novamente
              </button>
            </div>
          )}
        </CampoConfiguracoesUsuario>

        {mensagem && (
          <div
            className={`rounded-xl border px-4 py-3 text-sm leading-6 sm:col-span-2 ${
              mensagem.tipo === "erro"
                ? "border-red-200 bg-red-50 text-red-800"
                : "border-[#dcebd0] bg-[#f3f9ed] text-[#486b2d]"
            }`}
            role={mensagem.tipo === "erro" ? "alert" : "status"}
          >
            {mensagem.texto}
          </div>
        )}

        {edicaoAtiva && (
          <div className="flex flex-col justify-end sm:col-span-2 sm:flex-row">
            <button
              className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-xl bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={enviando}
            >
              {enviando ? "Salvando alterações..." : "Salvar alterações"}
            </button>
          </div>
        )}
      </form>
    </section>
  );
}

export default DadosPessoaisConfiguracoes;
