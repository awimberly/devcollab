-- Create extension if not already enabled (only runs once)
create extension if not exists "uuid-ossp";

-- Create a function that runs after new users are added to auth.users
create or replace function public.handle_new_user()
returns trigger
language plpgsql
as $$
begin
  insert into public."User" (id, email, name, password)
  values (new.id, new.email, '', '');  -- default name and password can be updated later
  return new;
end;
$$;

-- Create the trigger to run the function on new Supabase Auth user signups
create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();