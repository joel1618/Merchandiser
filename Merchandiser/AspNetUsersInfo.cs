//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Merchandiser
{
    using System;
    using System.Collections.Generic;
    
    public partial class AspNetUsersInfo
    {
        public string Id { get; set; }
        public string AspNetUsersId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    
        public virtual AspNetUser AspNetUser { get; set; }
    }
}
