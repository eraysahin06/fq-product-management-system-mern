const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-blue-700 text-white mx-auto h-[60px]">
      <h1 className="border rounded-lg p-2">
        <a href="/">Product Management System</a>
      </h1>
      <ul className="flex gap-5">
        <a className="hover:border rounded-lg p-2" href="/">
          <li>Home</li>
        </a>
        <a className="hover:border rounded-lg p-2" href="/about">
          <li>About</li>
        </a>
        <a className="hover:border rounded-lg p-2" href="/contact">
          <li>Contact</li>
        </a>
      </ul>
    </nav>
  );
};

export default Navbar;
