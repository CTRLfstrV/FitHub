using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PorjetoBackend_FITHUB.Models.Entities.Agenda;

namespace PorjetoBackend_FITHUB.Data.Configurations.AgendaConfiguration
{
    public class HorarioConfigurantion : IEntityTypeConfiguration<Horario>
    {
        public void Configure(EntityTypeBuilder<Horario> builder)
        {
            builder.ToTable("Tb_horario");

            builder.HasKey(h => h.Id);
            builder.Property(h => h.Id).HasColumnName("pk_id_horario");

            builder.Property(h => h.Inicio).HasColumnName("dt_inicio_horario");
            builder.Property(h => h.Termino).HasColumnName("dt_termino_horario");
        }
    }
}
