import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Section from './components/Section/Section';
import Songs from './components/Songs/Songs';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Hero />
        <Section title="Top Albums" apiUrl="https://qtify-backend.labs.crio.do/albums/top" defaultView="grid" />
        <Section title="New Albums" apiUrl="https://qtify-backend.labs.crio.do/albums/new" defaultView="carousel" />
        <Songs />
      </div>
    </BrowserRouter>
  );
}

export default App;
