import React, { useEffect, useState } from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const HomePage = () => {

  const navigate = useNavigate();

  const [titleFontSize, setTitleFontSize] = useState('3rem'); 
  const [worldFontSize, setWorldFontSize] = useState('2.5rem');

  
  const updateFontSizes = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth >= 1200) {
     
      setTitleFontSize('3.5rem');
      setWorldFontSize('3rem');
    } else if (windowWidth >= 768) {
     
      setTitleFontSize('3rem');
      setWorldFontSize('2.5rem');
    } else {
      
      setTitleFontSize('2rem');
      setWorldFontSize('1.75rem');
    }
  };

  
  useEffect(() => {
    updateFontSizes(); 
    window.addEventListener('resize', updateFontSizes); 

   
    return () => window.removeEventListener('resize', updateFontSizes);
  }, []);

  const handleCreateFlashcards = () => {
    navigate('/create');
  };

  const handleStartCoding = () => {
    navigate('/code-editor');
  };

  const handlestartlearning = () => {
    navigate('/FlashCards');
  };

  return (
    <Container fluid className="homepage-container bg-grey text-center" style={{ color: '#66FCF1' }}>
      <Row className="justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Col xs={11} md={9}>
          <h1
            className="snippet-lab-title"
            style={{ fontSize: titleFontSize, textAlign: 'center' }}
          >
            WELCOME TO SNIPPET LAB!
          </h1>
          <h1
            className="snippet-lab-world"
            style={{ fontSize: worldFontSize, textAlign: 'center' }}
          >
            Hello World!
          </h1>

          <p style={{ fontFamily: 'Times New Roman', color: '#C5C6C7', textAlign: 'center', fontSize: '1.25rem' }}>
            Snippet Lab allows users to write and run code in multiple programming languages using a built-in code editor where they can view the output instantly. Users can share their code and results through links or as PDFs. It also has special features like a flashcards section where users can learn programming concepts like syntax, commands, and functions, and they can create and save their own flashcards.
          </p>

          <div className="buttons-section mt-4 d-flex flex-column flex-md-row justify-content-center align-items-center">
            <Button variant="outline-info" className="mb-2 mb-md-0 me-md-2" size="lg" onClick={handleStartCoding}>
              Start Coding
            </Button>
            <Button variant="outline-info" className="mb-2 mb-md-0 me-md-2" size="lg" onClick={handlestartlearning}>
              Start Learning
            </Button>
            <Button variant="outline-info" className="mb-2 mb-md-0 me-md-2" size="lg" onClick={handleCreateFlashcards}>
              View Flashcards
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="videos-section mt-5">
        <Col xs={12} style={{ backgroundColor: 'black', color: 'white', fontFamily: 'Times New Roman' }}>
          <h1>Let's have a quick look at what we have!!!</h1>
        </Col>

        {/* C Programming */}
        <Col xs={12} className="video-card">
          <Card className="text-white bg-dark mb-4">
            <Card.Body >
              <iframe
                style={{ width: '100%', height: '600px', }}
                src="/c.mp4"
                title="C Programming"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <Card.Title>C Programming</Card.Title>
              <Card.Text>
                C is a low-level programming language that provides fine-grained control over hardware. It's known for its speed and efficiency, making it suitable for system programming and embedded systems.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Java Programming */}
        <Col xs={12} className="video-card">
          <Card className="text-white bg-dark mb-4">
            <Card.Body>
              <iframe
                style={{ width: '100%', height: '600px' }}
                src="/java.mp4"
                title="Java Programming"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <Card.Title>Java Programming</Card.Title>
              <Card.Text>
                Java is a high-level language designed for platform independence, meaning code can run on any system with a Java Virtual Machine (JVM).
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Python Programming */}
        <Col xs={12} className="video-card">
          <Card className="text-white bg-dark mb-4">
            <Card.Body>
              <iframe
                style={{ width: '100%', height: '600px' }}
                src="/python.mp4"
                title="Python Programming"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <Card.Title>Python Programming</Card.Title>
              <Card.Text>
                Python is a high-level language known for its readability and simplicity, making it easy to learn and use.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* C++ Programming */}
        <Col xs={12} className="video-card">
          <Card className="text-white bg-dark mb-4">
            <Card.Body>
              <iframe
                style={{ width: '100%', height: '600px' }}
                src="/c++.mp4"
                title="C++ Programming"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <Card.Title>C++ Programming</Card.Title>
              <Card.Text>
                C++ is an object-oriented language based on C, offering features like classes, objects, and inheritance.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Footer Section */}
      <Footer />


    </Container>
  );
};

export default HomePage;