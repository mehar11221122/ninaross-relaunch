-- Allow admins to upload/replace article MP3s from the CMS.
drop policy if exists "Admins upload article audio" on storage.objects;
create policy "Admins upload article audio"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'article-audio' and public.has_role(auth.uid(), 'admin'));

drop policy if exists "Admins update article audio" on storage.objects;
create policy "Admins update article audio"
  on storage.objects for update to authenticated
  using (bucket_id = 'article-audio' and public.has_role(auth.uid(), 'admin'));

drop policy if exists "Admins delete article audio" on storage.objects;
create policy "Admins delete article audio"
  on storage.objects for delete to authenticated
  using (bucket_id = 'article-audio' and public.has_role(auth.uid(), 'admin'));
