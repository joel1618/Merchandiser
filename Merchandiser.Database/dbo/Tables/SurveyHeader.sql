﻿CREATE TABLE [dbo].[SurveyHeader] (
    [Id]            INT            IDENTITY (1, 1) NOT NULL,
    [CompanyId]     INT            NOT NULL,
    [SurveyId]      INT            NOT NULL,
    [CustomerId]    INT            NOT NULL,
    [LocationId]    INT            NOT NULL,
    [Latitude]      DECIMAL (9, 6) NULL,
    [Longitude]     DECIMAL (9, 6) NULL,
    [Notes]         NVARCHAR (MAX) NULL,
    [IsBeforeImage] BIT            NOT NULL,
    [IsAfterImage]  BIT            NOT NULL,
    [Created]       DATETIME       NOT NULL,
    [CreatedBy]     NVARCHAR (128) NOT NULL,
    [Modified]      DATETIME       NULL,
    [ModifiedBy]    NVARCHAR (128) NULL,
    [Address]       NVARCHAR (100) NULL,
    [AreaManager]   NVARCHAR (100) NULL,
    [Phone]         NVARCHAR (100) NULL,
    [City]          NVARCHAR (100) NULL,
    [State]         NVARCHAR (100) NULL,
    [Zip]           NVARCHAR (100) NULL,
    [IsReviewed]    BIT            CONSTRAINT [DF_SurveyHeader_IsReviewed] DEFAULT ((0)) NOT NULL,
    [ReviewedBy]    NVARCHAR (128) NULL,
    [Reviewed]      DATETIME       NULL,
    [LocationName]  NVARCHAR (100) NULL,
    [CustomerName]  NVARCHAR (100) NULL,
    CONSTRAINT [PK__SurveyHe__3214EC07CA49FF11] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_SurveyHeader_AspNetUsers] FOREIGN KEY ([CreatedBy]) REFERENCES [dbo].[AspNetUsers] ([Id]),
    CONSTRAINT [FK_SurveyHeader_AspNetUsers1] FOREIGN KEY ([ModifiedBy]) REFERENCES [dbo].[AspNetUsers] ([Id]),
    CONSTRAINT [FK_SurveyHeader_Company] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([Id]),
    CONSTRAINT [FK_SurveyHeader_Customer] FOREIGN KEY ([CustomerId]) REFERENCES [dbo].[Customer] ([Id]),
    CONSTRAINT [FK_SurveyHeader_Location] FOREIGN KEY ([LocationId]) REFERENCES [dbo].[Location] ([Id]),
    CONSTRAINT [FK_SurveyHeader_Survey] FOREIGN KEY ([SurveyId]) REFERENCES [dbo].[Survey] ([Id])
);




















GO


