-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own user record
CREATE POLICY "Users can view their own profile"
  ON users
  FOR SELECT
  USING (id = auth.uid());

-- Allow users to update their own record (optional)
CREATE POLICY "Users can update their own profile"
  ON users
  FOR UPDATE
  USING (id = auth.uid());

-- GRANTS
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT, UPDATE ON users TO authenticated;
