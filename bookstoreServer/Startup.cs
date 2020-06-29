using bookstoreServer.Database;
using bookstoreServer.Database.Entities;
using BookstoreSignal.Hubs;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace bookstoreApp
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
            services.AddDbContext<BookstoreDbContext>(options =>
            {
                options.UseNpgsql(
                    Configuration.GetConnectionString("DefaultConnection"),
                    builder =>
                    builder.MigrationsHistoryTable("__EFMigrationHistory"));
            });
            services.AddRazorPages();
            services.AddCors(options =>
                options.AddPolicy(
                    "CorsPolicy",
                     builder =>
                        {
                            builder.AllowAnyMethod()
                                .AllowAnyHeader()
                                .WithOrigins("http://localhost:4200")
                                .AllowCredentials();
                        }));
            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            //app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();
            app.UseCors("CorsPolicy");
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<BookstoreHub>("/hubs");
                /*
                endpoints.MapControllerRoute(
                name: "default",
                pattern: "{controller=Bookstore}/{action=Index}");
                */
            });

            // Запуск миграции БД
            using (var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                using (var context = scope.ServiceProvider.GetService<BookstoreDbContext>())
                {
                    context.Database.Migrate(); //создание базы
                    DatabaseSeeder.Seed(context);
                }
            }

        }
    }
}
