create table public.article_audio (
  slug text primary key,
  text_hash text not null,
  path text not null,
  char_count int not null default 0,
  updated_at timestamptz not null default now()
);
grant select on public.article_audio to anon, authenticated;
grant insert, update, delete on public.article_audio to authenticated;
grant all on public.article_audio to service_role;
alter table public.article_audio enable row level security;
create policy "Anyone can read article audio" on public.article_audio for select to anon, authenticated using (true);
create policy "Admins manage article audio" on public.article_audio for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));