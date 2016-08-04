CREATE TABLE [dbo].[Company] (
    [Id]               UNIQUEIDENTIFIER NOT NULL,
    [Name]             NVARCHAR (100)   NOT NULL,
    [UserId]           NVARCHAR (128)   NOT NULL,
    [ModifiedDateTime] DATETIME         NULL,
    [ModifiedByUserId] NVARCHAR (128)   NULL,
    [CreatedDateTime]  DATETIME         NOT NULL,
    [CreatedByUserId]  NVARCHAR (128)   NOT NULL,
    CONSTRAINT [PK_Company] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Company_AspNetUsers] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id])
);

