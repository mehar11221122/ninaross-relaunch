UPDATE public.site_image_overrides
SET image_path = slot_id || '/webp-v1.webp'
WHERE image_path IS NOT NULL;