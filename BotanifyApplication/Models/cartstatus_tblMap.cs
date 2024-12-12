using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace Botanify.Models
{
    public class cartstatus_tblMap : EntityTypeConfiguration<cartstatus_tblModel>
    {
        public cartstatus_tblMap()
        {
            HasKey(i => i.cartStatusId);
            ToTable("cartstatus_tbl");
        }
    }
}