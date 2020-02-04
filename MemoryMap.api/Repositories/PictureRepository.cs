using Dapper;
using MemoryMap.api.DataModels;
using MemoryMap.api.Dtos;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text;

namespace MemoryMap.api.Repositories
{
    public class PictureRepository : IPictureRepository
    {
        string _connectionString = "Server=localhost;Database=MemoryMap;Trusted_Connection=True;";

        public Picture GetPictureById(string pictureId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [Picture]
                            WHERE [Id] = @pictureId";
                var parameters = new { pictureId };
                var picture = db.QueryFirstOrDefault<Picture>(sql, parameters);
                return picture;
            }
        }

        public bool AddNewMarker(AddNewMarkerDto newMarker)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [Picture]
                                (UserId,
                                 Country,
                                 Longitude,
                                 Latitude)
                            OUTPUT INSERTED.Id
                            VALUES
                                (@userId,
                                 @country,
                                 @longitude,
                                 @latitude)";

                var markerId = db.QueryFirst<Guid>(sql, newMarker);
                if (markerId != null)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        public IEnumerable<Picture> GetAllMarkersByUid(Guid userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [Picture]
                            WHERE [UserId] = @userId";

                var parameters = new { userId };
                var markers = db.Query<Picture>(sql, parameters);
                return markers;
            }
        }

        public IEnumerable<string> GetAllCountriesByUid(Guid userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT DISTINCT [Country]
                            FROM [Picture]
                            WHERE [UserId] = @userId";

                var parameters = new { userId };
                var markers = db.Query<string>(sql, parameters);
                return markers;
            }
        }

        public bool PutPictureByMarkerId(Guid editedMarkerId, byte[] file)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"UPDATE [Picture]
                            SET [Image] = @file
                            WHERE [Id] = @editedMarkerId";
                var pic = new { editedMarkerId, file };
                return db.Execute(sql, pic) == 1;
            }
        }

        public bool EditDescriptionByMarkerId(Guid editedMarkerId, string markerDescription)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"UPDATE [Picture]
                            SET [Description] = @markerDescription
                            WHERE [Id] = @editedMarkerId";
                var pic = new { editedMarkerId, markerDescription };
                return db.Execute(sql, pic) == 1;
            }
        }

        public bool DeleteMarkerByMarkerId(Guid markerId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"DELETE FROM [Picture]
                            WHERE [Id] = @markerId";
                var marker = new { markerId };
                return db.Execute(sql, marker) == 1;
            }
        }

        public bool DeletePictureByMarkerId(Guid markerId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"UPDATE [Picture]
                            SET [Image] = null
                            WHERE [Id] = @markerId";
                var nullPic = new { markerId };
                return db.Execute(sql, nullPic) == 1;
            }
        }

    }
}
