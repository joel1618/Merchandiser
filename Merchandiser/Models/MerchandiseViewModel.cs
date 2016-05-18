using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models
{
    public class MerchandiseViewModel
    {
        public string Id { get; set; }
        //public string AspNetUsersId { get; set; }
        public int Quantity { get; set; }
        public string Name { get; set; }
        public string UPCCode { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string ModifiedDateTime { get; set; }
        public string CreatedDateTime { get; set; }
    }
}