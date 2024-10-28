import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/sign-up');
  };

  useEffect(() => {
    const container = document.querySelector('.home-container');
    const heroSection = document.querySelector('.hero-section');
    
    // Add classes to trigger animations
    container.classList.add('fade-in');
    heroSection.classList.add('fade-in-bottom');
  }, []);

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Paytential</h1>
        <p>
          Take control of your finances with our interactive budgeting and simulation game. Build
          better financial habits while navigating real-life scenarios!
        </p>
        <button className="cta-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>

      <section className="features-section">
        <div className="feature">
          <h3>Real-World Scenarios</h3>
          <p>Experience realistic financial events like unexpected expenses and income boosts.</p>
        </div>
        <div className="feature">
          <h3>Customizable Budgets</h3>
          <p>Set your own income level and manage your monthly budgets for needs, wants, and savings.</p>
        </div>
        <div className="feature">
          <h3>Track Your Progress</h3>
          <p>Save your past simulations, review spending history, and see how much you've saved.</p>
        </div>
      </section>
    </div>
  );
}
