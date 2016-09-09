using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Models
{
    public class UserRoleViewModel
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public string RoleId { get; set; }
        public Guid CompanyId { get; set; }

        public virtual AspNetUser User {get; set;}
        public virtual AspNetRole Role { get; set; }
        public virtual CompanyViewModel Company { get; set; }
    }
}