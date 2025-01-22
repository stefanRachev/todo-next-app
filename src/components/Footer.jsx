import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto w-full">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-6 justify-start md:justify-center">
          <Link href="/terms" className="block py-2 px-4 hover:underline">
            Условия за ползване
          </Link>
          <Link
            href="/privacy-policy"
            className="block py-2 px-4 hover:underline mt-2 md:mt-0"
          >
            Политика за поверителност
          </Link>
          <Link
            href="/contact"
            className="block py-2 px-4 hover:underline mt-2 md:mt-0"
          >
            Контакт
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

