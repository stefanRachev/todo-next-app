import Link from "next/link";


function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <span>© 2025 MyApp. Всички права запазени.</span>
        <div className="flex space-x-4">
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
      </div>
    </footer>
  );
}

export default Footer;
