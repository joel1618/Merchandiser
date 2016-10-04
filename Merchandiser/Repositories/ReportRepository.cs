using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data.Common;
using System.Dynamic;
using System.Linq;
using System.Web;

namespace Merchandiser.Repositories
{
    public class ReportRepository
    {
        MerchandiserEntities context;
        public ReportRepository()
        {
            this.context = new MerchandiserEntities();
        }

        public List<Dictionary<string, object>> Search(Guid companyId, Guid? surveyHeaderId, Guid? customerId, 
            Guid? locationId, Guid? productId, Guid? surveyId, string userId, 
            DateTime startDate, DateTime endDate, int page, int pageSize)
        {
            using (var cmd = context.Database.Connection.CreateCommand())
            {
                context.Database.Connection.Open();
                cmd.CommandText = @"DECLARE @cols NVARCHAR(MAX), @sql NVARCHAR(MAX)
                    SET @cols = STUFF((SELECT DISTINCT ',' + QUOTENAME(Question.Name)
                     from SurveyHeader
                     left join SurveyDetail on SurveyHeader.Id = SurveyDetail.SurveyHeaderId
                    left join Customer on SurveyHeader.CustomerId = Customer.Id
                    left join Location on SurveyHeader.LocationId = Location.Id
                    left join Company on SurveyHeader.CompanyId = Company.Id
                    left join Product on SurveyDetail.ProductId = Product.Id
                    left join Question on SurveyDetail.QuestionId = Question.Id
					left join Survey on SurveyHeader.SurveyId = Survey.Id
					left join AspNetUsers on SurveyHeader.CreatedBy = AspNetUsers.Id
					left join AspNetUsersInfo on AspNetUsers.Id = AspNetUsersInfo.UserId
                    where 
                    Company.Id = CONVERT(uniqueidentifier,'" + companyId + @"')
                    AND SurveyHeader.Created >= '" + startDate + @"'
                    AND SurveyHeader.Created <= '" + endDate + @"'";
                if (surveyHeaderId != null)
                {
                    cmd.CommandText += @"AND (SurveyHeader.Id = CONVERT(uniqueidentifier,'" + surveyHeaderId + @"'))";
                }
                if (customerId != null)
                {
                    cmd.CommandText += @"AND (Customer.Id = CONVERT(uniqueidentifier,'" + customerId + @"'))";
                }
                if (locationId != null)
                {
                    cmd.CommandText += @"AND (Location.Id = CONVERT(uniqueidentifier,'" + locationId + @"'))";
                }
                if (productId != null)
                {
                    cmd.CommandText += @"AND (Product.Id = CONVERT(uniqueidentifier,'" + productId + @"'))";
                }
                if (surveyId != null)
                {
                    cmd.CommandText += @"AND (Survey.Id = CONVERT(uniqueidentifier,'" + surveyId + @"'))";
                }
                if (userId != null)
                {
                    cmd.CommandText += @"AND (AspNetUsers.Id = CONVERT(uniqueidentifier,''" + userId + @"''))";
                }
                cmd.CommandText += @"
                     FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 1, '')

				    SET @sql = 'SELECT Id, UserName, FirstName, LastName, SurveyId, SurveyName, CompanyId, 
					CompanyName, LocationId, LocationName, CustomerId, CustomerName, ProductId, ProductName, Created, IsBeforeImage, IsAfterImage, ' + @cols + '
                    from 
					(
					select 
                    SurveyHeader.Id as ''Id'',
					AspNetUsers.UserName as ''UserName'',
					AspNetUsersInfo.FirstName as ''FirstName'',
					AspNetUsersInfo.LastName as ''LastName'',
					Survey.Id as ''SurveyId'',
					Survey.Name as ''SurveyName'', 
                    Company.Name as ''CompanyName'',
					Company.Id as ''CompanyId'',
					Location.Id as ''LocationId'',
					Location.Name as ''LocationName'',
					Customer.Id as ''CustomerId'', 
					Customer.Name as ''CustomerName'',
					Product.Id as ''ProductId'',
					Product.Name as ''ProductName'', 
                    SurveyHeader.Created as ''Created'',
                    SurveyHeader.IsBeforeImage as ''IsBeforeImage'',
                    SurveyHeader.IsAfterImage as ''IsAfterImage'',
                    SurveyDetail.Answer as ''Answer'', 
					Question.Name as ''QuestionName''
                    
                    from SurveyHeader
                    left join SurveyDetail on SurveyHeader.Id = SurveyDetail.SurveyHeaderId
                    left join Customer on SurveyHeader.CustomerId = Customer.Id
                    left join Location on SurveyHeader.LocationId = Location.Id
                    left join Company on SurveyHeader.CompanyId = Company.Id
                    left join Product on SurveyDetail.ProductId = Product.Id
                    left join Question on SurveyDetail.QuestionId = Question.Id
					left join Survey on SurveyHeader.SurveyId = Survey.Id
					left join AspNetUsers on SurveyHeader.CreatedBy = AspNetUsers.Id
					left join AspNetUsersInfo on AspNetUsers.Id = AspNetUsersInfo.UserId
                    where 
                    Company.Id = CONVERT(uniqueidentifier,''" + companyId + @"'')
                    AND SurveyHeader.Created >= ''" + startDate + @"''
                    AND SurveyHeader.Created <= ''" + endDate + @"''";
                if (surveyHeaderId != null)
                {
                    cmd.CommandText += @"AND (SurveyHeader.Id = CONVERT(uniqueidentifier,''" + surveyHeaderId + @"''))";
                }
                if(customerId != null)
                {
                    cmd.CommandText += @"AND (Customer.Id = CONVERT(uniqueidentifier,''" + customerId + @"''))";
                }
                if (locationId != null)
                {
                    cmd.CommandText += @"AND (Location.Id = CONVERT(uniqueidentifier,''" + locationId + @"''))";
                }
                if (productId != null)
                {
                    cmd.CommandText += @"AND (Product.Id = CONVERT(uniqueidentifier,''" + productId + @"''))";
                }
                if (surveyId != null)
                {
                    cmd.CommandText += @"AND (Survey.Id = CONVERT(uniqueidentifier,''" + surveyId + @"''))";
                }
                if (userId != null)
                {
                    cmd.CommandText += @"AND (AspNetUsers.Id = CONVERT(uniqueidentifier,''" + userId + @"''))";
                }
                cmd.CommandText += @"
                    ) s
                    PIVOT
                    (
                        MAX(Answer) FOR QuestionName IN(' + @cols + ')
                    ) p 
                    order by Created desc OFFSET " + page * pageSize + " ROWS FETCH NEXT " + pageSize + @" ROWS ONLY;'

                    EXECUTE(@sql)";
                using (var reader = cmd.ExecuteReader())
                {
                    var model = Read(reader).ToList();
                    return model;
                }
            }
        }
        public List<Dictionary<string, object>> Read(DbDataReader reader)
        {
            List<Dictionary<string, object>> expandolist = new List<Dictionary<string, object>>();
            foreach (var item in reader)
            {
                IDictionary<string, object> expando = new ExpandoObject();
                foreach (PropertyDescriptor propertyDescriptor in TypeDescriptor.GetProperties(item))
                {
                    var obj = propertyDescriptor.GetValue(item);
                    expando.Add(propertyDescriptor.Name, obj);
                }
                expandolist.Add(new Dictionary<string, object>(expando));
            }
            return expandolist;
        }
    }
}