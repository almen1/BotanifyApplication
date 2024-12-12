using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Botanify.Models
{
    public class cartitems_tblModel
    {
        public int cartItemId { get; set; }
        public int productId { get; set; }
        public int itemQuantity { get; set; }
        public DateTime createAt { get; set; }
        public DateTime updateAt { get; set; }
    }
}