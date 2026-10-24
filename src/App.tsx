import React from 'react';
import { RouterProvider, useRouter } from './lib/router';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WhatsAppButton } from './components/layout/WhatsAppButton';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { JobsPage } from './pages/JobsPage';
import { JobDetailPage } from './pages/JobDetailPage';
import { JobApplyPage } from './pages/JobApplyPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { CandidateDashboardPage } from './pages/CandidateDashboardPage';
import { CandidateProfilePage } from './pages/CandidateProfilePage';
import { EmployersPage } from './pages/EmployersPage';
import { RequestStaffPage } from './pages/RequestStaffPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminLoginPage } from './pages/AdminLoginPage';

const AppContent: React.FC = () => {
  const { path } = useRouter();

  // Determine current page component
  let pageComponent = <HomePage />;
  let showHeaderFooter = true;

  if (path === '/' || path === '') {
    pageComponent = <HomePage />;
  } else if (path === '/about') {
    pageComponent = <AboutPage />;
  } else if (path === '/services') {
    pageComponent = <ServicesPage />;
  } else if (path.startsWith('/services/')) {
    const slug = path.replace('/services/', '');
    pageComponent = <ServiceDetailPage slug={slug} />;
  } else if (path === '/jobs') {
    pageComponent = <JobsPage />;
  } else if (path.startsWith('/jobs/') && path.endsWith('/apply')) {
    const slug = path.replace('/jobs/', '').replace('/apply', '');
    pageComponent = <JobApplyPage slug={slug} />;
  } else if (path.startsWith('/jobs/')) {
    const slug = path.replace('/jobs/', '');
    pageComponent = <JobDetailPage slug={slug} />;
  } else if (path === '/register') {
    pageComponent = <RegisterPage />;
  } else if (path === '/login') {
    pageComponent = <LoginPage />;
  } else if (path === '/forgot-password') {
    pageComponent = <ForgotPasswordPage />;
  } else if (path === '/reset-password') {
    pageComponent = <ResetPasswordPage />;
  } else if (path === '/candidate/dashboard') {
    pageComponent = <CandidateDashboardPage />;
  } else if (path === '/candidate/profile') {
    pageComponent = <CandidateProfilePage />;
  } else if (path === '/employers') {
    pageComponent = <EmployersPage />;
  } else if (path === '/request-staff') {
    pageComponent = <RequestStaffPage />;
  } else if (path === '/contact') {
    pageComponent = <ContactPage />;
  } else if (path === '/faq') {
    pageComponent = <FAQPage />;
  } else if (path === '/privacy') {
    pageComponent = <PrivacyPolicyPage />;
  } else if (path === '/terms') {
    pageComponent = <TermsPage />;
  } else if (path === '/admin/login') {
    pageComponent = <AdminLoginPage />;
    showHeaderFooter = false;
  } else if (path.startsWith('/admin')) {
    pageComponent = <AdminDashboardPage />;
    showHeaderFooter = false; // Admin has its own dedicated console header/navigation
  }

  return (
    <div className="flex flex-col min-h-screen">
      {showHeaderFooter && <Header />}
      <div className="flex-1">{pageComponent}</div>
      {showHeaderFooter && <Footer />}
      <WhatsAppButton />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
