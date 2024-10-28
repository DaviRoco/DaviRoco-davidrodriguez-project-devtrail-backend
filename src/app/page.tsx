import styles from './page.module.css';
import Header from './ui/components/header/Header';
import Home from './ui/components/home/Home';
import About from './ui/components/about/About';
import Skills from './ui/components/skills/Skills';
import Solutions from './ui/components/solutions/Solutions';
import Qualification from './ui/components/qualification/Qualification';
import Contact from './ui/components/contact/Contact';
import Footer from './ui/components/footer/Footer';
export default function App() {
  return (
    <div className={styles.page}>
      <Header />
      <main className="main">
        <Home />
        <About />
        <Skills />
        <Solutions />
        <Qualification />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
