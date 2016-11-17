using CsvHelper;
using Merchandiser.Controllers.api.v1.breeze;
using Merchandiser.Repositories;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Reflection;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;
using System.Web.Mvc;

namespace Merchandiser.Controllers.api.v1
{
    public class DownloadApiController : Controller
    {
        public ReportApiController reportController;
        public SurveyHeaderApiController surveyController;
        public DownloadApiController()
        {
            this.reportController = new ReportApiController();
            this.surveyController = new SurveyHeaderApiController();
        }


        public FileResult DownloadSurveyData(Guid? companyId, Guid? surveyHeaderId, Guid? customerId, 
            Guid? locationId, Guid? productId, Guid? surveyId, DateTime startDate, DateTime endDate)
        {
            byte[] array = null;
            using (MemoryStream stream = new MemoryStream())
            using (StreamWriter writer = new StreamWriter(stream))
            using (CsvWriter csv = new CsvWriter(writer))
            {
                var result = reportController.Search(companyId, surveyHeaderId, customerId, locationId, productId, surveyId, null, startDate, endDate, 0, 100000);
                var contentResult = result as OkNegotiatedContentResult<List<Dictionary<string, object>>>;
                var content = contentResult.Content;
                if (content.Count() > 0)
                {
                    foreach (var column in content.FirstOrDefault())
                    {
                        csv.WriteField(column.Key);
                    }
                    csv.NextRecord();
                    foreach (var row in content)
                    {
                        foreach (var column in row)
                        {
                            csv.WriteField(column.Value);
                        }
                        csv.NextRecord();
                    }
                    writer.Flush();
                }

                array = stream.ToArray();
            }
            return File(array, "text/csv", "SurveyDataExport.csv");
        }
        
        public FileResult DownloadNoteData(Guid companyId, Guid? surveyHeaderId, Guid? customerId,
        Guid? locationId, Guid? productId, Guid? surveyId, DateTime startDate, DateTime endDate)
        {
            byte[] array = null;
            string[] excludeColumns = new string[] { "LocationId", "SurveyId", "CompanyId", "CustomerId" };
            using (MemoryStream stream = new MemoryStream())
            using (StreamWriter writer = new StreamWriter(stream))
            using (CsvWriter csv = new CsvWriter(writer))
            {
                var result = surveyController.Search(companyId).Where(e => e.CompanyId == companyId && e.Created >= startDate && e.Created <= endDate);
                if (result.Count() > 0)
                {
                    foreach (PropertyInfo propertyInfo in result.First().GetType().GetProperties())
                    {
                        if (!excludeColumns.Contains(propertyInfo.Name))
                        {
                            csv.WriteField(propertyInfo.Name);
                        }
                    }
                    csv.NextRecord();
                    foreach (var row in result)
                    {
                        foreach (var column in row.GetType().GetProperties())
                        {
                            if (!excludeColumns.Contains(column.Name))
                            {
                                var value = column.GetValue(row, null);
                                if (value != null)
                                {
                                    csv.WriteField(value);
                                }
                                else
                                {
                                    csv.WriteField("");
                                }
                            }
                        }
                        csv.NextRecord();
                    }
                    writer.Flush();
                }
                array = stream.ToArray();
            }
            return File(array, "text/csv", "NotesLocationExport.csv");
        }
    }
}