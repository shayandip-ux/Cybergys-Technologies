CREATE TABLE IF NOT EXISTS contact_submissions (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  internal_notes TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS subject TEXT;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new';
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS internal_notes TEXT;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx
  ON contact_submissions (created_at DESC);

CREATE TABLE IF NOT EXISTS app_content (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name VARCHAR(150) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL, password_hash TEXT NOT NULL,
  role VARCHAR(30) NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin','admin','editor')),
  avatar_url TEXT, is_active BOOLEAN DEFAULT TRUE, last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title VARCHAR(255) NOT NULL, subtitle TEXT, description TEXT,
  desktop_image TEXT, mobile_image TEXT, button_text VARCHAR(100), button_url TEXT, secondary_button_text VARCHAR(100), secondary_button_url TEXT,
  placement VARCHAR(100) DEFAULT 'homepage_hero', background_color VARCHAR(50), text_color VARCHAR(50), sort_order INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft','published','archived')), is_active BOOLEAN DEFAULT TRUE,
  start_date TIMESTAMPTZ, end_date TIMESTAMPTZ, seo_title VARCHAR(255), seo_description TEXT,
  created_by UUID REFERENCES admin_users(id) ON DELETE SET NULL, updated_by UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title VARCHAR(255) NOT NULL, slug VARCHAR(255) UNIQUE NOT NULL,
  short_description TEXT, description TEXT, icon TEXT, featured_image TEXT, banner_image TEXT, features JSONB DEFAULT '[]'::JSONB,
  button_text VARCHAR(100), button_url TEXT, sort_order INTEGER DEFAULT 0, is_featured BOOLEAN DEFAULT FALSE, is_active BOOLEAN DEFAULT TRUE,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft','published','archived')), seo_title VARCHAR(255), seo_description TEXT, seo_keywords TEXT,
  created_by UUID REFERENCES admin_users(id) ON DELETE SET NULL, updated_by UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS portfolio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title VARCHAR(255) NOT NULL, slug VARCHAR(255) UNIQUE NOT NULL, category VARCHAR(150),
  short_description TEXT, description TEXT, featured_image TEXT, project_images JSONB DEFAULT '[]'::JSONB, client_name VARCHAR(255), project_url TEXT,
  project_date DATE, project_details JSONB DEFAULT '{}'::JSONB, is_featured BOOLEAN DEFAULT FALSE, is_active BOOLEAN DEFAULT TRUE, sort_order INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft','published','archived')), seo_title VARCHAR(255), seo_description TEXT, seo_keywords TEXT,
  created_by UUID REFERENCES admin_users(id) ON DELETE SET NULL, updated_by UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS technologies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name VARCHAR(150) NOT NULL, slug VARCHAR(150) UNIQUE NOT NULL, category VARCHAR(150), description TEXT,
  logo TEXT, website_url TEXT, sort_order INTEGER DEFAULT 0, is_featured BOOLEAN DEFAULT FALSE, is_active BOOLEAN DEFAULT TRUE,
  status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('draft','published','archived')),
  created_by UUID REFERENCES admin_users(id) ON DELETE SET NULL, updated_by UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name VARCHAR(150) NOT NULL, email VARCHAR(255) NOT NULL, phone VARCHAR(50), company_name VARCHAR(255),
  subject VARCHAR(255), service_interest VARCHAR(255), message TEXT NOT NULL, source_page TEXT, source_url TEXT,
  status VARCHAR(30) DEFAULT 'new' CHECK (status IN ('new','contacted','in_progress','converted','closed','spam')), notes TEXT,
  assigned_to UUID REFERENCES admin_users(id) ON DELETE SET NULL, metadata JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS contacts_created_at_idx ON contacts (created_at DESC);
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), setting_key VARCHAR(150) UNIQUE NOT NULL,
  setting_value JSONB NOT NULL DEFAULT '{}'::JSONB, description TEXT,
  updated_by UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name VARCHAR(150) NOT NULL, slug VARCHAR(180) UNIQUE,
  designation VARCHAR(150), department VARCHAR(150), short_bio TEXT, bio TEXT, profile_image TEXT, email VARCHAR(255),
  social_links JSONB DEFAULT '{}'::JSONB, sort_order INTEGER DEFAULT 0, is_featured BOOLEAN DEFAULT FALSE, is_active BOOLEAN DEFAULT TRUE,
  status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('draft','published','archived')),
  created_by UUID REFERENCES admin_users(id) ON DELETE SET NULL, updated_by UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_teams_status ON teams(status, is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_teams_department ON teams(department);
CREATE INDEX IF NOT EXISTS idx_teams_slug ON teams(slug);
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), page_slug VARCHAR(150) NOT NULL DEFAULT 'home', question TEXT NOT NULL, answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0, status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('draft','published','archived')),
  created_by UUID REFERENCES admin_users(id) ON DELETE SET NULL, updated_by UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_faqs_page_status ON faqs(page_slug, status, sort_order);
