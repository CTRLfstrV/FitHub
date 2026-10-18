using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PorjetoBackend_FITHUB.Models.Entities.Usuarios;

namespace PorjetoBackend_FITHUB.Data.Configurations.UsuariosConfiguration
{
    public class RecepcionistaConfiguration : IEntityTypeConfiguration<Recepcionista>
    {
        public void Configure(EntityTypeBuilder<Recepcionista> builder)
        {
            builder.ToTable("Tb_recepcionista");

            builder.Property(r => r.DataAdmissao).HasColumnName("dt_adm_recepcionista");
            builder.Property(r => r.DataDemissao).HasColumnName("dt_dem_recepcionista");
        }
    }
}
