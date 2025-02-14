﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Botanify.Models
{
    public class products_tblModel
    {
        public int productId { get; set; }
        public int categoryId { get; set; }
        public int sizeId { get; set; }
        public string sku { get; set; }
        public string productName { get; set; }
        public string productDescription { get; set; }
        public string productSciName { get; set; }
        public string productImage { get; set; }
        public decimal productPrice { get; set; }
        public string productTips { get; set; }
        public int numberPurchased { get; set; }
        public int productStock { get; set; }
        public DateTime createAt { get; set; }
        public DateTime updateAt { get; set; }
    }
}