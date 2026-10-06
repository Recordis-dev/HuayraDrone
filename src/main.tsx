import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

function RootApp() {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      setHasError(true);
      setErrorMessage(event.message || 'Excepción no controlada en el cliente');
    };
    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  if (hasError) {
    return (
      <div className="p-10 bg-zinc-950 text-zinc-100 min-h-screen flex flex-col items-center justify-center font-sans">
        <h1 className="text-emerald-400 text-2xl font-bold">Sistema Huayra 2.0 - Diagnóstico</h1>
        <p className="text-zinc-400 text-sm mt-2">Error detectado en navegador:</p>
        <pre className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 text-rose-400 text-xs mt-4 max-w-lg overflow-auto">
          {errorMessage}
        </pre>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2.5 bg-emerald-500 text-zinc-950 text-xs font-bold rounded-xl"
        >
          Reintentar Carga
        </button>
      </div>
    );
  }

  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);
