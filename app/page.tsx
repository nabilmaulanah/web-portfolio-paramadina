import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Feature from "@/components/Feature";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <section id="home">
        <Hero />
      </section>

      <About />

      <section id="feature">
        <Feature />
      </section>



      <Footer />
    </>
  );
}