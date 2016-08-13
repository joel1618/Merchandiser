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

                cfg.CreateMap<CompanyUserViewModel, CompanyUser>();
                cfg.CreateMap<CompanyUser, CompanyUserViewModel>();

                cfg.CreateMap<CustomerViewModel, Customer>();
                cfg.CreateMap<Customer, CustomerViewModel>();

                cfg.CreateMap<LocationViewModel, Location>();
                cfg.CreateMap<Location, LocationViewModel>();

                cfg.CreateMap<ProductViewModel, Product>();
                cfg.CreateMap<Product, ProductViewModel>();
            });
            Mapper.Map<CompanyViewModel, Company>(new CompanyViewModel());
            Mapper.Map<Company, CompanyViewModel>(new Company());

            Mapper.Map<CompanyUserViewModel, CompanyUser>(new CompanyUserViewModel());
            Mapper.Map<CompanyUser, CompanyUserViewModel>(new CompanyUser());

            Mapper.Map<CustomerViewModel, Customer>(new CustomerViewModel());
            Mapper.Map<Customer, CustomerViewModel>(new Customer());

            Mapper.Map<LocationViewModel, Location>(new LocationViewModel());
            Mapper.Map<Location, LocationViewModel>(new Location());

            Mapper.Map<ProductViewModel, Product>(new ProductViewModel());
            Mapper.Map<Product, ProductViewModel>(new Product());
        }            
    }
}