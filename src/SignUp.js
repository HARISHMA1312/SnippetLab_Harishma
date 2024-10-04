import React, { useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import Alert from "./Alert"; 

const SignUp = ({ setPage, onSignUp }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" }); // State for alert

  const handleHome = () => {
    window.location.href = '/'; 
  };

  const handleLogin = () => {
    window.location.href = '/Login'; 
  };

  const isValidEmail = (email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // Gmail validation regex
    return gmailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/; // Special character regex
    return password.length >= 6 && specialCharRegex.test(password);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        if (!isValidEmail(email)) {
          setAlert({ message: "Please enter a valid email address.", type: "danger" });
          return;
        }
        if (!isValidPassword(password)) {
          setAlert({ message: "Password must be at least 6 characters long and contain at least one special character.", type: "primary" });
          return;
        }
        try {
          const response = await axios.post('http://localhost:5000/signup', {
            name,
            email,
            password,
          });
          setAlert({ message: response.data.message, type: "success" }); // Show success message
          handleHome(); 
        } catch (error) {
          setAlert({ message: "Error signing up: " + (error.response?.data?.error || error.message), type: "primary" });
        }
      } else {
        setAlert({ message: "Passwords do not match!", type: "primary" });
      }
    } else {
      setAlert({ message: "Please fill all fields.", type: "primary" });
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',  
      minWidth: '100vw',  
      backgroundColor: '#1F2833',
      margin: 0,
    },
    wrapper: {
      marginTop: '50px',
      marginBottom: '1000px',
      width: '450px',
      height: '100%',
      alignItems: 'center',
      marginRight: '20px',
      background: 'rgba(237, 231, 231, 0.5)',
      border: '2px solid rgba(20, 19, 19, 0.2)',
      borderRadius: '12px',
      padding: '30px 40px',
      boxShadow: '0 0 15px rgba(0, 0, 0, 1.0)',
      backdropFilter: 'blur(9px)',
      color: '#fff',
    },
    heading: {
      fontSize: '36px',
      textAlign: 'center',
      marginBottom: '20px',
    },
    inputBox: {
      position: 'relative',
      color: 'white',
      width: '100%',
      height: '50px',
      margin: '20px 0',
    },
    input: {
      width: "100%",
      height: "100%",
      background: "transparent",
      border: "none",
      outline: "none",
      border: "2px solid rgba(0, 0, 0, 0.2)",
      borderRadius: "40px",
      fontSize: "16px",
      color: "#fff",
      padding: "20px 45px 20px 20px",
    },
    button: {
      width: '100%',
      height: '45px',
      background: '#fff',
      border: 'none',
      outline: 'none',
      borderRadius: '40px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      transition: 'box-shadow 0.3s',
      cursor: 'pointer',
      fontSize: '16px',
      color: '#333',
      fontWeight: '600',
    },
    registerLink: {
      fontSize: '14.5px',
      textAlign: 'center',
      margin: '20px 0 15px',
    },
    link: {
      color: '#fff',
      textDecoration: 'none',
      fontWeight: '600',
    },
  };
  
  return (
    <Container style={styles.container}>
      <div style={styles.wrapper}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#000',
          textShadow: '0 2px 4px rgba(40, 240, 206, 0.9), 0 4px 8px rgba(0, 0, 0, 0.3)',
        }}>
          Sign Up for Snippet Lab
        </h1>

        
        {alert.message && (
          <Alert message={alert.message} type={alert.type} />
        )}

        <form onSubmit={handleSignUp}>
          <div style={styles.inputBox}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputBox}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputBox}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputBox}>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button 
            type="submit" 
            style={styles.button} 
            onMouseEnter={(e) => {
              e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.6)';
              e.target.style.backgroundColor = '#28f';
            }} 
            onMouseLeave={(e) => {
              e.target.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
              e.target.style.backgroundColor = '#fff';
            }}
          >
            Sign Up
          </button>
        </form>

        <p style={styles.registerLink}>
          Already have an account? <span onClick={handleLogin} style={styles.link}>Log in</span>
        </p>
      </div>
    </Container>
  );
};

export default SignUp;
