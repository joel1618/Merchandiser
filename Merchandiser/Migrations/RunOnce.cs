using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Migrations
{
    public class RunOnce
    {
        /*
         INSERT INTO dbo.SurveyCustomerLocationProductQuestion
        ( Id ,
          CompanyId ,
          SurveyId ,
          CustomerId ,
          LocationId ,
          ProductId ,
          QuestionId ,
          RowOrder ,
          Created ,
          CreatedBy
        )
        SELECT NEWID() AS 'Id', scl.CompanyId, scl.SurveyId, 
        scl.CustomerId, scl.LocationId, 
        spq.ProductId, spq.QuestionId, 0, GETDATE() 'Created', Survey.CreatedBy 

        FROM dbo.SurveyCustomerLocation scl
        LEFT JOIN dbo.Survey
        ON scl.SurveyId = survey.Id
        LEFT JOIN dbo.SurveyProductQuestion spq
        ON spq.SurveyId = survey.Id
         * */
    }
}