CREATE TABLE [dbo].[Location] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [CompanyId]   INT            NOT NULL,
    [Name]        NVARCHAR (100) NOT NULL,
    [Store]       NVARCHAR (100) NULL,
    [Latitude]    DECIMAL (9, 6) NULL,
    [Longitude]   DECIMAL (9, 6) NULL,
    [Address]     NVARCHAR (100) NULL,
    [AreaManager] NVARCHAR (100) NULL,
    [Modified]    DATETIME       NULL,
    [ModifiedBy]  NVARCHAR (128) NULL,
    [Created]     DATETIME       NOT NULL,
    [CreatedBy]   NVARCHAR (128) NOT NULL,
    [Phone]       NVARCHAR (100) NULL,
    [City]        NVARCHAR (100) NULL,
    [State]       NVARCHAR (100) NULL,
    [Zip]         NVARCHAR (100) NULL,
    CONSTRAINT [PK__Location__3214EC07EE92D78D] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Location_Location] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([Id])
);







