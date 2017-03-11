using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Merchandiser.Models
{
    public class ProductViewModel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int CompanyId { get; set; }
        public int? ProductCategoryId { get; set; }
        public int? ProductTypeHeaderId { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }

        public virtual ProductCategoryViewModel ProductCategory { get; set; }

        public virtual ProductTypeHeaderViewModel ProductTypeHeader { get; set; }
    }
}