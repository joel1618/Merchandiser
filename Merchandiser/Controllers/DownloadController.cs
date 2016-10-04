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
        public DownloadApiController()
        {
            this.reportController = new ReportApiController();
            this.reportRepository = new ReportRepository();
        }
        
        public FileResult Get()
        {
            byte[] array = null;
            using (MemoryStream stream = new MemoryStream())
            using (StreamWriter writer = new StreamWriter(stream))
            using (CsvWriter csv = new CsvWriter(writer))
            {
                var startDate = DateTime.Now.AddYears(-1);
                var endDate = DateTime.Now.AddDays(2);
                var result = reportController.Search(null, null, null, null, null, null, null, startDate, endDate, 0, 100000);
                var contentResult = result as OkNegotiatedContentResult<List<Dictionary<string,object>>>;
                var asdf = contentResult.Content;
                
                foreach(var column in asdf.FirstOrDefault())
                {
                    csv.WriteField(column.Key);                    
                }
                csv.NextRecord();
                foreach(var row in asdf)
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
            return File(array, "text/csv", "Export.csv");
        }

        public FileResult GetNotes()
        {
            throw new NotImplementedException();
        }
    }
}