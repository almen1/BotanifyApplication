using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace Botanify.Models
{
    public class orders_tblMap : EntityTypeConfiguration<orders_tblModel>
    {
        public orders_tblMap()
        {
            HasKey(i => i.orderId);
            ToTable("orders_tbl");
        }
    }
}