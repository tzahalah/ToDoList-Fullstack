using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualBasic;
using ToDoApi;
public partial class AuthController{

private readonly IConfiguration _configuration;


public AuthController(IConfiguration configuration)
{
    _configuration = configuration;
    
}
    private Object createJwt(User user){
        var claims= new List<Claim>()
        {
            new Claim("email", user.Email),
            new Claim("userName", user.UserName),
            new Claim("password",user.Password)
        };
       
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JWT:Key")));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: _configuration.GetValue<string>("JWT:Issuer"),
                    audience: _configuration.GetValue<string>("JWT:Audience"),
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(6),
                    signingCredentials: signinCredentials
                );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return new { Token = tokenString };
            }
            
   

}