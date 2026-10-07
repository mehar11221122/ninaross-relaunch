-- CMS documents for blog articles (overrides static JSON when present).
create table if not exists public.blog_articles (
  slug text primary key,
  document jsonb not null,
  status text not null default 'published'
    check (status in ('draft', 'published')),
  updated_at timestamptz not null default now(),
  updated_by uuid null
);

grant select on public.blog_articles to anon, authenticated;
grant insert, update, delete on public.blog_articles to authenticated;
grant all on public.blog_articles to service_role;

alter table public.blog_articles enable row level security;

drop policy if exists "Anyone can read published blog articles" on public.blog_articles;
create policy "Anyone can read published blog articles"
  on public.blog_articles for select to anon, authenticated
  using (status = 'published');

drop policy if exists "Admins manage blog articles" on public.blog_articles;
create policy "Admins manage blog articles"
  on public.blog_articles for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));
