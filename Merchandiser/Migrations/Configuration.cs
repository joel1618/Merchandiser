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
                    AddSurveyCustomerLocation(context);
                    AddSurveyProductQuestion(context);
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
            context.AspNetUsersInfoes.Add(new AspNetUsersInfo() { FirstName = "Admin: Joel", LastName = "Schiffer", Id = Guid.NewGuid().ToString(), UserId = user.Id });
            var customerUser = context.AspNetUsers.Where(e => e.Email == "joel1618+1@gmail.com").FirstOrDefault();
            context.AspNetUsersInfoes.Add(new AspNetUsersInfo() { FirstName = "Customer: Joel", LastName = "Schiffer", Id = Guid.NewGuid().ToString(), UserId = customerUser.Id });
            var dataEntryUser = context.AspNetUsers.Where(e => e.Email == "joel1618+2@gmail.com").FirstOrDefault();
            context.AspNetUsersInfoes.Add(new AspNetUsersInfo() { FirstName = "Data Entry: Joel", LastName = "Schiffer", Id = Guid.NewGuid().ToString(), UserId = dataEntryUser.Id });
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
            context.Companies.Add(new Company() { Id = Guid.NewGuid(), Name = "Company 1", CreatedBy = user.Id, Created = DateTime.Now });
            context.SaveChanges();
            company = context.Companies.Where(e => e.Name == "Company 1").FirstOrDefault();
        }
        public void AddUserRole(MerchandiserEntities context)
        {
            var administratorRole = context.AspNetRoles.Where(e => e.Name == "Administrator").FirstOrDefault();
            context.AspNetUserRoles.Add(new AspNetUserRole() { UserId = user.Id, RoleId = administratorRole.Id, CompanyId = company.Id, Id = Guid.NewGuid(), CustomerId = new Nullable<Guid>() });
            var customerUser = context.AspNetUsers.Where(e => e.Email == "joel1618+1@gmail.com").FirstOrDefault();
            var customerRole = context.AspNetRoles.Where(e => e.Name == "Customer").FirstOrDefault();
            var customer = context.Customers.Where(e => e.Name == "Customer 1").FirstOrDefault();
            context.AspNetUserRoles.Add(new AspNetUserRole() { UserId = customerUser.Id, RoleId = customerRole.Id, CompanyId = company.Id, Id = Guid.NewGuid(), CustomerId = customer.Id });
            var dataEntryUser = context.AspNetUsers.Where(e => e.Email == "joel1618+2@gmail.com").FirstOrDefault();
            var dataEntryRole = context.AspNetRoles.Where(e => e.Name == "Data Entry").FirstOrDefault();
            context.AspNetUserRoles.Add(new AspNetUserRole() { UserId = dataEntryUser.Id, RoleId = dataEntryRole.Id, CompanyId = company.Id, Id = Guid.NewGuid(), CustomerId = new Nullable<Guid>() });
            context.SaveChanges();
        }
        public void AddCustomers(MerchandiserEntities context)
        {
            context.Customers.Add(new Customer() { Id = Guid.NewGuid(), Name = "Customer 1", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Customers.Add(new Customer() { Id = Guid.NewGuid(), Name = "Customer 2", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Customers.Add(new Customer() { Id = Guid.NewGuid(), Name = "Customer 3", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Customers.Add(new Customer() { Id = Guid.NewGuid(), Name = "Customer 4", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Customers.Add(new Customer() { Id = Guid.NewGuid(), Name = "Customer 5", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.SaveChanges();
        }
        public void AddLocations(MerchandiserEntities context)
        {
            context.Locations.Add(new Location() { Id = Guid.NewGuid(), Name = "Location 1", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Locations.Add(new Location() { Id = Guid.NewGuid(), Name = "Location 2", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Locations.Add(new Location() { Id = Guid.NewGuid(), Name = "Location 3", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Locations.Add(new Location() { Id = Guid.NewGuid(), Name = "Location 4", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Locations.Add(new Location() { Id = Guid.NewGuid(), Name = "Location 5", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.SaveChanges();
        }
        public void AddProducts(MerchandiserEntities context)
        {
            context.Products.Add(new Product() { Id = Guid.NewGuid(), Name = "Product 1", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Products.Add(new Product() { Id = Guid.NewGuid(), Name = "Product 2", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Products.Add(new Product() { Id = Guid.NewGuid(), Name = "Product 3", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Products.Add(new Product() { Id = Guid.NewGuid(), Name = "Product 4", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Products.Add(new Product() { Id = Guid.NewGuid(), Name = "Product 5", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.SaveChanges();
        }
        public void AddQuestions(MerchandiserEntities context)
        {
            context.Questions.Add(new Question() { Id = Guid.NewGuid(), Name = "Question 1", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Questions.Add(new Question() { Id = Guid.NewGuid(), Name = "Question 2", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Questions.Add(new Question() { Id = Guid.NewGuid(), Name = "Question 3", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Questions.Add(new Question() { Id = Guid.NewGuid(), Name = "Question 4", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Questions.Add(new Question() { Id = Guid.NewGuid(), Name = "Question 5", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.SaveChanges();
        }
        public void AddSurvey(MerchandiserEntities context)
        {
            context.Surveys.Add(new Survey() { Id = Guid.NewGuid(), Name = "Survey 1", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.SaveChanges();
            survey = context.Surveys.Where(e => e.Name == "Survey 1").FirstOrDefault();
        }
        public void AddSurveyCustomerLocation(MerchandiserEntities context)
        {
            var customer = context.Customers.Where(e => e.Name == "Customer 1").FirstOrDefault();
            var location = context.Locations.Where(e => e.Name == "Location 1").FirstOrDefault();
            context.SurveyCustomerLocations.Add(new SurveyCustomerLocation()
            {
                Id = Guid.NewGuid(),
                CustomerId = customer.Id,
                LocationId = location.Id,
                CompanyId = company.Id,
                CreatedBy = user.Id,
                Created = DateTime.Now,
                SurveyId = survey.Id
            });
            context.SaveChanges();
        }
        public void AddSurveyProductQuestion(MerchandiserEntities context)
        {
            var product = context.Products.Where(e => e.Name == "Product 1").FirstOrDefault();
            var question = context.Questions.Where(e => e.Name == "Question 1").FirstOrDefault();
            context.SurveyProductQuestions.Add(new SurveyProductQuestion()
            {
                Id = Guid.NewGuid(),
                ProductId = product.Id,
                QuestionId = question.Id,
                CompanyId = company.Id,
                CreatedBy = user.Id,
                Created = DateTime.Now,
                SurveyId = survey.Id
            });
            context.SaveChanges();
        }

        public void AddViews(MerchandiserEntities context)
        {            
            string script = @"
                CREATE VIEW [dbo].[SelectLocation] AS 
                SELECT 
                Survey.LocationId AS 'Id', 
                MAX(Survey.CustomerId) AS 'CustomerId',
                MAX(Survey.CompanyId) AS 'CompanyId',
                MAX(Location.Name) AS 'Name',
                MAX(Location.Address) AS 'Address',
                MAX(SurveyHeader.Created) AS 'SurveyCreated'
                FROM SurveyCustomerLocationProductQuestion Survey
                LEFT JOIN dbo.Location
                ON Survey.LocationId = Location.Id
                LEFT JOIN dbo.SurveyHeader
                ON SurveyHeader.Id = Survey.SurveyId
                AND SurveyHeader.LocationId = Survey.LocationId
                AND SurveyHeader.CustomerId = Survey.CustomerId
                AND SurveyHeader.Created > CONVERT(DATETIME, DATEDIFF(DAY, 1, GETUTCDATE()))
                GROUP BY Survey.LocationId
            ";
            context.Database.ExecuteSqlCommand(script);
            script = @"
                CREATE VIEW [dbo].[SelectSurvey] AS 
                SELECT 
                SurveyCLPQ.SurveyId AS 'Id', 
                MAX(SurveyCLPQ.CustomerId) AS 'CustomerId',
                MAX(SurveyCLPQ.CompanyId) AS 'CompanyId',
                MAX(SurveyCLPQ.LocationId) AS 'LocationId',
                MAX(Survey.Name) AS 'Name',
                MAX(SurveyHeader.Created) AS 'SurveyCreated'
                FROM SurveyCustomerLocationProductQuestion SurveyCLPQ
                LEFT JOIN dbo.Survey
                ON SurveyCLPQ.SurveyId = Survey.Id
                LEFT JOIN dbo.SurveyHeader
                ON SurveyHeader.Id = SurveyCLPQ.SurveyId
                AND SurveyHeader.LocationId = SurveyCLPQ.LocationId
                AND SurveyHeader.CustomerId = SurveyCLPQ.CustomerId
                AND SurveyHeader.Created > CONVERT(DATETIME, DATEDIFF(DAY, 1, GETUTCDATE()))
                GROUP BY SurveyCLPQ.SurveyId
            ";
            context.Database.ExecuteSqlCommand(script);
        }
    }
}
