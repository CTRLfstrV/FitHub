using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PorjetoBackend_FITHUB.Models.Entities.Usuarios;

namespace PorjetoBackend_FITHUB.Data.Configurations
{
    public class UsuarioConfiguration : IEntityTypeConfiguration<Pessoa>
    {
        public void Configure(EntityTypeBuilder<Pessoa> builder)
        {
            builder.ToTable("Tb_pessoa");
        }
    }
}
