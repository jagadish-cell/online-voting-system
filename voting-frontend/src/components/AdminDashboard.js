import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const candidates = [
  { id: 1, name: 'Chandrababu Naidu', image: '/images/CBN.PNG', partySymbol: '/images/party3.jpeg' },
  { id: 2, name: 'Jagan Mohan Reddy', image: '/images/jagan.png', partySymbol: '/images/party2.avif' },
  { id: 3, name: 'Pawan Kalyan', image: '/images/pawan.png', partySymbol: '/images/party1.jpg' }
];

const AdminDashboard = () => {
  const [voteCounts, setVoteCounts] = useState({});

  useEffect(() => {
    fetchVoteCounts();
  }, []);

  const fetchVoteCounts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/get-vote-counts');
      const data = await response.json();
      setVoteCounts(data);
    } catch (error) {
      console.error("Error fetching vote counts:", error);
    }
  };

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: '#1e3c72', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      
      {/* Header */}
      <header style={{ backgroundColor: '#001f3f', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ flex: 1 }}></div>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', flex: 1 }}>Election Results</h1>
        <div style={{ flex: 1, textAlign: 'right' }}>
          <Link to="/" style={{ color: '#ffde59', textDecoration: 'none', fontSize: '18px' }}>Home</Link>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ textAlign: 'center', flexGrow: 1, padding: '20px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>Results</h2>

        {/* Candidates Section */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '80px', marginBottom: '30px' }}>
          {candidates.map((candidate) => (
            <div key={candidate.id} style={{ textAlign: 'center' }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <img src={candidate.image} alt={candidate.name} style={{ width: '250px', height: '250px', borderRadius: '10px' }} />
                <img src={candidate.partySymbol} alt="Party Symbol" style={{ position: 'absolute', bottom: '10px', right: '10px', width: '90px', height: '90px' }} />
              </div>
              <p style={{ fontSize: '20px', marginTop: '10px' }}>{candidate.name}</p>
              <p style={{ fontSize: '18px', marginTop: '5px', fontWeight: 'bold', color: '#ffde59' }}>Votes: {voteCounts[candidate.id] || 0}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#001f3f', color: '#bbb', textAlign: 'center', padding: '15px', fontSize: '14px', marginTop: 'auto' }}>
        © 2025 Online Voting System | Admin Dashboard
      </footer>
    </div>
  );
};

export default AdminDashboard;


