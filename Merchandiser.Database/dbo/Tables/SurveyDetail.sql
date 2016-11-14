CREATE TABLE [dbo].[SurveyDetail] (
    [Id]                  UNIQUEIDENTIFIER NOT NULL,
    [CompanyId]           UNIQUEIDENTIFIER NOT NULL,
    [SurveyHeaderId]      UNIQUEIDENTIFIER NOT NULL,
    [ProductId]           UNIQUEIDENTIFIER NOT NULL,
    [QuestionId]          UNIQUEIDENTIFIER NOT NULL,
    [ProductTypeDetailId] UNIQUEIDENTIFIER NULL,
    [Answer]              NVARCHAR (1000)  NULL,
    [Modified]            DATETIME         NULL,
    [ModifiedBy]          NVARCHAR (128)   NULL,
    [Created]             DATETIME         NOT NULL,
    [CreatedBy]           NVARCHAR (128)   NOT NULL,
    CONSTRAINT [PK__SurveyDe__3214EC072967033E] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_SurveyDetail_Company] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([Id]),
    CONSTRAINT [FK_SurveyDetail_Product] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Product] ([Id]),
    CONSTRAINT [FK_SurveyDetail_ProductTypeDetail] FOREIGN KEY ([ProductTypeDetailId]) REFERENCES [dbo].[ProductTypeDetail] ([Id]),
    CONSTRAINT [FK_SurveyDetail_Question] FOREIGN KEY ([QuestionId]) REFERENCES [dbo].[Question] ([Id]),
    CONSTRAINT [FK_SurveyDetail_SurveyHeader] FOREIGN KEY ([SurveyHeaderId]) REFERENCES [dbo].[SurveyHeader] ([Id])
);



