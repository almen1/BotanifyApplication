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
        public string userEmail { get; set; }
        public string userPassword { get; set; }
        public string userPhone { get; set; }
        public DateTime createAt { get; set; }
        public DateTime updateAt { get; set; }
        public string address { get; set; }
        public string city { get; set; }
        public string region { get; set; }
        public string zipcode { get; set; }
    }
}