using Botanify.Models;
using MySql.Data.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace BotanifyApplication.Models
{
    [DbConfigurationType(typeof(MySqlEFConfiguration))]
    public class BotanifyContext : DbContext
    {
        static BotanifyContext()
        {
            Database.SetInitializer<BotanifyContext>(null);
        }

        public BotanifyContext() : base("Name=botanify_db") { }

        public virtual DbSet<admins_tblModel> admins_tbl { get; set; }
        public virtual DbSet<carts_tblModel> carts_tbl { get; set; }
        public virtual DbSet<categories_tblModel> categories_tbl { get; set; }
        public virtual DbSet<orders_tblModel> orders_tbl { get; set; }
        public virtual DbSet<products_tblModel> products_tbl { get; set; }
        public virtual DbSet<sizes_tblModel> sizes_tbl { get; set; }
        public virtual DbSet<users_tblModel> users_tbl { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Configurations.Add(new admins_tblMap());
            modelBuilder.Configurations.Add(new carts_tblMap());
            modelBuilder.Configurations.Add(new categories_tblMap());
            modelBuilder.Configurations.Add(new orders_tblMap());
            modelBuilder.Configurations.Add(new products_tblMap());
            modelBuilder.Configurations.Add(new sizes_tblMap());
            modelBuilder.Configurations.Add(new users_tblMap());
        }
    }
}