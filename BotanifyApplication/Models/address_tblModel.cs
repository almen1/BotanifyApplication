using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Botanify.Models
{
    public class address_tblModel
    {
        public int addressId { get; set; }
        public int userId { get; set; }
        public string address { get; set; }
        public string city { get; set; }
        public string region { get; set; }
        public int zipcode { get; set; }
        public DateTime createAt { get; set; }
        public DateTime updateAt { get; set; }
    }
}