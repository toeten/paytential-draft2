export default function AboutUs() {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          At Financial Simulator, our goal is to empower users to make informed financial decisions
          through interactive, real-world budgeting experiences. We believe in providing an engaging
          platform to help users build financial literacy and achieve stability.
        </p>
      </section>

      <section className="features-section">
        <h2>What We Offer</h2>
        <ul>
          <li>
            <strong>Real-Life Financial Challenges:</strong> Encounter everyday scenarios and unexpected
            expenses to test and improve your budgeting skills.
          </li>
          <li>
            <strong>Custom Budget Setup:</strong> Set your income level and allocate funds for needs, wants,
            and savings. Tailor your simulation to fit your financial profile.
          </li>
          <li>
            <strong>Progress Tracking:</strong> Save each simulation to your profile and review how much
            you saved or spent over time.
          </li>
          <li>
            <strong>Goal-Oriented Learning:</strong> Each simulation offers opportunities to learn valuable
            financial strategies for better decision-making.
          </li>
        </ul>
      </section>

      <section className="values-section">
        <h2>Our Values</h2>
        <p>
          We believe in creating an accessible and inclusive platform that benefits users from all
          backgrounds. Financial Simulator is committed to fostering a supportive environment where
          everyone can learn, grow, and gain confidence in their financial capabilities.
        </p>
      </section>
    </div>
  );
}
