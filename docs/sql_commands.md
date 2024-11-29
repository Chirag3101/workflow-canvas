# SQLite Database Commands Playbook

## Basic Queries

### View Data
```sql
-- View all workflows
SELECT * FROM workflows;

-- View specific columns
SELECT id, title, created_at FROM workflows;

-- Count total workflows
SELECT COUNT(*) as total FROM workflows;

-- Get most recent workflows
SELECT * FROM workflows 
ORDER BY created_at DESC 
LIMIT 5;
```

### Search Data
```sql
-- Search by title
SELECT * FROM workflows 
WHERE title LIKE '%search_term%';

-- Find workflows by date
SELECT * FROM workflows 
WHERE date(created_at) = date('now');

-- Complex search
SELECT * FROM workflows 
WHERE title LIKE '%Project%'
AND created_at > datetime('now', '-7 days');
```

## Modifying Data

### Insert Data
```sql
-- Insert single workflow
INSERT INTO workflows (title, content) 
VALUES ('My Workflow', 'Content here');

-- Insert multiple workflows
INSERT INTO workflows (title, content) VALUES 
    ('Workflow 1', 'Content 1'),
    ('Workflow 2', 'Content 2');
```

### Update Data
```sql
-- Update single workflow
UPDATE workflows 
SET title = 'New Title' 
WHERE id = 1;

-- Update multiple fields
UPDATE workflows 
SET title = 'Updated Title',
    content = 'New content',
    updated_at = datetime('now')
WHERE id = 1;

-- Bulk update
UPDATE workflows 
SET title = title || ' (Archived)'
WHERE created_at < date('now', '-30 days');
```

### Delete Data
```sql
-- Delete single workflow
DELETE FROM workflows 
WHERE id = 1;

-- Delete multiple workflows
DELETE FROM workflows 
WHERE title LIKE '%Draft%';

-- Delete all workflows (use with caution!)
DELETE FROM workflows;
```

## Database Management

### Backup and Restore
```sql
-- Create backup table
CREATE TABLE workflows_backup AS 
SELECT * FROM workflows;

-- Restore from backup
INSERT INTO workflows 
SELECT * FROM workflows_backup;

-- Drop backup table
DROP TABLE workflows_backup;
```

### Table Operations
```sql
-- View table schema
.schema workflows

-- Add new column
ALTER TABLE workflows 
ADD COLUMN category TEXT;

-- Create index
CREATE INDEX idx_workflows_title 
ON workflows(title);
```

## Best Practices

1. **Safety First**
   - Always use WHERE clause with UPDATE/DELETE
   - Backup data before major changes
   - Test queries with SELECT first
   - Use transactions for multiple operations

2. **Performance**
   - Use indexes for frequently searched columns
   - Limit result sets when possible
   - Use appropriate data types

3. **Maintenance**
   - Regularly backup database
   - Clean up old/unused data
   - Monitor database size

## Using db_utils.py

1. Start the utility:
```bash
cd backend
python db_utils.py
```

2. Choose options:
   - 1: View all workflows
   - 2: View specific workflow
   - 3: Run custom query
   - 4: Exit

3. For custom queries:
   - Copy any SQL command from above
   - Paste when prompted
   - Review results
