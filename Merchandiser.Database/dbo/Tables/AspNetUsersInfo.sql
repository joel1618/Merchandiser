CREATE TABLE [dbo].[AspNetUsersInfo] (
    [Id]        NVARCHAR (128) NOT NULL,
    [UserId]    NVARCHAR (128) NOT NULL,
    [FirstName] NVARCHAR (50)  NULL,
    [LastName]  NVARCHAR (50)  NULL,
    [Created]   DATETIME       CONSTRAINT [DF_AspNetUsersInfo_Created] DEFAULT (getutcdate()) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_AspNetUsersInfo_AspNetUsers] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id])
);





