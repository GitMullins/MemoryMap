--CREATE DATABASE [MemoryMap]


IF not exists (SELECT * FROM sys.tables WHERE [name] = 'User')
	BEGIN
	CREATE TABLE [User]
	(
		[Email] NVARCHAR(255) not null,
		[FirebaseUid] NVARCHAR (255) not null,
	)
	END
ELSE
	PRINT 'User table already exists'
	