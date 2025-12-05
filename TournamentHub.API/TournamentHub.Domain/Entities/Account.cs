using System.Data;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TournamentHub.Domain.Entities
{
    public class Account
    {
        public Guid Id { get; private set; }
        public string UserName { get; private set; }
        public string Email { get; private set; }
        public string PasswordHash { get; private set; } = string.Empty;
        public Profile Profile { get; private set; }
        public Role Role { get; private set; }
        public Account(Guid id, string userName, string email)
        {
            if (string.IsNullOrWhiteSpace(userName))
                throw new ArgumentException("UserName cannot be empty.", nameof(userName));
            if (string.IsNullOrWhiteSpace(email))
                throw new ArgumentException("Email cannot be empty.", nameof(email));

            Id = id == Guid.Empty ? Guid.NewGuid() : id;
            UserName = userName;
            Email = email;
        }
        public void SetPasswordHash(string hash)
        {
            PasswordHash = hash ?? throw new ArgumentNullException(nameof(hash));
        }
        public void SetProfile(Profile profile)
        {
            Profile = profile ?? throw new ArgumentNullException(nameof(profile));
        }

        public void SetRole(Role role)
        {
            Role = role ?? throw new ArgumentNullException(nameof(role));
        }
    }
}