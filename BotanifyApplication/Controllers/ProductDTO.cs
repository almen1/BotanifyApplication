using System;
using System.ComponentModel.DataAnnotations;

namespace BotanifyApplication.Controllers
{
    public class ProductDTO
    {
        public int productId { get; set; }
        public int categoryIdLocal { get; set; }
        public int sizeIdLocal { get; set; }
        public string skuLocal { get; set; } = string.Empty;
        public string prodName { get; set; } = string.Empty;
        public string prodDescription { get; set; } = string.Empty;
        public string prodSciName { get; set; } = string.Empty;
        public string prodImage { get; set; } = string.Empty;
        public decimal prodPrice { get; set; }
        public int prodStock { get; set; }
        public string prodTips { get; set; } = string.Empty;
        public DateTime createAt { get; set; }
        public DateTime updateAt { get; set; }

    }
}