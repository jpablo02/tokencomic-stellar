'use client';

import { useState } from 'react';

export default function TokenIdFetcher() {
  const [tokenId, setTokenId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTokenId = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/test');
      const data = await response.json();
      
      if (response.ok) {
        setTokenId(data.tokenId);
      } else {
        setError(data.error || 'Error desconocido');
        console.error('Error del servidor:', data.details);
      }
    } catch (err: any) {
      setError(`Error de conexión: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg max-w-md mx-auto mt-8">
      <button
        onClick={fetchTokenId}
        disabled={loading}
        className={`px-4 py-2 rounded transition-colors ${
          loading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {loading ? 'Consultando...' : 'Obtener último ID'}
      </button>
      
      {tokenId && (
        <div className="mt-4 p-3 bg-green-100 rounded-md">
          <span className="font-mono font-bold">{tokenId}</span>
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
}