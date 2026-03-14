import Section from "../components/Section";
import "../styles/Skills.css";

const Skills = () => {
  return (
    <Section id="skills">
      <div className="skills-wrapper reveal">
        <span className="section-watermark" aria-hidden="true">03</span>

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

          {/* RIGHT: Code file */}
          <div className="skills-code-file">
            <div className="code-file-tabbar">
              <span className="code-file-tab">
                <span className="code-file-lang">JS</span>
                skills.config.js
              </span>
            </div>
            <div className="code-file-body">

              <div className="code-line" style={{"--i":0}}><span className="code-ln">1</span><span className="code-cnt"><span className="tk-kw">const</span> <span className="tk-fn">skills</span> <span className="tk-op">=</span> <span className="tk-brace">{"{"}</span></span></div>
              <div className="code-line" style={{"--i":1}}><span className="code-ln">2</span><span className="code-cnt"></span></div>
              <div className="code-line" style={{"--i":2}}><span className="code-ln">3</span><span className="code-cnt"><span className="tk-cmt">{"  // core languages"}</span></span></div>
              <div className="code-line" style={{"--i":3}}><span className="code-ln">4</span><span className="code-cnt">{"  "}<span className="tk-key">languages</span><span className="tk-op">:</span> [<span className="tk-str">"Python"</span>, <span className="tk-str">"Java"</span>, <span className="tk-str">"C++"</span>, <span className="tk-str">"C"</span>],</span></div>
              <div className="code-line" style={{"--i":4}}><span className="code-ln">5</span><span className="code-cnt"></span></div>
              <div className="code-line" style={{"--i":5}}><span className="code-ln">6</span><span className="code-cnt"><span className="tk-cmt">{"  // web & frontend"}</span></span></div>
              <div className="code-line" style={{"--i":6}}><span className="code-ln">7</span><span className="code-cnt">{"  "}<span className="tk-key">web</span><span className="tk-op">:</span> [<span className="tk-str">"JS"</span>, <span className="tk-str">"TS"</span>, <span className="tk-str">"React"</span>, <span className="tk-str">"D3.js"</span>, <span className="tk-str">"Node.js"</span>],</span></div>
              <div className="code-line" style={{"--i":7}}><span className="code-ln">8</span><span className="code-cnt"></span></div>
              <div className="code-line" style={{"--i":8}}><span className="code-ln">9</span><span className="code-cnt"><span className="tk-cmt">{"  // databases & APIs"}</span></span></div>
              <div className="code-line" style={{"--i":9}}><span className="code-ln">10</span><span className="code-cnt">{"  "}<span className="tk-key">db</span><span className="tk-op">:</span> [<span className="tk-str">"SQL"</span>, <span className="tk-str">"MySQL"</span>, <span className="tk-str">"MongoDB"</span>, <span className="tk-str">"Azure SQL"</span>],</span></div>
              <div className="code-line" style={{"--i":10}}><span className="code-ln">11</span><span className="code-cnt"></span></div>
              <div className="code-line" style={{"--i":11}}><span className="code-ln">12</span><span className="code-cnt"><span className="tk-cmt">{"  // cloud & devops"}</span></span></div>
              <div className="code-line" style={{"--i":12}}><span className="code-ln">13</span><span className="code-cnt">{"  "}<span className="tk-key">cloud</span><span className="tk-op">:</span> [<span className="tk-str">"Azure"</span>, <span className="tk-str">"Docker"</span>, <span className="tk-str">"CI/CD"</span>, <span className="tk-str">"GitHub"</span>],</span></div>
              <div className="code-line" style={{"--i":13}}><span className="code-ln">14</span><span className="code-cnt"></span></div>
              <div className="code-line" style={{"--i":14}}><span className="code-ln">15</span><span className="code-cnt"><span className="tk-cmt">{"  // architecture"}</span></span></div>
              <div className="code-line" style={{"--i":15}}><span className="code-ln">16</span><span className="code-cnt">{"  "}<span className="tk-key">arch</span><span className="tk-op">:</span> [<span className="tk-str">"Microservices"</span>, <span className="tk-str">"Serverless"</span>, <span className="tk-str">"REST"</span>],</span></div>
              <div className="code-line" style={{"--i":16}}><span className="code-ln">17</span><span className="code-cnt"></span></div>
              <div className="code-line" style={{"--i":17}}><span className="code-ln">18</span><span className="code-cnt"><span className="tk-brace">{"}"}</span><span className="tk-op">;</span></span></div>
              <div className="code-line" style={{"--i":18}}><span className="code-ln">19</span><span className="code-cnt"></span></div>
              <div className="code-line" style={{"--i":19}}><span className="code-ln">20</span><span className="code-cnt"><span className="tk-kw">export default</span> <span className="tk-fn">skills</span><span className="tk-op">;</span></span></div>

            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Skills;
