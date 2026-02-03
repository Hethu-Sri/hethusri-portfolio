import { useState } from "react";
import Section from "../components/Section";
import "../styles/Experience.css";

const Experience = () => {
  const [activeTab, setActiveTab] = useState("abs");

  return (
    <Section id="experience">
      <div className="experience-wrapper">
        {/* Heading */}
        <div className="experience-heading">
          <span className="experience-line" />
          <h1 className="experience-title">Where I’ve Worked</h1>
        </div>

        {/* Tabs */}
        <div className="experience-tabs">
          <button className={activeTab === "abs" ? "active" : ""} onClick={() => setActiveTab("abs")}>
            Agile Business Solutions
          </button>
          <button className={activeTab === "as-sde" ? "active" : ""} onClick={() => setActiveTab("as-sde")}>
            Agile Solutions
          </button>
          <button className={activeTab === "as-intern" ? "active" : ""} onClick={() => setActiveTab("as-intern")}>
            Agile Solutions (Intern)
          </button>
          <button className={activeTab === "epam" ? "active" : ""} onClick={() => setActiveTab("epam")}>
            EPAM Systems
          </button>
          <button className={activeTab === "ta" ? "active" : ""} onClick={() => setActiveTab("ta")}>
            Teaching Assistant
          </button>
        </div>

        {/* Content */}
        <div className="experience-body">
          {/* LEFT */}
          <div className="experience-content">

            {activeTab === "abs" && (
              <>
                <p className="experience-role">
                  Full Stack Developer Intern · Massachusetts, United States  
                  <br />
                  <span> Dec 2025 – Present </span>
                </p>

                <ul className="experience-code">
                  <li>Designed event-driven, serverless microservices using Node.js and TypeScript</li>
                  <li>Built REST APIs with AWS Lambda, API Gateway, and EventBridge</li>
                  <li>Implemented multi-tenant authentication and RBAC using AWS Cognito</li>
                  <li>Developed custom Lambda authorizers and audit logging mechanisms</li>
                  <li>Integrated React micro-frontend applications with shared component libraries</li>
                  <li>Automated builds and deployments using CI/CD pipelines</li>
                </ul>
              </>
            )}

            {activeTab === "as-sde" && (
              <>
                <p className="experience-role">
                  Software Development Engineer · Bangalore, India  
                  <br />
                  <span> May 2022 – Aug 2024 </span>
                </p>

                <ul className="experience-code">
                  <li>Developed secure, scalable features for a Tax Intelligence & Management Platform</li>
                  <li>Built enterprise-grade functionality serving global clients</li>
                  <li>Migrated platform from SAP XS Classic to XS Advanced architecture</li>
                  <li>Re-architected synchronous workflows into asynchronous services</li>
                  <li>Improved system throughput and responsiveness by approximately 35%</li>
                  <li>Automated CI/CD reporting using Python-based analytics</li>
                  <li>Enforced code quality and security using SonarQube and Node.js scanners</li>
                </ul>
              </>
            )}

            {activeTab === "as-intern" && (
              <>
                <p className="experience-role">
                  Intern Developer · Bangalore, India  
                  <br />
                  <span> May 2021 – Apr 2022 </span>
                </p>

                <ul className="experience-code">
                  <li>Fixed critical production bugs and performance bottlenecks</li>
                  <li>Implemented feature enhancements to improve platform turnaround time</li>
                  <li>Developed backend services using SAP XSJS and SAP HANA</li>
                  <li>Validated APIs and integrations using SOAP UI</li>
                  <li>Contributed frontend components using HTML, CSS, and JavaScript</li>
                </ul>
              </>
            )}

            {activeTab === "epam" && (
              <>
                <p className="experience-role">
                  Software Engineering Trainee · Hyderabad, India  
                  <br />
                  <span> Sep 2020 – May 2021 </span>
                </p>

                <ul className="experience-code">
                  <li>Completed intensive training in Java and object-oriented programming</li>
                  <li>Practiced data structures and algorithmic problem solving</li>
                  <li>Built small-scale applications using clean code principles</li>
                  <li>Applied Agile workflows and Git-based version control</li>
                  <li>Collaborated in team-based engineering exercises</li>
                </ul>
              </>
            )}

            {activeTab === "ta" && (
              <>
                <p className="experience-role">
                  Teaching Assistant · Vijayawada, India <br />  
                  <span>Dec 2019 – Mar 2021 </span>
                </p>

                <ul className="experience-code">
                  <li>Assisted undergraduate courses in Cyber Security and Computer Networks</li>
                  <li>Designed lab tutorials, assignments, and instructional materials</li>
                  <li>Conducted tutorial sessions and concept walkthroughs</li>
                  <li>Mentored students through hands-on problem solving</li>
                </ul>
              </>
            )}

          </div>

          {/* RIGHT */}
          <div className="experience-tech-panel">
            {activeTab === "abs" && (
              <div className="tech-bubbles">
                <span>Node.js</span><span>TypeScript</span><span>AWS Lambda</span>
                <span>API Gateway</span><span>EventBridge</span><span>AWS Cognito</span>
                <span>React</span><span>CI/CD</span>
              </div>
            )}

            {activeTab === "as-sde" && (
              <div className="tech-bubbles">
                <span>JavaScript</span><span>Python</span><span>Node.js</span>
                <span>SAP XS Advanced</span><span>SAP HANA</span><span>SQL</span>
                <span>SonarQube</span><span>CI/CD</span>
                <span>REST</span>
                <span>JSON</span>
                <span>XML</span> 
                <span>SOAP</span>
              </div>
            )}

            {activeTab === "as-intern" && (
              <div className="tech-bubbles">
                <span>JavaScript</span><span>SQL</span><span>SAP XSJS</span>
                <span>SAP HANA</span><span>SOAP UI</span><span>HTML</span><span>CSS</span>
              </div>
            )}

            {activeTab === "epam" && (
              <div className="tech-bubbles">
                <span>Java</span><span>OOP</span><span>Data Structures</span>
                <span>Algorithms</span><span>Git</span><span>Agile</span>
              </div>
            )}

            {activeTab === "ta" && (
              <div className="tech-bubbles">
                <span>Cyber Security</span><span>Computer Networks</span>
                <span>Teaching</span><span>Curriculum Design</span><span>Mentoring</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Experience;
