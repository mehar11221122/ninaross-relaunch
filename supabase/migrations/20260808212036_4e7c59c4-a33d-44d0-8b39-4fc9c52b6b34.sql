create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users can read their own roles"
  on public.user_roles for select to authenticated
  using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

create table public.site_image_overrides (
  slot_id text primary key,
  image_path text not null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.site_image_overrides to anon, authenticated;
grant insert, update, delete on public.site_image_overrides to authenticated;
grant all on public.site_image_overrides to service_role;
alter table public.site_image_overrides enable row level security;

create policy "Anyone can view image overrides"
  on public.site_image_overrides for select to anon, authenticated
  using (true);

create policy "Admins can add image overrides"
  on public.site_image_overrides for insert to authenticated
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can change image overrides"
  on public.site_image_overrides for update to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can remove image overrides"
  on public.site_image_overrides for delete to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger site_image_overrides_updated_at
  before update on public.site_image_overrides
  for each row execute function public.update_updated_at_column();

create policy "Admins can upload site images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'site-images' and public.has_role(auth.uid(), 'admin'));

create policy "Admins can replace site images"
  on storage.objects for update to authenticated
  using (bucket_id = 'site-images' and public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete site images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'site-images' and public.has_role(auth.uid(), 'admin'));