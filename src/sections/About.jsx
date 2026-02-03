import Section from "../components/Section";
import "../styles/About.css";

const About = () => {
  return (
    <Section id="about">
      {/* About + Photo Card */}
      <div className="about-page about-content-page">
        <div className="about-layout">
          {/* LEFT: Editorial text */}
          <div className="about-editorial">
            {/* <h1 className="about-title"> Getting to Know Me</h1> */}
            <div className="about-heading">
              <span className="about-line" />
              <h1 className="about-title">Getting To Know Me</h1>
            </div>


            <div className="about-divider" />

            <p>
              I’m a software engineer with over four years of experience building web,
              cloud, and data-driven systems across frontend, backend, and distributed architectures.
            </p>


            <p>
              I’m currently pursuing a Master’s degree in Computer Science at the University of Cincinnati,
              where I continue to deepen my interests in data visualization, cloud systems, and scalable application design.
            </p>

            <p>
              I enjoy working on problems that require both technical depth and
              structural clarity, whether that’s modernizing legacy platforms,
              designing RESTful and serverless APIs, or building interactive
              visualizations that make complex data easier to explore and understand.

            </p>

            <p>
              Outside of engineering, I enjoy exploring new places,
              and spending time with creative work that helps me reset and think differently.
            </p>
          </div>

          {/* RIGHT: Photo in card */}
          <div className="about-photo-card">
            <div className="about-photo-frame">
              <img
                src="/public/profile.jpg"
                alt="Hethu Sri"
                draggable="false"
              />
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
};

export default About;
