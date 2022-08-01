import About from "../components/About";
function AboutPage() {
  return (
    <div
      style={{
        backgroundImage:
          "url(" + "https://wallpaperaccess.com/full/329585.jpg" + ")",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <About />
    </div>
  );
}
export default AboutPage;
