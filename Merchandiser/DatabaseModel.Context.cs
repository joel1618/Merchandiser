﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Merchandiser
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class MerchandiserEntities : DbContext
    {
        public MerchandiserEntities()
            : base("name=MerchandiserEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<C__MigrationHistory> C__MigrationHistory { get; set; }
        public virtual DbSet<AspNetRole> AspNetRoles { get; set; }
        public virtual DbSet<AspNetUserClaim> AspNetUserClaims { get; set; }
        public virtual DbSet<AspNetUserLogin> AspNetUserLogins { get; set; }
        public virtual DbSet<AspNetUserRole> AspNetUserRoles { get; set; }
        public virtual DbSet<AspNetUser> AspNetUsers { get; set; }
        public virtual DbSet<AspNetUsersInfo> AspNetUsersInfoes { get; set; }
        public virtual DbSet<Company> Companies { get; set; }
        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<Location> Locations { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<ProductCategory> ProductCategories { get; set; }
        public virtual DbSet<Question> Questions { get; set; }
        public virtual DbSet<Survey> Surveys { get; set; }
        public virtual DbSet<SurveyCustomerLocation> SurveyCustomerLocations { get; set; }
        public virtual DbSet<SurveyCustomerLocationProductQuestion> SurveyCustomerLocationProductQuestions { get; set; }
        public virtual DbSet<SurveyDetail> SurveyDetails { get; set; }
        public virtual DbSet<SurveyHeader> SurveyHeaders { get; set; }
        public virtual DbSet<SurveyProductQuestion> SurveyProductQuestions { get; set; }
        public virtual DbSet<SelectLocation> SelectLocations { get; set; }
        public virtual DbSet<SelectSurvey> SelectSurveys { get; set; }
        public virtual DbSet<SelectUser> SelectUsers { get; set; }
    }
}
