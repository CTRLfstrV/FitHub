import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import CampoFormularioMatricula, {
  classesCampoMatricula,
  classesCampoMatriculaSemMargem,
} from "./CampoFormularioMatricula";
import OpcoesPlanoMatricula, {
  planosMatricula,
  type CodigoPlanoMatricula,
} from "./OpcoesPlanoMatricula";
import SecaoFormularioMatricula from "./SecaoFormularioMatricula";

const formatarMoeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function dataComMesesAdicionados(data: string, quantidadeMeses: number) {
  if (!data) return "";

  const [ano, mes, dia] = data.split("-").map(Number);
  const mesAlvo = mes - 1 + quantidadeMeses;
  const anoAlvo = ano + Math.floor(mesAlvo / 12);
  const mesNormalizado = mesAlvo % 12;
  const ultimoDiaDoMes = new Date(anoAlvo, mesNormalizado + 1, 0).getDate();
  const diaAlvo = Math.min(dia, ultimoDiaDoMes);

  return `${anoAlvo}-${String(mesNormalizado + 1).padStart(2, "0")}-${String(diaAlvo).padStart(2, "0")}`;
}

function calcularPrimeiroVencimento(dataInicio: string, diaVencimento: string) {
  if (!dataInicio || !diaVencimento) return "";

  const [ano, mes, dia] = dataInicio.split("-").map(Number);
  const diaCobranca = Number(diaVencimento);
  const dataVencimento =
    diaCobranca < dia
      ? new Date(ano, mes, diaCobranca)
      : new Date(ano, mes - 1, diaCobranca);

  return [
    dataVencimento.getFullYear(),
    String(dataVencimento.getMonth() + 1).padStart(2, "0"),
    String(dataVencimento.getDate()).padStart(2, "0"),
  ].join("-");
}

function formatarData(data: string) {
  if (!data) return "";

  const [ano, mes, dia] = data.split("-").map(Number);
  return new Intl.DateTimeFormat("pt-BR").format(new Date(ano, mes - 1, dia));
}

function FormularioMatriculaAluno() {
  const [codigoPlano, setCodigoPlano] = useState<CodigoPlanoMatricula>("mensal");
  const [valorContrato, setValorContrato] = useState("129.90");
  const [quantidadeParcelas, setQuantidadeParcelas] = useState("1");
  const [dataInicioContrato, setDataInicioContrato] = useState("");
  const [dataFimContrato, setDataFimContrato] = useState("");
  const [diaVencimento, setDiaVencimento] = useState("10");
  const [mensagem, setMensagem] = useState("");

  const planoSelecionado =
    planosMatricula.find((plano) => plano.id === codigoPlano) ?? planosMatricula[0];
  const valorTotal = Number(valorContrato);
  const parcelas = Number(quantidadeParcelas);
  const valorParcela =
    Number.isFinite(valorTotal) &&
    valorTotal > 0 &&
    Number.isInteger(parcelas) &&
    parcelas > 0
      ? Math.round((valorTotal / parcelas + Number.EPSILON) * 100) / 100
      : null;
  const primeiroVencimento = calcularPrimeiroVencimento(
    dataInicioContrato,
    diaVencimento,
  );

  function selecionarPlano(novoCodigo: CodigoPlanoMatricula) {
    const novoPlano = planosMatricula.find((plano) => plano.id === novoCodigo);
    if (!novoPlano) return;

    setCodigoPlano(novoCodigo);
    setValorContrato(
      (novoPlano.valorMensal * novoPlano.duracaoMeses).toFixed(2),
    );
    setQuantidadeParcelas(String(novoPlano.duracaoMeses));
    setDataFimContrato(
      dataComMesesAdicionados(dataInicioContrato, novoPlano.duracaoMeses),
    );
    setMensagem("");
  }

  function revisarDados(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMensagem(
      "Os campos obrigatórios foram preenchidos. A gravação da matrícula depende da integração com o serviço de cadastro.",
    );
  }

  return (
    <form className="grid gap-8 sm:gap-10 lg:gap-12" onSubmit={revisarDados}>
      <SecaoFormularioMatricula
        numero="01"
        titulo="Dados do aluno"
        descricao="Informações pessoais usadas no cadastro do aluno."
      >
        <CampoFormularioMatricula id="nome" rotulo="Nome completo">
          <input
            className={classesCampoMatricula}
            id="nome"
            name="nome_pessoa"
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
            name="email_pessoa"
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
            name="cpf_pessoa"
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

        <CampoFormularioMatricula id="rg" rotulo="RG">
          <input
            className={classesCampoMatricula}
            id="rg"
            name="rg_pessoa"
            type="text"
            maxLength={20}
            placeholder="Número do documento"
            required
          />
        </CampoFormularioMatricula>

        <CampoFormularioMatricula id="data-nascimento" rotulo="Data de nascimento">
          <input
            className={classesCampoMatricula}
            id="data-nascimento"
            name="data_nasc_pessoa"
            type="date"
            autoComplete="bday"
            required
          />
        </CampoFormularioMatricula>

        <CampoFormularioMatricula
          id="sexo"
          rotulo="Sexo"
          dica="A API deverá associar a opção selecionada ao código usado pelo sistema."
        >
          <select
            className={`${classesCampoMatricula} matricula-combobox`}
            id="sexo"
            name="sexo_pessoa"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Selecione uma opção
            </option>
            <option value="feminino">Feminino</option>
            <option value="masculino">Masculino</option>
            <option value="outro">Outro</option>
            <option value="nao_informado">Prefiro não informar</option>
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
            name="telefone_pessoa"
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
            name="telefone_emergencia_pessoa"
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
            name="cep_pessoa"
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
            name="num_casa_pessoa"
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
        titulo="Plano e detalhes da matrícula"
        descricao="Escolha o pacote e configure o início das aulas e da cobrança."
        resumo={
          <p className="sm:mt-1 sm:max-w-[280px] sm:text-right">
            <span className="text-xs font-medium text-[#788270]">
              Plano selecionado: {" "}
            </span>
            <span className="text-sm font-bold text-green-800">
              {planoSelecionado.nome} ({formatarMoeda.format(planoSelecionado.valorMensal)}/mês)
            </span>
          </p>
        }
      >
        <OpcoesPlanoMatricula
          planoSelecionado={codigoPlano}
          onSelecionar={selecionarPlano}
        />

        <CampoFormularioMatricula
          id="inicio-aulas"
          rotulo="Data de início das aulas"
        >
          <input
            className={classesCampoMatricula}
            id="inicio-aulas"
            name="dt_inicio_contrato"
            type="date"
            value={dataInicioContrato}
            onChange={(event) => {
              const novaData = event.target.value;
              setDataInicioContrato(novaData);
              setDataFimContrato(
                dataComMesesAdicionados(novaData, planoSelecionado.duracaoMeses),
              );
              setMensagem("");
            }}
            required
          />
        </CampoFormularioMatricula>

        <CampoFormularioMatricula
          id="dia-vencimento"
          rotulo="Dia de vencimento da fatura"
        >
          <select
            className={`${classesCampoMatricula} matricula-combobox`}
            id="dia-vencimento"
            name="dia_vencimento_fatura"
            value={diaVencimento}
            onChange={(event) => {
              setDiaVencimento(event.target.value);
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
          id="forma-pagamento"
          rotulo="Forma de pagamento"
          dica="A forma escolhida será aplicada às parcelas do contrato."
          className="sm:col-span-2 sm:w-1/2"
        >
          <select
            className={`${classesCampoMatricula} matricula-combobox`}
            id="forma-pagamento"
            name="frm_pagamento"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Selecione uma forma
            </option>
            <option value="cartao_credito_recorrente">
              Cartão de crédito (recorrente)
            </option>
            <option value="pix">Pix</option>
            <option value="cartao_debito">Cartão de débito</option>
            <option value="dinheiro">Dinheiro</option>
          </select>
        </CampoFormularioMatricula>
      </SecaoFormularioMatricula>

      <SecaoFormularioMatricula
        numero="04"
        titulo="Contrato e parcelas"
        descricao="Confira o período contratado e os valores antes de revisar os dados."
      >
        <CampoFormularioMatricula
          id="fim-contrato"
          rotulo="Término do contrato"
          dica="Preenchido de acordo com a duração do plano; pode ser ajustado."
        >
          <input
            className={classesCampoMatricula}
            id="fim-contrato"
            name="dt_fim_contrato"
            type="date"
            min={dataInicioContrato || undefined}
            value={dataFimContrato}
            onChange={(event) => {
              setDataFimContrato(event.target.value);
              setMensagem("");
            }}
            required
          />
        </CampoFormularioMatricula>

        <CampoFormularioMatricula id="valor-contrato" rotulo="Valor total do contrato">
          <div className="relative mt-3">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#788270]">
              R$
            </span>
            <input
              className={`${classesCampoMatriculaSemMargem} pl-10`}
              id="valor-contrato"
              name="vlr_contrato"
              type="number"
              min={0}
              step="0.01"
              inputMode="decimal"
              placeholder="0,00"
              value={valorContrato}
              onChange={(event) => {
                setValorContrato(event.target.value);
                setMensagem("");
              }}
              required
            />
          </div>
        </CampoFormularioMatricula>

        <CampoFormularioMatricula
          id="quantidade-parcelas"
          rotulo="Quantidade de parcelas"
          dica="O contrato precisa ter pelo menos uma parcela."
        >
          <input
            className={classesCampoMatricula}
            id="quantidade-parcelas"
            name="qtd_parcelas_contrato"
            type="number"
            min={1}
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

        <div className="flex min-h-[82px] items-center justify-between gap-4 rounded-xl border border-[#e4ebdc] bg-[#f7fbf3] px-4 py-3 sm:col-span-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#788270]">
              Valor estimado por parcela
            </p>
            <p className="mt-1 text-xs leading-5 text-[#788270]">
              Valor total dividido pela quantidade de parcelas.
            </p>
          </div>
          <p className="shrink-0 text-lg font-bold text-green-800 sm:text-xl">
            {valorParcela === null ? "—" : formatarMoeda.format(valorParcela)}
          </p>
        </div>

        <div className="flex flex-col justify-between gap-3 rounded-xl border border-[#e4e9df] bg-white px-4 py-3 sm:col-span-2 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-[#343b2e]">
              Primeiro vencimento
            </p>
            <p className="mt-1 text-xs text-[#788270]">
              {primeiroVencimento
                ? `A primeira cobrança vence em ${formatarData(primeiroVencimento)}.`
                : "Informe a data de início para calcular o primeiro vencimento."}
            </p>
            <input
              type="hidden"
              name="dt_vencimento_pagamento"
              value={primeiroVencimento}
            />
          </div>
          <span className="w-fit rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800">
            Status inicial: pendente
          </span>
        </div>
      </SecaoFormularioMatricula>

      <SecaoFormularioMatricula
        numero="05"
        titulo="Acesso do aluno"
        descricao="Crie a senha inicial para o acesso à conta."
      >
        <CampoFormularioMatricula
          id="senha"
          rotulo="Senha inicial"
          dica="A senha deve ter pelo menos 8 caracteres."
          className="sm:col-span-2"
        >
          <input
            className={classesCampoMatricula}
            id="senha"
            name="senha_pessoa"
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
          className="rounded-xl border border-[#dcebd0] bg-[#f3f9ed] px-4 py-3 text-sm leading-6 text-[#486b2d]"
          role="status"
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
          className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
        >
          Revisar dados
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
