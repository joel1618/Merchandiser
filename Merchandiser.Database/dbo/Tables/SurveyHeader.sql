CREATE TABLE [dbo].[SurveyHeader] (
    [Id]            UNIQUEIDENTIFIER NOT NULL,
    [CompanyId]     UNIQUEIDENTIFIER NOT NULL,
    [SurveyId]      UNIQUEIDENTIFIER NOT NULL,
    [CustomerId]    UNIQUEIDENTIFIER NOT NULL,
    [LocationId]    UNIQUEIDENTIFIER NOT NULL,
    [Latitude]      DECIMAL (9, 6)   NULL,
    [Longitude]     DECIMAL (9, 6)   NULL,
    [Notes]         NVARCHAR (MAX)   NULL,
    [IsBeforeImage] BIT              NOT NULL,
    [IsAfterImage]  BIT              NOT NULL,
    [Created]       DATETIME         NOT NULL,
    [CreatedBy]     NVARCHAR (128)   NOT NULL,
    [Modified]      DATETIME         NULL,
    [ModifiedBy]    NVARCHAR (128)   NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_SurveyHeader_Company] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([Id]),
    CONSTRAINT [FK_SurveyHeader_Customer] FOREIGN KEY ([CustomerId]) REFERENCES [dbo].[Customer] ([Id]),
    CONSTRAINT [FK_SurveyHeader_Location] FOREIGN KEY ([LocationId]) REFERENCES [dbo].[Location] ([Id]),
    CONSTRAINT [FK_SurveyHeader_Survey] FOREIGN KEY ([SurveyId]) REFERENCES [dbo].[Survey] ([Id])
);







