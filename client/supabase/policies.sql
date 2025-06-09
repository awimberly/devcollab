-- Enable RLS
ALTER TABLE quicklinks ENABLE ROW LEVEL SECURITY;

-- Select policy
CREATE POLICY "Users can view their own quicklinks"
  ON quicklinks
  FOR SELECT
  USING (auth.uid() = "userId");

-- Insert policy
CREATE POLICY "Users can insert their own quicklinks"
  ON quicklinks
  FOR INSERT
  WITH CHECK (auth.uid() = "userId");

-- Update policy
CREATE POLICY "Users can update their own quicklinks"
  ON quicklinks
  FOR UPDATE
  USING (auth.uid() = "userId");

-- Delete policy
CREATE POLICY "Users can delete their own quicklinks"
  ON quicklinks
  FOR DELETE
  USING (auth.uid() = "userId");

-- Step 1: Ensure the authenticated role can use the schema
GRANT USAGE ON SCHEMA public TO authenticated;

-- Step 2: Grant access to the table
GRANT SELECT, INSERT, UPDATE, DELETE ON quicklinks TO authenticated;
