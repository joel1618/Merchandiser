using Merchandiser.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace Merchandiser.ControllerHelpers
{
    public static class ApiFilters
    {
        public static IQueryable<T> FilterCompanyByUserAndCompany<T>(this IQueryable<T> query, string userId, string companyFieldName, UserRoleRepository userRoleRepository)
        {
            var companies = userRoleRepository.Search().Where(e => e.UserId == userId).Select(e => e.CompanyId).ToList();
            var arg = Expression.Parameter(typeof(T), "p");

            var body = Expression.Call(
                Expression.Constant(companies),
                "Contains",
                null,
                Expression.Property(arg, companyFieldName));

            var predicate = Expression.Lambda<Func<T, bool>>(body, arg);

            return query.Where(predicate);
        }

        //http://stackoverflow.com/questions/3703386/iqueryable-extension-create-lambda-expression-for-querying-a-column-for-a-keywo
        public static IQueryable<T> FilterCompanyByUserAndCompanyAndRole<T>(this IQueryable<T> query, string userId, string companyFieldName, string roleName, UserRoleRepository userRoleRepository, RoleRepository roleRepository)
        {
            var role = roleRepository.Search().Where(e => e.Name == roleName).FirstOrDefault();
            var companies = userRoleRepository.Search().Where(e => e.UserId == userId && e.RoleId == role.Id).Select(e => e.CompanyId).ToList();
            var arg = Expression.Parameter(typeof(T), "p");

            var body = Expression.Call(
                Expression.Constant(companies),
                "Contains",
                null,
                Expression.Property(arg, companyFieldName));

            var predicate = Expression.Lambda<Func<T, bool>>(body, arg);

            return query.Where(predicate);
        }
    }
}