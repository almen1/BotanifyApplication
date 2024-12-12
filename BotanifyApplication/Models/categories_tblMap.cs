using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace Botanify.Models
{
    public class categories_tblMap : EntityTypeConfiguration<categories_tblModel>
    {
        public categories_tblMap()
        {
            HasKey(i => i.categoryId);
            ToTable("categories_tbl");
        }
    }
}