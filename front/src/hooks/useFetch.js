export async function useFetchGet(endpoint) {
  const response = await fetch(import.meta.env.VITE_API_URL + endpoint);
  if (!response.ok) {
    throw new Error('Error en la petición');
  }

  return await response.json();
}

export async function useFetchPost(endpoint, data) {
  const response = await fetch(import.meta.env.VITE_API_URL + endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error en la petición');
  }

  return await response.json();
}