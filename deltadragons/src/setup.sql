-- Run this once in Supabase: Dashboard > SQL Editor

-- The content your team edits (rename/extend columns to fit your data)
create table items (
  id bigint generated always as identity primary key,
  name text not null,
  description text default ''
);

-- Who counts as a team member (add rows via Dashboard > Table Editor)
create table team_members (
  user_id uuid primary key references auth.users(id)
);

alter table items enable row level security;
alter table team_members enable row level security;

-- Team members can only see their own row (used by the policies below)
create policy "see own membership" on team_members
  for select using (auth.uid() = user_id);

-- Everyone (the public site) can read items
create policy "public read" on items
  for select using (true);

-- Only team members can add, edit, or delete
create policy "team write" on items
  for all
  using (exists (select 1 from team_members where user_id = auth.uid()))
  with check (exists (select 1 from team_members where user_id = auth.uid()));


-- ===== Events (run this part to add events) =====
create table events (
  id bigint generated always as identity primary key,
  title text not null,
  event_date date not null,
  event_time text default '',      -- free text, e.g. "6:00 PM"
  location text default '',
  description text default ''
);

alter table events enable row level security;

create policy "public read events" on events
  for select using (true);

create policy "team write events" on events
  for all
  using (exists (select 1 from team_members where user_id = auth.uid()))
  with check (exists (select 1 from team_members where user_id = auth.uid()));