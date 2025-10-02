import { useState } from 'react';
import { useCallback } from 'react';
import './App.css'

function App() {
  async function login(email: string, password: string) {
      const response = await fetch('/auth/api/v1/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // если нужны cookie-сессии:
      // credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
  
    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(`Login failed: ${response.status} ${errText}`);
    }
  
    return response.json();
  }
  
  // async function getProfile() {
  //   const response = await fetch('/auth/api/v1/login', {
  //     method: 'GET',
  //     // credentials: 'include',
  //   });
  
  //   if (!response.ok) throw new Error('Failed to load profile');
  //   return response.json();
  // }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, [])

  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, [])
  return (
    <>
      <div>
        <input type="email" placeholder="Email" onChange={onChangeEmail}/>
        <input type="password" placeholder="Password"  onChange={onChangePassword}/>
        <button onClick={() => login(email, password)}>Login</button>
        {/* <button onClick={() => getProfile()}>Get Profile</button> */}
      </div>
    </>
  )
}

export default App
