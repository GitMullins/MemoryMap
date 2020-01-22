using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MemoryMap.api.DataModels
{
    public class Picture
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public byte[] Image { get; set; }
        public string Country { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public decimal latitude { get; set; }
        public decimal longitude { get; set; }
    }
}
