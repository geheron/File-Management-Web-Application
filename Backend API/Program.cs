using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.Text;
using WebApplication1.Data;
using ControllerLibrary.ControllerInterface;
using ControllerLibrary.Controllers;
using NLog.Web;
using NLog;


namespace WebApplication1
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var logger = LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();
            logger.Debug("init main");

            try
            {
                var builder = WebApplication.CreateBuilder(args);

                // Add services to the container.
                builder.Logging.ClearProviders();
                builder.Host.UseNLog();

                builder.Services.AddControllers();
                // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
                builder.Services.AddEndpointsApiExplorer();
                builder.Services.AddSwaggerGen(options =>
                {
                    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
                    {
                        In = ParameterLocation.Header,
                        Name = "Authorization",
                        Type = SecuritySchemeType.ApiKey
                    });

                    options.OperationFilter<SecurityRequirementsOperationFilter>();
                });
                builder.Services.AddAuthentication().AddJwtBearer(options =>
                {
                    var tokenKey = builder.Configuration.GetSection("AppSettings:Token").Value;
                    var keyBytes = Encoding.UTF8.GetBytes(tokenKey);
                    {
                        // Pad the keyBytes to ensure it's at least 64 bytes
                        var paddedKeyBytes = new byte[64];
                        Array.Copy(keyBytes, paddedKeyBytes, keyBytes.Length);
                        keyBytes = paddedKeyBytes;
                    }
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        ValidateAudience = false,
                        ValidateIssuer = false,
                        IssuerSigningKey = new SymmetricSecurityKey(keyBytes)
                    };
                });


                builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(
                                builder.Configuration.GetConnectionString("DefaultConnection")
                            ));

                builder.Services.AddScoped<IFileMethods, FileMethods>();
                builder.Services.AddScoped<IUserMethods, UserMethods>();

                /*
                builder.Services.AddSession(options =>
                {
                    options.IdleTimeout = TimeSpan.FromMinutes(1); 
                });
                */

                //builder.Services.AddHttpContextAccessor();

                var app = builder.Build();



                // Configure the HTTP request pipeline.
                if (app.Environment.IsDevelopment())
                {
                    app.UseSwagger();
                    app.UseSwaggerUI();
                }

                //app.UseSession();

                app.UseCors(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

                app.UseHttpsRedirection();

                app.UseAuthentication();

                app.UseAuthorization();

                app.MapControllers();

                app.Run();
            }
            catch (Exception ex)
            {
                logger.Error(ex);
            }
            finally
            {
                LogManager.Shutdown();
            }

        }
    }
}
