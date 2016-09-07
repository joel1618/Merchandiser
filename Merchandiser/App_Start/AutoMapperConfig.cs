using AutoMapper;
using Merchandiser.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.App_Start
{
    public static class AutoMapperConfig
    {
        public static void RegisterMappings()
        {
            Mapper.Initialize(cfg => {
                cfg.CreateMap<CompanyViewModel, Company>();
                cfg.CreateMap<Company, CompanyViewModel>();

                cfg.CreateMap<CompanyUserViewModel, User>();
                cfg.CreateMap<User, CompanyUserViewModel>();

                cfg.CreateMap<CustomerViewModel, Customer>();
                cfg.CreateMap<Customer, CustomerViewModel>();

                cfg.CreateMap<LocationViewModel, Location>();
                cfg.CreateMap<Location, LocationViewModel>();

                cfg.CreateMap<ProductViewModel, Product>();
                cfg.CreateMap<Product, ProductViewModel>();

                cfg.CreateMap<SurveyViewModel, Survey>();
                cfg.CreateMap<Survey, SurveyViewModel>();

                cfg.CreateMap<SurveyCustomerLocationViewModel, SurveyCustomerLocation>();
                cfg.CreateMap<SurveyCustomerLocation, SurveyCustomerLocationViewModel>();

                cfg.CreateMap<SurveyProductQuestionViewModel, SurveyProductQuestion>();
                cfg.CreateMap<SurveyProductQuestion, SurveyProductQuestionViewModel>();

                cfg.CreateMap<QuestionViewModel, Question>();
                cfg.CreateMap<Question, QuestionViewModel>();

                cfg.CreateMap<CompanyUserViewModel, User>();
                cfg.CreateMap<User, CompanyUserViewModel>();
            });
            Mapper.Map<CompanyViewModel, Company>(new CompanyViewModel());
            Mapper.Map<Company, CompanyViewModel>(new Company());

            Mapper.Map<CompanyUserViewModel, User>(new CompanyUserViewModel());
            Mapper.Map<User, CompanyUserViewModel>(new User());

            Mapper.Map<CustomerViewModel, Customer>(new CustomerViewModel());
            Mapper.Map<Customer, CustomerViewModel>(new Customer());

            Mapper.Map<LocationViewModel, Location>(new LocationViewModel());
            Mapper.Map<Location, LocationViewModel>(new Location());

            Mapper.Map<ProductViewModel, Product>(new ProductViewModel());
            Mapper.Map<Product, ProductViewModel>(new Product());

            Mapper.Map<SurveyViewModel, Survey>(new SurveyViewModel());
            Mapper.Map<Survey, SurveyViewModel>(new Survey());

            Mapper.Map<SurveyCustomerLocationViewModel, SurveyCustomerLocation>(new SurveyCustomerLocationViewModel());
            Mapper.Map<SurveyCustomerLocation, SurveyCustomerLocationViewModel>(new SurveyCustomerLocation());

            Mapper.Map<SurveyProductQuestionViewModel, SurveyProductQuestion>(new SurveyProductQuestionViewModel());
            Mapper.Map<SurveyProductQuestion, SurveyProductQuestionViewModel>(new SurveyProductQuestion());

            Mapper.Map<QuestionViewModel, Question>(new QuestionViewModel());
            Mapper.Map<Question, QuestionViewModel>(new Question());

            Mapper.Map<CompanyUserViewModel, User>(new CompanyUserViewModel());
            Mapper.Map<User, CompanyUserViewModel>(new User());
        }            
    }
}