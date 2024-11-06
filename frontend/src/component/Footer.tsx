const Footer = () => {
  return (
    <div className="bg-blue-800 py-10 p-6">
      <div className="container mx-auto md:flex justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          MernHoliday.com
        </span>
        <span className="text-white font-bold tracking-tighter md:flex gap-8">
          <p className="cursor-pointer text-xl">Privacy Policy</p>
          <p className="cursor-pointer text-xl">Terms of Service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
