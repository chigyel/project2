'use client';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { getLoggedInUser } from '../utils/storage';
import { useRouter } from 'next/navigation';
import { isValidUrl } from '../utils/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

export default function ManageLogos() {
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [logos, setLogos] = useState([]);
  const [newLogo, setNewLogo] = useState({
    team: '',
    url: ''
  });

  // Fetch logged-in user and logos from the database
  useEffect(() => {
    const user = getLoggedInUser();
    if (!user || user.role !== 'admin') {
      router.push('/login');
    } else {
      setLoggedInUser(user);
      fetchLogos();
    }
  }, [router]);

  const fetchLogos = async () => {
    const res = await fetch('/api/logos');
    const data = await res.json();
    setLogos(data);
  };

  const handleAddLogo = async (e) => {
    e.preventDefault();

    if (logos.some(logo => logo.team.toLowerCase() === newLogo.team.toLowerCase())) {
      alert('Team name already exists.');
      return;
    }

    if (!isValidUrl(newLogo.url)) {
      alert('Please enter a valid URL.');
      return;
    }

    try {
      const res = await fetch('/api/logos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLogo),
      });

      if (res.status === 201) {
        const createdLogo = await res.json();
        setLogos(prev => [...prev, createdLogo]);
        setNewLogo({ team: '', url: '' });
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to add logo.');
      }
    } catch (err) {
      alert('Server error. Try again.');
    }
  };

  const handleDeleteLogo = async (id) => {
    try {
      const res = await fetch('/api/logos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.status === 204) {
        setLogos(prev => prev.filter(logo => logo.id !== id));
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to delete logo.');
      }
    } catch (err) {
      alert('Server error. Try again.');
    }
  };

  if (!loggedInUser) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Manage Team Logos</h1>
          <div>
            <button 
              className="btn btn-secondary me-2"
              onClick={() => router.push('/sportTab')}
            >
              Back to Fixtures
            </button>
            <button 
              className="btn btn-danger"
              onClick={() => {
                localStorage.removeItem('loggedInUser');
                router.push('/login');
              }}
            >
              Logout
            </button>
          </div>
        </div>
        
        <div className="card mb-4">
          <div className="card-body">
            <h5>Add New Logo</h5>
            <form onSubmit={handleAddLogo}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="team-name" className="form-label">Team Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="team-name" 
                    placeholder="Enter team name" 
                    value={newLogo.team}
                    onChange={(e) => setNewLogo({...newLogo, team: e.target.value})}
                    required 
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="logo-url" className="form-label">Logo URL</label>
                  <input 
                    type="url" 
                    className="form-control" 
                    id="logo-url" 
                    placeholder="Enter logo URL" 
                    value={newLogo.url}
                    onChange={(e) => setNewLogo({...newLogo, url: e.target.value})}
                    required 
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Add Logo</button>
            </form>
          </div>
        </div>
        
        <div className="row">
          {logos.length > 0 ? (
            logos.map((logo) => (
              <div className="col-md-3 mb-3" key={logo.id}>
                <div className="card" style={{ height: '70px' }}>
                  <div className="card-body d-flex align-items-center justify-content-between p-2">
                    <div className="d-flex align-items-center">
                      <Image 
                        src={logo.url} 
                        alt={`${logo.team} logo`} 
                        width={35}
                        height={35}
                        style={{ 
                          marginRight: '10px',
                          objectFit: 'contain'
                        }} 
                      />
                      <h6 className="mb-0" style={{ fontSize: '0.9rem' }}>{logo.team}</h6>
                    </div>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteLogo(logo.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <p className="text-muted">No logos added yet.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
