using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace Botanify.Models
{
    public class orderstatus_tblMap : EntityTypeConfiguration<orderstatus_tblModel>
    {
        public orderstatus_tblMap()
        {
            HasKey(i => i.orderStatusId);
            ToTable("orderstatus_tbl");
        }
    }
}