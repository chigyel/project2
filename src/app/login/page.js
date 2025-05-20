'use client';

import { useState } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    // Default credentials
    const defaultUsers = [
      { username: 'chimi', password: 'chimi@2004', role: 'admin' },
      { username: 'user', password: 'user123', role: 'user' }
    ];

    const user = defaultUsers.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify({
        username: user.username,
        role: user.role
      }));
      router.push('/admin');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Layout>
      <div className="container my-5">
        <div className="card login-card shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Sports Fixtures Hub</h2>
            <p className="text-center mb-4">Log in to manage your sports events!</p>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
          </div>
          <div className="card-footer text-center">
            <small className="text-muted">Default Credentials: admin / admin123</small>
          </div>
        </div>
      </div>
    </Layout>
  );
}