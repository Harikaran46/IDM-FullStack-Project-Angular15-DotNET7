 
using System.Text.Json.Serialization;
using WebApi.Authorization;
using WebApi.Helpers;
using WebApi.Services;
using Serilog;


var builder = WebApplication.CreateBuilder(args);


{
    var services = builder.Services;
    var env = builder.Environment;

    builder.Host.UseSerilog((context, config)=> {

  config.WriteTo.File("Logs/log.txt",rollingInterval:RollingInterval.Day);

  if(context.HostingEnvironment.IsProduction() == false)
  {
    config.WriteTo.Console();
  }
});

    //  var DefaultConnection = builder.Configuration.GetConnectionString("DefaultConnection");
    //  builder.Services.AddDbContext<DataContext>(options=>options.UseSqlServer(DefaultConnection));
    services.AddDbContext<DataContext>();
    services.AddCors();
    services.AddControllers().AddJsonOptions(x =>
    {
       
        x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

   
    services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

    
    services.AddScoped<IJwtUtils, JwtUtils>();
    services.AddScoped<IUserService, UserService>();
}

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dataContext = scope.ServiceProvider.GetRequiredService<DataContext>();    
   
}


{
    
    app.UseCors(x => x
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());

    
    app.UseMiddleware<ErrorHandlerMiddleware>();

    
    app.UseMiddleware<JwtMiddleware>();

    app.MapControllers();
}


app.Run("http://localhost:4000");  