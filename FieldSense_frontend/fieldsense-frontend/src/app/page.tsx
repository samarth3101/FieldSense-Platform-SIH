// src/app/page.tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthSection from "@/components/forms/AuthSection";
import LoaderScreen from "@/components/ui/LoaderScreen";

export default function HomePage() {
  return (
    <LoaderScreen>
      <main>
        <Navbar />
        <section className="hero">
          <div className="heroContent">
            <h1>AI-powered Insights for Indian Agriculture</h1>
            <p>From soil to yield, powered by KrishiMitra AI</p>
            <a href="#auth" className="ctaBtn">Get Started</a>
          </div>
        </section>
        <AuthSection />
        <Footer />
      </main>
    </LoaderScreen>
  );
}
