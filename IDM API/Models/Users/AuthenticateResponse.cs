namespace WebApi.Models.Users;

using WebApi.Entities;

public class AuthenticateResponse
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Username { get; set; }
    public string Password {get; set;}
    public Role Role { get; set; }
   
    public string Email { get; set; }
   
    public long Salary { get; set; }

    public DateTime DateOfBirth { get; set; }

    public string Department { get; set; }

    public string AadharNumber { get; set; }
    public string Address { get; set; }
    public string MobileNumber { get; set; }
    public string Gender { get; set; }
        public string Token { get; set; }

    public AuthenticateResponse(User user, string token)
    {
        Id = user.Id;
        FirstName = user.FirstName;
        LastName = user.LastName;
        Username = user.Username;
        Password = user.Password;
        Role = user.Role;
        Token = token;
        Email = user.Email;
        Salary = user.Salary;
        DateOfBirth = user.DateOfBirth;
        Department = user.Department;
        AadharNumber = user.AadharNumber;
        Address = user.Address;
        MobileNumber = user.MobileNumber;
        Gender = user.Gender;



    }
}