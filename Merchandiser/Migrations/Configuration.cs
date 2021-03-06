using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Data;
using System.Data.Entity.Migrations;
using System.Configuration;
using Merchandiser.Models;
using System.Web;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Merchandiser.Migrations
{
    public class Configuration : IDatabaseInitializer<MerchandiserEntities>
    {
        Company company;
        AspNetUser user;
        Survey survey;
        UserStore<ApplicationUser> store;
        ApplicationUserManager userManager;
        public void InitializeDatabase(MerchandiserEntities context)
        {
            using (context = new MerchandiserEntities())
            {
                if (!context.Database.Exists())
                {
                    store = new UserStore<ApplicationUser>(context);
                    userManager = new ApplicationUserManager(store);
                    context.Database.Create();
                    context.Database.Connection.Open();
                    AddRoles(context);

                    AddUser(context);
                    AddUserInfo(context);
                    AddCompany(context);
                    AddCustomers(context);
                    AddUserRole(context);
                    AddLocations(context);
                    AddProducts(context);
                    AddQuestions(context);
                    AddSurvey(context);
                    AddViews(context);

                    context.SaveChanges();
                    context.Database.Connection.Close();
                }
            }
        }
        public void AddUser(MerchandiserEntities context)
        {
            var password = "asdfasdf!";
            context.AspNetUsers.Add(new AspNetUser()
            {
                PasswordHash = userManager.PasswordHasher.HashPassword(password),
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = "joel1618@gmail.com",
                Email = "joel1618@gmail.com",
                EmailConfirmed = true,
                Id = Guid.NewGuid().ToString(),
                PhoneNumberConfirmed = false,
                TwoFactorEnabled = false,
                LockoutEnabled = false,
                AccessFailedCount = 0
            });
            context.AspNetUsers.Add(new AspNetUser()
            {
                PasswordHash = userManager.PasswordHasher.HashPassword(password),
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = "joel1618+1@gmail.com",
                Email = "joel1618+1@gmail.com",
                EmailConfirmed = true,
                Id = Guid.NewGuid().ToString(),
                PhoneNumberConfirmed = false,
                TwoFactorEnabled = false,
                LockoutEnabled = false,
                AccessFailedCount = 0
            });
            context.AspNetUsers.Add(new AspNetUser()
            {
                PasswordHash = userManager.PasswordHasher.HashPassword(password),
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = "joel1618+2@gmail.com",
                Email = "joel1618+2@gmail.com",
                EmailConfirmed = true,
                Id = Guid.NewGuid().ToString(),
                PhoneNumberConfirmed = false,
                TwoFactorEnabled = false,
                LockoutEnabled = false,
                AccessFailedCount = 0
            });
            context.SaveChanges();
            user = context.AspNetUsers.Where(e => e.Email == "joel1618@gmail.com").FirstOrDefault();
        }

        public void AddUserInfo(MerchandiserEntities context)
        {
            context.AspNetUsersInfoes.Add(new AspNetUsersInfo() { FirstName = "Admin: Joel", LastName = "Schiffer",
                Id = Guid.NewGuid().ToString(), UserId = user.Id,
                Created = DateTime.UtcNow
            });
            var customerUser = context.AspNetUsers.Where(e => e.Email == "joel1618+1@gmail.com").FirstOrDefault();
            context.AspNetUsersInfoes.Add(new AspNetUsersInfo() { FirstName = "Customer: Joel", LastName = "Schiffer",
                Id = Guid.NewGuid().ToString(), UserId = customerUser.Id,
                Created = DateTime.UtcNow
            });
            var dataEntryUser = context.AspNetUsers.Where(e => e.Email == "joel1618+2@gmail.com").FirstOrDefault();
            context.AspNetUsersInfoes.Add(new AspNetUsersInfo() { FirstName = "Data Entry: Joel", LastName = "Schiffer",
                Id = Guid.NewGuid().ToString(), UserId = dataEntryUser.Id,
                Created = DateTime.UtcNow
            });
            context.SaveChanges();
        }

        public void AddRoles(MerchandiserEntities context)
        {
            context.AspNetRoles.Add(new AspNetRole() { Id = Guid.NewGuid().ToString(), Name = "Administrator" });
            context.AspNetRoles.Add(new AspNetRole() { Id = Guid.NewGuid().ToString(), Name = "Customer" });
            context.AspNetRoles.Add(new AspNetRole() { Id = Guid.NewGuid().ToString(), Name = "Data Entry" });
            context.SaveChanges();
        }
        public void AddCompany(MerchandiserEntities context)
        {
            context.Companies.Add(new Company() { Name = "Company 1", CreatedBy = user.Id, Created = DateTime.Now });
            context.SaveChanges();
            company = context.Companies.Where(e => e.Name == "Company 1").FirstOrDefault();
        }
        public void AddUserRole(MerchandiserEntities context)
        {
            var administratorRole = context.AspNetRoles.Where(e => e.Name == "Administrator").FirstOrDefault();
            context.AspNetUserRoles.Add(new AspNetUserRole() { UserId = user.Id, RoleId = administratorRole.Id, CompanyId = company.Id, CustomerId = new Nullable<int>() });
            var customerUser = context.AspNetUsers.Where(e => e.Email == "joel1618+1@gmail.com").FirstOrDefault();
            var customerRole = context.AspNetRoles.Where(e => e.Name == "Customer").FirstOrDefault();
            var customer = context.Customers.Where(e => e.Name == "Customer 1").FirstOrDefault();
            context.AspNetUserRoles.Add(new AspNetUserRole() { UserId = customerUser.Id, RoleId = customerRole.Id, CompanyId = company.Id, CustomerId = customer.Id });
            var dataEntryUser = context.AspNetUsers.Where(e => e.Email == "joel1618+2@gmail.com").FirstOrDefault();
            var dataEntryRole = context.AspNetRoles.Where(e => e.Name == "Data Entry").FirstOrDefault();
            context.AspNetUserRoles.Add(new AspNetUserRole() { UserId = dataEntryUser.Id, RoleId = dataEntryRole.Id, CompanyId = company.Id, CustomerId = new Nullable<int>() });
            context.SaveChanges();
        }
        public void AddCustomers(MerchandiserEntities context)
        {
            context.Customers.Add(new Customer() { Name = "Customer 1", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Customers.Add(new Customer() { Name = "Customer 2", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Customers.Add(new Customer() { Name = "Customer 3", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Customers.Add(new Customer() { Name = "Customer 4", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Customers.Add(new Customer() { Name = "Customer 5", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.SaveChanges();
        }
        public void AddLocations(MerchandiserEntities context)
        {
            context.Locations.Add(new Location() { Name = "Location 1", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now, Latitude = (decimal)29.592581, Longitude = (decimal)-98.555577, Address = "107 Shavano Dr, Shavano Park, TX 78231, USA" });
            context.Locations.Add(new Location() { Name = "Location 2", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Locations.Add(new Location() { Name = "Location 3", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Locations.Add(new Location() { Name = "Location 4", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Locations.Add(new Location() { Name = "Location 5", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.SaveChanges();
        }
        public void AddProducts(MerchandiserEntities context)
        {
            context.Products.Add(new Product() { Name = "Product 1", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Products.Add(new Product() { Name = "Product 2", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Products.Add(new Product() { Name = "Product 3", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Products.Add(new Product() { Name = "Product 4", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Products.Add(new Product() { Name = "Product 5", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.SaveChanges();
        }
        public void AddQuestions(MerchandiserEntities context)
        {
            context.Questions.Add(new Question() { Name = "Question 1", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Questions.Add(new Question() { Name = "Question 2", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Questions.Add(new Question() { Name = "Question 3", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Questions.Add(new Question() { Name = "Question 4", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Questions.Add(new Question() { Name = "Question 5", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.SaveChanges();
        }
        public void AddSurvey(MerchandiserEntities context)
        {
            context.Surveys.Add(new Survey() { Name = "Survey 1", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.SaveChanges();
            survey = context.Surveys.Where(e => e.Name == "Survey 1").FirstOrDefault();
        }

        public void AddViews(MerchandiserEntities context)
        {            
            string script = @"
                CREATE VIEW [dbo].[SelectLocation] AS 
                SELECT 
                Survey.LocationId AS 'Id', 
                Survey.CustomerId AS 'CustomerId',
                MAX(Survey.CompanyId) AS 'CompanyId',
                MAX(Location.Name) AS 'Name',
                MAX(Location.Address) AS 'Address',
                MAX(Location.Latitude) AS 'Latitude',
                MAX(Location.Longitude) AS 'Longitude',
                MAX(SurveyHeader.Created) AS 'SurveyCreated'
                FROM SurveyCustomerLocationProductQuestion Survey
                LEFT JOIN dbo.Location
                ON Survey.LocationId = Location.Id
                LEFT JOIN dbo.SurveyHeader
                ON SurveyHeader.SurveyId = Survey.SurveyId
                AND SurveyHeader.LocationId = Survey.LocationId
                AND SurveyHeader.CustomerId = Survey.CustomerId
                AND SurveyHeader.Created > CONVERT(DATETIME, DATEDIFF(DAY, 1, GETUTCDATE()))
                GROUP BY Survey.LocationId, Survey.CustomerId
            ";
            context.Database.ExecuteSqlCommand(script);
            script = @"
                CREATE VIEW [dbo].[SelectSurvey] AS 
                SELECT 
                SurveyCLPQ.SurveyId AS 'Id', 
                SurveyCLPQ.CustomerId AS 'CustomerId',
                SurveyCLPQ.CompanyId AS 'CompanyId',
                SurveyCLPQ.LocationId AS 'LocationId',
                MAX(Survey.Name) AS 'Name',
                MAX(SurveyHeader.Created) AS 'SurveyCreated'
                FROM SurveyCustomerLocationProductQuestion SurveyCLPQ
                LEFT JOIN dbo.Survey
                ON SurveyCLPQ.SurveyId = Survey.Id
                LEFT JOIN dbo.SurveyHeader
                ON SurveyHeader.SurveyId = SurveyCLPQ.SurveyId
                AND SurveyHeader.LocationId = SurveyCLPQ.LocationId
                AND SurveyHeader.CustomerId = SurveyCLPQ.CustomerId
                AND SurveyHeader.Created > CONVERT(DATETIME, DATEDIFF(DAY, 1, GETUTCDATE()))
				GROUP BY SurveyCLPQ.SurveyId, SurveyCLPQ.CustomerId, SurveyCLPQ.CompanyId, SurveyCLPQ.LocationId
            ";
            context.Database.ExecuteSqlCommand(script);
        }
    }
}
