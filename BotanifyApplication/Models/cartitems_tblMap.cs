using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace Botanify.Models
{
    public class cartitems_tblMap : EntityTypeConfiguration<cartitems_tblModel>
    {
        public cartitems_tblMap()
        {
            HasKey(i => i.cartItemId);
            ToTable("cartitems_tbl");
        }
    }
}