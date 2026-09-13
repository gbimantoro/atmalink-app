-- seed.sql (run on local/dev only)
INSERT OR IGNORE INTO alumni (nim, email, full_name, grad_year, faculty, major, membership_tier) VALUES
('199001','alice@example.com','Alice Wijaya',1990,'Fakultas Ekonomi','Manajemen','atma_key'),
('199002','bob@example.com','Bob Santoso',1991,'Fakultas Teknik','Informatika','free'),
('199003','carol@example.com','Carol Lim',1992,'Fakultas Hukum','Hukum','free');

INSERT OR IGNORE INTO posts (author_id, title, body, tags_json, visibility) VALUES
(1,'Selamat Datang di Komunitas Alumni','Ini adalah post pertama. Selamat bergabung!','["pengumuman"]','alumni'),
(2,'Event Reunion 2025','Kami akan mengadakan reunion tahunan.','["event","reunion"]','public');

INSERT OR IGNORE INTO events (organizer_id, title, description, start_at, end_at, location, cover_url) VALUES
(1,'PERLUNI Charity Golf Tournament 2026','Turnamen golf amal tahunan alumni Atma Jaya di PIK Course.','2026-10-18 06:30','2026-10-18 14:00','Damai Indah Golf, PIK','https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800'),
(1,'Atma Jaya Fun Run 5K & 10K 2026','Lari santai bersama ribuan sivitas akademika dan alumni.','2026-11-08 05:30','2026-11-08 10:30','Kampus 3 BSD City','https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800'),
(2,'Reuni Akbar & Alumni Homecoming Day','Temu kangen lintas generasi seluruh fakultas Unika Atma Jaya.','2026-11-28 09:00','2026-11-28 17:00','Kampus Semanggi, Jakarta','https://images.unsplash.com/photo-1511578314322-379afb476865?w=800');

INSERT OR IGNORE INTO companies (name, logo_url, verified, mou_url) VALUES
('PT Techindo','https://example.com/logo1.png',1,'https://example.com/mou1.pdf'),
('Bank Central Asia (BCA)','https://example.com/bca.png',1,'https://example.com/bca.pdf');

INSERT OR IGNORE INTO jobs (company_id, title, description, requirements, location, salary_min, salary_max, status) VALUES
(1,'Senior Backend Engineer','Bangun sistem skala besar','Go, Cloudflare Workers, D1','Jakarta',15000000,25000000,'published'),
(2,'Product Manager - Digital Banking','Pimpin inovasi produk digital untuk jutaan nasabah','Fintech, Agile, Leadership','Jakarta Pusat',20000000,35000000,'published');

INSERT OR IGNORE INTO campaigns (title, goal_amount, banner_url) VALUES
('Bangun Gedung Alumni & Heritage Center',500000000,'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800'),
('Dana Abadi Beasiswa Mahasiswa Berprestasi',300000000,'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800');

INSERT OR IGNORE INTO banners (image_url, link_url, placement, priority, start_at, end_at) VALUES
('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800','https://devatmalink.perluniuaj.org/donate','home',10,'2026-01-01','2027-12-31');