
-- USERS
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- PRESETS (curated or AI-generated)
create table if not exists presets (
  id text primary key, -- preset-001, ai-029, etc.
  title text,
  description text,
  option_a text not null,
  option_b text not null,
  category text,
  tags text[], -- searchable filter list
  preset_type text check (preset_type in ('personality', 'brand', 'lifestyle', 'fun')) not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- VOTES (user responses to presets)
create table if not exists votes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  preset_id text references presets(id) on delete cascade,
  chosen_option text check (chosen_option in ('A', 'B')) not null,
  was_fun boolean,
  was_meaningful boolean,
  tag_axis text,
  reflection_label text,
  choose_again boolean,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  unique (user_id, preset_id) -- prevent multiple votes
);

-- TRIBE SNAPSHOTS (optional clustering abstraction)
create table if not exists tribe_snapshots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  snapshot jsonb, -- contains cluster name, tags, summary
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- CUSTOM SHOWDOWNS (user-generated)
create table if not exists custom_showdowns (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  option_a text not null,
  option_b text not null,
  description text,
  tags text[],
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- SESSIONS (for onboarding flow / tracking)
create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  current_step int default 0,
  current_preset_id text references presets(id),
  completed boolean default false,
  started_at timestamp with time zone default timezone('utc'::text, now()),
  ended_at timestamp with time zone
);

-- SHOWDOWN EXTENSIONS (added May 20)
alter table showdowns
  add column if not exists option_a_image_url text;

alter table showdowns
  add column if not exists option_b_image_url text;

alter table showdowns
  add column if not exists media_type text default 'text';
