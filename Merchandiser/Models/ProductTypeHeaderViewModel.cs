using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models
{
    public class ProductTypeHeaderViewModel
    {
        public System.Guid Id { get; set; }
        public System.Guid CompanyId { get; set; }
        public string Name { get; set; }
        public Nullable<System.DateTime> Modified { get; set; }
        public string ModifiedBy { get; set; }
        public System.DateTime Created { get; set; }
        public string CreatedBy { get; set; }

        public virtual List<ProductTypeDetailViewModel> Details { get; set; }
    }
}