export interface PerluniNewsItem {
  id: number;
  title: string;
  body: string;
  media_json: string;
  tags_json: string;
  published_at: string;
  author: {
    full_name: string;
    avatar_url: string;
  };
  instagram_handle: string;
}

export interface PerluniEventItem {
  id: number;
  title: string;
  description: string;
  start_at: string;
  end_at: string;
  location: string;
  cover_url: string;
  category: string;
  rsvp_count: number;
  instagram_handle: string;
}

export const PERLUNI_NEWS: PerluniNewsItem[] = [
  {
    id: 1,
    title: "Dies Natalis ke-66 Unika Atma Jaya & Malam Penganugerahan Alumni Berprestasi PERLUNI UAJ",
    body: "Merayakan 66 tahun kiprah Unika Atma Jaya bagi bangsa. PERLUNI UAJ memberikan penghargaan kepada para alumni inspiratif yang berkontribusi nyata di bidang pengabdian masyarakat, kepemimpinan korporasi, inovasi teknologi, dan kemanusiaan. Acara dimeriahkan orasi ilmiah dan ramah tamah lintas generasi.",
    media_json: JSON.stringify(["https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"]),
    tags_json: JSON.stringify(["@perluni.uaj", "DiesNatalis66", "AlumniBerprestasi", "UAJ"]),
    published_at: "2026-09-12T10:00:00Z",
    author: {
      full_name: "Humas PERLUNI UAJ (@perluni.uaj)",
      avatar_url: "https://api.dicebear.com/7.x/identicon/svg?seed=perluni",
    },
    instagram_handle: "perluni.uaj",
  },
  {
    id: 2,
    title: "Program Beasiswa Abadi Alumni Atma Jaya: Penyaluran Bantuan Kuliah untuk 120 Mahasiswa",
    body: "Melalui dana abadi yang dihimpun alumni dan donatur PERLUNI UAJ, semester ini disalurkan beasiswa pendidikan senilai Rp 600 juta bagi adik-adik mahasiswa aktif berprestasi dari keluarga prasejahtera. Komitmen nyata alumni menjalin akar, membangun karya global.",
    media_json: JSON.stringify(["https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"]),
    tags_json: JSON.stringify(["@perluni.uaj", "BeasiswaAbadi", "PeduliPendidikan", "AtmaJayaCare"]),
    published_at: "2026-09-08T14:30:00Z",
    author: {
      full_name: "Bidang Sosial PERLUNI (@perluni.uaj)",
      avatar_url: "https://api.dicebear.com/7.x/identicon/svg?seed=perluni-care",
    },
    instagram_handle: "perluni.uaj",
  },
  {
    id: 3,
    title: "Pengukuhan Pengurus Komisariat Daerah (Komda) PERLUNI UAJ Jabodetabek & Banten",
    body: "Ketua Umum PERLUNI UAJ resmi mengukuhkan jajaran kepengurusan Komda Jabodetabek & Banten di Kampus 1 Semanggi. Fokus program kerja periode 2026-2029 mencakup penguatan sinergi bisnis alumni, klinik hukum terpadu, serta bursa karir profesional.",
    media_json: JSON.stringify(["https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80"]),
    tags_json: JSON.stringify(["@perluni.uaj", "PelantikanKomda", "SinergiAlumni", "Semanggi"]),
    published_at: "2026-08-30T09:00:00Z",
    author: {
      full_name: "Sekretariat PERLUNI (@perluni.uaj)",
      avatar_url: "https://api.dicebear.com/7.x/identicon/svg?seed=perluni-sekre",
    },
    instagram_handle: "perluni.uaj",
  },
  {
    id: 4,
    title: "Aksi Kemanusiaan PERLUNI Peduli & FKIK Atma Jaya: 350 Kantong Darah Terkumpul",
    body: "Bakti sosial rutin PERLUNI UAJ bekerjasama dengan Rumah Sakit Atma Jaya Pluit dan PMI DKI Jakarta. Selain donor darah, disediakan pos pemeriksaan tensi darah, kolesterol, dan konsultasi kesehatan gratis bagi warga sekitar.",
    media_json: JSON.stringify(["https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80"]),
    tags_json: JSON.stringify(["@perluni.uaj", "PERLUNIPeduli", "BaktiSosial", "FKIKAtmaJaya"]),
    published_at: "2026-08-20T11:15:00Z",
    author: {
      full_name: "PERLUNI Peduli (@perluni.uaj)",
      avatar_url: "https://api.dicebear.com/7.x/identicon/svg?seed=perluni-medis",
    },
    instagram_handle: "perluni.uaj",
  },
  {
    id: 5,
    title: "PERLUNI Business & Tech Forum: Peluncuran Inkubator Startup Alumni di Kampus BSD",
    body: "Mendorong lahirnya unicorn baru dari almamater! PERLUNI UAJ meluncurkan fasilitas inkubasi startup dengan akses seed funding, mentoring langsung dari alumni C-Level unicorn Indonesia, dan co-working space modern di Kampus 3 BSD.",
    media_json: JSON.stringify(["https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80"]),
    tags_json: JSON.stringify(["@perluni.uaj", "TechForum", "InkubatorStartup", "KampusBSD"]),
    published_at: "2026-08-14T16:00:00Z",
    author: {
      full_name: "PERLUNI Tech & Innovators (@perluni.uaj)",
      avatar_url: "https://api.dicebear.com/7.x/identicon/svg?seed=perluni-tech",
    },
    instagram_handle: "perluni.uaj",
  },
];

export const PERLUNI_EVENTS: PerluniEventItem[] = [
  {
    id: 1,
    title: "PERLUNI Charity Golf Tournament 2026: Swing for Education",
    description: "Turnamen golf persahabatan terbesar alumni Atma Jaya dengan total hadiah ratusan juta rupiah dan hadiah Hole-in-One mobil mewah. Seluruh surplus biaya pendaftaran dialokasikan untuk Dana Beasiswa Mahasiswa Unika Atma Jaya.",
    start_at: "2026-10-24T06:30:00Z",
    end_at: "2026-10-24T14:00:00Z",
    location: "Damai Indah Golf, PIK Course, Jakarta Utara",
    cover_url: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80",
    category: "Olahraga & Charity",
    rsvp_count: 144,
    instagram_handle: "perluni.uaj",
  },
  {
    id: 2,
    title: "Atma Jaya Fun Run 2026: 5K & 10K 'Lari Sehat Merajut Sinergi'",
    description: "Ajang lari santai keluarga besar alumni, dosen, mahasiswa, dan masyarakat umum dengan rute hijau asri BSD. Dimeriahkan bazar kuliner UMKM binaan alumni, doorprize gawai terkini, dan hiburan musik bintang tamu.",
    start_at: "2026-11-15T06:00:00Z",
    end_at: "2026-11-15T11:00:00Z",
    location: "Kampus 3 Unika Atma Jaya BSD, Cisauk, Tangerang",
    cover_url: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&q=80",
    category: "Olahraga & Komunitas",
    rsvp_count: 1250,
    instagram_handle: "perluni.uaj",
  },
  {
    id: 3,
    title: "Reuni Akbar & Alumni Homecoming Lintas Fakultas: 'Kembali ke Rumah Kita'",
    description: "Pesta temu kangen akbar puluhan ribu alumni Unika Atma Jaya lintas angkatan dari 1960 hingga 2025. Dilengkapi panggung nostalgia musik, photo booth fakultas, dan gala dinner bersama pimpinan universitas & PERLUNI.",
    start_at: "2026-12-12T15:30:00Z",
    end_at: "2026-12-12T22:00:00Z",
    location: "Sport Hall & Gedung Yustinus, Kampus 1 Semanggi, Jakarta",
    cover_url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80",
    category: "Reuni & Gathering",
    rsvp_count: 2850,
    instagram_handle: "perluni.uaj",
  },
  {
    id: 4,
    title: "Career Mentoring & Exclusive Networking Night: Tech, Legal & Finance",
    description: "Bimbingan karir tatap muka eksklusif bersama 20+ mentor C-Level, Managing Partner Law Firm, dan Bankir senior alumni Atma Jaya. Dapatkan tips kurasi CV, negosiasi kompensasi, dan peluang referral karir langsung.",
    start_at: "2026-10-09T18:30:00Z",
    end_at: "2026-10-09T21:30:00Z",
    location: "Auditorium Gedung Karol Wojtyla, Kampus Semanggi, Jakarta",
    cover_url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
    category: "Karir & Mentoring",
    rsvp_count: 210,
    instagram_handle: "perluni.uaj",
  },
  {
    id: 5,
    title: "Webinar Nasional PERLUNI: 'Menghadapi Era AI & Transformasi Ekonomi Hijau 2026'",
    description: "Diskusi panel strategis menghadirkan regulator pemerintah, ekonom terkemuka, dan pakar teknologi kecerdasan buatan dari ikatan alumni Atma Jaya. Mengupas tantangan disrupsi AI dan prospek ekonomi masa depan.",
    start_at: "2026-09-26T09:00:00Z",
    end_at: "2026-09-26T12:00:00Z",
    location: "Live Virtual via Zoom & YouTube Official PERLUNI UAJ",
    cover_url: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80",
    category: "Webinar & Edukasi",
    rsvp_count: 680,
    instagram_handle: "perluni.uaj",
  },
];
