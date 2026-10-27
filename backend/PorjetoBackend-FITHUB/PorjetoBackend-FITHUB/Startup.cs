using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using PorjetoBackend_FITHUB.Data;
using PorjetoBackend_FITHUB.Services.Implementations;
using PorjetoBackend_FITHUB.Services.Implementations.Financeiro;
using PorjetoBackend_FITHUB.Services.Implementations.Usuarios;
using PorjetoBackend_FITHUB.Services.Interfaces;
using PorjetoBackend_FITHUB.Services.Interfaces.Financeiro;
using PorjetoBackend_FITHUB.Services.Interfaces.Usuarios;
using System;
using System.Linq;
using PorjetoBackend_FITHUB.Services.Implementations.Matricula;
using PorjetoBackend_FITHUB.Services.Interfaces.Matricula;

namespace PorjetoBackend_FITHUB
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<ILoginService, LoginService>();
            services.AddScoped<IPessoaService, PessoaService>();
            services.AddScoped<IAlunoService, AlunoService>();
            services.AddScoped<IContratoService, ContratoService>();
            services.AddScoped<IPagamentoService, PagamentoService>();
            services.AddScoped<IPlanoService, PlanoService>();
            services.AddScoped<IMatriculaService, MatriculaService>();

            services.AddDbContext<FitHubDbContext>(option =>
                option.UseSqlServer(
                    Configuration.GetConnectionString("FitHub")
                    )
                );

            services.AddCors(options =>
            {
                options.AddPolicy("PermiteRequisicoes", policy =>
                {
                    policy
                    .WithOrigins(
                        "http://localhost:4173",
                        "http://192.168.2.110:4173",
                        "http://192.168.56.1:4173")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
                });
            });

            services.AddDistributedMemoryCache();

            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromMinutes(30);
                options.Cookie.HttpOnly = true;
                options.Cookie.IsEssential = true;
            });

            services.AddControllers()
                .ConfigureApiBehaviorOptions(options =>
                {
                    options.InvalidModelStateResponseFactory = context =>
                    {
                        var erros = context.ModelState
                            .Where(model => model.Value.Errors.Count > 0)
                            .SelectMany(model => model.Value.Errors.Select(erro =>
                                new
                                {
                                    campo = model.Key,
                                    mensagem = string.IsNullOrEmpty(erro.ErrorMessage)
                                        ? "Valor inválido."
                                        : erro.ErrorMessage
                                }))
                            .ToList();

                        return new BadRequestObjectResult(new
                        {
                            status = 400,
                            mensagem = "Existem erros de validação.",
                            erros
                        });
                    };
                });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "PorjetoBackend_FITHUB", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "PorjetoBackend_FITHUB v1"));
            }

            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseSession();

            app.UseCors("PermiteRequisicoes");

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
