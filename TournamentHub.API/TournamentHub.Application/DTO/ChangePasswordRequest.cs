namespace TournamentHub.Application.DTO
{
    public class ChangePasswordRequest
    {
        public string NewPassword { get; set; }
        public string OldPassword { get; set; }
    }
}
