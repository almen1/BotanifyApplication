using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace Botanify.Models
{
    public class carts_tblMap : EntityTypeConfiguration<carts_tblModel>
    {
        public carts_tblMap()
        {
            HasKey(i => i.cartId);
            ToTable("carts_tbl");
        }
    }
}