﻿using Merchandiser.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Merchandiser
{
    internal class DatabaseContext : DbContext
    {
        static DatabaseContext()
        {
            // Prevent attempt to initialize a database for this context
            Database.SetInitializer<DatabaseContext>(null);
        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //modelBuilder.Configurations.Add(new ConflictDtoConfiguration());
            //modelBuilder.Entity<AspNetUserRole>().HasKey(t => new { t.UserId, t.CompanyId, t.RoleId });
        }
        public DbSet<CompanyViewModel> CompanyViewModel { get; set; }
        public DbSet<CustomerViewModel> CustomerViewModel { get; set; }
        public DbSet<RoleViewModel> RoleViewModel { get; set; }
        public DbSet<UserRoleViewModel> UserRoleViewModel { get; set; }
        public DbSet<MapViewModel> MapViewModel { get; set; }
        public DbSet<SurveyCustomerLocationProductQuestionViewModel> SurveyCustomerLocationProductQuestionViewModel { get; set; }
        public DbSet<ProductCategoryViewModel> ProductCategoryViewModel { get; set; }
        public DbSet<SurveyHeaderViewModel> SurveyHeaderViewModel { get; set; }
        public DbSet<SelectLocationViewModel> SelectLocationViewModel { get; set; }
        public DbSet<SelectSurveyViewModel> SelectSurveyViewModel { get; set; }
        public DbSet<SelectUserViewModel> SelectUserViewModel { get; set; }
        public DbSet<SelectCustomerLocationProductQuestionViewModel> SelectCustomerLocationProductQuestionViewModel { get; set; }
        public DbSet<ProductTypeHeaderViewModel> ProductTypeHeaderViewModel { get; set; }
        public DbSet<ProductTypeDetailViewModel> ProductTypeDetailViewModel { get; set; }        
    }
}