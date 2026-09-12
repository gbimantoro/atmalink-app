-- seed.sql (run on local/dev only)
INSERT OR IGNORE INTO alumni (nim, email, full_name, grad_year, faculty, major, membership_tier) VALUES
('199001','alice@example.com','Alice Wijaya',1990,'Fakultas Ekonomi','Manajemen','atma_key'),
('199002','bob@example.com','Bob Santoso',1991,'Fakultas Teknik','Informatika','free'),
('199003','carol@example.com','Carol Lim',1992,'Fakultas Hukum','Hukum','free');

INSERT OR IGNORE INTO posts (author_id, title, body, tags_json, visibility) VALUES
(1,'Selamat Datang di Komunitas Alumni','Ini adalah post pertama. Selamat bergabung!','["pengumuman"]','alumni'),
(2,'Event Reunion 2025','Kami akan mengadakan reunion tahunan.','["event","reunion"]','public');

INSERT OR IGNORE INTO events (organizer_id, title, description, start_at, end_at, location, cover_url) VALUES
(1,'Reunion Angkatan 90-92','Reunion akbar alumni angkatan 1990-1992','2025-12-20 18:00','2025-12-20 22:00','Hotel Mulia, Jakarta','https://example.com/cover1.jpg');

INSERT OR IGNORE INTO companies (name, logo_url, verified, mou_url) VALUES
('PT Techindo','https://example.com/logo1.png',1,'https://example.com/mou1.pdf');

INSERT OR IGNORE INTO jobs (company_id, title, description, requirements, location, salary_min, salary_max, status) VALUES
(1,'Senior Backend Engineer','Bangun sistem skala besar','Go, Cloudflare Workers, D1','Jakarta',15000000,25000000,'published');

INSERT OR IGNORE INTO campaigns (title, goal_amount, banner_url) VALUES
('Bangun Gedung Alumni',500000000,'https://example.com/campaign1.jpg');

INSERT OR IGNORE INTO banners (image_url, link_url, placement, priority, start_at, end_at) VALUES
('https://example.com/banner1.jpg','https://perluniuaj.org/donasi','home',10,'2025-01-01','2025-12-31');