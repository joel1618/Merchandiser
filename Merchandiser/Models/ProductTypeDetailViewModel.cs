﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models
{
    public class ProductTypeDetailViewModel
    {
        public System.Guid Id { get; set; }
        public System.Guid CompanyId { get; set; }
        public System.Guid ProductTypeHeaderId { get; set; }
        public string Name { get; set; }
        public string ModifiedBy { get; set; }
        public Nullable<System.DateTime> Modified { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTime Created { get; set; }
    }
}