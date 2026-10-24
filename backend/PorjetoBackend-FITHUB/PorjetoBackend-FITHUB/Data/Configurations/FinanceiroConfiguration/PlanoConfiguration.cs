using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PorjetoBackend_FITHUB.Models.Entities.Financeiro;

namespace PorjetoBackend_FITHUB.Data.Configurations.FinanceiroConfiguration
{
    public class PlanoConfiguration : IEntityTypeConfiguration<Plano>
    {
        public void Configure(EntityTypeBuilder<Plano> builder)
        {
            builder.ToTable("Tb_plano");

            builder.HasKey(p => p.Id);
            builder.Property(p => p.Id).HasColumnName("pk_id_plano").ValueGeneratedOnAdd();

            builder.Property(p => p.Nome).HasColumnName("nome_plano");
            builder.Property(p => p.Valor).HasColumnName("vlr_plano");
        }
    }
}
