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
        public ReportRepository reportRepository;
        public MapApiController mapController;
        public DownloadApiController()
        {
            this.reportController = new ReportApiController();
            this.reportRepository = new ReportRepository();
            this.mapController = new MapApiController();
        }
        
        
        public FileResult DownloadSurveyData(DateTime startDate, DateTime endDate)
        {
            byte[] array = null;
            using (MemoryStream stream = new MemoryStream())
            using (StreamWriter writer = new StreamWriter(stream))
            using (CsvWriter csv = new CsvWriter(writer))
            {
                var result = reportController.Search(null, null, null, null, null, null, null, startDate, endDate, 0, 100000);
                var contentResult = result as OkNegotiatedContentResult<List<Dictionary<string,object>>>;
                var content = contentResult.Content;
                
                foreach(var column in content.FirstOrDefault())
                {
                    csv.WriteField(column.Key);                    
                }
                csv.NextRecord();
                foreach(var row in content)
                {
                    foreach(var column in row)
                    {
                        csv.WriteField(column.Value);
                    }
                    csv.NextRecord();
                }
                writer.Flush();

                array = stream.ToArray();
            }
            return File(array, "text/csv", "SurveyDataExport.csv");
        }

        public FileResult DownloadNoteData(Guid companyId, DateTime startDate, DateTime endDate)
        {
            byte[] array = null;
            using (MemoryStream stream = new MemoryStream())
            using (StreamWriter writer = new StreamWriter(stream))
            using (CsvWriter csv = new CsvWriter(writer))
            {
                var result = mapController.SearchWithNotes(companyId).Where(e => e.CompanyId == companyId && e.Created >= startDate && e.Created <= endDate);

                foreach (PropertyInfo propertyInfo in result.First().GetType().GetProperties())
                {
                    csv.WriteField(propertyInfo.Name);
                }
                csv.NextRecord();
                foreach (var row in result)
                {
                    foreach (var column in row.GetType().GetProperties())
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
                    csv.NextRecord();
                }
                writer.Flush();

                array = stream.ToArray();
            }
            return File(array, "text/csv", "NotesLocationExport.csv");
        }

        public FileResult GetNotes()
        {
            throw new NotImplementedException();
        }
    }
}