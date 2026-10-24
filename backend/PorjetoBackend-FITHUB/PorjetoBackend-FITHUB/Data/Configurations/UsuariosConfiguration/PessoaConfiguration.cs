using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PorjetoBackend_FITHUB.Models.Entities.Usuarios;

namespace PorjetoBackend_FITHUB.Data.Configurations.UsuariosConfiguration
{
    public class PessoaConfiguration : IEntityTypeConfiguration<Pessoa>
    {
        public void Configure(EntityTypeBuilder<Pessoa> builder)
        {
            builder.ToTable("Tb_pessoa");

            builder.HasKey(p => p.Id);
            builder.Property(p => p.Id).HasColumnName("pk_id_pessoa").ValueGeneratedOnAdd();

            builder.Property(p => p.Nome).HasColumnName("nome_pessoa");
            builder.Property(p => p.Senha).HasColumnName("senha_pessoa");
            builder.Property(p => p.Cpf).HasColumnName("cpf_pessoa");
            builder.Property(p => p.DataNascimento).HasColumnName("data_nasc_pessoa");
            builder.Property(p => p.Cep).HasColumnName("cep_pessoa");
            builder.Property(p => p.NumeroCasa).HasColumnName("num_casa_pessoa");
            builder.Property(p => p.Telefone).HasColumnName("telefone_pessoa");
            builder.Property(p => p.TelefoneEmergencia).HasColumnName("telefone_emergencia_pessoa");
            builder.Property(p => p.Sexo).HasColumnName("sexo_pessoa");
            builder.Property(p => p.TipoPessoa).HasColumnName("tipo_pessoa");
            builder.Property(p => p.Email).HasColumnName("email_pessoa");
        }
    }
}
