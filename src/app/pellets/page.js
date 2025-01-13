// src/app/pellets/page.js

import PelletsForm from './components/PelletsForm';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="w-full max-w-4xl px-6 py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-800 mb-8 text-center">
          Въвеждане на пелети за отопление
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Останалите компоненти можеш да добавиш тук ако има */}
          <PelletsForm />
        </div>
      </div>
    </div>
  );
}
