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
        IEnumerable<Picture> GetAllMarkersByUid(Guid userId);
        bool PutPictureByMarkerId(Guid markerId, byte[] file);
        bool DeleteMarkerByMarkerId(Guid markerId);
        bool EditDescriptionByMarkerId(Guid markerId, string marker);

    }
}
