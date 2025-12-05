namespace TournamentHub.Domain.Entities
{
    public class Role
    {
        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public ICollection<Account> Accounts { get; private set; } = new List<Account>();
        protected Role() { } // EF Core
        public Role(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("Role name cannot be empty.", nameof(name));

            Id = Guid.NewGuid();
            Name = name.Trim();
        }
    }
}