using System;
using System.Collections.Generic;

namespace ToDoApi;

public partial class User
{
    public string Email { get; set; } = null!;

    public string UserName { get; set; } = null!;

    public string Password { get; set; } = null!;
}
