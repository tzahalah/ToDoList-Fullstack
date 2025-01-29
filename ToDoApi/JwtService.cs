using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ToDoApi;

public class JwtService
{
    private readonly IConfiguration _configuration;

    public JwtService(IConfiguration configuration)
    {
        _configuration=configuration;
    }

    public Object CreateJwt(User user){
        var claims= new List<Claim>()
        {
            new Claim("email", user.Email),
            new Claim("userName", user.UserName),
            new Claim("password",user.Password)
        };
       
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JWT:Key")?? " AA"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: _configuration.GetValue<string>("JWT:Issuer"),
                    audience: _configuration.GetValue<string>("JWT:Audience"),
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(20),
                    signingCredentials: signinCredentials
                );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return new { Token = tokenString };
            }



    // פונקציה ליצירת Refresh Token
    public string GenerateRefreshToken()
    {
        return Guid.NewGuid().ToString().Replace("-", "");
    }
}
