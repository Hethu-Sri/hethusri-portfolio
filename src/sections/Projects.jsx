import { useEffect } from "react";
import "../styles/Projects.css";
import { Github, ExternalLink } from "lucide-react";


const Projects = () => {
  useEffect(() => {
    const cards = document.querySelectorAll(
      ".project-card, .skills-card, .tech-bubbles"
    );

    cards.forEach((card) => {
      const handleMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      };

      const handleLeave = () => {
        card.style.removeProperty("--mouse-x");
        card.style.removeProperty("--mouse-y");
      };

      card.addEventListener("mousemove", handleMove);
      card.addEventListener("mouseleave", handleLeave);

      return () => {
        card.removeEventListener("mousemove", handleMove);
        card.removeEventListener("mouseleave", handleLeave);
      };
    });
  }, []);

  return (
    <section id="projects">
      <div className="project-wrapper">
        <div className="project-heading">
          <span className="project-line" />
          <h1 className="project-title">Things I've Built</h1>
        </div>

        <p className="project-subtitle">
          Selected projects in data analytics, visualization, and full-stack
          development.
        </p>

        <div className="projects-grid">

          {/* Socioeconomic */}
          <div className="project-card">
            <div className="project-header">
              <h3>Interactive Socioeconomic & Health Data Visualization</h3>

              <div className="project-links">
                <a
                  href="https://github.com/Hethu-Sri/Interactive-Socioeconomic-Health-Visualization-V2"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub Repository"
                  // className="icon-btn"
                  data-tooltip="View GitHub Repository"
                >
                  <Github size={16} />
                </a>

                <a
                  href="https://visual-interfaces-updated-project-1.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Live Project"
                  data-tooltip="Open Live Demo"
                >
                  <ExternalLink size={16} />
                </a>
              </div>

            </div>


            <ul className="project-points">
              To analyze the relationship between education levels and healthcare
              access across U.S. counties I built an interactive data
              visualization dashboard.
              <li>
                Integrated coordinated views including a choropleth map,
                histogram, and scatterplot with brushing, filtering, and linked
                interactions.
              </li>
              <li>
                Improved usability through enhanced tooltips, data cleaning,
                accessibility-aware color choices, and refined UI controls.
              </li>
            </ul>

            <div className="project-meta">
              <span>JavaScript</span>
              <span>D3.js</span>
              <span>Data Visualization</span>
            </div>


          </div>

          {/* Retail Analytics */}
          <div className="project-card">
            <div className="project-header">
              <h3>Retail Analytics & Customer Insights Dashboard</h3>
              <div className="project-links">
                <a
                  href="https://github.com/Hethu-Sri/RetailsAnalyticsPlatform"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub Repository"
                  data-tooltip="View GitHub Repository"
                >
                  <Github size={16} />
                </a>

                <a
                  href="https://finalprojectgroup19-gbhfbbeafjfdbnf5.centralus01.azurewebsites.net/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Live Project"
                  data-tooltip="Open Live Demo"
                >
                  <ExternalLink size={16} />
                </a>
              </div>

            </div>

            <ul className="project-points">
              Built a cloud-based retail analytics platform on Microsoft Azure to
              explore customer behavior, transactions, and product patterns
              using interactive dashboards.
              <li>
                Implemented end-to-end data pipelines with Azure SQL, Storage
                Accounts, and Data Factory.
              </li>
              <li>
                Applied machine learning models including Gradient Boosting and
                Random Forest for CLV, basket analysis, and churn prediction.
              </li>
            </ul>

            <div className="project-meta">
              <span>React</span>
              <span>JavaScript</span>
              <span>Azure</span>
              <span>Data Analytics</span>
              <span>Azure SQL</span>
            </div>


          </div>

          {/* Earthquake */}
          <div className="project-card">
            
            <div className="project-header">
            <h3>Earth Quake Data Visualization</h3>
              <div className="project-links">
                <a
                  href="https://github.com/Hethu-Sri/EarthQuakeDataVisualization"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub Repository"
                  data-tooltip="View GitHub Repository"
                >
                  <Github size={16} />
                </a>

                <a
                  href="https://visual-interfaces-project-2.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Live Project"
                  data-tooltip="Open Live Demo"
                >
                  <ExternalLink size={16} />
                </a>
              </div>

            </div>

            <ul className="project-points">
              Developed an interactive data visualization dashboard for
              exploring global earthquake activity using coordinated visual
              views.
              <li>
                Combined maps, timelines, and charts to analyze seismic patterns
                across time, magnitude, and geography.
              </li>
              <li>
                Implemented linked interactions and a predictive mini globe to
                highlight high-risk seismic zones.
              </li>
            </ul>

            <div className="project-meta">
              <span>JavaScript</span>
              <span>D3.js</span>
              <span>Leaflet</span>
              <span>Data Visualization</span>

            </div>

            
          </div>

          {/* Phineas & Ferb */}
          <div className="project-card">
            
            <div className="project-header">
            <h3>Phineas & Ferb Series Visualization</h3>
              <div className="project-links">
                <a
                  href="https://github.com/Hethu-Sri/PhineasAndFerb-Series-Visualization"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub Repository"
                  data-tooltip="View GitHub Repository"
                >
                  <Github size={16} />
                </a>

                <a
                  href="https://phineas-ferb-vis.netlify.app/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Live Project"
                  data-tooltip="Open Live Demo"
                >
                  <ExternalLink size={16} />
                </a>
              </div>

            </div>
            <ul className="project-points">
              An interactive visualization dashboard to analyze dialogue,
              character presence, and narrative patterns across 200+ episodes.
              <li>
                Visualized character timelines, interaction matrices, episode
                explorers, and animated bar-race charts.
              </li>
              <li>
                Applied text analysis to uncover dialogue trends, iconic phrases,
                and character dynamics.
              </li>
            </ul>

            <div className="project-meta">
              <span>JavaScript</span>
              <span>Python</span>
              <span>D3.js</span>
              <span>Data Visualization</span>

            </div>


          </div>

        </div>
      </div>
    </section>
  );
};

export default Projects;
