CREATE TABLE [dbo].[SurveyDetail] (
    [Id]                  INT             IDENTITY (1, 1) NOT NULL,
    [CompanyId]           INT             NOT NULL,
    [SurveyHeaderId]      INT             NOT NULL,
    [ProductId]           INT             NOT NULL,
    [QuestionId]          INT             NOT NULL,
    [ProductTypeDetailId] INT             NULL,
    [Answer]              NVARCHAR (1000) NULL,
    [Modified]            DATETIME        NULL,
    [ModifiedBy]          NVARCHAR (128)  NULL,
    [Created]             DATETIME        NOT NULL,
    [CreatedBy]           NVARCHAR (128)  NOT NULL,
    CONSTRAINT [PK__SurveyDe__3214EC072967033E] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_SurveyDetail_Company] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([Id]),
    CONSTRAINT [FK_SurveyDetail_Product] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Product] ([Id]),
    CONSTRAINT [FK_SurveyDetail_ProductTypeDetail] FOREIGN KEY ([ProductTypeDetailId]) REFERENCES [dbo].[ProductTypeDetail] ([Id]),
    CONSTRAINT [FK_SurveyDetail_Question] FOREIGN KEY ([QuestionId]) REFERENCES [dbo].[Question] ([Id]),
    CONSTRAINT [FK_SurveyDetail_SurveyHeader] FOREIGN KEY ([SurveyHeaderId]) REFERENCES [dbo].[SurveyHeader] ([Id])
);








GO


