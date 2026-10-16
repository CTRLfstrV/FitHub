using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PorjetoBackend_FITHUB.Models.Entities.Treinamento;

namespace PorjetoBackend_FITHUB.Data.Configurations.TreinamentoConfiguration
{
    public class SessaoConfiguration : IEntityTypeConfiguration<Sessao>
    {
        public void Configure(EntityTypeBuilder<Sessao> builder)
        {
            builder.ToTable("Tb_sessao_treino");

            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id).HasColumnName("pk_id_sessao");

            builder.HasOne(s => s.Treino)
                .WithMany(t => t.Sessoes)
                .HasForeignKey("fk_id_treino")
                .HasConstraintName("FK_id_treino_sessao");

            builder.Property(s => s.Inicio).HasColumnName("dt_inicio_sessao")
                .HasDefaultValueSql("GETDATE()");
            builder.Property(s => s.Termino).HasColumnName("dt_termino_sessao");
        }
    }
}
