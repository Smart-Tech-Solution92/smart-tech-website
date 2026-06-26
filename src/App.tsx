import { CustomCursor } from './components/CustomCursor';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { WorksPage } from './pages/WorksPage';
import { AppRouterProvider, useAppRouter } from './router';

function AppContent() {
  const { path } = useAppRouter();

  return (
    <div className="app-root">
      <CustomCursor />
      <Navbar />
      <main key={path}>
        {path === '/' && <HomePage />}
        {path === '/services' && <ServicesPage />}
        {path === '/about' && <AboutPage />}
        {path === '/works' && <WorksPage />}
        {path === '/contact' && <ContactPage />}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppRouterProvider>
      <AppContent />
    </AppRouterProvider>
  );
}
