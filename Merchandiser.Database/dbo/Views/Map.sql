CREATE VIEW [dbo].[Map]
AS
SELECT        dbo.SurveyHeader.Id, dbo.AspNetUsersInfo.FirstName, dbo.AspNetUsersInfo.LastName, dbo.SurveyHeader.Created, dbo.SurveyHeader.Latitude, dbo.SurveyHeader.Longitude, dbo.SurveyHeader.Notes,
dbo.SurveyHeader.CompanyId, dbo.SurveyHeader.CustomerId, dbo.SurveyHeader.SurveyId, dbo.SurveyHeader.LocationId, dbo.AspNetUsers.Id AS 'UserId'
FROM            dbo.SurveyHeader LEFT OUTER JOIN
                         dbo.AspNetUsers ON dbo.SurveyHeader.CreatedBy = dbo.AspNetUsers.Id LEFT OUTER JOIN
                         dbo.AspNetUsersInfo ON dbo.AspNetUsersInfo.UserId = dbo.AspNetUsers.Id