import './customer-feedback.css';

const customerFeedback = [
  {
    quote:
      'The workmanship has been excellent, and communication throughout the project has been first class. It has been a pleasure working with such a professional team. Thank you for everything – it is very much appreciated!',
    attribution: 'Housing association',
    layout: 'home-feedback-card--first',
  },
  {
    quote:
      'This is by far the best door the building has had, and it’s going strong. I will surely keep Bamford Doors in mind for future repairs / replacements.',
    attribution: 'Registered Charity',
    layout: 'home-feedback-card--second',
  },
  {
    quote:
      'Dealing with Bamford Doors has been a complete pleasure, through all aspects of the site visit, measuring, design and installation, we were kept informed and our questions answered. They offered a top-notch replacement door solution and that is what they have delivered for our client. We have been able to recommend them to other clients and are using them again on another project. We would thoroughly recommend Bamford Doors.',
    attribution: 'Real Estate and Property Client',
    layout: 'home-feedback-card--third',
  },
  {
    quote: 'Very pleased with the service we have received.',
    attribution: 'Level up Property Management',
    layout: 'home-feedback-card--fourth',
  },
];

export function CustomerFeedbackSection() {
  return (
    <section className="home-feedback-section" aria-labelledby="home-feedback-title">
      <div className="rl-wrap">
        <header className="home-feedback-heading">
          <div>
            <p className="rl-kicker">Customer feedback</p>
            <h2 id="home-feedback-title">Good work, in their words.</h2>
          </div>
          <p>
            Feedback from clients on communication, installation and the finished entrance.
          </p>
          <span className="home-feedback-count" aria-label="Four customer testimonials">
            04 <i /> CLIENT VOICES
          </span>
        </header>

        <div className="home-feedback-grid">
          {customerFeedback.map((item, index) => (
            <figure className={`home-feedback-card ${item.layout}`} key={item.attribution}>
              <span className="home-feedback-mark" aria-hidden="true">“</span>
              <blockquote>
                <p><q>{item.quote}</q></p>
              </blockquote>
              <figcaption>
                <span>0{index + 1} / FEEDBACK</span>
                <cite>{item.attribution}</cite>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
