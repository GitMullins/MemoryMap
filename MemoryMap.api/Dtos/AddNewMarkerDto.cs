using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MemoryMap.api.Dtos
{
    public class AddNewMarkerDto
    {
        public Guid UserId { get; set; }
        public string Country { get; set; }
        public decimal latitude { get; set; }
        public decimal longitude { get; set; }

    }
}
