-- 1. Index on User Email (for quick user lookups during login)
CREATE NONCLUSTERED INDEX IX_UserAccount_Email
ON UserAccount (Email);

-- 2. Index on Task CreatorUserID (to speed up queries finding tasks by user)
CREATE NONCLUSTERED INDEX IX_Task_CreatorUser
ON Task (CreatorUserID);

-- 3. Index on Notification TaskID (for efficient lookups when fetching notifications related to tasks)
CREATE NONCLUSTERED INDEX IX_Notification_TaskID
ON Notification (TaskID);

-- 4. Index on Schedule VolunteerUserID (to quickly find volunteer activities per user)
CREATE NONCLUSTERED INDEX IX_Schedule_VolunteerUser
ON Schedule (VolunteerUserID);

-- 5. Index on SenderID and ReceiverID for faster message retrieval
CREATE NONCLUSTERED INDEX IX_Message_Sender_Receiver
ON Message (SenderID, ReceiverID);
