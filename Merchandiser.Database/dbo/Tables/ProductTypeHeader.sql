﻿CREATE TABLE [dbo].[ProductTypeHeader] (
    [Id]         INT            IDENTITY (1, 1) NOT NULL,
    [CompanyId]  INT            NOT NULL,
    [Name]       NVARCHAR (100) NOT NULL,
    [Modified]   DATETIME       NULL,
    [ModifiedBy] NVARCHAR (128) NULL,
    [Created]    DATETIME       NOT NULL,
    [CreatedBy]  NVARCHAR (128) NOT NULL,
    CONSTRAINT [PK_ProductTypeHeader] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_ProductTypeHeader_Company] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([Id])
);



