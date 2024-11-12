import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return <>
  <section className="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden">
    <h1 className="text-3xl sm:text-4xl font-bold mb-4 drop-shadow-md text-center pt-4 text-indigo-900">
      Perjalanan Sejarah EkorNime Studio
    </h1>
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
      <div className="flex flex-col justify-center divide-y divide-slate-200 [&>*]:py-10">
        <div className="w-full max-w-3xl mx-auto">
          <div className="-my-6">
            <div className="relative pl-8 sm:pl-32 py-6 group">
              <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">
                  2020
                </time>
                <div className="text-xl font-bold text-slate-900">
                  EkorNime Studio ditemukan di Indonesia, Palembang
                </div>
              </div>
              <div className="text-slate-500 list-disc">
                <li className="text-justify">
                  Mendirikan perusahaan secara resmi
                </li>
                <li className="text-justify">
                  Meluncurkan situs web e-commerce dan akun media sosial
                  untuk membangun basis penggemar.
                </li>
                <li className="text-justify">
                  Mengembangkan dan meluncurkan koleksi pertama figurine
                  animal girl dengan detail dan kualitas yang tinggi.
                </li>
                <li className="text-justify">
                  Berpartisipasi dalam pameran dan konvensi anime untuk
                  memperkenalkan produk ke komunitas penggemar.
                </li>
              </div>
            </div>

            <div className="relative pl-8 sm:pl-32 py-6 group">
              <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">
                  2021
                </time>
                <div className="text-xl font-bold text-slate-900">
                  Pengembangan Produk & Ekspansi Pasar
                </div>
              </div>
              <div className="text-slate-500">
                <li className="text-justify">
                  Meluncurkan figurine baru dengan variasi karakter animal
                  girl yang lebih beragam.
                </li>
                <li className="text-justify">
                  Memperluas jaringan distribusi di seluruh negeri melalui
                  kolaborasi dengan toko-toko hobi dan mitra distribusi
                  lokal.
                </li>
                <li className="text-justify">
                  Memperkenalkan konsep figurine edisi terbatas dan custom
                  untuk menarik kolektor figurine.
                </li>
                <li className="text-justify">
                  Menjalin hubungan dengan komunitas cosplayer dan
                  influencer anime untuk meningkatkan promosi.
                </li>
              </div>
            </div>

            <div className="relative pl-8 sm:pl-32 py-6 group">
              <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">
                  2022
                </time>
                <div className="text-xl font-bold text-slate-900">
                  Inovasi dan Kolaborasi
                </div>
              </div>
              <div className="text-slate-500">
                <li className="text-justify">
                  Berkolaborasi dengan seniman anime dan kreator konten
                  untuk mengembangkan koleksi figurine eksklusif.
                </li>
                <li className="text-justify">
                  Meluncurkan seri figurine dengan fitur interaktif
                  (misalnya, figurine dengan elemen bergerak atau
                  pencahayaan).
                </li>
                <li className="text-justify">
                  Mengadakan acara eksklusif secara online dan offline untuk
                  penggemar dan kolektor.
                </li>
                <li className="text-justify">
                  Mulai merambah pasar internasional dengan strategi ekspor
                  ke negara-negara dengan basis penggemar anime yang kuat.
                </li>
              </div>
            </div>

            <div className="relative pl-8 sm:pl-32 py-6 group">
              <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">
                  2023
                </time>
                <div className="text-xl font-bold text-slate-900">
                  Diversifikasi Produk
                </div>
              </div>
              <div className="text-slate-500">
                <li className="text-justify">
                  Meluncurkan merchandise tambahan seperti pakaian,
                  aksesoris, dan poster bertema karakter animal girl.
                </li>
                <li className="text-justify">
                  Mengembangkan sub-brand atau koleksi figurine bertema
                  fantasi lainnya, seperti karakter monster atau peri.
                </li>
                <li className="text-justify">
                  Memperkuat kehadiran di platform e-commerce internasional
                  seperti Amazon dan Etsy.
                </li>
                <li className="text-justify">
                  Memperkenalkan program keanggotaan atau eksklusivitas
                  untuk pelanggan setia.
                </li>
              </div>
            </div>

            <div className="relative pl-8 sm:pl-32 py-6 group">
              <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">
                  2024
                </time>
                <div className="text-xl font-bold text-slate-900">
                  Pemantapan Brand di Kancah Internasional
                </div>
              </div>
              <div className="text-slate-500">
                <li className="text-justify">
                  Memperluas operasi ke pasar internasional dengan
                  mendirikan cabang atau distribusi di negara-negara kunci
                  seperti Jepang, Amerika Serikat, dan Eropa.
                </li>
                <li className="text-justify">
                  Menjalin kolaborasi dengan perusahaan anime besar untuk
                  menciptakan figurine dari karakter-karakter anime populer.
                </li>
                <li className="text-justify">
                  Meningkatkan skala produksi untuk memenuhi permintaan
                  global, tanpa mengorbankan kualitas produk.
                </li>
                <li className="text-justify">
                  Menjadi sponsor atau peserta utama dalam acara dan
                  konvensi anime internasional seperti Anime Expo dan
                  Comic-Con.
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* <CardRandom></CardRandom> */}

  <div className="min-h-screen bg-slate-50 flex flex-col items-center py-8 px-4 overflow-hidden">
    <div className="max-w-4xl w-full text-center">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">
        Kultur dan Nilai di EkorNime Studio
      </h1>
      <p className="text-lg text-gray-700 mb-4 text-justify indent-8">
        EkorNime Studio adalah perusahaan yang mengedepankan kreativitas,
        passion, dan komitmen dalam setiap aspek bisnisnya. Budaya kerja
        kami berfokus pada kolaborasi, inovasi, dan semangat cinta terhadap
        anime, ekor dan seni figurine.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Kultur Perusahaan
        </h2>
        <p className="text-left text-gray-700 mb-4">
          <strong>Kreativitas Tanpa Batas:</strong> Kami menghargai setiap
          ide dan mendorong karyawan untuk berpikir out of the box.
          Kreativitas adalah inti dari setiap langkah kami.
        </p>
        <p className="text-left text-gray-700 mb-4">
          <strong>Kolaborasi dan Komunitas:</strong> Kami bekerja seperti
          komunitas penggemar anime yang saling mendukung untuk mencapai
          tujuan bersama.
        </p>
        <p className="text-left text-gray-700 mb-4">
          <strong>Lingkungan Inklusif dan Ramah:</strong> Kami bangga
          menciptakan lingkungan yang inklusif dan ramah, di mana perbedaan
          dihargai dan keseimbangan kerja-kehidupan pribadi dijaga.
        </p>
        <p className="text-left text-gray-700 mb-4">
          <strong>Kualitas dan Detail di Setiap Langkah:</strong> Kualitas
          adalah nilai utama kami, dan kami menjaga standar tertinggi dalam
          setiap proses.
        </p>
        <p className="text-left text-gray-700">
          <strong>Cinta terhadap Anime dan Penggemarnya:</strong> Kami
          mendengarkan umpan balik dari komunitas anime dan terlibat aktif
          dalam acara serta diskusi untuk memahami kebutuhan penggemar.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Nilai-Nilai Perusahaan
        </h2>
        <p className="text-left text-gray-700 mb-4">
          <strong>Inovasi Berkelanjutan:</strong> Kami terus menciptakan
          produk baru dan mendorong batas kreativitas.
        </p>
        <p className="text-left text-gray-700 mb-4">
          <strong>Keunggulan dalam Kualitas:</strong> Kami berkomitmen untuk
          memberikan produk dan layanan berkualitas tinggi.
        </p>
        <p className="text-left text-gray-700 mb-4">
          <strong>Fokus pada Pelanggan:</strong> Kepuasan pelanggan adalah
          prioritas utama kami.
        </p>
        <p className="text-left text-gray-700">
          <strong>Kesetaraan dan Rasa Hormat:</strong> Kami menghargai
          setiap anggota tim dan memperlakukan satu sama lain dengan hormat.
        </p>
      </section>
    </div>
  </div>
</>;
}
