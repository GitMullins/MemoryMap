using MemoryMap.api.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MemoryMap.api.Repositories
{
    public interface IPictureRepository
    {
        Picture GetPictureById(string picture);
    }
}
