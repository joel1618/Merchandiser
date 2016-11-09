CREATE VIEW [dbo].[SelectUser] AS
select
userRoles.CompanyId,
userRoles.UserId,
min(users.Email) as 'Email',
min(userInfo.FirstName) as 'FirstName',
min(userInfo.LastName) as 'LastName'
from AspNetUserRoles userRoles
left join AspNetUsers users
on users.Id = userRoles.UserId
left join AspNetUsersInfo userInfo
on userInfo.UserId = userRoles.UserId
group by userRoles.CompanyId, userRoles.UserId