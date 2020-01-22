--CREATE DATABASE [MemoryMap]


IF not exists (SELECT * FROM sys.tables WHERE [name] = 'User')
	BEGIN
	CREATE TABLE [User]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[Email] NVARCHAR(255) not null,
		[FirebaseUid] NVARCHAR (255) not null,
	)
	END
ELSE
	PRINT 'User table already exists'

IF not exists (SELECT * FROM sys.tables WHERE [name] = 'Picture')
	BEGIN
	CREATE TABLE [Picture]
	(
		[Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
		[UserId] UNIQUEIDENTIFIER,
		[Image] VARBINARY(MAX),
		[Country] NVARCHAR (255),
		[Date] DateTime,
		[Description] NVARCHAR (255),
		[Longitude] DECIMAL(7, 4) not null,
		[Latitude] DECIMAL(6, 4) not null,
	)
	END
ELSE
	PRINT 'Picture table already exists'

  insert into [Picture] ([Image], [UserId], [Country], [Longitude], [Latitude])
  select BulkColumn, '6BD92991-CAAE-40C1-AF37-1E4FE94DE72F' as UserId, 'Austria' as Country, 47.798460 as Longitude, 13.041640 as Latitude
  from Openrowset( Bulk 'C:\Users\test\Desktop\MemoryMapPics\AUSTRIA - MozartHouse.jpg', Single_Blob) as [Image]

  select * FROM [User]
  select * from [Picture]