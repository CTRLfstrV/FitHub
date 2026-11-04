import { Link } from "react-router-dom";

const eyebrow =
  "inline-flex items-center gap-2 text-[11px] font-bold tracking-[.16em] text-fithub-brand";
const primaryButton =
  "inline-flex min-h-[50px] items-center justify-center gap-6 rounded-lg bg-fithub-lime px-[21px] text-[15px] font-bold text-fithub-ink transition hover:-translate-y-0.5 hover:bg-fithub-lime-hover";

function HomePage() {
  return (
    <div className="mx-auto max-w-[1240px] px-[18px] pb-12 md:px-10 md:pb-[70px]">
      <section className="grid items-center gap-10 py-[54px] md:grid-cols-2 md:gap-[clamp(40px,8vw,110px)] md:py-[78px]">
        <div className="max-w-[520px]">
          <span className={eyebrow}>
            <span className="h-[7px] w-[7px] rounded-full bg-fithub-brand" />{" "}
            MOVIMENTO QUE TRANSFORMA
          </span>
          <h1 className="my-6 text-[42px] font-extrabold leading-[1.04] tracking-[-.06em] sm:text-5xl md:text-[clamp(44px,5.5vw,72px)]">
            Seu próximo nível{" "}
            <span className="text-fithub-brand">começa aqui.</span>
          </h1>
          <p className="max-w-[430px] text-[17px] leading-[1.8] text-fithub-muted">
            Treine com propósito, acompanhe sua evolução e encontre uma rotina
            que combina com você.
          </p>
          <div className="mt-8 flex flex-col items-start gap-[18px] min-[420px]:flex-row min-[420px]:items-center min-[420px]:gap-[25px]">
            <Link className={primaryButton} to="/login">
              Começar agora <span>↗</span>
            </Link>
            <a className="text-[13px] text-[#485044]" href="#beneficios">
              Conheça o FitHub <span className="ml-1 text-fithub-brand">↓</span>
            </a>
          </div>
          <div className="mt-[34px] flex items-center gap-[13px] text-[13px] leading-relaxed text-[#737b6e] md:mt-[54px]">
            <span className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-full border border-[#dce4d5] text-xl text-[#598c1c]">
              ✳
            </span>
            <span>
              <strong className="text-sm text-[#30372d]">
                Mais consistência.
              </strong>
              <br />
              Mais perto dos seus objetivos.
            </span>
          </div>
        </div>
        <div className="relative min-w-0">
          <div
            className="home-visual-pulse relative grid h-[min(68vw,390px)] min-h-[280px] place-items-center overflow-hidden rounded-[10px] border border-[#d6e8c4] bg-fithub-surface md:h-[clamp(340px,38vw,450px)]"
            aria-label="Movimento, foco e evolução"
          >
            <div className="absolute h-[34%] w-[72%] rotate-[-28deg] rounded-[50%] border-[1.5px] border-[#78b936]/75 shadow-[0_0_18px_rgba(101,163,13,0.16)]" />
            <div className="absolute h-[54%] w-[58%] rotate-[32deg] rounded-[50%] border-[1.5px] border-[#9acb62]/80" />
            <span className="relative z-[1] text-[clamp(180px,25vw,320px)] font-extrabold leading-[.8] tracking-[-.12em] text-fithub-brand drop-shadow-[0_8px_18px_rgba(87,145,25,0.2)]">
              F
            </span>
          </div>
          <div className="absolute -top-2 right-[-9px] flex h-[78px] w-[78px] rotate-[9deg] flex-col items-center justify-center gap-1 rounded-full bg-fithub-lime text-[11px] font-extrabold leading-tight text-fithub-ink md:-top-1 md:right-[-22px] md:h-[94px] md:w-[94px] md:text-[13px]">
            <span>
              SEU
              <br />
              RITMO
            </span>
            <b className="text-base">↗</b>
          </div>
          <div className="mt-3 flex justify-between text-[10px] tracking-[.12em] text-[#788271]">
            <span>FOCO • FORÇA • EVOLUÇÃO</span>
          </div>
        </div>
      </section>

      <section
        className="border-t border-[#e5e9e1] py-12 md:py-[62px]"
        id="beneficios"
      >
        <div className="mb-8">
          <span className={eyebrow}>FEITO PARA VOCÊ</span>
          <h2 className="mt-3 text-[28px] font-bold leading-tight tracking-[-.045em] sm:text-4xl">
            Um jeito mais leve de{" "}
            <span className="text-fithub-brand">evoluir.</span>
          </h2>
        </div>
        <div className="grid gap-[14px] md:grid-cols-3">
          <article className="fithub-card relative p-[22px] md:min-h-[205px] md:p-6">
            <span className="text-xs tracking-[.12em] text-[#828a7d]">01</span>
            <span className="absolute top-5 right-[22px] text-xl text-fithub-brand">
              ↗
            </span>
            <h3 className="mt-6 mb-2 text-[18px] font-bold md:mt-8">
              Seu objetivo, seu plano
            </h3>
            <p className="text-sm leading-[1.7] text-fithub-muted">
              Encontre uma jornada que respeita seu momento e ajuda você a
              seguir em frente.
            </p>
          </article>
          <article className="fithub-card relative p-[22px] md:min-h-[205px] md:p-6">
            <span className="text-xs tracking-[.12em] text-[#828a7d]">02</span>
            <span className="absolute top-5 right-[22px] text-xl text-fithub-brand">
              ◷
            </span>
            <h3 className="mt-6 mb-2 text-[18px] font-bold md:mt-8">
              Constância que cabe na rotina
            </h3>
            <p className="text-sm leading-[1.7] text-fithub-muted">
              Transforme pequenos passos em hábitos que fazem diferença no dia a
              dia.
            </p>
          </article>
          <article className="fithub-card relative p-[22px] md:min-h-[205px] md:p-6">
            <span className="text-xs tracking-[.12em] text-[#828a7d]">03</span>
            <span className="absolute top-5 right-[22px] text-xl text-fithub-brand">
              ✳
            </span>
            <h3 className="mt-6 mb-2 text-[18px] font-bold md:mt-8">
              Progresso de verdade
            </h3>
            <p className="text-sm leading-[1.7] text-fithub-muted">
              Acompanhe sua evolução e celebre cada conquista ao longo do
              caminho.
            </p>
          </article>
        </div>
      </section>
      <section
        className="border-t border-[#e5e9e1] py-12 md:py-[62px]"
        id="sobre-nos"
      >
        <div className="mb-8">
          <span className={eyebrow}>QUEM FAZ ACONTECER</span>
          <h2 className="mt-3 text-[28px] font-bold leading-tight tracking-[-.045em] sm:text-4xl">
            Sobre <span className="text-fithub-brand">nós.</span>
          </h2>
          <p className="mt-3 max-w-[560px] text-sm leading-[1.7] text-fithub-muted">
            Conheça as pessoas que desenvolveram o FitHub.
          </p>
        </div>
        <div className="grid gap-[14px] md:grid-cols-3">
          <article className="fithub-card p-[22px] md:p-6">
            <img
              src="/joao-otavio.jpg"
              alt="João Otávio"
              className="h-16 w-16 rounded-full object-cover ring-2 ring-fithub-surface"
            />
            <h3 className="mt-5 text-[18px] font-bold">João Otávio</h3>
            <p className="mt-1 text-sm leading-[1.7] text-fithub-muted">
              Fullstack
            </p>
            <p className="mt-3 text-sm leading-[1.7] text-fithub-muted">
              Desenvolveu funcionalidades da aplicação e integrou a interface
              com os serviços do sistema.
            </p>
            <a
              className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-fithub-brand transition hover:underline"
              href="https://github.com/joao-otavio-rosa"
              target="_blank"
              rel="noreferrer"
              aria-label="Visitar o GitHub de João Otávio (abre em nova aba)"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </article>
          <article className="fithub-card p-[22px] md:p-6">
            <img
              src="/felipe-soterio.jpg"
              alt="Felipe Sotério"
              className="h-16 w-16 rounded-full object-cover ring-2 ring-fithub-surface"
            />
            <h3 className="mt-5 text-[18px] font-bold">Felipe Sotério</h3>
            <p className="mt-1 text-sm leading-[1.7] text-fithub-muted">
              Frontend
            </p>
            <p className="mt-3 text-sm leading-[1.7] text-fithub-muted">
              Criou as telas e os componentes visuais para a experiência de uso
              do FitHub.
            </p>
            <a
              className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-fithub-brand transition hover:underline"
              href="https://github.com/CTRLfstrV"
              target="_blank"
              rel="noreferrer"
              aria-label="Visitar o GitHub de Felipe Sotério (abre em nova aba)"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </article>
          <article className="fithub-card p-[22px] md:p-6">
            <img
              src="/giovana-helena.jpg"
              alt="Giovana Helena"
              className="h-16 w-16 rounded-full object-cover ring-2 ring-fithub-surface"
            />
            <h3 className="mt-5 text-[18px] font-bold">Giovana Helena</h3>
            <p className="mt-1 text-sm leading-[1.7] text-fithub-muted">
              DBA
            </p>
            <p className="mt-3 text-sm leading-[1.7] text-fithub-muted">
              Modelou e organizou o banco de dados para armazenar as informações
              do sistema.
            </p>
            <a
              className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-fithub-brand transition hover:underline"
              href="https://github.com/giovanahelenapereira-cmd"
              target="_blank"
              rel="noreferrer"
              aria-label="Visitar o GitHub de Giovana Helena (abre em nova aba)"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </article>
        </div>
      </section>
      <section className="flex flex-col items-start gap-6 rounded-[10px] bg-fithub-surface px-[23px] py-7 md:flex-row md:items-center md:justify-between md:px-10 md:py-[35px]">
        <div>
          <span className={eyebrow}>O SEU MOMENTO É AGORA</span>
          <h2 className="mt-3 text-[23px] font-bold tracking-[-.045em] sm:text-[32px]">
            Vamos dar o primeiro passo?
          </h2>
        </div>
        <Link className={primaryButton} to="/login">
          Acessar minha conta <span>↗</span>
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
