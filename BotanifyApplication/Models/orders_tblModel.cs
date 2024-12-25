using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Botanify.Models
{
    public class orders_tblModel
    {
        public int orderId { get; set; }
        public int userId { get; set; }
        public string checkoutSessionId { get; set; }
        public string referenceNumber { get; set; }
        public decimal totalAmount { get; set; }
        public string paymentMethod { get; set; }
        public string orderStatus { get; set; }
        public DateTime orderDate { get; set; }
        public DateTime createAt { get; set; }
        public DateTime updateAt { get; set; }
    }
}