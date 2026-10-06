ALTER TABLE public.site_image_overrides ADD COLUMN IF NOT EXISTS rotation integer NOT NULL DEFAULT 0;
ALTER TABLE public.site_image_overrides DROP CONSTRAINT IF EXISTS site_image_overrides_rotation_check;
ALTER TABLE public.site_image_overrides ADD CONSTRAINT site_image_overrides_rotation_check CHECK (rotation IN (0, 90, 180, 270));