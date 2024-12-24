using System;
using System.ComponentModel.DataAnnotations;

namespace BotanifyApplication.Controllers
{
    public class CartDTO
    {
        public int userIdLocal { get; set; }
        public int productIdLocal { get; set; }
        public int cartStatusIdLocal { get; set; }
        public int prodQtyLocal { get; set; }
        public int itemPriceLocal { get; set; }
        public DateTime createAt { get; set; }
        public DateTime updateAt { get; set; }

    }
}