using MemoryMap.api.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MemoryMap.api.Repositories
{
    interface IUserRepository
    {
        bool AddNewUser(AddNewUserDto newUser);
        bool UserNameCheck(string newUserNameCheck);
    }
}
