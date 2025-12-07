using Azure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TournamentHub.API.Providers;
using TournamentHub.Application.Configuration;
using TournamentHub.Application.Interfaces;
using TournamentHub.Application.Services;
using TournamentHub.Infrastructure.Security;
using TournamentHub.Persistence;
using TournamentHub.Persistence.Repositories;
using TournamentHub.Persistence.Seed;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);
builder.Services.Configure<AuthOptions>(builder.Configuration.GetSection("AuthOptions"));
builder.Services.AddScoped<IBCryptPasswordHasher, BCryptPasswordHasher>();
builder.Services.AddScoped<IAccountRepository, AccountRepository>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddSingleton<IJwtProvider, JwtProvider>();
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    var authOptions = builder.Configuration.GetSection("AuthOptions").Get<AuthOptions>();

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true, // указывает, будет ли валидироваться издатель при валидации токена
        ValidIssuer = authOptions.Issuer, // строка, представляющая издателя
        ValidateAudience = true, // будет ли валидироваться потребитель токена
        ValidAudience = authOptions.Audience, // установка потребителя токена
        ValidateIssuerSigningKey = true, // валидация ключа безопасности
        IssuerSigningKey = authOptions.GetSymmetricSecurityKey(), // установка ключа безопасности
        ValidateLifetime = true, // будет ли валидироваться время существования
    };
});
builder.Services.AddAuthorization();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder => builder
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins("http://localhost:4400")
            .AllowCredentials()
    );
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        context.Response.ContentType = "application/json";

        var exceptionHandlerPathFeature =
            context.Features.Get<IExceptionHandlerPathFeature>();

        var errorMessage = exceptionHandlerPathFeature?.Error.Message ?? "Неизвестная ошибка";

        await context.Response.WriteAsync(errorMessage);
    });
});

app.UseRouting();
app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    await RoleSeeder.SeedAsync(scope.ServiceProvider.GetRequiredService<ApplicationDbContext>());
}

app.Run();