import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { SessaoInvalidaException } from "../../exceptions/SessaoInvalidaException";
import { RedirecionadorService } from "../../services/RedirecionadorService";
import { PessoaService } from "../../services/usuarios/PessoaService";
import type { AlteracaoSenhaDTO } from "../../types/usuarios/AlteracaoSenhaDTO";
import CampoConfiguracoesUsuario, {
  classesInputConfiguracoesSemMargem,
} from "./CampoConfiguracoesUsuario";
import CabecalhoSecaoConfiguracoes from "./CabecalhoSecaoConfiguracoes";
import CampoSenha from "../CampoSenha";

const pessoaService = new PessoaService();

type MensagemFormulario = {
  tipo: "sucesso" | "erro";
  texto: string;
};

function RedefinicaoSenhaConfiguracoes() {
  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState<MensagemFormulario | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function alterarSenha(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMensagem(null);

    const formulario = event.currentTarget;
    const dadosFormulario = new FormData(formulario);
    const senhaAtual = String(dadosFormulario.get("senhaAtual") ?? "");
    const novaSenha = String(dadosFormulario.get("novaSenha") ?? "");
    const confirmarSenha = String(
      dadosFormulario.get("confirmarSenha") ?? "",
    );

    if (novaSenha !== confirmarSenha) {
      setMensagem({
        tipo: "erro",
        texto: "A nova senha e a confirmação precisam ser iguais.",
      });
      return;
    }

    const alteracaoSenha: AlteracaoSenhaDTO = {
      antiga: senhaAtual,
      nova: novaSenha,
    };

    setEnviando(true);
    try {
      const resposta = await pessoaService.AlterarSenha(alteracaoSenha);
      const sucesso = resposta === "Senha alterada com sucesso";

      setMensagem({
        tipo: sucesso ? "sucesso" : "erro",
        texto: resposta || "NÃ£o foi possÃ­vel alterar a senha.",
      });

      if (sucesso) formulario.reset();
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
            : "NÃ£o foi possÃ­vel alterar a senha.",
      });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="rounded-2xl border border-[#e4e9df] bg-white p-6 shadow-[0_8px_24px_rgba(34,44,27,0.035)] sm:p-7 lg:p-8">
      <CabecalhoSecaoConfiguracoes
        numero="02"
        titulo="Redefinição de senha"
        descricao="Atualize sua senha para manter o acesso à conta protegido."
      />

      <form
        className="grid gap-x-7 gap-y-7 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-8"
        onSubmit={alterarSenha}
      >
        <CampoConfiguracoesUsuario
          id="senhaAtual"
          rotulo="Senha atual"
          className="sm:col-span-2"
        >
          <CampoSenha
            className={classesInputConfiguracoesSemMargem}
            classNameContainer="mt-3"
            id="senhaAtual"
            name="senhaAtual"
            autoComplete="current-password"
            placeholder="Digite sua senha atual"
            required
          />
        </CampoConfiguracoesUsuario>

        <CampoConfiguracoesUsuario id="novaSenha" rotulo="Nova senha">
          <CampoSenha
            className={classesInputConfiguracoesSemMargem}
            classNameContainer="mt-3"
            id="novaSenha"
            name="novaSenha"
            autoComplete="new-password"
            minLength={8}
            maxLength={255}
            pattern="(?=.*[A-Za-z])(?=.*[0-9])(?=.*[^A-Za-z0-9\s]).{8,255}"
            placeholder="Digite a nova senha"
            aria-describedby="senha-dica"
            title="A senha deve conter pelo menos uma letra, um número e um caractere especial."
            required
          />
          <p
            id="senha-dica"
            className="mt-2 text-xs leading-5 text-[#788270]"
          >
            Use pelo menos 8 caracteres, com letra, número e caractere especial.
          </p>
        </CampoConfiguracoesUsuario>

        <CampoConfiguracoesUsuario
          id="confirmarSenha"
          rotulo="Confirmar nova senha"
        >
          <CampoSenha
            className={classesInputConfiguracoesSemMargem}
            classNameContainer="mt-3"
            id="confirmarSenha"
            name="confirmarSenha"
            autoComplete="new-password"
            minLength={8}
            maxLength={255}
            placeholder="Digite novamente a nova senha"
            required
          />
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

        <div className="flex flex-col justify-end sm:col-span-2 sm:flex-row">
          <button
            className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-xl bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={enviando}
          >
            {enviando ? "Alterando senha..." : "Redefinir senha"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default RedefinicaoSenhaConfiguracoes;
