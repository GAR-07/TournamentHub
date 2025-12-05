
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using TournamentHub.Application.Configuration;
using TournamentHub.Application.Interfaces;
using TournamentHub.Domain.Entities;

namespace TournamentHub.API.Providers
{
    public class JwtProvider : IJwtProvider
    {
        private readonly AuthOptions _authOptions;

        public JwtProvider(IOptions<AuthOptions> options)
        {
            _authOptions = options.Value;
        }

        public string Generate(Account account)
        {
            var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, account.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Name, account.UserName),
            new Claim(ClaimTypes.Role, account.Role.Name)
        };

            var signingCredentials = new SigningCredentials(
                _authOptions.GetSymmetricSecurityKey(),
                SecurityAlgorithms.HmacSha256);

            var jwt = new JwtSecurityToken(
                issuer: _authOptions.Issuer,
                audience: _authOptions.Audience,
                claims: claims,
                notBefore: DateTime.Now,
                expires: DateTime.UtcNow.AddSeconds(_authOptions.TokenLifeTime),
                signingCredentials: signingCredentials
            );

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}
