using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Botanify.Models
{
    public class orders_tblModel
    {
        public int orderId { get; set; }
        public int cartId { get; set; }
        public decimal totalAmount { get; set; }
        public DateTime orderDate { get; set; }
        public int paymentId { get; set; }
        public int orderStatusId { get; set; }
        public DateTime createAt { get; set; }
        public DateTime updateAt { get; set; }
    }
}