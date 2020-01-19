using MemoryMap.api.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MemoryMap.api.Repositories
{
    public interface IUserRepository
    {
        bool AddNewUser(AddNewUserDto newUser);
        bool UserEmailCheck(string newUserEmailCheck);
    }
}
