using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using ToDoApi;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["JWT:Issuer"],
            ValidAudience = builder.Configuration["JWT:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]?? " "))
        };
    });
builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Description = "Bearer Authentication with JWT Token",
        Type = SecuritySchemeType.Http
    });
});


builder.Services.AddSingleton<JwtService>();
// builder.Services.AddDbContext<ToDoDbContext>(options =>
//     options.UseMySql(
//         builder.Configuration.GetConnectionString("ToDoDB"),
//         new MySqlServerVersion(new Version(8, 0, 2))
//     ));

builder.Services.AddDbContext<ToDoDbContext>(options =>
{
    var x = builder.Configuration["ConnectionStrings__ToDoDB"];
    options.UseMySql(x, ServerVersion.AutoDetect(x));
});



var app = builder.Build();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();




app.MapGet("/items", async (ToDoDbContext dbContext) =>
{
    var items = await dbContext.Items.ToListAsync();
    Console.WriteLine(items);
    return Results.Ok(items);
});

app.MapGet("/items/{id}", async (int id, ToDoDbContext dbContext) =>
{
    var item = await dbContext.Items.FindAsync(id);
    if (item == null)
        return Results.NotFound();
    return Results.Ok(item);
});
app.MapPost("/items", async (ToDoDbContext dbContext, Item newItem) =>
{
    dbContext.Items.Add(newItem);
    await dbContext.SaveChangesAsync();
    return Results.Created($"/item/{newItem.Id}", newItem);
});
app.MapPut("/items/{id}", async (int id, ToDoDbContext dbContext, Item updatedItem) =>
{
    var existItem = await dbContext.Items.FindAsync(id);
    if (existItem == null)
        return Results.NotFound();
    existItem.Name = updatedItem.Name;
    existItem.IsComplete = updatedItem.IsComplete;
    await dbContext.SaveChangesAsync();
    return Results.Ok(existItem);
});

app.MapPut("/items/{id}/isComplete", async (int id, ToDoDbContext dbContext, bool isComplete) =>
{
   var existItem = await dbContext.Items.FindAsync(id);
   if (existItem == null)
       return Results.NotFound();
   existItem.IsComplete = isComplete;
   await dbContext.SaveChangesAsync();
   return Results.Ok(existItem);
});
app.MapDelete("/items/{id}", async (int id, ToDoDbContext dbContext) =>
{
    var existItem = await dbContext.Items.FindAsync(id);
    if (existItem == null)
        return Results.NotFound();
    dbContext.Items.Remove(existItem);
    await dbContext.SaveChangesAsync();
    return Results.NoContent();
});

app.MapGet("/users", async (ToDoDbContext dbContext) =>
{
    var users = await dbContext.Users.ToListAsync();
    return Results.Ok(users);
}).RequireAuthorization();

app.MapPost("/users", async (User user, ToDoDbContext dbContext) =>
{
    await dbContext.Users.AddAsync(user);
    await dbContext.SaveChangesAsync();
});
app.MapPost("users/login", async (User user, ToDoDbContext dbContext, JwtService _jwtService) =>
{
    var exitUser = await dbContext.Users.FirstOrDefaultAsync(u => u.Email == user.Email && u.UserName == user.UserName && u.Password == user.Password);
    if (exitUser is not null)
    {
        var jwt = _jwtService.CreateJwt(exitUser);
        return Results.Ok(jwt);
    }
    return Results.Unauthorized();
});






app.UseSwagger();
app.UseSwaggerUI();



app.Run();
