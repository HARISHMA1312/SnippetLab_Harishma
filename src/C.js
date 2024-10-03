import React, { useState, useEffect } from 'react';
import './C.css';

const C = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (selectedCard !== null && !event.target.closest('.card')) {
        setSelectedCard(null);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [selectedCard]);

  const handleCardClick = (index) => {
    setSelectedCard(index);
  };

  const handleCloseCard = (event, index) => {
    event.stopPropagation();
    if (selectedCard === index) {
      setSelectedCard(null);
    }
  };

  const cards = [
    {
      title: 'Variables',
      content: `In C, variables are used to store data. Variables can hold different types of data, such as int, char, etc.`,
      syntax: `Basic Syntax:\nint age = 25;\nchar name[20] = "John";`,
    },
    {
      title: 'Functions',
      content: `Functions in C are reusable blocks of code that can be called by their names.`,
      syntax: `Basic Syntax:\nint add(int a, int b) {\n    return a + b;\n}`,
    },
    {
      title: 'Loops',
      content: `Loops allow you to repeatedly execute code. C supports for, while, and do-while loops.`,
      syntax: `Basic Syntax:\nfor(int i = 0; i < 5; i++) {\n    printf("%d", i);\n}`,
    },
    {
      title: 'Arrays',
      content: `Arrays in C store multiple values of the same type in a single variable.`,
      syntax: `Basic Syntax:\nint numbers[] = {1, 2, 3, 4, 5};`,
    },
    {
      title: 'Pointers',
      content: `Pointers in C store the address of another variable. They are powerful but must be used carefully.`,
      syntax: `Basic Syntax:\nint *p;\nint a = 10;\np = &a;`,
    },
    {
      title: 'Structures',
      content: `Structures in C allow you to group different data types together.`,
      syntax: `Basic Syntax:\nstruct Person {\n   char name[50];\n   int age;\n};`,
    },
  ];

  return (
    <div className="c-wrapper">
      <h2 className="c-heading">C Flashcards</h2>
      <div className="c-container">
        <div className="row">
          {cards.map((card, index) => (
            <div className="col-6 col-md-3 mb-4" key={index}>
              <div
                className={`card ${selectedCard === index ? 'selected' : ''}`}
                onClick={() => handleCardClick(index)}
              >
                <div className="card-body">
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-content">{card.content}</p>
                  {selectedCard === index && (
                    <div className="syntax-container">
                      <pre>{card.syntax}</pre>
                    </div>
                  )}
                  {selectedCard === index && (
                    <button
                      className="close-btn"
                      onClick={(e) => handleCloseCard(e, index)}
                    >
                      &times;
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default C;