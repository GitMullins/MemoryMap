using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MemoryMap.api.Dtos
{
    public class AddNewUserDto
    {
        public string EmailAddress { get; set; }
        public string FirebaseUid { get; set; }
    }
}
