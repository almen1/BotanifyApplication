using BotanifyApplication.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace Botanify.Models
{
    public class users_tblMap : EntityTypeConfiguration<users_tblModel>
    {
        public users_tblMap()
        {
            HasKey(i => i.userId);
            ToTable("users_tbl");
        }
    }
}