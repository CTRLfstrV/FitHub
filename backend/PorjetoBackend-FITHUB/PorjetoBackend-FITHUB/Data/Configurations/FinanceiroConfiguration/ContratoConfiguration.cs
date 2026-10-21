using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PorjetoBackend_FITHUB.Models.Entities.Financeiro;

namespace PorjetoBackend_FITHUB.Data.Configurations.FinanceiroConfiguration
{
    public class ContratoConfiguration : IEntityTypeConfiguration<Contrato>
    {
        public void Configure(EntityTypeBuilder<Contrato> builder)
        {
            builder.ToTable("Tb_contrato");

            builder.HasKey(c => c.Id);

            builder.Property(c => c.Id).HasColumnName("pk_id_contrato");

            builder.HasOne(c => c.Aluno).WithMany()
                .HasForeignKey("fk_id_pessoa_aluno")
                .HasConstraintName("FK_contrato_aluno");

            builder.HasOne(c => c.Plano).WithMany()
                .HasForeignKey("fk_id_plano")
                .HasConstraintName("FK_contrato_plano");

            builder.HasMany(c => c.Pagamentos)
                .WithOne(p => p.Contrato)
                .HasForeignKey("fk_id_contrato");

            builder.Property(c => c.Inicio).HasColumnName("dt_inicio_contrato");
            builder.Property(c => c.Termino).HasColumnName("dt_fim_contrato");
            builder.Property(c => c.Valor).HasColumnName("vlr_contrato");
            builder.Property(c => c.QuantidadeParcelas).HasColumnName("qtd_parcelas_contrato");
            builder.Property(c => c.StatusContrato).HasColumnName("status_contrato");
        }
    }
}
