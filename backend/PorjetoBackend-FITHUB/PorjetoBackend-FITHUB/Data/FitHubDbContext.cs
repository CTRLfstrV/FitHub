using Microsoft.EntityFrameworkCore;
using PorjetoBackend_FITHUB.Models.Entities.Agenda;
using PorjetoBackend_FITHUB.Models.Entities.Financeiro;
using PorjetoBackend_FITHUB.Models.Entities.Treinamento;
using PorjetoBackend_FITHUB.Models.Entities.Usuarios;

namespace PorjetoBackend_FITHUB.Data
{
    public class FitHubDbContext : DbContext
    {
        public FitHubDbContext(DbContextOptions<FitHubDbContext> options) : base(options) { }

        //Referente as entidades do namespace Usuarios
        public DbSet<Pessoa> TbPessoa { get; set; }
        public DbSet<Aluno> TbAluno { get; set; }
        public DbSet<Personal> TbPersonal { get; set; }
        public DbSet<Recepcionista> TbRecepcionista {  get; set; }

        //Referente as entidades do namespace Agenda
        public DbSet<Agendamento> TbAgendamento { get; set; }
        public DbSet<Horario> TbHorario { get; set; }

        //Referente as entidades do namespace Financeiro
        public DbSet<Contrato> TbContrato { get; set; }
        public DbSet<Pagamento> TbPagamento { get; set; }
        public DbSet<Plano> TbPlano { get; set; }

        //Referente as entidades do namespace Treinamento
        public DbSet<Equipamento> TbEquipamento { get; set; }
        public DbSet<ExercicioTreino> TbExercicioTreino { get; set; }
        public DbSet<Sessao> TbSessao { get; set; }
        public DbSet<Treino> TbTreino { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(
                typeof(FitHubDbContext).Assembly);
            base.OnModelCreating(modelBuilder);
        }
    }
}
