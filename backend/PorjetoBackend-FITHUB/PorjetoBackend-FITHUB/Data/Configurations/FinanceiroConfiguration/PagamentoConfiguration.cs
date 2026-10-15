using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PorjetoBackend_FITHUB.Models.Entities.Financeiro;

namespace PorjetoBackend_FITHUB.Data.Configurations.FinanceiroConfiguration
{
    public class PagamentoConfiguration : IEntityTypeConfiguration<Pagamento>
    {
        public void Configure(EntityTypeBuilder<Pagamento> builder)
        {
            builder.ToTable("Tb_pagamento");

            builder.HasKey(p => p.Id);
            builder.Property(p => p.Id).HasColumnName("pk_id_pagamento");

            builder.HasOne(p => p.Contrato).WithMany()
                .HasForeignKey("fk_id_contrato")
                .HasConstraintName("FK_pagamento_contrato");

            builder.Property(p => p.NumeroDaParcela).HasColumnName("num_parcela_pagamento");
            builder.Property(p => p.ValorParcela).HasColumnName("vlr_pagamento");
            builder.Property(p => p.VencimentoParcela).HasColumnName("dt_vencimento_pagamento");
            builder.Property(p => p.FormaPagamento).HasColumnName("frm_pagamento");
            builder.Property(p => p.StatusPagamento).HasColumnName("status_pagamento");
        }
    }
}
