// components/ApiTester.tsx
'use client';

import { useState } from 'react';

var error :any

export default function ApiTester() {
  const [response, setResponse] = useState<string>('');
  
  const testApi = async () => {
    try {
      const res = await fetch('/api/test');
      const data = await res.json();
      setResponse(JSON.stringify(data));
    } catch (error) {
      setResponse('Error: ' + error.message);
    }
  };

  return (
    <div>
      <button 
        onClick={testApi}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Probar API
      </button>
      <div className="mt-4">Respuesta: {response}</div>
    </div>
  );
}