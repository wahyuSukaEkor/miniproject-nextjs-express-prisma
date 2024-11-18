const HeroSection = () => {
  return (
    <section className="relative bg-[url('https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp')] bg-cover bg-center text-white py-28">
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="relative container mx-auto text-left px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl sm:text-6xl font-bold mb-4 drop-shadow-md">
        Buat dan Jelajahi <br />
        Acara Sesukamu
      </h1>
      <p className="text-base sm:text-xl mb-6 drop-shadow-md text-justify text-blue-200 font-bold">
        TIKETAKTI – Jelajahi semua acara dalam sekejap
      </p>

      <div className="flex flex-col sm:flex-row">
        <a
          href="/explore"
          className="mb-4 sm:mb-0 sm:mr-3 text-pink bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Lihat Semua Acara
        </a>
      </div>
    </div>
  </section>
  );
};
export default HeroSection;
