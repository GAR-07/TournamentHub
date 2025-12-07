using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TournamentHub.Application.DTO;
using TournamentHub.Application.Interfaces;

namespace TournamentHub.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IJwtProvider _jwtProvider;

        public AuthController(IAuthService authService, IJwtProvider jwtProvider)
        {
            _authService = authService;
            _jwtProvider = jwtProvider;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] AccountRequestRegister request, CancellationToken ct)
        {
            var account = await _authService.RegisterAsync(request, ct);

            var response = new AccountResponseDto
            {
                Id = account.Id,
                UserName = account.UserName,
                Email = account.Email,
                AccessToken = _jwtProvider.Generate(account)
            };

            return Ok(response);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AccountRequestLogin request, CancellationToken ct)
        {
            var account = await _authService.LoginAsync(request, ct);

            var response = new AccountResponseDto
            {
                Id = account.Id,
                UserName = account.UserName,
                Email = account.Email,
                AccessToken = _jwtProvider.Generate(account)
            };

            return Ok(response);
        }

        [Authorize]
        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request, CancellationToken ct)
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userIdStr, out var userId))
                return Unauthorized();

            await _authService.ChangePasswordAsync(userId, request, ct);
            return Ok();
        }
    }
}
