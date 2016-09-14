using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Data;
using System.Data.Entity.Migrations;
using System.Configuration;

namespace Merchandiser.Migrations
{
    public class Configuration : IDatabaseInitializer<MerchandiserEntities>
    {
        Company company;
        AspNetUser user;
        Survey survey;
        public void InitializeDatabase(MerchandiserEntities context)
        {
            using (context = new MerchandiserEntities())
            {
                if (!context.Database.Exists())
                {
                    context.Database.Create();
                    context.Database.Connection.Open();
                    AddRoles(context);
                    AddUser(context);
                    AddRoles(context);
                    AddCompany(context);
                    AddCustomers(context);
                    AddLocations(context);
                    AddProducts(context);
                    AddQuestions(context);
                    AddSurvey(context);
                    AddSurveyCustomerLocation(context);
                    AddSurveyProductQuestion(context);
                    context.SaveChanges();
                    context.Database.Connection.Close();
                }
            }
        }

        public void AddUser(MerchandiserEntities context)
        {
            context.AspNetUsers.Add(new AspNetUser() { UserName = "joel1618@gmail.com", Email = "joel1618@gmail.com" });
            context.SaveChanges();
            user = context.AspNetUsers.Where(e => e.Email == "joel1618@gmail.com").FirstOrDefault();
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
            context.Locations.Add(new Location() { Name = "Location 1", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
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
            context.Questions.Add(new Question() { Name = "Product 1", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Questions.Add(new Question() { Name = "Product 2", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Questions.Add(new Question() { Name = "Product 3", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Questions.Add(new Question() { Name = "Product 4", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.Questions.Add(new Question() { Name = "Product 5", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.SaveChanges();
        }

        public void AddSurvey(MerchandiserEntities context)
        {
            context.Surveys.Add(new Survey() { Name = "Survey 1", CompanyId = company.Id, CreatedBy = user.Id, Created = DateTime.Now });
            context.SaveChanges();
        }

        public void AddSurveyCustomerLocation(MerchandiserEntities context)
        {
            var customer = context.Customers.Where(e => e.Name == "Customer 1").FirstOrDefault();
            var location = context.Locations.Where(e => e.Name == "Location 1").FirstOrDefault();
            context.SurveyCustomerLocations.Add(new SurveyCustomerLocation()
            {
                CustomerId = customer.Id,
                LocationId = location.Id,
                CompanyId = company.Id,
                CreatedBy = user.Id,
                Created = DateTime.Now
            });
            context.SaveChanges();
        }

        public void AddSurveyProductQuestion(MerchandiserEntities context)
        {
            var product = context.Products.Where(e => e.Name == "Product 1").FirstOrDefault();
            var question = context.Questions.Where(e => e.Name == "Question 1").FirstOrDefault();
            context.SurveyProductQuestions.Add(new SurveyProductQuestion()
            {
                ProductId = product.Id,
                QuestionId = question.Id,
                CompanyId = company.Id,
                CreatedBy = user.Id,
                Created = DateTime.Now
            });
            context.SaveChanges();
        }
    }
}
