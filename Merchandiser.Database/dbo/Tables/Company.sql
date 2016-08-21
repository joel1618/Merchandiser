﻿CREATE TABLE [dbo].[Company] (
    [Id]         UNIQUEIDENTIFIER NOT NULL,
    [Name]       NVARCHAR (100)   NOT NULL,
    [Modified]   DATETIME         NULL,
    [ModifiedBy] NVARCHAR (128)   NULL,
    [Created]    DATETIME         NOT NULL,
    [CreatedBy]  NVARCHAR (128)   NOT NULL,
    CONSTRAINT [PK_Company] PRIMARY KEY CLUSTERED ([Id] ASC)
);



