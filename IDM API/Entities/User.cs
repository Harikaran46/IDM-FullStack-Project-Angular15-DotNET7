namespace WebApi.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

public class User
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public Role Role { get; set; }
    public string Email { get; set; }
    public long Salary { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string Department { get; set; }
    public string AadharNumber { get; set; }
    public string Address { get; set; }
    public string MobileNumber { get; set; }
    public string Gender { get; set; }
}