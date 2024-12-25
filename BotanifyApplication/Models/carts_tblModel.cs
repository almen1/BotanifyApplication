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
        public int productId { get; set; }
        public int productQty { get; set; }
        public DateTime createAt { get; set; }
        public DateTime updateAt { get; set; }
    }
}