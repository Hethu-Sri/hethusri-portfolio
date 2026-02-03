import Section from "../components/Section";
import "../styles/Skills.css";

const Skills = () => {
  return (
    <Section id="skills">
      <div className="skills-wrapper">
        {/* <h1 className="skills-title">What I work with</h1> */}

        <div className="skills-heading">
          <span className="skills-line" />
          <h1 className="skills-title">What I Work With</h1>
        </div>

        <div className="skills-layout">
          {/* LEFT: Narrative */}
          <div className="skills-text">
            <p className="skills-copy">
              I work primarily with JavaScript, TypeScript, Python, and SQL across
              React, Node.js, and data-visualization workflows, integrating
              relational and NoSQL databases, cloud data pipelines, and
              CI/CD-driven deployments on Microsoft Azure.
            </p>

            <p className="skills-copy">
              I build systems across frontend, backend, data, and cloud
              infrastructure. My work focuses on designing RESTful APIs,
              event-driven and serverless services, and scalable microservice
              architectures.
            </p>
          </div>

          {/* RIGHT: Skills card */}
          <div className="skills-card">
            <p>
              <strong>Languages</strong> — Python, Java, C++, C
            </p>

            <p>
              <strong>Web</strong> — JavaScript, TypeScript, ReactJS, D3.js,
              Node.js, HTML, CSS
            </p>

            <p>
              <strong>Databases & APIs</strong> — SQL, MySQL, MongoDB, Azure SQL,
              REST, JSON, XML, SOAP
            </p>

            <p>
              <strong>Cloud & DevOps</strong> — Microsoft Azure, Docker, GitHub
              CI/CD
            </p>

            <p>
              <strong>Architecture</strong> — Microservices, Event-Driven
              Systems, Serverless Design
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Skills;
