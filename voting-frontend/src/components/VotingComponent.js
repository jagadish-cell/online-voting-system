import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

const candidates = [
  { id: 1, name: 'Chandra Babu Naidu', image: '/images/CBN.PNG', partySymbol: '/images/party3.jpeg' },
  { id: 2, name: 'Jagan Mohan Reddy', image: '/images/jagan.png', partySymbol: '/images/party2.avif' },
  { id: 3, name: 'Pawan Kalyan', image: '/images/pawan.png', partySymbol: '/images/party1.jpg' }
];

const VotingComponent = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // ✅ State for error messages
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');

      const controller = new AbortController(); // ✅ Prevent memory leaks
      try {
        const baseURL = API_BASE_URL.replace(/\/+$/, ''); // remove trailing slash if any

        const response = await fetch(`${baseURL}/user`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
        signal: controller.signal
        });


        const data = await response.json();
        if (response.ok) {
          setUser(data);
          setHasVoted(data.hasVoted);
        } else {
          navigate('/login');
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching user data:', error);
          navigate('/login');
        }
      }
      return () => controller.abort();
    };

    fetchUserData();
  }, [navigate]);

  const handleSelectCandidate = (candidateId) => {
    if (hasVoted) return; // ✅ Prevent selection after voting
    setSelectedCandidate(prev => (prev === candidateId ? null : candidateId));
  };

  const handleVote = async () => {
    if (!selectedCandidate) {
      setErrorMessage("❌ Please select a candidate.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate("/login");
        return;
      }

      const baseURL = API_BASE_URL.replace(/\/+$/, ''); // Remove any trailing slashes

       const response = await fetch(`${baseURL}/vote`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
         },
        body: JSON.stringify({ candidateId: selectedCandidate })
        });


      const data = await response.json();

      if (response.ok) {
        setHasVoted(true);
        setErrorMessage(""); // ✅ Clear previous errors
      } else {
        setErrorMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error('Error voting:', error);
      setErrorMessage("❌ Network error. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: '#1e3c72', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      
      {/* Header */}
      <header style={{ backgroundColor: '#001f3f', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <nav style={{ display: 'flex', gap: '20px' }}>
          <Link to="/" style={{ color: '#ffde59', textDecoration: 'none', fontSize: '18px' }}>Home</Link>
          <Link to="/results" style={{ color: '#ffde59', textDecoration: 'none', fontSize: '18px' }}>Results</Link>
        </nav>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Online Voting System</h1>
        
        {/* User Profile Dropdown */}
        <div style={{ position: 'relative' }}>
          {user && (
            <>
              <button onClick={() => setShowDropdown(!showDropdown)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ffde59', fontSize: '18px' }}>
                👤 {user.full_name}
              </button>
              {showDropdown && (
                <div style={{ position: 'absolute', right: 0, background: '#fff', color: '#000', padding: '10px', borderRadius: '5px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
                  <p><strong>Name:</strong> {user.full_name}</p>
                  <p><strong>Aadhaar:</strong> {user.aadhaar_number}</p>
                  <p><strong>Voter ID:</strong> {user.voter_id}</p>
                  <button onClick={handleLogout} style={{ marginTop: '10px', padding: '5px 10px', background: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main style={{ textAlign: 'center', flexGrow: 1, padding: '20px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>Cast Your Vote</h2>

        {/* Candidates Section */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '80px', marginBottom: '30px' }}>
          {candidates.map((candidate) => (
            <div key={candidate.id} style={{ textAlign: 'center' }}>
              <div
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  cursor: hasVoted ? 'not-allowed' : 'pointer',
                  opacity: selectedCandidate && selectedCandidate !== candidate.id ? 0.5 : 1,
                  border: selectedCandidate === candidate.id ? '4px solid #ffde59' : 'none',
                  borderRadius: '10px',
                }}
                onClick={() => handleSelectCandidate(candidate.id)}
              >
                <img src={candidate.image} alt={candidate.name} style={{ width: '250px', height: '250px', borderRadius: '10px' }} />
                <img src={candidate.partySymbol} alt="Party Symbol" style={{ position: 'absolute', bottom: '10px', right: '10px', width: '90px', height: '90px' }} />
              </div>
              <p style={{ fontSize: '20px', marginTop: '10px' }}>{candidate.name}</p>
            </div>
          ))}
        </div>

        {/* Error Message */}
        {errorMessage && <p style={{ color: "red", fontSize: "16px" }}>{errorMessage}</p>}

        {/* Submit Vote Button */}
        <button
          onClick={handleVote}
          disabled={!selectedCandidate || hasVoted}
          style={{
            padding: '14px 40px',
            backgroundColor: hasVoted ? 'green' : selectedCandidate ? '#ffde59' : '#ccc',
            color: hasVoted ? 'white' : '#1e3c72',
            fontSize: '20px',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '30px',
            cursor: hasVoted ? 'not-allowed' : selectedCandidate ? 'pointer' : 'not-allowed'
          }}
        >
          {hasVoted ? 'Vote Submitted' : 'Submit Vote'}
        </button>
      </main>
    </div>
  );
};

export default VotingComponent;
