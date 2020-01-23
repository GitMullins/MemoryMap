using MemoryMap.api.DataModels;
using MemoryMap.api.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MemoryMap.api.Repositories
{
    public interface IPictureRepository
    {
        Picture GetPictureById(string picture);
        bool AddNewMarker(AddNewMarkerDto newMarker);
        IEnumerable<Picture> GetAllPicturesByUid(Guid userId);
    }
}
