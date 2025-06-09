-- Enable RLS on the tasks table
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Allow users to view tasks if they own the project
CREATE POLICY "Users can view tasks for their own projects"
  ON tasks
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = tasks."projectId"
      AND projects."ownerId" = auth.uid()
    )
  );

-- Allow users to insert tasks into their own projects
CREATE POLICY "Users can insert tasks for their own projects"
  ON tasks
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = tasks."projectId"
      AND projects."ownerId" = auth.uid()
    )
  );

-- Allow users to update tasks for their own projects
CREATE POLICY "Users can update tasks for their own projects"
  ON tasks
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = tasks."projectId"
      AND projects."ownerId" = auth.uid()
    )
  );

-- Allow users to delete tasks for their own projects
CREATE POLICY "Users can delete tasks for their own projects"
  ON tasks
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = tasks."projectId"
      AND projects."ownerId" = auth.uid()
    )
  );

-- GRANTS
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON tasks TO authenticated;
