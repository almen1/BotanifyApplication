using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Botanify.Models
{
    public class categorygroups_tblModel
    {
        public int categoryGroupId { get; set; }
        public int productId { get; set; }
        public int categoryId { get; set; }
        public DateTime createAt { get; set; }
        public DateTime updateAt { get; set; }
    }
}