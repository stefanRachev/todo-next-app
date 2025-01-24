import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto w-full text-sm">
      <div className="container mx-auto px-4 flex flex-col items-center space-y-2 md:flex-row md:justify-between md:space-y-0">
        <div className="flex flex-wrap justify-center md:justify-start space-x-4">
          <Link href="/terms" className="hover:underline">
            Условия за ползване
          </Link>
          <Link href="/privacy-policy" className="hover:underline">
            Политика за поверителност
          </Link>
          <Link href="/contact" className="hover:underline">
            Контакт
          </Link>
        </div>
        <div className="text-center text-gray-400 mt-2 md:mt-0">
          © {new Date().getFullYear()} Всички права запазени.
        </div>
      </div>
    </footer>
  );
}


export default Footer;

