using TournamentHub.Application.Interfaces;
using TournamentHub.Domain.Entities;
using TournamentHub.Shared.DTO;

namespace TournamentHub.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IRoleRepository _roleRepository;
        private readonly IBCryptPasswordHasher _hasher;

        public AuthService(
            IAccountRepository accountRepository,
            IRoleRepository roleRepository,
            IBCryptPasswordHasher hasher)
        {
            _accountRepository = accountRepository;
            _roleRepository = roleRepository;
            _hasher = hasher;
        }

        public async Task<Account> RegisterAsync(AccountRequestRegister request, CancellationToken ct)
        {
            if (await _accountRepository.ExistsByEmailAsync(request.Email, ct))
                throw new Exception("Email already in use");

            var account = new Account(Guid.Empty, request.UserName, request.Email);
            account.SetPasswordHash(_hasher.Hash(request.Password));
            
            var role = await _roleRepository.GetByNameAsync("User");
            account.SetRole(role);

            var profile = new Profile(account.Id);
            account.SetProfile(profile);

            await _accountRepository.AddAsync(account, ct);

            await _accountRepository.UpdateAsync(account, ct);

            return account;
        }

        public async Task<Account> LoginAsync(AccountRequestLogin request, CancellationToken ct)
        {
            var account = await _accountRepository.GetByEmailAsync(request.Login, ct)
                ?? throw new Exception("Invalid login or password.");

            if (!_hasher.Verify(request.Password, account.PasswordHash))
                throw new Exception("Invalid email or password.");

            return account;
        }
    }
}
