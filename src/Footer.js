import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={{ marginTop: '40px'}}>
    <Container>
      <Row>
        <Col xs={12} className="text-center">
          <p>&copy; 2024 Snippet Lab. All rights reserved.</p>
          <p>
            Developed by Snippet Lab team |  
            <i className="bi bi-mortarboard-fill" style={{ marginRight: '5px', fontSize: '1.2rem', verticalAlign: 'middle' }}></i>
            <a href="https://www.tce.edu/" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'none' }}>
              Thiagarajar College of Engineering
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  </footer>
  



  );
};

export default Footer;
