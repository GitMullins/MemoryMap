﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MemoryMap.api.DataModels
{
    public class User
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string FirebaseUid { get; set; }
    }
}
