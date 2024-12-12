using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Botanify.Models
{
    public class users_tblModel
    {
        public int userId { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public int addressId { get; set; }
        public string userEmail { get; set; }
        public string userPassword { get; set; }
        public int userPhone { get; set; }
        public DateTime createAt { get; set; }
        public DateTime updateAt { get; set; }
    }
}