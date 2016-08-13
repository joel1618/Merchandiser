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
            });
            Mapper.Map<CompanyViewModel, Company>(new CompanyViewModel());
            Mapper.Map<Company, CompanyViewModel>(new Company());
        }            
    }
}