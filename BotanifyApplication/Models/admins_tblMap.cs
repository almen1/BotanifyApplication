using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace Botanify.Models
{
    public class admins_tblMap : EntityTypeConfiguration<admins_tblModel>
    {
        public admins_tblMap()
        {
            HasKey(i => i.adminId);
            ToTable("admins_tbl");
        }
    }
}