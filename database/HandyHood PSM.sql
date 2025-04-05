USE HandyHood;



-- 1.view all the tasks posted by the current user.(UDF)

CREATE FUNCTION dbo.GetTasksByUser (
    @UserID INT
)
RETURNS TABLE
AS
RETURN
(
    SELECT 
        T.TaskID,
        T.Title,
        T.Description,
        T.Status,
        L.Address,
        C.Name AS CommunityName
    FROM Task T
    INNER JOIN Location L ON T.LocationID = L.LocationID
    INNER JOIN Community C ON L.CommunityID = C.CommunityID
    WHERE T.CreatorUserID = @UserID
);

SELECT * FROM dbo.GetTasksByUser(1); -- Replace 1 with the desired UserID


CREATE FUNCTION dbo.GetTasksMatchingUserSkills (
    @UserID INT
)
RETURNS TABLE
AS
RETURN
(
    SELECT 
        T.TaskID,
        T.Title,
        T.Description,
        T.Status,
        S.Skill,
        L.Address,
        C.Name AS CommunityName
    FROM Task T
    INNER JOIN Skill S ON T.RequiredSkillID = S.SkillID
    INNER JOIN User_Skill US ON US.SkillID = S.SkillID
    INNER JOIN Location L ON T.LocationID = L.LocationID
    INNER JOIN Community C ON L.CommunityID = C.CommunityID
    WHERE US.UserID = @UserID
);


SELECT * FROM dbo.GetTasksMatchingUserSkills(3); -- Should return TaskID 3 now

--3. Create task and Automatic notification to users with the required skill upon creation of task.(proc+trigger)

CREATE PROCEDURE dbo.CreateTaskWithSkill 
    @CreatorUserID INT, 
    @LocationID INT, 
    @Title VARCHAR(50), 
    @Description VARCHAR(200), 
    @Status VARCHAR(50), 
    @RequiredSkillID INT 
AS 
BEGIN 
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO Task (CreatorUserID, LocationID, Title, Description, Status, RequiredSkillID)
        VALUES (@CreatorUserID, @LocationID, @Title, @Description, @Status, @RequiredSkillID);

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        THROW;
    END CATCH
END;
GO


-- Trigger: trg_NotifySkilledUsers
CREATE TRIGGER trg_NotifySkilledUsers
ON Task
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Notification (UserID, TaskID, Notification, Date, Time, Status)
    SELECT 
        US.UserID,
        I.TaskID,
        CONCAT('New task "', I.Title, '" matches your skill: ', S.Skill),
        CAST(GETDATE() AS DATE),
        CAST(GETDATE() AS TIME),
        'Unread'
    FROM INSERTED I
    INNER JOIN Skill S ON S.SkillID = I.RequiredSkillID
    INNER JOIN User_Skill US ON US.SkillID = I.RequiredSkillID;
END;

-- Step-by-Step Test to Verify It Works

-- Call the Stored Procedure to Insert a Task
EXEC dbo.CreateTaskWithSkill
    @CreatorUserID = 1,
    @LocationID = 1,
    @Title = 'Paint Garage Door',
    @Description = 'Need help painting the garage door a new color.',
    @Status = 'Pending',
    @RequiredSkillID = 4;

-- Check the Task Table
SELECT * FROM Task WHERE Title = 'Paint Garage Door';


-- Check the Notification Table
SELECT * FROM Notification
WHERE Notification LIKE '%Paint Garage Door%'
ORDER BY NotificationID DESC;

CREATE FUNCTION dbo.fn_GetMessagesFromSender
(
    @CurrentUserID INT,
    @SenderID INT
)
RETURNS TABLE
AS
RETURN
(
    SELECT 
        m.MessageID,
        m.SenderID,
        s.Username AS SenderUsername,
        m.ReceiverID,
        r.Username AS ReceiverUsername,
        m.Content
    FROM Message m
    JOIN UserAccount s ON m.SenderID = s.UserID
    JOIN UserAccount r ON m.ReceiverID = r.UserID
    WHERE m.ReceiverID = @CurrentUserID AND m.SenderID = @SenderID
);

select * from dbo.fn_GetMessagesFromSender(2,1)


CREATE VIEW vw_Skills AS
SELECT 
    SkillID,
    Skill
FROM Skill;

select * from vw_Skills

CREATE FUNCTION GetUserNotifications(@UserID INT)
RETURNS TABLE
AS
RETURN
(
    SELECT 
        N.NotificationID,
        N.Notification,
        N.Date,
        N.Time,
        T.Title AS TaskTitle,
        T.Status AS TaskStatus
    FROM 
        Notification N
    INNER JOIN 
        Task T ON N.TaskID = T.TaskID
    WHERE 
        N.UserID = @UserID
);

SELECT * FROM GetUserNotifications(2);

CREATE FUNCTION GetTasksByStatus(@Status VARCHAR(50))
RETURNS TABLE
AS
RETURN
(
    SELECT 
        T.TaskID,
        T.Title,
        T.Description,
        T.Status,
        T.RequiredSkillID,
        L.Address AS LocationAddress
    FROM 
        Task T
    INNER JOIN 
        Location L ON T.LocationID = L.LocationID
    WHERE 
        T.Status = @Status
);

SELECT * FROM GetTasksByStatus('In Progress');

CREATE VIEW ViewLocationDetails AS
SELECT 
    L.LocationID,
    L.Address,
    C.Name AS CommunityName
FROM 
    Location L
INNER JOIN 
    Community C ON L.CommunityID = C.CommunityID;

SELECT * FROM ViewLocationDetails;

CREATE PROCEDURE assigntasktouser 
  @taskid INT, 
  @userid INT 
AS 
BEGIN 
    BEGIN TRY
        BEGIN TRANSACTION;

        IF EXISTS (SELECT 1 FROM task WHERE taskid = @taskid AND status = 'pending')
        BEGIN
            INSERT INTO schedule (taskid, volunteeruserid, date, time)
            VALUES (@taskid, @userid, CAST(GETDATE() AS DATE), CAST(GETDATE() AS TIME));

            UPDATE task 
            SET status = 'in progress' 
            WHERE taskid = @taskid;

            PRINT 'task successfully assigned.';
        END
        ELSE
        BEGIN
            PRINT 'task is not in pending status or does not exist.';
        END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        PRINT 'Error: ' + ERROR_MESSAGE();
    END CATCH
END;
GO


EXEC assigntasktouser
    @taskid = 11,
    @userid = 10;

create function getfeedbackbytask(@taskid int)
returns table
as
return
(
    select 
        f.feedbackid,
        f.ratingreview,
        u.username
    from 
        feedback f
    inner join 
        useraccount u on f.userid = u.userid
    where 
        f.taskid = @taskid
);
SELECT * from getfeedbackbytask(1);

create function getuserinfo(@userid int)
returns table
as
return
(
    select 
        u.userid,
        u.username,
        u.email,
        s.skill as skillname,
        p.phone,
        p.address,
        l.address as locationaddress,
        c.name as communityname
    from 
        useraccount u
    left join 
        user_skill us on u.userid = us.userid
    left join 
        skill s on us.skillid = s.skillid
    left join 
        profile p on u.userid = p.userid
    left join 
        location l on p.address = l.address
    left join 
        community c on l.communityid = c.communityid
    where 
        u.userid = @userid
);

SELECT * from getuserinfo(1);

CREATE PROCEDURE UpdateTaskStatus 
    @TaskID INT, 
    @NewStatus VARCHAR(50) 
AS 
BEGIN 
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE Task 
        SET Status = @NewStatus 
        WHERE TaskID = @TaskID;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        THROW;
    END CATCH
END;
GO



EXEC UpdateTaskStatus @TaskID = 2, @NewStatus = 'Completed';

CREATE PROCEDURE AssignVolunteer 
    @VolunteerUserID INT, 
    @TaskID INT, 
    @Date DATE, 
    @Time TIME 
AS 
BEGIN 
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO Schedule (VolunteerUserID, TaskID, Date, Time) 
        VALUES (@VolunteerUserID, @TaskID, @Date, @Time);

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        THROW;
    END CATCH
END;
GO


EXEC AssignVolunteer @VolunteerUserID = 4, @TaskID = 5, @Date = '2025-04-01', @Time = '14:00:00';


CREATE PROCEDURE DeleteTask
    @TaskID INT,             -- Input parameter: ID of the task to delete
    @Success BIT OUTPUT,     -- Output parameter: Indicates success (1) or failure (0)
    @ErrorMessage NVARCHAR(4000) OUTPUT -- Output parameter: Error message if any
AS
BEGIN
    BEGIN TRY
        -- Start a transaction
        BEGIN TRANSACTION;

        -- Delete records from Feedback table where TaskID matches
        DELETE FROM Feedback
        WHERE TaskID = @TaskID;

        -- Delete records from Schedule table where TaskID matches
        DELETE FROM Schedule
        WHERE TaskID = @TaskID;

        -- Delete records from Notification table where TaskID matches
        DELETE FROM Notification
        WHERE TaskID = @TaskID;

        -- Delete the task itself from the Task table
        DELETE FROM Task
        WHERE TaskID = @TaskID;

        -- If everything is successful, commit the transaction
        COMMIT TRANSACTION;

        -- Set output parameters for success
        SET @Success = 1;
        SET @ErrorMessage = NULL;
    END TRY
    BEGIN CATCH
        -- Rollback the transaction in case of an error
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        -- Capture the error message and set output parameters for failure
        SET @Success = 0;
        SET @ErrorMessage = ERROR_MESSAGE();
    END CATCH;
END;


DECLARE @Success BIT;
DECLARE @ErrorMessage NVARCHAR(4000);

EXEC DeleteTask 
    @TaskID = 1, 
    @Success = @Success OUTPUT, 
    @ErrorMessage = @ErrorMessage OUTPUT;

IF (@Success = 1)
    PRINT 'Task and associated records deleted successfully.';
ELSE
    PRINT 'Error occurred: ' + @ErrorMessage;


SELECT * FROM Task;



