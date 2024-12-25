using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BotanifyApplication.Controllers
{
    public class OrderDTO
    {
        public string CheckoutSessionId { get; set; }
        public string ReferenceNumber { get; set; }
        public decimal TotalAmount { get; set; }
        public string PaymentMethod { get; set; }
        public string OrderStatus { get; set; }
        public DateTime OrderDate { get; set; }
        public int UserId { get; set; }
    }
}