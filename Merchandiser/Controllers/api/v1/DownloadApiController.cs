using CsvHelper;
using Merchandiser.Controllers.api.v1.breeze;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Merchandiser.Controllers.api.v1
{
    public class DownloadApiController : ApiController
    {
        public ReportApiController reportController;
        public DownloadApiController()
        {
            this.reportController = new ReportApiController();
        }

        [HttpGet]
        public void Get()
        {
            using (MemoryStream stream = new MemoryStream())
            using (StreamWriter writer = new StreamWriter(stream))
            using (CsvWriter csv = new CsvWriter(writer))
            {
                var startDate = DateTime.Now.AddYears(-1);
                var endDate = DateTime.Now.AddDays(2);
                var data = reportController.Search(null, null, null, null, null, null, null, startDate, endDate, 0, 100000);
                
                csv.WriteRecords(data as IEnumerable);
            }
        }

    }
}