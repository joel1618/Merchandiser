CREATE TABLE [dbo].[Survey] (
    [Id]             UNIQUEIDENTIFIER NOT NULL,
    [CompanyId]      UNIQUEIDENTIFIER NOT NULL,
    [Name]           NVARCHAR (100)   NOT NULL,
    [IsNoteRequired] BIT              CONSTRAINT [DF_Survey_IsNoteRequired] DEFAULT ((0)) NOT NULL,
    [Modified]       DATETIME         NULL,
    [ModifiedBy]     NVARCHAR (128)   NULL,
    [Created]        DATETIME         NOT NULL,
    [CreatedBy]      NVARCHAR (128)   NOT NULL,
    CONSTRAINT [PK__Survey__3214EC077F1498A2] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Survey_Company] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([Id])
);



