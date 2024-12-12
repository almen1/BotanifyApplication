using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace Botanify.Models
{
    public class categorygroups_tblMap : EntityTypeConfiguration<categorygroups_tblModel>
    {
        public categorygroups_tblMap()
        {
            HasKey(i => i.categoryGroupId);
            ToTable("categorygroups_tbl");
        }
    }
}