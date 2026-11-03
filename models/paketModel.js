// Data pricelist paket jasa fotografi & videografi
// Hardcode sementara, nanti diganti query database
const daftarPaket = [
  {
    id: 1,
    nama: 'Paket Wisuda Hemat',
    kategori: 'Wisuda',
    deskripsi: 'Cocok untuk mahasiswa yang ingin kenangan wisuda berkualitas dengan budget terjangkau.',
    harga: 850000,
    durasi: '3 Jam',
    cakupan: [
      '1 Fotografer',
      'Semua file digital (50+ foto edit)',
      'Album digital (Google Drive)',
      'Properti topi & toga wisuda',
      'Background polos/standar'
    ],
    tidakTermasuk: ['Videografi', 'Print fisik', 'Makeup & Hairstyling'],
    populer: false,
    urutan: 1
  },
  {
    id: 2,
    nama: 'Paket Wisuda Lengkap',
    kategori: 'Wisuda',
    deskripsi: 'Paket paling populer untuk wisuda, mencakup foto + video singkat momen spesial.',
    harga: 1500000,
    durasi: '4 Jam',
    cakupan: [
      '1 Fotografer + 1 Videografer',
      'Semua file digital (80+ foto edit + 1 menit video highlight)',
      'Album digital + Link download video',
      'Properti topi & toga wisuda',
      'Background studio / outdoor pilihan',
      'Bantu pose & arahan ekspresi'
    ],
    tidakTermasuk: ['Print fisik', 'Makeup & Hairstyling', 'Drone'],
    populer: true,
    urutan: 2
  },
  {
    id: 3,
    nama: 'Paket Wisuda Premium',
    kategori: 'Wisuda',
    deskripsi: 'Paket premium dengan durasi penuh hari, multiple location, dan hasil cetak fisik.',
    harga: 2800000,
    durasi: 'Full Day (8 Jam)',
    cakupan: [
      '2 Fotografer + 1 Videografer',
      'Unlimited foto edit (150+) + Video cinematic 3-5 menit',
      'Album digital + 1 Photobook A4 (30 halaman) + 10 print 4R',
      'Properti lengkap + aksesoris tambahan',
      'Multiple location (kampus + outdoor favorit)',
      'Drone aerial shot (jika lokasi memungkinkan)',
      'Makeup & Hairstyling 1 orang'
    ],
    tidakTermasuk: ['Transport & konsumsi tim ke luar kota'],
    populer: false,
    urutan: 3
  },
  {
    id: 4,
    nama: 'Paket Prewedding Essentials',
    kategori: 'Prewedding',
    deskripsi: 'Paket dasar prewedding untuk pasangan yang ingin sesi ringan di satu lokasi favorit.',
    harga: 2200000,
    durasi: '4 Jam',
    cakupan: [
      '1 Fotografer + 1 Videografer',
      'Semua file digital (100+ foto edit + 1 menit video highlight)',
      'Album digital + Link download',
      'Satu lokasi outdoor (pantai/hutan/kawadasan)',
      'Bantu pose & arahan alur cerita',
      'Property ringan (payung, blanket, dll)'
    ],
    tidakTermasuk: ['Makeup & Hairstyling', 'Wardrobe/ganti pakaian', 'Drone', 'Print fisik'],
    populer: true,
    urutan: 4
  },
  {
    id: 5,
    nama: 'Paket Prewedding Cinematic',
    kategori: 'Prewedding',
    deskripsi: 'Paket prewedding premium dengan multiple outfit, lokasi, dan video cinematic kualitas film.',
    harga: 4500000,
    durasi: 'Full Day (10 Jam)',
    cakupan: [
      '2 Fotografer + 2 Videografer',
      'Unlimited foto edit (200+) + Video cinematic 5-8 menit + Teaser 30 detik',
      'Album digital + 1 Photobook Premium A3 (40 halaman) + 20 print 4R',
      '3 Lokasi berbeda (indoor + outdoor + sunset)',
      'Drone aerial shot',
      'Makeup & Hairstyling 1 orang (termasuk retouch)',
      'Wardrobe assistant & property lengkap',
      'Same-day edit slideshow (untuk resepsi/acara)'
    ],
    tidakTermasuk: ['Transport & konsumsi tim ke luar kota', 'Izin lokasi berbayar'],
    populer: false,
    urutan: 5
  },
  {
    id: 6,
    nama: 'Paket Wedding Hemat (Akad Only)',
    kategori: 'Wedding',
    deskripsi: 'Paket khusus untuk dokumentasi acara akad nikah saja, ringkas dan terjangkau.',
    harga: 1800000,
    durasi: '3 Jam',
    cakupan: [
      '1 Fotografer + 1 Videografer',
      'Semua file digital (80+ foto edit + Video akad 10-15 menit)',
      'Album digital + Link download',
      'Dokumentasi momen: persiapan, akad, foto keluarga, foto rombongan',
      'Bantu arahan pose keluarga & rombongan'
    ],
    tidakTermasuk: ['Resepsi', 'Makeup & Hairstyling', 'Drone', 'Print fisik', 'Photobook'],
    populer: false,
    urutan: 6
  },
  {
    id: 7,
    nama: 'Paket Wedding Standar (Akad + Resepsi)',
    kategori: 'Wedding',
    deskripsi: 'Paket lengkap akad hingga resepsi, paling diminati untuk pernikahan standar.',
    harga: 4000000,
    durasi: '8 Jam',
    cakupan: [
      '2 Fotografer + 1 Videografer',
      'Semua file digital (200+ foto edit + Video highlight 5 menit + Video full akad 20 menit)',
      'Album digital + 1 Photobook A4 (40 halaman) + 15 print 4R',
      'Dokumentasi penuh: persiapan, akad, resepsi, foto keluarga, tamu, detail dekor',
      'Drone aerial shot (jika venue outdoor)',
      'Same-day edit slideshow (tayang di resepsi)'
    ],
    tidakTermasuk: ['Makeup & Hairstyling', 'Print tambahan', 'Izin venue berbayar'],
    populer: true,
    urutan: 7
  },
  {
    id: 8,
    nama: 'Paket Wedding Premium Full Coverage',
    kategori: 'Wedding',
    deskripsi: 'Paket premium all-in untuk pernikahan mewah dengan tim besar dan hasil cetak premium.',
    harga: 8500000,
    durasi: 'Full Day (12 Jam)',
    cakupan: [
      '3 Fotografer + 2 Videografer + 1 Drone Operator',
      'Unlimited foto edit (400+) + Video cinematic 8-10 menit + Video full event 45 menit + Teaser 1 menit',
      'Album digital + 2 Photobook Premium (A3 50 halaman + A4 40 halaman) + 30 print 4R + 5 print 8R',
      'Dokumentasi komprehensif: getting ready, akad, resepsi, after party, detail detail',
      'Drone 4K aerial cinematography',
      'Makeup & Hairstyling 2 orang (bride & groom) dengan retouch',
      'Live streaming ke YouTube/Zoom (opsional)',
      'Same-day edit video highlight (tayang di resepsi)',
      'Wedding box kemasan premium'
    ],
    tidakTermasuk: ['Transport & akomodasi tim ke luar kota', 'Izin venue berbayar'],
    populer: false,
    urutan: 8
  },
  {
    id: 9,
    nama: 'Add-on: Videografi Tambahan',
    kategori: 'Add-on',
    deskripsi: 'Tambahan jasa videografer untuk paket yang hanya menyertakan fotografer.',
    harga: 750000,
    durasi: 'Sesuai durasi paket utama',
    cakupan: [
      '1 Videografer profesional',
      'Video highlight 1-3 menit',
      'File digital via link download'
    ],
    tidakTermasuk: ['Drone', 'Video full event', 'Same-day edit'],
    populer: false,
    urutan: 9
  },
  {
    id: 10,
    nama: 'Add-on: Drone Aerial Shot',
    kategori: 'Add-on',
    deskripsi: 'Tambahan pengambilan gambar udara dengan drone lisensi untuk perspektif unik.',
    harga: 500000,
    durasi: '30-45 menit terbang',
    cakupan: [
      '1 Drone Operator bersertifikat',
      'Foto & video aerial 4K',
      'File digital RAW + edit'
    ],
    tidakTermasuk: ['Izin terbang area terbatas', 'Asuransi drone'],
    populer: false,
    urutan: 10
  },
  {
    id: 11,
    nama: 'Add-on: Makeup & Hairstyling',
    kategori: 'Add-on',
    deskripsi: 'Jasa makeup artist profesional untuk tampilan maksimal di hari spesial Anda.',
    harga: 600000,
    durasi: '2-3 Jam',
    cakupan: [
      '1 Makeup Artist berpengalaman',
      'Makeup tahan lama (waterproof/sweatproof)',
      'Hairstyling sesuai konsep',
      'Retouch saat sesi (1 kali)'
    ],
    tidakTermasuk: ['Perawatan kulit sebelum hari H', 'Ganti makeup kedua kali'],
    populer: false,
    urutan: 11
  },
  {
    id: 12,
    nama: 'Add-on: Photobook & Print Fisik',
    kategori: 'Add-on',
    deskripsi: 'Cetak hasil foto ke dalam photobook premium atau print berkualitas tinggi.',
    harga: 350000,
    durasi: 'Dikirim 2-3 minggu setelah event',
    cakupan: [
      'Photobook Hardcover A4 30 halaman (atau setara nilai print)',
      'Kertas fotografi premium (Luster/Matte)',
      'Kotak kemasan magnet premium',
      'Pengiriman ke alamat (area Jabodetabek gratis)'
    ],
    tidakTermasuk: ['Desain ulang layout (sudah include di paket yg ada photobook)'],
    populer: false,
    urutan: 12
  }
];

const PaketModel = {
  getAll(filter = {}) {
    let result = [...daftarPaket].sort((a, b) => a.urutan - b.urutan);

    // Filter berdasarkan kategori jika ada (GET query)
    if (filter.kategori && filter.kategori !== 'Semua') {
      result = result.filter(item => item.kategori.toLowerCase() === filter.kategori.toLowerCase());
    }

    // Filter berdasarkan pencarian keyword nama/deskripsi jika ada (GET query)
    if (filter.search) {
      const keyword = filter.search.toLowerCase();
      result = result.filter(item => 
        item.nama.toLowerCase().includes(keyword) || 
        item.deskripsi.toLowerCase().includes(keyword) ||
        item.kategori.toLowerCase().includes(keyword)
      );
    }

    return result;
  },

  getById(id) {
    return daftarPaket.find(item => item.id === parseInt(id));
  },

  getCategories() {
    const categories = ['Semua', ...new Set(daftarPaket.map(item => item.kategori))];
    return categories;
  },

  getKategoriUtama() {
    // Hanya kategori utama (bukan Add-on) untuk navigasi utama
    const mainCategories = ['Wisuda', 'Prewedding', 'Wedding'];
    return mainCategories;
  }
};

module.exports = PaketModel;