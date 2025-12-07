using System.Text.RegularExpressions;
using TournamentHub.Application.DTO;
using TournamentHub.Application.Interfaces;
using TournamentHub.Domain.Entities;

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
            ValidateRegisterRequest(request);

            if (await _accountRepository.ExistsByEmailAsync(request.Email, ct))
                throw new Exception("Адрес электронной почты уже используется");

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
            Account account = await _accountRepository.GetByEmailAsync(request.Login, ct) 
                ?? throw new Exception($"Неверная почта или пароль");

            if (!_hasher.Verify(request.Password, account.PasswordHash))
                throw new Exception("Неверная почта или пароль");

            return account;
        }

        public async Task ChangePasswordAsync(Guid accountId, ChangePasswordRequest request, CancellationToken ct)
        {
            ValidatePassword(request.NewPassword);

            var account = await _accountRepository.GetByIdAsync(accountId, ct)
                ?? throw new Exception("Аккаунт не найден");

            if (!_hasher.Verify(request.OldPassword, account.PasswordHash))
                throw new Exception("Текущий пароль неверен");

            // Добавить проверку сложности нового пароля, отстутствие совпадения с текущим и т.п.

            account.SetPasswordHash(_hasher.Hash(request.NewPassword));

            await _accountRepository.UpdateAsync(account, ct);
        }

        private static void ValidateRegisterRequest(AccountRequestRegister request)
        {
            if (string.IsNullOrWhiteSpace(request.Email))
                throw new Exception("Email не может быть пустым");

            if (!Regex.IsMatch(request.Email, @"^\S+@\S+\.\S+$"))
                throw new Exception("Некорректный email");

            if (string.IsNullOrWhiteSpace(request.UserName) || request.UserName.Length > 50)
                throw new Exception("UserName должен быть 1-50 символов");

            if (Regex.IsMatch(request.UserName, @"[^a-zA-ZА-Яа-яЁё0-9_]"))
                throw new Exception("UserName может содержать только буквы, цифры и _");
            
            ValidatePassword(request.Password);
        }

        private static void ValidatePassword(string password)
        {
            if (string.IsNullOrWhiteSpace(password) || password.Length < 12)
                throw new Exception("Пароль должен быть не меньше 12 символов");
        }
    }
}
