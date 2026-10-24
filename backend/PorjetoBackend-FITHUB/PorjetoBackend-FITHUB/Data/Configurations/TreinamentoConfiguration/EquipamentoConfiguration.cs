using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PorjetoBackend_FITHUB.Models.Entities.Treinamento;

namespace PorjetoBackend_FITHUB.Data.Configurations.TreinamentoConfiguration
{
    public class EquipamentoConfiguration : IEntityTypeConfiguration<Equipamento>
    {
        public void Configure(EntityTypeBuilder<Equipamento> builder)
        {
            builder.ToTable("Tb_equipamento");

            builder.HasKey(e => e.Id);
            builder.Property(e => e.Id).HasColumnName("pk_id_eqpt").ValueGeneratedOnAdd();

            builder.Property(e => e.Nome).HasColumnName("nome_eqpt");
            builder.Property(e => e.Quantidade).HasColumnName("qtd_eqpt");
            builder.Property(e => e.QuantidadeDisponivel).HasColumnName("qtd_disp_eqpt");
        }
    }
}
