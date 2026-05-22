import { useEffect } from 'react';
import { useLenis } from './hooks/useLenis';
import AtmosphericEffects from './effects/AtmosphericEffects';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/Manifesto';
import Projects from './sections/Anatomy';
import Experience from './sections/Tiers';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import { siteConfig } from './config';

function App() {
  useLenis();

  useEffect(() => {
    document.title = siteConfig.siteTitle || '';
    document.documentElement.lang = siteConfig.language || '';

    let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = siteConfig.siteDescription || '';
  }, []);

  return (
    <>
      <AtmosphericEffects />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default App;
