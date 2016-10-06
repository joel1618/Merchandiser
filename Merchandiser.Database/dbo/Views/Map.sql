CREATE VIEW [dbo].[Map]
AS
SELECT        dbo.SurveyHeader.Id, dbo.AspNetUsersInfo.FirstName, dbo.AspNetUsersInfo.LastName, dbo.SurveyHeader.Created, dbo.SurveyHeader.Latitude, dbo.SurveyHeader.Longitude, dbo.SurveyHeader.Notes,
dbo.SurveyHeader.CompanyId, dbo.SurveyHeader.CustomerId, dbo.SurveyHeader.SurveyId, dbo.SurveyHeader.LocationId, dbo.AspNetUsers.Id AS 'UserId', dbo.Location.Name as 'LocationName',
dbo.Survey.Name as 'SurveyName', dbo.Company.Name as 'CompanyName', dbo.Customer.Name as 'CustomerName'
FROM            dbo.SurveyHeader
LEFT JOIN
dbo.Location ON dbo.Location.Id = dbo.SurveyHeader.LocationId
LEFT JOIN
dbo.Survey ON dbo.Survey.Id = dbo.SurveyHeader.SurveyId
LEFT JOIN
dbo.Company ON dbo.Company.Id = dbo.SurveyHeader.CompanyId
LEFT JOIN
dbo.Customer ON dbo.Customer.Id = dbo.SurveyHeader.CustomerId
LEFT JOIN
            dbo.AspNetUsers ON dbo.SurveyHeader.CreatedBy = dbo.AspNetUsers.Id LEFT OUTER JOIN
                         dbo.AspNetUsersInfo ON dbo.AspNetUsersInfo.UserId = dbo.AspNetUsers.Id