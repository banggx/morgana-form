-- Add archiveStatus and archiveMetadata columns to form table
ALTER TABLE form
ADD COLUMN archive_status VARCHAR(32) DEFAULT 'PENDING',
ADD COLUMN archive_metadata JSONB DEFAULT '{}'::jsonb;

-- Create index for query performance on archive_status
CREATE INDEX idx_form_archive_status ON form(archive_status);