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
    public class UserRepository : IUserRepository
    {
        string _connectionString = "Server=localhost;Database=MemoryMap;Trusted_Connection=True;";
        public bool UserEmailCheck(string newUserEmailCheck)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [User]
                            WHERE [Email] = @newUserEmailCheck";
                var parameters = new { newUserEmailCheck };
                var emailAddressComesBack = db.Query<User>(sql, parameters);
                if (emailAddressComesBack.Count() != 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        public bool AddNewUser(AddNewUserDto newUser)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var emailAddressExists = UserEmailCheck(newUser.Email);
                if (emailAddressExists)
                {
                    return false;
                }
                var sql = @"
                            INSERT INTO [User]
                                (Email,
                                 FirebaseUid)
                            OUTPUT INSERTED.Id
                            VALUES
                                (@email,
                                 @firebaseUid)";
                var userId = db.QueryFirst<Guid>(sql, newUser);
                if (userId != null) return true;
                else return false;
            }
        }

        public User GetUserByFirebaseUid(string firebaseUid)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [User]
                            WHERE [FirebaseUid] = @firebaseUid";
                var parameters = new { firebaseUid };
                var user = db.QueryFirstOrDefault<User>(sql, parameters);
                return user;
            }
        }
    }
}
