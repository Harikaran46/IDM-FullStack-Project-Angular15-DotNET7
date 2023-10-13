namespace WebApi.Controllers;

using Microsoft.AspNetCore.Mvc;
using WebApi.Authorization;
using WebApi.Entities;
using WebApi.Models.Users;
using WebApi.Services;

[Authorize]
[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    private IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [AllowAnonymous]
    [HttpPost("[action]")]
    public IActionResult Authenticate(AuthenticateRequest model)
    {
        var response = _userService.Authenticate(model);
        return Ok(response);
    }

    [Authorize(Role.Admin)]
    [HttpGet]
    public IActionResult GetAll()
    {
        var users = _userService.GetAll();
        return Ok(users);
    }

    [HttpGet("{id:int}")]
    public IActionResult GetById(int id)
    {
        var currentUser = (User)HttpContext.Items["User"];
        if (id != currentUser.Id && currentUser.Role != Role.Admin)
            return Unauthorized(new { message = "Unauthorized" });

        var user =  _userService.GetById(id);
        return Ok(user);
    }

    [HttpPost]
    public ActionResult<User> Create([FromBody] User user)
    {
        _userService.Create(user);
         return Ok(user);
    }

    [HttpPut]
    //[Route("edit/{id:int}")]
    public ActionResult<User> Edit([FromBody] User user)
    {
       var user1 = _userService.Edit(user);
        return Ok(user1);
    }
    [HttpDelete("{id:int}")]
    //[Route("Delete/{id:int}")]
    public ActionResult Delete(int id)
    {
       var user= _userService.Delete(id);
        return NoContent();
    }
} 