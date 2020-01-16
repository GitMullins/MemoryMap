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
        public bool UserNameCheck(string newUserEmailAddressCheck)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [User]
                            WHERE [EmailAddress] = @newUserEmailAddressCheck";
                var parameters = new { newUserEmailAddressCheck };
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
                var emailAddressExists = UserNameCheck(newUser.EmailAddress);
                if (emailAddressExists)
                {
                    return false;
                }
                var sql = @"
                            INSERT INTO [User]
                                ([EmailAddress],
                                 [FirebaseUid],
                            OUTPUT INSERTED.Id
                            VALUES
                                (@emailAddress,
                                 @firebaseUid)";
                var userId = db.QueryFirst<Guid>(sql, newUser);
                if (userId != null) return true;
                else return false;
            }
        }
    }
}
