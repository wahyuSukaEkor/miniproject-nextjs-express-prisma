import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6 text-center">
        Ups! Sepertinya halaman yang kamu cari tidak ditemukan.
      </p>
      <Link legacyBehavior href="/">
        <a className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg">
          Kembali ke Halaman Beranda
        </a>
      </Link>
    </div>
  );
};

export default NotFoundPage;
