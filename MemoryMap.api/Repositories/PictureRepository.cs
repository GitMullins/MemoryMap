using Dapper;
using MemoryMap.api.DataModels;
using MemoryMap.api.Dtos;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

    }
}
