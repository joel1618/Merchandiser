﻿CREATE VIEW [dbo].[SelectLocation] AS 
SELECT 
Survey.LocationId AS 'Id', 
Survey.CustomerId AS 'CustomerId',
MAX(Survey.CompanyId) AS 'CompanyId',
MAX(Location.Name) AS 'Name',
MAX(Location.Address) AS 'Address',
MAX(Location.Latitude) AS 'Latitude',
MAX(Location.Longitude) AS 'Longitude',
MAX(SurveyHeader.Created) AS 'SurveyCreated'
FROM SurveyCustomerLocationProductQuestion Survey
LEFT JOIN dbo.Location
ON Survey.LocationId = Location.Id
LEFT JOIN dbo.SurveyHeader
ON SurveyHeader.SurveyId = Survey.SurveyId
AND SurveyHeader.LocationId = Survey.LocationId
AND SurveyHeader.CustomerId = Survey.CustomerId
AND SurveyHeader.Created > CONVERT(DATETIME, DATEDIFF(DAY, 1, GETUTCDATE()))
GROUP BY Survey.LocationId, Survey.CustomerId

