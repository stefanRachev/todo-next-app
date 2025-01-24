export default function ContactPage() {
  return (
    <section className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Свържете се с мен</h2>
        <p>
          Ако имате въпроси или предложения, не се колебайте да се свържете:
        </p>
        <ul className="mt-4">
          <li>
            Email:{" "}
            <a
              href="mailto:yourname.projects@gmail.com"
              className="text-blue-400 underline"
            >
              starfystef@gmail.com
            </a>
          </li>
          <li>
            GitHub:{" "}
            <a
              href="https://github.com/stefanRachev"
              target="_blank"
              className="text-blue-400 underline"
            >
              https://github.com/stefanRachev
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
