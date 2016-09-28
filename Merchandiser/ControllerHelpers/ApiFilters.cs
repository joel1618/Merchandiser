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
        public static IQueryable<T> FilterCompanyForAll<T>(this IQueryable<T> query, string userId, UserRoleRepository userRoleRepository)
        {
            var companies = userRoleRepository.Search().Where(e => e.UserId == userId).Select(e => e.CompanyId).ToList();
            var arg = Expression.Parameter(typeof(T), "p");

            var body = Expression.Call(
                Expression.Constant(companies),
                "Contains",
                null,
                Expression.Property(arg, "CompanyId"));

            var predicate = Expression.Lambda<Func<T, bool>>(body, arg);

            return query.Where(predicate);
        }

        //http://stackoverflow.com/questions/3703386/iqueryable-extension-create-lambda-expression-for-querying-a-column-for-a-keywo
        public static IQueryable<T> FilterCompanyByCompany<T>(this IQueryable<T> query, string userId, UserRoleRepository userRoleRepository)
        {
            var companies = userRoleRepository.Search().Where(e => e.UserId == userId).Select(e => e.CompanyId).ToList();
            var arg = Expression.Parameter(typeof(T), "p");

            var body = Expression.Call(
                Expression.Constant(companies),
                "Contains",
                null,
                Expression.Property(arg, "Id"));

            var predicate = Expression.Lambda<Func<T, bool>>(body, arg);

            return query.Where(predicate);
        }
    }
}