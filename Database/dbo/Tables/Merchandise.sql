CREATE TABLE [dbo].[Merchandise] (
    [Id]               NVARCHAR (128) NOT NULL,
    [AspNetUsersId]    NVARCHAR (128) NOT NULL,
    [Quantity]         INT            NOT NULL,
    [Name]             NVARCHAR (50)  NULL,
    [UPCCode]          NVARCHAR (50)  NULL,
    [Latitude]         DECIMAL (9, 6) NULL,
    [Longitude]        DECIMAL (9, 6) NULL,
    [ModifiedDateTime] DATETIME       NULL,
    [CreatedDateTime]  DATETIME       NOT NULL,
    CONSTRAINT [PK_Merchandise] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Merchandise_AspNetUsers] FOREIGN KEY ([AspNetUsersId]) REFERENCES [dbo].[AspNetUsers] ([Id])
);

