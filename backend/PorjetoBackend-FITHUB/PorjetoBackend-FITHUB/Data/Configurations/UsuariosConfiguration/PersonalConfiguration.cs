using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PorjetoBackend_FITHUB.Models.Entities.Usuarios;

namespace PorjetoBackend_FITHUB.Data.Configurations.UsuariosConfiguration
{
    public class PersonalConfiguration : IEntityTypeConfiguration<Personal>
    {
        public void Configure(EntityTypeBuilder<Personal> builder)
        {
            builder.ToTable("Tb_personal");

            builder.Property(p => p.DataAdmissao).HasColumnName("dt_adm_personal");
            builder.Property(p => p.DataDemissao).HasColumnName("dt_dem_personal");
        }
    }
}
