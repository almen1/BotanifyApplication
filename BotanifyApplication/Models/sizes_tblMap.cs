using BotanifyApplication.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace Botanify.Models
{
    public class sizes_tblMap : EntityTypeConfiguration<sizes_tblModel>
    {
        public sizes_tblMap()
        {
            HasKey(i => i.sizeId);
            ToTable("sizes_tbl");
        }
    }
}