using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace Botanify.Models
{
    public class products_tblMap : EntityTypeConfiguration<products_tblModel>
    {
        public products_tblMap()
        {
            HasKey(i => i.productId);
            ToTable("products_tbl");
        }
    }
}