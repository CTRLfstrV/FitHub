import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import CampoFormularioMatricula, {
  classesCampoMatricula,
} from "./CampoFormularioMatricula";
import OpcoesPlanoMatricula from "./OpcoesPlanoMatricula";
import SecaoFormularioMatricula from "./SecaoFormularioMatricula";
import useOpcoesMatricula from "./useOpcoesMatricula";
import { MatriculaService } from "../../../services/matricula/MatriculaService";
import type { MatriculaDTO } from "../../../types/matricula/MatriculaDTO";
import { GlobalValidation } from "../../../validations/globalValidation";

const matriculaService = new MatriculaService(new GlobalValidation());

const formatarMoeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function formatarDataISO(data: Date) {
  return [
    data.getFullYear(),
    String(data.getMonth() + 1).padStart(2, "0"),
    String(data.getDate()).padStart(2, "0"),
  ].join("-");
}

function adicionarMeses(data: Date, meses: number) {
  const primeiroDiaDoMesAlvo = new Date(
    data.getFullYear(),
    data.getMonth() + meses,
    1,
  );
  const ultimoDiaDoMesAlvo = new Date(
    primeiroDiaDoMesAlvo.getFullYear(),
    primeiroDiaDoMesAlvo.getMonth() + 1,
    0,
  ).getDate();

  return new Date(
    primeiroDiaDoMesAlvo.getFullYear(),
    primeiroDiaDoMesAlvo.getMonth(),
    Math.min(data.getDate(), ultimoDiaDoMesAlvo),
  );
}

function calcularDataTermino(quantidadeParcelas: string) {
  const meses = Number(quantidadeParcelas);
  if (!Number.isInteger(meses) || meses < 1 || meses > 6) return "";

  return formatarDataISO(adicionarMeses(new Date(), meses));
}

function calcularPrimeiroVencimento(diaPagamento: string) {
  const dia = Number(diaPagamento);
  if (!Number.isInteger(dia) || dia < 1 || dia > 31) return "";

  const hoje = new Date();
  const mesDoVencimento =
    hoje.getMonth() + (hoje.getDate() > dia ? 1 : 0);
  const dataVencimento = new Date(
    hoje.getFullYear(),
    mesDoVencimento,
    dia,
  );

  return formatarDataISO(dataVencimento);
}

function FormularioMatriculaAluno() {
  const {
    planos,
    sexos,
    formasPagamento,
    carregando: carregandoOpcoes,
    mensagemErro: erroOpcoes,
    tentarNovamente,
  } = useOpcoesMatricula();
  const [codigoPlano, setCodigoPlano] = useState<number | null>(null);
  const [quantidadeParcelas, setQuantidadeParcelas] = useState("1");
  const [diaPagamento, setDiaPagamento] = useState("10");
  const [mensagem, setMensagem] = useState("");
  const [erroEnvio, setErroEnvio] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [matriculaConcluida, setMatriculaConcluida] = useState(false);

  const planoSelecionado =
    planos.find((plano) => plano.id === codigoPlano) ?? null;
  const dataFimContrato = calcularDataTermino(quantidadeParcelas);
  const vencimentoPrimeiraParcela = calcularPrimeiroVencimento(diaPagamento);
  function selecionarPlano(novoCodigo: number) {
    const novoPlano = planos.find((plano) => plano.id === novoCodigo);
    if (!novoPlano) return;

    setCodigoPlano(novoCodigo);
    setMensagem("");
  }

  async function enviarMatricula(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMensagem("");
    setErroEnvio(false);

    const dadosFormulario = new FormData(event.currentTarget);
    const obterValor = (campo: string) =>
      String(dadosFormulario.get(campo) ?? "").trim();
    const numeroCasa = obterValor("numeroCasa");

    const matricula: MatriculaDTO = {
      aluno: {
        nome: obterValor("nome"),
        senha: obterValor("senha"),
        cpf: obterValor("cpf"),
        dataNascimento: obterValor("dataNascimento"),
        cep: obterValor("cep"),
        numeroCasa: numeroCasa === "" ? 0 : Number(numeroCasa),
        telefone: obterValor("telefone"),
        telefoneEmergencia: obterValor("telefoneEmergencia"),
        sexo: Number(obterValor("sexo")),
        email: obterValor("email"),
      },
      contrato: {
        idPlano: Number(obterValor("idPlano")),
        termino: dataFimContrato,
        quantidadeParcelas: Number(obterValor("quantidadeParcelas")),
      },
      pagamento: {
        formaPagamento: Number(obterValor("formaPagamento")),
        vencimentoPrimeiraParcela,
      },
    };

    setEnviando(true);
    try {
      setMensagem(await matriculaService.MatricularAluno(matricula));
      setMatriculaConcluida(true);
    } catch (erro) {
      setErroEnvio(true);
      setMensagem(
        erro instanceof Error
          ? erro.message
          : "Não foi possível concluir a matrícula. Tente novamente.",
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form className="grid gap-8 sm:gap-10 lg:gap-12" onSubmit={enviarMatricula}>
      {erroOpcoes && (
        <div
          className="flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 sm:flex-row sm:items-center sm:justify-between"
          role="alert"
        >
          <span>{erroOpcoes}</span>
          <button
            type="button"
            className="w-fit font-semibold underline underline-offset-2"
            onClick={tentarNovamente}
          >
            Tentar novamente
          </button>
        </div>
      )}
      <SecaoFormularioMatricula
        numero="01"
        titulo="Dados do aluno"
        descricao="Informações pessoais usadas no cadastro do aluno."
      >
        <CampoFormularioMatricula id="nome" rotulo="Nome completo">
          <input
            className={classesCampoMatricula}
            id="nome"
            name="nome"
            type="text"
            autoComplete="name"
            maxLength={100}
            placeholder="Nome e sobrenome"
            required
          />
        </CampoFormularioMatricula>

        <CampoFormularioMatricula
          id="email"
          rotulo="E-mail"
          dica="O endereço de e-mail deve ter até 100 caracteres."
        >
          <input
            className={classesCampoMatricula}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={100}
            placeholder="aluno@email.com"
            required
          />
        </CampoFormularioMatricula>

        <CampoFormularioMatricula
          id="cpf"
          rotulo="CPF"
          dica="Informe os 11 números, sem pontos ou traço."
        >
          <input
            className={classesCampoMatricula}
            id="cpf"
            name="cpf"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            maxLength={11}
            pattern="[0-9]{11}"
            title="Digite os 11 números do CPF, sem pontos ou traço."
            placeholder="00000000000"
            required
          />
        </CampoFormularioMatricula>

        <CampoFormularioMatricula id="data-nascimento" rotulo="Data de nascimento">
          <input
            className={classesCampoMatricula}
            id="data-nascimento"
            name="dataNascimento"
            type="date"
            autoComplete="bday"
            required
          />
        </CampoFormularioMatricula>

        <CampoFormularioMatricula
          id="sexo"
          rotulo="Sexo"
          dica="Selecione um dos sexos cadastrados no sistema."
        >
          <select
            className={`${classesCampoMatricula} matricula-combobox`}
            id="sexo"
            name="sexo"
            defaultValue=""
            required
          >
            <option value="" disabled>
              {carregandoOpcoes
                ? "Carregando sexos..."
                : sexos.length > 0
                  ? "Selecione uma opção"
                  : "Nenhum sexo disponível"}
            </option>
            {sexos.map((sexo) => (
              <option key={sexo.sexo} value={sexo.sexo}>
                {sexo.descricao}
              </option>
            ))}
          </select>
        </CampoFormularioMatricula>
      </SecaoFormularioMatricula>

      <SecaoFormularioMatricula
        numero="02"
        titulo="Contato e endereço"
        descricao="Dados para contato do aluno e em caso de emergência."
      >
        <CampoFormularioMatricula id="telefone" rotulo="Telefone">
          <input
            className={classesCampoMatricula}
            id="telefone"
            name="telefone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={20}
            placeholder="(00) 00000-0000"
            required
          />
        </CampoFormularioMatricula>

        <CampoFormularioMatricula
          id="telefone-emergencia"
          rotulo="Telefone de emergência"
          dica="Campo opcional."
        >
          <input
            className={classesCampoMatricula}
            id="telefone-emergencia"
            name="telefoneEmergencia"
            type="tel"
            inputMode="tel"
            maxLength={20}
            placeholder="(00) 00000-0000"
          />
        </CampoFormularioMatricula>

        <CampoFormularioMatricula
          id="cep"
          rotulo="CEP"
          dica="Informe os 8 números, sem hífen."
        >
          <input
            className={classesCampoMatricula}
            id="cep"
            name="cep"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={8}
            pattern="[0-9]{8}"
            title="Digite os 8 números do CEP, sem hífen."
            placeholder="00000000"
            required
          />
        </CampoFormularioMatricula>

        <CampoFormularioMatricula
          id="numero-residencia"
          rotulo="Número da residência"
          dica="Opcional. Use 0 quando o endereço não tiver número."
        >
          <input
            className={classesCampoMatricula}
            id="numero-residencia"
            name="numeroCasa"
            type="number"
            inputMode="numeric"
            min={0}
            step={1}
            placeholder="Número"
          />
        </CampoFormularioMatricula>
      </SecaoFormularioMatricula>

      <SecaoFormularioMatricula
        numero="03"
        titulo="Plano e pagamento"
        descricao="Selecione o plano e informe os dados do pagamento."
        resumo={
          <p className="sm:mt-1 sm:max-w-[280px] sm:text-right">
            <span className="text-xs font-medium text-[#788270]">
              Plano selecionado: {" "}
            </span>
            <span className="text-sm font-bold text-green-800">
              {planoSelecionado
                ? `${planoSelecionado.nome} (${formatarMoeda.format(planoSelecionado.valor)})`
                : "Selecione um plano"}
            </span>
          </p>
        }
      >
        <OpcoesPlanoMatricula
          planos={planos}
          planoSelecionado={codigoPlano}
          carregando={carregandoOpcoes}
          onSelecionar={selecionarPlano}
        />

        <CampoFormularioMatricula
          id="dia-pagamento"
          rotulo="Dia de pagamento"
          dica="O vencimento será neste dia ou no próximo mês, se o dia já tiver passado."
          className="sm:col-span-2 sm:w-1/2"
        >
          <select
            className={`${classesCampoMatricula} matricula-combobox`}
            id="dia-pagamento"
            name="diaPagamento"
            value={diaPagamento}
            onChange={(event) => {
              setDiaPagamento(event.target.value);
              setMensagem("");
            }}
            required
          >
            {[5, 10, 15, 20, 25].map((dia) => (
              <option key={dia} value={dia}>
                Dia {dia}
              </option>
            ))}
          </select>
        </CampoFormularioMatricula>

        <CampoFormularioMatricula
          id="vencimento-primeira-parcela"
          rotulo="Data do primeiro vencimento"
          dica="Calculada automaticamente com base no dia de pagamento."
          className="sm:col-span-2 sm:w-1/2"
        >
          <input
            className={classesCampoMatricula}
            id="vencimento-primeira-parcela"
            name="vencimentoPrimeiraParcela"
            type="date"
            value={vencimentoPrimeiraParcela}
            disabled
            required
          />
        </CampoFormularioMatricula>

        <CampoFormularioMatricula
          id="forma-pagamento"
          rotulo="Forma de pagamento"
          dica="Selecione uma forma de pagamento cadastrada no sistema."
          className="sm:col-span-2 sm:w-1/2"
        >
          <select
            className={`${classesCampoMatricula} matricula-combobox`}
            id="forma-pagamento"
            name="formaPagamento"
            defaultValue=""
            required
          >
            <option value="" disabled>
              {carregandoOpcoes
                ? "Carregando formas de pagamento..."
                : formasPagamento.length > 0
                  ? "Selecione uma forma"
                  : "Nenhuma forma disponível"}
            </option>
            {formasPagamento.map((forma) => (
              <option
                key={forma.formaPagamento}
                value={forma.formaPagamento}
              >
                {forma.descricao}
              </option>
            ))}
          </select>
        </CampoFormularioMatricula>
      </SecaoFormularioMatricula>

      <SecaoFormularioMatricula
        numero="04"
        titulo="Contrato e parcelas"
        descricao="Informe a data de término e a quantidade de parcelas do contrato."
      >
        <CampoFormularioMatricula
          id="fim-contrato"
          rotulo="Término do contrato"
          dica="Calculado a partir de hoje, somando um mês por parcela."
        >
          <input
            className={classesCampoMatricula}
            id="fim-contrato"
            name="termino"
            type="date"
            value={dataFimContrato}
            disabled
            required
          />
        </CampoFormularioMatricula>

        <CampoFormularioMatricula
          id="quantidade-parcelas"
          rotulo="Quantidade de parcelas"
          dica="Informe de 1 a 6 parcelas."
        >
          <input
            className={classesCampoMatricula}
            id="quantidade-parcelas"
            name="quantidadeParcelas"
            type="number"
            min={1}
            max={6}
            step={1}
            inputMode="numeric"
            value={quantidadeParcelas}
            onChange={(event) => {
              setQuantidadeParcelas(event.target.value);
              setMensagem("");
            }}
            required
          />
        </CampoFormularioMatricula>

      </SecaoFormularioMatricula>

      <SecaoFormularioMatricula
        numero="05"
        titulo="Acesso do aluno"
        descricao="Crie a senha inicial para o acesso à conta."
      >
        <CampoFormularioMatricula
          id="senha"
          rotulo="Senha inicial"
          dica="Use no mínimo 8 caracteres, incluindo letra, número e caractere especial."
          className="sm:col-span-2"
        >
          <input
            className={classesCampoMatricula}
            id="senha"
            name="senha"
            type="password"
            autoComplete="new-password"
            minLength={8}
            maxLength={255}
            placeholder="Crie uma senha segura"
            required
          />
        </CampoFormularioMatricula>
      </SecaoFormularioMatricula>

      {mensagem && (
        <div
          className={`rounded-xl border px-4 py-3 text-sm leading-6 ${
            erroEnvio
              ? "border-red-200 bg-red-50 text-red-800"
              : "border-[#dcebd0] bg-[#f3f9ed] text-[#486b2d]"
          }`}
          role={erroEnvio ? "alert" : "status"}
        >
          {mensagem}
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 border-t border-[#e7ebe3] pt-5 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
        <Link
          to="/recepcionista/dashboard"
          className="inline-flex min-h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold text-[#687064] transition-colors hover:bg-[#f0f3ed] hover:text-[#343b2e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
        >
          Cancelar
        </Link>
        <button
          type="submit"
          disabled={
            enviando ||
            matriculaConcluida ||
            carregandoOpcoes ||
            planos.length === 0 ||
            sexos.length === 0 ||
            formasPagamento.length === 0
          }
          className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 disabled:cursor-not-allowed disabled:bg-[#9aa493] disabled:shadow-none"
        >
          {enviando
            ? "Enviando matrícula..."
            : matriculaConcluida
              ? "Matrícula concluída"
              : "Concluir matrícula"}
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </form>
  );
}

export default FormularioMatriculaAluno;
