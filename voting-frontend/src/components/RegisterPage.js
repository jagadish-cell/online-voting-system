import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loadModels } from './faceModels';
import FaceRecognition from './FaceRecognition';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    voter_id: '',
    aadhaar_number: '',
    password: '',
    face_descriptor: ''
  });
  
  const [faceCaptured, setFaceCaptured] = useState(false);
  const [showFaceCapture, setShowFaceCapture] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadModels();
  }, []);

  const handleFaceCaptured = (descriptor) => {
    if (descriptor) {
      setFaceCaptured(true);
      setFormData({ ...formData, face_descriptor: JSON.stringify(Array.from(descriptor)) });
      setShowFaceCapture(false);
      alert("Face data captured successfully!");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!faceCaptured) {
      alert("Please capture your face data before registering.");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Registration successful!');
        navigate('/login');
      } else {
        alert(`Registration failed: ${result.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Online Voting System</h1>
        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/login" style={styles.link}>Login</Link>
          <Link to="/results" style={styles.link}>Results</Link>
          <Link to="/candidate" style={styles.link}>Candidate</Link>
        </nav>
      </header>

      <div style={styles.formContainer}>
        <div style={styles.formBox}>
          <h2 style={styles.title}>Register</h2>
          <form onSubmit={handleRegister}>
            <input name="full_name" type="text" placeholder="Full Name" onChange={handleChange} required style={styles.input} />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required style={styles.input} />
            <input name="voter_id" type="text" placeholder="Voter ID" onChange={handleChange} required style={styles.input} />
            <input name="aadhaar_number" type="text" placeholder="Aadhaar Number" onChange={handleChange} required style={styles.input} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required style={styles.input} />

            <button 
              type="button" 
              onClick={() => setShowFaceCapture(true)} 
              style={styles.faceButton(faceCaptured)}
            >
              {faceCaptured ? 'Face Captured' : 'Capture Face Data'}
            </button>
            <button type="submit" style={styles.registerButton}>Register</button>
          </form>
        </div>
      </div>

      {showFaceCapture && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <FaceRecognition onCapture={handleFaceCaptured} />
            <button onClick={() => setShowFaceCapture(false)} style={styles.closeButton}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = { 
  container: { 
    fontFamily: 'Poppins, sans-serif', 
    backgroundColor: '#1e3c72', 
    color: '#fff', 
    minHeight: '100vh', 
    display: 'flex', 
    flexDirection: 'column'
  },

  // Header section copied from HomePage.js
  header: { 
    backgroundColor: '#001f3f', 
    padding: '20px 40px', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },

  nav: { 
    display: 'flex', 
    gap: '20px' 
  },

  link: { 
    color: '#ffde59', 
    textDecoration: 'none', 
    fontSize: '16px', 
    fontWeight: '500', 
    transition: 'color 0.3s ease'
  },

  formContainer: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh', 
    width: '100%', 
    paddingTop: '80px'
  },

  formBox: { 
    backgroundColor: 'rgba(0,0,0,0.6)', 
    padding: '40px', 
    borderRadius: '10px', 
    width: '400px', 
    textAlign: 'center'
  },

  title: { 
    textAlign: 'center', 
    marginBottom: '30px' 
  },

  input: { 
    width: '100%', 
    padding: '10px', 
    marginBottom: '15px', 
    borderRadius: '5px', 
    border: 'none' 
  },

  faceButton: (faceCaptured) => ({ 
    width: '100%', 
    padding: '10px', 
    backgroundColor: faceCaptured ? '#28a745' : '#ffde59', 
    border: 'none', 
    borderRadius: '5px', 
    fontWeight: '600', 
    marginBottom: '15px', 
    color: faceCaptured ? '#fff' : '#000', 
    cursor: 'pointer' 
  }),

  registerButton: { 
    width: '100%', 
    padding: '10px', 
    backgroundColor: '#ffde59', 
    border: 'none', 
    borderRadius: '5px', 
    fontWeight: '600' 
  },

  modal: { 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    width: '100%', 
    height: '100%', 
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },

  modalContent: { 
    backgroundColor: '#fff', 
    padding: '20px', 
    borderRadius: '8px' 
  },

  closeButton: { 
    marginTop: '10px', 
    padding: '10px', 
    backgroundColor: '#ff4d4d', 
    color: '#fff', 
    border: 'none', 
    borderRadius: '5px' 
  }
};



export default RegisterPage;