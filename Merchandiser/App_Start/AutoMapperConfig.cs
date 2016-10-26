using AutoMapper;
using Merchandiser.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace Merchandiser.App_Start
{
    public static class AutoMapperConfig
    {
        public static void RegisterMappings()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<byte[], string>().ConvertUsing(new ByteArrayToStringTypeConverter());
                cfg.CreateMap<string, byte[]>().ConvertUsing(new StringToByteArrayTypeConverter());

                cfg.CreateMap<CompanyViewModel, Company>();
                cfg.CreateMap<Company, CompanyViewModel>();

                cfg.CreateMap<CustomerViewModel, Customer>();
                cfg.CreateMap<Customer, CustomerViewModel>();

                cfg.CreateMap<LocationViewModel, Location>();
                cfg.CreateMap<Location, LocationViewModel>();

                cfg.CreateMap<ProductViewModel, Product>();
                cfg.CreateMap<Product, ProductViewModel>();

                cfg.CreateMap<ProductCategoryViewModel, ProductCategory>();
                cfg.CreateMap<ProductCategory, ProductCategoryViewModel>();

                cfg.CreateMap<SurveyViewModel, Survey>();
                cfg.CreateMap<Survey, SurveyViewModel>();

                cfg.CreateMap<SurveyCustomerLocationViewModel, SurveyCustomerLocation>();
                cfg.CreateMap<SurveyCustomerLocation, SurveyCustomerLocationViewModel>();

                cfg.CreateMap<SurveyCustomerLocationProductQuestionViewModel, SurveyCustomerLocationProductQuestion>();
                cfg.CreateMap<SurveyCustomerLocationProductQuestion, SurveyCustomerLocationProductQuestionViewModel>();

                cfg.CreateMap<SurveyProductQuestionViewModel, SurveyProductQuestion>();
                cfg.CreateMap<SurveyProductQuestion, SurveyProductQuestionViewModel>();

                cfg.CreateMap<QuestionViewModel, Question>();
                cfg.CreateMap<Question, QuestionViewModel>();

                cfg.CreateMap<UserRoleViewModel, AspNetUserRole>();
                cfg.CreateMap<AspNetUserRole, UserRoleViewModel>();

                cfg.CreateMap<RoleViewModel, AspNetRole>();
                cfg.CreateMap<AspNetRole, RoleViewModel>();

                cfg.CreateMap<UserViewModel, AspNetUser>();
                cfg.CreateMap<AspNetUser, UserViewModel>();

                cfg.CreateMap<SurveyHeaderViewModel, SurveyHeader>();
                //.ForMember(p => p.BeforeImage, o=> o.Ignore())
                //.ForMember(p => p.AfterImage, o=> o.Ignore());
                cfg.CreateMap<SurveyHeader, SurveyHeaderViewModel>();
                //.ForMember(p => p.BeforeImage, o => o.Ignore())
                //.ForMember(p => p.AfterImage, o => o.Ignore());

                cfg.CreateMap<SurveyDetailViewModel, SurveyDetail>();
                cfg.CreateMap<SurveyDetail, SurveyDetailViewModel>();

                cfg.CreateMap<SelectLocationViewModel, SelectLocation>();
                cfg.CreateMap<SelectLocation, SelectLocationViewModel>();

                cfg.CreateMap<SelectSurveyViewModel, SelectSurvey>();
                cfg.CreateMap<SelectSurvey, SelectSurveyViewModel>();
            });
        }
    }

    public class StringToByteArrayTypeConverter : ITypeConverter<string, byte[]>
    {
        public byte[] Convert(string source, byte[] destination, ResolutionContext context)
        {
            if (string.IsNullOrWhiteSpace(source))
            {
                return null;
            }
            else {
                return System.Text.ASCIIEncoding.Default.GetBytes(source);
            }
        }
    }

    public class ByteArrayToStringTypeConverter : ITypeConverter<byte[], string>
    {
        public string Convert(byte[] source, string destination, ResolutionContext context)
        {
            if(source != null)
            {
                return source.ToString();
            }
            else
            {
                return "";
            }
        }
    }
}