using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PorjetoBackend_FITHUB.Models.Entities.Agenda;

namespace PorjetoBackend_FITHUB.Data.Configurations.AgendaConfiguration
{
    public class AgendamentoConfiguration : IEntityTypeConfiguration<Agendamento>
    {
        public void Configure(EntityTypeBuilder<Agendamento> builder)
        {
            builder.ToTable("Tb_agendamento");

            builder.HasKey(a => a.Id);
            builder.Property(a => a.Id).HasColumnName("pk_id_agendamento").ValueGeneratedOnAdd();

            builder.HasOne(a => a.Aluno).WithMany()
                .HasForeignKey("fk_id_pessoa_aluno")
                .HasConstraintName("FK_agendamento_aluno");

            builder.HasOne(a => a.Personal).WithMany()
                .HasForeignKey("fk_id_pessoa_personal")
                .HasConstraintName("FK_agendamento_personal");

            builder.HasOne(a => a.Horario).WithOne()
                .HasForeignKey<Agendamento>("fk_id_horario")
                .HasConstraintName("FK_agendamento_horario");

            builder.Property(a => a.StatusAgendamento).HasColumnName("status_agendamento");
        }
    }
}
