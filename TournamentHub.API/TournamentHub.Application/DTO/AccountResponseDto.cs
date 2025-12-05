namespace TournamentHub.Shared.DTO
{
    public class AccountResponseDto
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string AccessToken { get; set; }
    }
}
