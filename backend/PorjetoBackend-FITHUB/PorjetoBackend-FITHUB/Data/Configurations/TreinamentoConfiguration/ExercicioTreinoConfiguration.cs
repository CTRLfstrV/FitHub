using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PorjetoBackend_FITHUB.Models.Entities.Treinamento;

namespace PorjetoBackend_FITHUB.Data.Configurations.TreinamentoConfiguration
{
    public class ExercicioTreinoConfiguration : IEntityTypeConfiguration<ExercicioTreino>
    {
        public void Configure(EntityTypeBuilder<ExercicioTreino> builder)
        {
            builder.ToTable("Tb_treino_exercicio");

            builder.HasKey(et => et.Id);
            builder.Property(et => et.Id).HasColumnName("pk_id_treino_exercicio").ValueGeneratedOnAdd();

            builder.HasOne(et => et.Treino)
                .WithMany(t => t.Exercicios)
                .HasForeignKey("fk_id_treino")
                .HasConstraintName("FK_treino_exercicio_treino");

            builder.HasOne(et => et.Equipamento).WithMany()
                .HasForeignKey("fk_id_eqpt")
                .HasConstraintName("FK_treino_exercicio_eqpt");

            builder.Property(et => et.Nome).HasColumnName("nome_exercicio");
            builder.Property(et => et.Ordem).HasColumnName("ordem_exercicio");
            builder.Property(et => et.QuantidadePeso).HasColumnName("qtd_peso");
            builder.Property(et => et.QuantidadeSeries).HasColumnName("qtd_series");
            builder.Property(et => et.QuantidadeRepeticoes).HasColumnName("qtd_repeticoes");
        }
    }
}
