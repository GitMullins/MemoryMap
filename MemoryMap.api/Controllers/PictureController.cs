using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using MemoryMap.api.DataModels;
using MemoryMap.api.Dtos;
using MemoryMap.api.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MemoryMap.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PictureController : ControllerBase
    {

        private readonly IPictureRepository _repo;

        public PictureController(IPictureRepository repo)
        {
            _repo = repo;
        }

        // GET: api/Picture
        [HttpGet("{pictureId}")]
        public IActionResult Get(string pictureId)
        {
            var picture = _repo.GetPictureById(pictureId);
            if (picture == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(picture);
            }
        }

        // GET: api/Picture
        [HttpGet("allMarkers/{userId}")]
        public IEnumerable<Picture> GetAllPicturesByUid(Guid userId)
        {
            return _repo.GetAllPicturesByUid(userId);
        }

        // POST: api/Picture
        [HttpPost("newMarker")]
        public IActionResult AddMarker(AddNewMarkerDto newMarker)
        {
            if (_repo.AddNewMarker(newMarker))
            {
                return Ok(newMarker);
            }
            else
            {
                return BadRequest();
            }
        }


        // PUT: api/
        [HttpPut("putPicture/{markerId}")]
        public IActionResult PutPictureByMarkerId(Guid markerId, [FromForm]IFormFile file)
        {
            byte[] fileBytes;
            using (var stream = new MemoryStream())
            {
                file.CopyTo(stream);
                fileBytes = stream.ToArray();
            }

            _repo.PutPictureByMarkerId(markerId, fileBytes);

            return Ok();

            //save a reference to the file to your database
            //_repo.addImage(fileName, filePath, contentType)
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
