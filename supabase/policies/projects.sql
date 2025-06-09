-- Enable RLS on the projects table
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own projects
CREATE POLICY "Users can view their own projects"
  ON projects
  FOR SELECT
  USING ("ownerId" = auth.uid());

-- Allow users to insert projects with themselves as owner
CREATE POLICY "Users can create their own projects"
  ON projects
  FOR INSERT
  WITH CHECK ("ownerId" = auth.uid());

-- Allow users to update their own projects
CREATE POLICY "Users can update their own projects"
  ON projects
  FOR UPDATE
  USING ("ownerId" = auth.uid());

-- GRANTS for the authenticated role
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT, INSERT, UPDATE ON projects TO authenticated;