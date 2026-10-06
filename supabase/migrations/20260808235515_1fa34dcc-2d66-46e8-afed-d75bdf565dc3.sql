ALTER TABLE public.site_image_overrides ALTER COLUMN image_path DROP NOT NULL;
ALTER TABLE public.site_image_overrides ADD COLUMN pos_x real NOT NULL DEFAULT 50;
ALTER TABLE public.site_image_overrides ADD COLUMN pos_y real NOT NULL DEFAULT 50;
ALTER TABLE public.site_image_overrides ADD COLUMN scale real NOT NULL DEFAULT 1;
ALTER TABLE public.site_image_overrides ADD CONSTRAINT site_image_overrides_pos_x_check CHECK (pos_x >= 0 AND pos_x <= 100);
ALTER TABLE public.site_image_overrides ADD CONSTRAINT site_image_overrides_pos_y_check CHECK (pos_y >= 0 AND pos_y <= 100);
ALTER TABLE public.site_image_overrides ADD CONSTRAINT site_image_overrides_scale_check CHECK (scale >= 1 AND scale <= 4);