CREATE TABLE [dbo].[Product] (
    [Id]                  INT            IDENTITY (1, 1) NOT NULL,
    [CompanyId]           INT            NOT NULL,
    [ProductCategoryId]   INT            NULL,
    [ProductTypeHeaderId] INT            NULL,
    [Name]                NVARCHAR (100) NOT NULL,
    [Modified]            DATETIME       NULL,
    [ModifiedBy]          NVARCHAR (128) NULL,
    [Created]             DATETIME       NOT NULL,
    [CreatedBy]           NVARCHAR (128) NOT NULL,
    CONSTRAINT [PK__Product__3214EC072040673E] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Product_Company] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([Id]),
    CONSTRAINT [FK_Product_ProductCategory] FOREIGN KEY ([ProductCategoryId]) REFERENCES [dbo].[ProductCategory] ([Id]),
    CONSTRAINT [FK_Product_ProductTypeHeader] FOREIGN KEY ([ProductTypeHeaderId]) REFERENCES [dbo].[ProductTypeHeader] ([Id])
);













