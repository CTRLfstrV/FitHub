using Microsoft.EntityFrameworkCore;
using PorjetoBackend_FITHUB.Models.Entities.Usuarios;

namespace PorjetoBackend_FITHUB.Data
{
    public class FitHubDbContext : DbContext
    {
        public FitHubDbContext(DbContextOptions<FitHubDbContext> options) : base(options) { }

        public DbSet<Pessoa> TbPessoa {  get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(
                typeof(FitHubDbContext).Assembly);

            base.OnModelCreating(modelBuilder);
        }
    }
}
