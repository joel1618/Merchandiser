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
        public Guid? CustomerId { get; set; }

        public virtual UserViewModel User {get; set;}
        public virtual RoleViewModel Role { get; set; }
        public virtual CompanyViewModel Company { get; set; }
        public virtual CustomerViewModel Customer { get; set; }

        public virtual UserInfoViewModel UserInfo { get; set; }
    }
}