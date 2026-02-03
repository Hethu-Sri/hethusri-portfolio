const Section = ({ id, title, children }) => {
    return (
      <section id={id} style={{ marginBottom: "120px" }}>
        <h2>{title}</h2>
      {children}
    </section>
    
    );
  };
  
  export default Section;
  