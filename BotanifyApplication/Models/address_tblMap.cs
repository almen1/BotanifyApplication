using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace Botanify.Models
{
    public class address_tblMap : EntityTypeConfiguration<address_tblModel>
    {
        public address_tblMap()
        {
            HasKey(i => i.addressId);
            ToTable("address_tbl");
        }
    }
}