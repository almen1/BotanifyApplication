using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Botanify.Models
{
    public class carts_tblModel
    {
        public int cartId { get; set; }
        public int userId { get; set; }
        public int cartItemId { get; set; }
        public int cartStatusId { get; set; }
        public int cartItemQuantity { get; set; }
        public DateTime createAt { get; set; }
        public DateTime updateAt { get; set; }
    }
}