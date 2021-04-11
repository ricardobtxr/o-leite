using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using OLeite.Models;
using Microsoft.Extensions.Configuration;

namespace OLeite.Servicos
{
    public class UserServices
    {
        private readonly IMongoCollection<User> _users;

        public UserServices(IConfiguration configuration)
        {
            IConfigurationSection mongoDBSection = configuration.GetSection("MongoDB");
            var client = new MongoClient(mongoDBSection["ConnectionString"]);
            var database = client.GetDatabase(mongoDBSection["DatabaseName"]);

            _users = database.GetCollection<User>("usuarios");
        }

        public User GetUserByName(String name) =>
            _users.Find<User>(user => user.name.ToUpper().Equals(name)).FirstOrDefault();

        public User GetUserByEmail(String email) =>
            _users.Find<User>(user => user.email.Equals(email)).FirstOrDefault();

        public List<User> GetAllUsers() =>
            _users.Find(user => true).ToList();

    }
}
