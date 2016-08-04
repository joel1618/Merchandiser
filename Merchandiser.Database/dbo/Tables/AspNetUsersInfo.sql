CREATE TABLE [dbo].[AspNetUsersInfo] (
    [Id]        NVARCHAR (128) NOT NULL,
    [UserId]    NVARCHAR (128) NOT NULL,
    [FirstName] NVARCHAR (50)  NULL,
    [LastName]  NVARCHAR (50)  NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_AspNetUsersInfo_AspNetUsers] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id])
);



