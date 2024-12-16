import { jwtDecode } from 'jwt-decode';


export async function login (data) {

  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(apiUrl + '/api/auth/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error en la petición');
  }

  const {id, nombre, session} = await response.json()

  

  localStorage.setItem('token', JSON.stringify(session.access_token));

  return user = {
        id,
        nombre
    }
};

export function validateToken(token) {
    const decode = jwtDecode(token);
    const currentTime = new Date().getTime() / 1000;
    return decode.exp > currentTime;
  }