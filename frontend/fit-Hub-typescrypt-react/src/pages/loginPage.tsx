import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/Primary-logo.svg";
import type { PessoaLoginDTO } from "../types/PessoaLoginDTO";
import { LoginService } from "../services/LoginService";
import { LoginValidation } from "../validations/loginValidation";

const eyebrow =
  "inline-flex items-center gap-2 text-[11px] font-bold tracking-[.16em] text-[#598c1c]";

const loginService: LoginService = new LoginService(new LoginValidation());

function LoginPage() {
  const [cpf, setCpf] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [mensagemErro, setMensagemErro] = useState<string>("");

  const handleLogin = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const pessoaLogin: PessoaLoginDTO = {
      cpf,
      senha,
    };

    try {
      loginService.login(pessoaLogin);
      setMensagemErro("");
    } catch (erro: unknown) {
      if (erro instanceof Error) {
        setMensagemErro(erro.message);
      }
    }
  };

  return (
      <section className="mx-auto grid min-h-[calc(100vh_-_150px)] max-w-[1040px] place-items-center px-5 py-8 md:px-10 md:py-[54px]">
        <div className="grid min-h-[510px] w-full max-w-[930px] overflow-hidden rounded-[14px] border border-[#e2e7de] bg-white shadow-[0_24px_70px_#1c2b1012] md:grid-cols-[0.95fr_1.05fr]">
          <div className="flex min-h-[235px] flex-col justify-between bg-linear-to-r from-amber-50 to-white p-[25px] md:p-[38px]">
            <Link
              to="/home"
              className="inline-flex"
              aria-label="Voltar para a página inicial"
            >
              <img className="block h-auto w-[120px]" src={logo} alt="FitHub" />
            </Link>
            <div className="my-5 md:my-10">
              <span className={eyebrow}>SUA JORNADA COMEÇA AQUI</span>
              <h1 className="my-3 max-w-[340px] text-[34px] font-extrabold leading-[1.04] tracking-[-.055em] md:text-[clamp(34px,4vw,48px)]">
                O seu melhor está em{" "}
                <span className="text-[#598c1c]">movimento.</span>
              </h1>
              <p className="max-w-[320px] text-sm leading-[1.8] text-[#687064] md:text-base">
                Entre para acompanhar sua evolução e continuar construindo uma
                rotina que faz bem.
              </p>
            </div>
            <span className="hidden text-[9px] tracking-[.15em] text-[#737f69] md:block">
              FOCO • FORÇA • EVOLUÇÃO
            </span>
          </div>
          <div className="self-center px-[25px] py-9 md:px-[clamp(28px,6vw,70px)] md:py-16">
            <div>
              <span className={eyebrow}>BEM-VINDO DE VOLTA</span>
              <h2 className="mt-3 mb-1 text-[30px] font-bold tracking-[-.04em]">
                Acesse sua conta
              </h2>
              <p className="text-base text-[#687064]">
                Que bom ter você por aqui.
              </p>
            </div>
            <form
              className="mt-[34px] flex flex-col"
              onSubmit={(event) => handleLogin(event)}
            >
              <label
                className="mb-[9px] text-sm font-semibold text-[#30372d]"
                htmlFor="cpf"
              >
                CPF
              </label>
              <input
                className="mb-[22px] h-12 w-full rounded-[7px] border border-[#d9dfd5] bg-white px-[14px] text-sm text-[#20251e] outline-none transition placeholder:text-[#8a9185] focus:border-[#83b943] focus:ring-[3px] focus:ring-[#79b82d]/20"
                id="cpf"
                name="cpf"
                type="text"
                size={11}
                required
                pattern="\d{11}"
                title="Digite o CPF com 11 dígitos numéricos, sem pontos ou traço."
                placeholder="Digite seu CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
              <div className="mb-[9px] flex items-center justify-between text-sm font-semibold text-[#30372d]">
                <label htmlFor="password">Senha</label>
                <a className="text-xs font-medium text-[#598c1c]" href="#ajuda">
                  Esqueceu a senha?
                </a>
              </div>
              <input
                className="mb-[22px] h-12 w-full rounded-[7px] border border-[#d9dfd5] bg-white px-[14px] text-sm text-[#20251e] outline-none transition placeholder:text-[#8a9185] focus:border-[#83b943] focus:ring-[3px] focus:ring-[#79b82d]/20"
                id="password"
                name="password"
                type="password"
                title="Digite sua senha"
                autoComplete="current-password"
                required
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
                <p className="mb-[22px] text-sm text-red-600" role="alert">
                  {mensagemErro}
                </p>
              <button
                className="inline-flex min-h-[50px] cursor-pointer w-full items-center justify-center gap-6 rounded-lg bg-[#c5ff62] px-[21px] text-[15px] font-bold text-[#17200f] transition hover:-translate-y-0.5 hover:bg-[#b3ee4f]"
                type="submit"
              >
                Entrar na conta <span>↗</span>
              </button>
            </form>
            <p className="mt-[25px] text-center text-sm text-[#687064]">
              Ainda não tem uma conta?{" "}
              <Link className="font-bold text-[#598c1c]" to="/home">
                Conheça o FitHub
              </Link>
            </p>
          </div>
        </div>
      </section>
  );
}

export default LoginPage;
