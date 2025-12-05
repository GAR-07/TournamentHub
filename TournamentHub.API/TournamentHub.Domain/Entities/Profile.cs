namespace TournamentHub.Domain.Entities
{
    public class Profile
    {
        public Guid Id { get; private set; }
        public Guid AccountId { get; private set; }
        public Account Account { get; private set; }
        public DateTime CreatedDate { get; private set; }
        protected Profile() { } // EF Core
        public Profile(Guid accountId)
        {
            if (accountId == Guid.Empty)
                throw new ArgumentException("Invalid AccountId.", nameof(accountId));

            Id = Guid.NewGuid();
            AccountId = accountId;
            CreatedDate = DateTime.UtcNow;
        }
    }
}