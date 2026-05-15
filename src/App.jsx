import './index.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Stats />
      <QuestSection />
      <Features />
      <CallToAction />
    </div>
  );
}

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        <span className="logo-icon">⚡</span>
        <span>FitQuest</span>
      </div>

      <nav className="nav-links">
        <a href="#quests">Quests</a>
        <a href="#features">Features</a>
        <a href="#start">Start</a>
      </nav>

      <button className="nav-button">Join Now</button>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="badge">Level up your fitness journey</p>

        <h1>
          Turn workouts into
          <span> epic quests.</span>
        </h1>

        <p className="hero-text">
          FitQuest helps you stay motivated by transforming your workouts,
          habits, and progress into a game-like adventure.
        </p>

        <div className="hero-actions">
          <button className="primary-button">Start Your Quest</button>
          <button className="secondary-button">View Challenges</button>
        </div>
      </div>

      <div className="hero-card">
        <div className="level-card">
          <div>
            <p className="small-text">Current Level</p>
            <h2>Level 12</h2>
          </div>
          <span className="xp-pill">2,450 XP</span>
        </div>

        <div className="progress-box">
          <div className="progress-header">
            <span>Daily Quest Progress</span>
            <span>75%</span>
          </div>

          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div>

        <div className="quest-list">
          <QuestItem icon="🏃" title="Run 3km" status="Completed" completed />
          <QuestItem icon="💪" title="20 Push-ups" status="In progress" />
          <QuestItem icon="🥗" title="Eat healthy meal" status="Pending" />
        </div>
      </div>
    </section>
  );
}

function QuestItem({ icon, title, status, completed }) {
  return (
    <div className={`quest-item ${completed ? 'completed' : ''}`}>
      <span className="quest-icon">{icon}</span>

      <div>
        <h4>{title}</h4>
        <p>{status}</p>
      </div>
    </div>
  );
}

function Stats() {
  return (
    <section className="stats">
      <StatCard number="12" label="Levels gained" />
      <StatCard number="48" label="Quests completed" />
      <StatCard number="9" label="Day streak" />
      <StatCard number="2.4k" label="XP earned" />
    </section>
  );
}

function StatCard({ number, label }) {
  return (
    <div className="stat-card">
      <h3>{number}</h3>
      <p>{label}</p>
    </div>
  );
}

function QuestSection() {
  return (
    <section className="section" id="quests">
      <div className="section-header">
        <p className="badge">Daily quests</p>
        <h2>Choose your challenge</h2>
        <p>
          Complete quests, earn XP, build streaks, and unlock your next level.
        </p>
      </div>

      <div className="cards-grid">
        <ChallengeCard
          icon="🔥"
          title="Burn Quest"
          text="Complete a cardio workout and burn at least 300 calories."
          reward="+350 XP"
        />

        <ChallengeCard
          icon="🏋️"
          title="Strength Quest"
          text="Finish a full-body strength session with 4 exercises."
          reward="+500 XP"
        />

        <ChallengeCard
          icon="🧘"
          title="Recovery Quest"
          text="Stretch, hydrate, and recover to prepare for your next battle."
          reward="+200 XP"
        />
      </div>
    </section>
  );
}

function ChallengeCard({ icon, title, text, reward }) {
  return (
    <article className="challenge-card">
      <span className="challenge-icon">{icon}</span>
      <h3>{title}</h3>
      <p>{text}</p>

      <div className="reward-row">
        <span>{reward}</span>
        <button>Start</button>
      </div>
    </article>
  );
}

function Features() {
  return (
    <section className="section features-section" id="features">
      <div className="section-header">
        <p className="badge">Features</p>
        <h2>Built to keep you motivated</h2>
      </div>

      <div className="features-list">
        <FeatureItem
          title="Gamified progress"
          text="Earn XP, unlock levels, and make every workout feel rewarding."
        />

        <FeatureItem
          title="Daily streaks"
          text="Stay consistent with streak tracking and daily challenges."
        />

        <FeatureItem
          title="Personal goals"
          text="Set custom goals and follow your own fitness adventure."
        />
      </div>
    </section>
  );
}

function FeatureItem({ title, text }) {
  return (
    <div className="feature-item">
      <div className="check-icon">✓</div>

      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

function CallToAction() {
  return (
    <section className="cta" id="start">
      <h2>Ready to begin your FitQuest?</h2>
      <p>
        Start small, stay consistent, and become the strongest version of
        yourself.
      </p>
      <button className="primary-button">Create Your Hero</button>
    </section>
  );
}

export default App;