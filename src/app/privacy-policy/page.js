const PrivacyPolicy = () => {
    return (
      <div className="bg-white text-gray-800 p-6 md:p-12 max-w-4xl mx-auto my-8 rounded shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Политика за поверителност
        </h1>
        <p className="text-sm md:text-base mb-4">
          Тази политика за поверителност описва как събираме, използваме и
          защитаваме информацията, която предоставяте чрез нашия уебсайт. С
          използването на уебсайта, вие се съгласявате с условията на тази
          политика.
        </p>
        <div className="space-y-6">
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-blue-600 mb-2">
              1. Събиране на информация
            </h2>
            <p className="text-sm md:text-base">
              Ние събираме следната информация, когато използвате уебсайта:
            </p>
            <ul className="list-disc list-inside text-sm md:text-base">
              <li>Имейл адрес при регистрация</li>
              <li>Данни за списъци, задачи и броячи</li>
              <li>IP адреси за статистически цели</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-blue-600 mb-2">
              2. Използване на информацията
            </h2>
            <p className="text-sm md:text-base">
              Събраната информация се използва единствено за следните цели:
            </p>
            <ul className="list-disc list-inside text-sm md:text-base">
              <li>Осигуряване на достъп до платформата</li>
              <li>Съхранение на списъци и задачи</li>
              <li>Подобряване на функционалността на уебсайта</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-blue-600 mb-2">
              3. Защита на информацията
            </h2>
            <p className="text-sm md:text-base">
              Използваме стандартни технологии за защита, като криптиране на токени
              и защита на базата данни. Въпреки това, пълна сигурност не може да
              бъде гарантирана.
            </p>
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-blue-600 mb-2">
              4. Споделяне на информация с трети страни
            </h2>
            <p className="text-sm md:text-base">
              Ние не споделяме вашата информация с трети страни, освен ако това не
              е изисквано от закона.
            </p>
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-blue-600 mb-2">
              5. Вашите права
            </h2>
            <p className="text-sm md:text-base">
              Можете да поискате изтриване на вашия профил и свързаните с него
              данни, като се свържете с нас чрез страницата за контакт.
            </p>
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-blue-600 mb-2">
              6. Промени в политиката
            </h2>
            <p className="text-sm md:text-base">
              Запазваме си правото да променяме тази политика по всяко време.
              Препоръчваме редовно да я преглеждате.
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default PrivacyPolicy;
  