using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PorjetoBackend_FITHUB.Models.Entities.Treinamento;

namespace PorjetoBackend_FITHUB.Data.Configurations.TreinamentoConfiguration
{
    public class TreinoConfiguration : IEntityTypeConfiguration<Treino>
    {
        public void Configure(EntityTypeBuilder<Treino> builder)
        {
            builder.ToTable("Tb_treino");

            builder.HasKey(t => t.Id);
            builder.Property(t => t.Id).HasColumnName("pk_id_treino");

            builder.HasOne(t => t.Personal).WithMany()
                .HasForeignKey("fk_id_pessoa_personal")
                .HasConstraintName("FK_treino_personal");

            builder.HasOne(t => t.Aluno).WithMany()
                .HasForeignKey("fk_id_pessoa_aluno")
                .HasConstraintName("FK_treino_aluno");

            builder.HasMany(t => t.Exercicios)
                .WithOne(et => et.Treino)
                .HasForeignKey("fk_id_treino");

            builder.Property(t => t.Nome).HasColumnName("nome_treino");
            builder.Property(t => t.DataCriacao).HasColumnName("dt_criacao_treino");
        }
    }
}
