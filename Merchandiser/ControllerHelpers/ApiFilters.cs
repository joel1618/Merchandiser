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

        public static IQueryable<T> FilterAllByUserAndCompany<T>(this IQueryable<T> query, 
            string userId, Guid companyId, string userFieldName, string companyFieldName, string customerFieldName, 
            UserRoleRepository userRoleRepository)
        {
            ParameterExpression param = Expression.Parameter(typeof(T), "object");
            MethodCallExpression body = null;
            Expression<Func<T, bool>> predicate = null;
            if (companyFieldName != null)
            {
                body = Expression.Call(Expression.Constant(companyId), "Equals", null, Expression.Property(param, companyFieldName));
                predicate = Expression.Lambda<Func<T, bool>>(body, param);
                query = query.Where(predicate);
            }

            var role = userRoleRepository.Search().Where(e => e.CompanyId == companyId && e.UserId == userId).FirstOrDefault();
            if (role.AspNetRole.Name == "Administrator")
            {
                
            }
            else if(role.AspNetRole.Name == "Customer")
            {
                if (customerFieldName != null)
                {
                    var customers = userRoleRepository.Search().Where(e => e.UserId == userId && e.CompanyId == companyId && e.CustomerId != null).Select(x => x.CustomerId.Value).ToList();

                    body = Expression.Call(Expression.Constant(customers), customers.GetType().GetMethod("Contains"), Expression.Property(param, customerFieldName));
                    predicate = Expression.Lambda<Func<T, bool>>(body, param);

                    query = query.Where(predicate);
                }
            }
            else
            {
                if (userFieldName != null)
                {
                    var property = Expression.Property(param, userFieldName);
                    var method = typeof(string).GetMethod("Equals", new[] { typeof(string) });
                    var argument = Expression.Constant(userId);
                    body = Expression.Call(property, method, argument);
                    predicate = Expression.Lambda<Func<T, bool>>(body, param);

                    query = query.Where(predicate);
                }
            }

            return query;
        }
    }
}