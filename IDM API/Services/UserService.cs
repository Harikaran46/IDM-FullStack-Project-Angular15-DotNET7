namespace WebApi.Services;

using BCrypt.Net;
using Microsoft.Extensions.Options;
using WebApi.Authorization;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Users;

public interface IUserService
{
    AuthenticateResponse Authenticate(AuthenticateRequest model);
    IEnumerable<User> GetAll();
    User GetById(int id);
    User Create(User user);
    User Edit(User user);
    User Delete(int id);
}

public class UserService : IUserService
{
    private DataContext _context;
    private IJwtUtils _jwtUtils;
    private readonly AppSettings _appSettings;

    public UserService(
        DataContext context,
        IJwtUtils jwtUtils,
        IOptions<AppSettings> appSettings)
    {
        _context = context;
        _jwtUtils = jwtUtils;
        _appSettings = appSettings.Value;
    }


    public AuthenticateResponse Authenticate(AuthenticateRequest model)
    {
        var user = _context.Users.SingleOrDefault(x => x.Username == model.Username);

        // validate
        if (user == null || model.Password != user.Password)
            throw new AppException("Username or password is incorrect");

        // authentication successful so generate jwt token
        var jwtToken = _jwtUtils.GenerateJwtToken(user);

        return new AuthenticateResponse(user, jwtToken);
    }

    public IEnumerable<User> GetAll()
    {
        return _context.Users;
    }

    public User GetById(int id) 
    {
        var user = _context.Users.Find(id);
        if (user == null) throw new KeyNotFoundException("User not found");
        return user;
    }

    public User Create(User user)
    {
      _context.Users.Add(user);
      _context.SaveChanges();
      return user;
    }
    public User Edit(User user)
    {
        
        _context.Users.Update(user);
        _context.SaveChanges();
        return user;
    }
    public User Delete(int id)
    {
        
        var user = _context.Users.Find(id);
        _context.Users.Remove(user);
        _context.SaveChanges();
        return user;

    }


}