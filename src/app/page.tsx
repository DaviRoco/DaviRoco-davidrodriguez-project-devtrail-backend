import styles from './page.module.css';
import Header from './components/header/Header';
import Home from './components/home/Home';
import About from './components/about/About';

export default function App() {
  return (
    <div className={styles.page}>
      <Header />
      <main className="main">
        <Home />
        <About />
      </main>
    </div>
  );
}
