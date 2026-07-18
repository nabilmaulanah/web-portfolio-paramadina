import DashboardNavbar from "@/components/DashboardNavbar";
import DashboardHero from "@/components/DashboardHero";
import ProjectSection from "@/components/ProjectSection";
import SkillSection from "@/components/SkillSection";
import CertificateSection from "@/components/CertificateSection";
import ExperienceSection from "@/components/ExperienceSection";
import PortfolioManager from "@/components/PortfolioManager";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  return (
    <main className="bg-gray-50 min-h-screen">

      <DashboardNavbar />

      <DashboardHero />

      <ProjectSection />

      <SkillSection />

      <CertificateSection />

      <ExperienceSection />

      <PortfolioManager />

    </main>
  );
}