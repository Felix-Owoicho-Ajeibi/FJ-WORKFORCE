import React, { useState, useRef, useEffect } from 'react';
import { Link, useRouter } from '../../lib/router';
import { useStore } from '../../lib/store';
import { Logo } from '../common/Logo';
import {
  Briefcase,
  ChevronDown,
  Menu,
  X,
  Phone,
  Mail,
  User as UserIcon,
  Shield,
  LogOut,
  FileText,
  Building2,
  CheckCircle,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

export const Header: React.FC = () => {
  const { currentUser, logout } = useStore();
  const { path, navigate } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setUserDropdownOpen(false);
  }, [path]);

  // Discrete administrator shortcut: Ctrl+Shift+A (or Cmd+Shift+A) opens /admin/login
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        navigate('/admin/login');
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const serviceLinks = [
    { name: 'Recruitment & Talent Acquisition', href: '/services/recruitment', desc: 'Direct-hire & specialized placement' },
    { name: 'Temporary & Contract Staffing', href: '/services/contract-staffing', desc: 'Rapid deployment for seasonal & project needs' },
    { name: 'Permanent Placement', href: '/services/permanent-placement', desc: 'Long-term core leadership & operational teams' },
    { name: 'Industrial & Factory Workforce', href: '/services/industrial-workforce', desc: 'Refinery, FTZ & plant workforce solutions' },
    { name: 'Workforce Outsourcing', href: '/services/workforce-outsourcing', desc: 'Full employment liability & payroll management' },
    { name: 'HR & Workforce Support', href: '/services/hr-support', desc: 'Policy formulation, compliance & audits' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return path === '/';
    return path.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200/90 shadow-xs">
      {/* Top Utility Bar */}
      <div className="bg-[#0B1E36] text-white text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Contact snippets */}
          <div className="flex items-center flex-wrap gap-4 sm:gap-6 text-slate-300">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#11851E]" />
              <a href="tel:09116176563" className="hover:underline">09116176563</a>
              <span className="text-slate-500">|</span>
              <a href="tel:09022542150" className="hover:underline">09022542150</a>
            </span>
            <span className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#11851E]" />
              <a href="mailto:info@fjworkforce.com.ng" className="hover:underline">info@fjworkforce.com.ng</a>
            </span>
            <span className="hidden lg:inline text-slate-400">
              Eleko Beach Road, Ibeju-Lekki, Lagos
            </span>
          </div>

          {/* Operating Hours & Hub Status */}
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] text-slate-300">
            <span className="hidden sm:inline text-slate-400">
              Hours: Mon – Fri (8:00 AM – 5:00 PM)
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Ibeju-Lekki Hub Active
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') && path === '/'
                  ? 'text-[#045B0D] font-bold bg-[#E8F5E9]/70'
                  : 'text-slate-700 hover:text-[#0B1E36] hover:bg-slate-100'
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/about')
                  ? 'text-[#045B0D] font-bold bg-[#E8F5E9]/70'
                  : 'text-slate-700 hover:text-[#0B1E36] hover:bg-slate-100'
              }`}
            >
              About Us
            </Link>

            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                onMouseEnter={() => setServicesDropdownOpen(true)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/services')
                    ? 'text-[#045B0D] font-bold bg-[#E8F5E9]/70'
                    : 'text-slate-700 hover:text-[#0B1E36] hover:bg-slate-100'
                }`}
                aria-expanded={servicesDropdownOpen}
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {servicesDropdownOpen && (
                <div
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                  className="absolute left-0 mt-1 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/80 rounded-t-xl flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Workforce Solutions
                    </span>
                    <Link
                      to="/services"
                      className="text-xs font-bold text-[#045B0D] hover:underline"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="py-1">
                    {serviceLinks.map((service) => (
                      <Link
                        key={service.href}
                        to={service.href}
                        className="block px-4 py-2.5 hover:bg-slate-50 transition-colors group"
                      >
                        <div className="text-sm font-semibold text-slate-800 group-hover:text-[#045B0D] transition-colors">
                          {service.name}
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1">
                          {service.desc}
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="p-3 border-t border-slate-100 bg-emerald-50/50 rounded-b-xl flex items-center justify-between">
                    <span className="text-xs text-slate-600">Need customized staffing?</span>
                    <Link
                      to="/request-staff"
                      className="text-xs font-bold text-[#045B0D] hover:text-[#11851E] flex items-center gap-1"
                    >
                      Request Staff <ChevronDown className="w-3 h-3 -rotate-90" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/jobs"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/jobs')
                  ? 'text-[#045B0D] font-bold bg-[#E8F5E9]/70'
                  : 'text-slate-700 hover:text-[#0B1E36] hover:bg-slate-100'
              }`}
            >
              Find Jobs
            </Link>

            <Link
              to="/employers"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/employers')
                  ? 'text-[#045B0D] font-bold bg-[#E8F5E9]/70'
                  : 'text-slate-700 hover:text-[#0B1E36] hover:bg-slate-100'
              }`}
            >
              Employers
            </Link>

            <Link
              to="/contact"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/contact')
                  ? 'text-[#045B0D] font-bold bg-[#E8F5E9]/70'
                  : 'text-slate-700 hover:text-[#0B1E36] hover:bg-slate-100'
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Auth & CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {currentUser ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 transition-all text-left"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white ${
                    currentUser.role === 'admin' ? 'bg-[#045B0D]' : 'bg-[#0B1E36]'
                  }`}>
                    {currentUser.fullName.charAt(0)}
                  </div>
                  <div className="hidden xl:block">
                    <div className="text-xs font-bold text-slate-800 leading-tight">
                      {currentUser.fullName}
                    </div>
                    <div className="text-[10px] text-slate-500 capitalize">
                      {currentUser.role}
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-800">{currentUser.fullName}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                    </div>

                    {currentUser.role === 'admin' ? (
                      <>
                        <Link
                          to="/admin"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#045B0D]"
                        >
                          <Shield className="w-4 h-4 text-[#045B0D]" />
                          <span>Admin ATS Dashboard</span>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/candidate/dashboard"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#045B0D]"
                        >
                          <Briefcase className="w-4 h-4 text-[#045B0D]" />
                          <span>Candidate Dashboard</span>
                        </Link>
                        <Link
                          to="/candidate/profile"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#045B0D]"
                        >
                          <FileText className="w-4 h-4 text-slate-500" />
                          <span>My Profile & CV</span>
                        </Link>
                      </>
                    )}

                    <div className="border-t border-slate-100 my-1" />

                    <button
                      type="button"
                      onClick={() => logout()}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-[#0B1E36] hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-[#0B1E36] hover:bg-[#071526] rounded-lg transition-all shadow-xs"
                >
                  Register
                </Link>
              </div>
            )}

            <Link
              to="/request-staff"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-[#045B0D] hover:bg-[#11851E] rounded-lg shadow-sm hover:shadow transition-all"
            >
              <Building2 className="w-4 h-4" />
              <span>Request Staff</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {currentUser && (
              <Link
                to={currentUser.role === 'admin' ? '/admin' : '/candidate/dashboard'}
                className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold flex items-center gap-1"
              >
                <UserIcon className="w-4 h-4 text-[#045B0D]" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#11851E]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top duration-200">
          <div className="space-y-1 py-2">
            <Link
              to="/"
              className={`block px-3 py-2.5 rounded-lg text-base font-semibold ${
                isActive('/') && path === '/' ? 'bg-[#E8F5E9] text-[#045B0D]' : 'text-slate-700'
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`block px-3 py-2.5 rounded-lg text-base font-semibold ${
                isActive('/about') ? 'bg-[#E8F5E9] text-[#045B0D]' : 'text-slate-700'
              }`}
            >
              About Us
            </Link>

            {/* Mobile Services Accordion */}
            <div className="py-1">
              <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                Services
              </div>
              <div className="pl-3 space-y-1">
                {serviceLinks.map((service) => (
                  <Link
                    key={service.href}
                    to={service.href}
                    className="block px-3 py-2 text-sm text-slate-600 hover:text-[#045B0D] hover:bg-slate-50 rounded-md"
                  >
                    {service.name}
                  </Link>
                ))}
                <Link
                  to="/services"
                  className="block px-3 py-2 text-sm font-bold text-[#045B0D]"
                >
                  All Services Overview &rarr;
                </Link>
              </div>
            </div>

            <Link
              to="/jobs"
              className={`block px-3 py-2.5 rounded-lg text-base font-semibold ${
                isActive('/jobs') ? 'bg-[#E8F5E9] text-[#045B0D]' : 'text-slate-700'
              }`}
            >
              Find Jobs
            </Link>

            <Link
              to="/employers"
              className={`block px-3 py-2.5 rounded-lg text-base font-semibold ${
                isActive('/employers') ? 'bg-[#E8F5E9] text-[#045B0D]' : 'text-slate-700'
              }`}
            >
              Employers
            </Link>

            <Link
              to="/contact"
              className={`block px-3 py-2.5 rounded-lg text-base font-semibold ${
                isActive('/contact') ? 'bg-[#E8F5E9] text-[#045B0D]' : 'text-slate-700'
              }`}
            >
              Contact Us
            </Link>

            <Link
              to="/faq"
              className={`block px-3 py-2.5 rounded-lg text-base font-semibold ${
                isActive('/faq') ? 'bg-[#E8F5E9] text-[#045B0D]' : 'text-slate-700'
              }`}
            >
              FAQs
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2">
            {currentUser ? (
              <>
                <div className="px-3 py-2 bg-slate-50 rounded-lg mb-2">
                  <p className="text-xs text-slate-500">Signed in as</p>
                  <p className="text-sm font-bold text-slate-800">{currentUser.fullName}</p>
                  <p className="text-xs text-slate-500 capitalize">{currentUser.role}</p>
                </div>

                {currentUser.role === 'admin' ? (
                  <Link
                    to="/admin"
                    className="block w-full py-2.5 px-4 text-center text-sm font-bold text-white bg-[#045B0D] rounded-lg"
                  >
                    Go to Admin ATS
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/candidate/dashboard"
                      className="block w-full py-2.5 px-4 text-center text-sm font-bold text-white bg-[#0B1E36] rounded-lg"
                    >
                      Candidate Dashboard
                    </Link>
                    <Link
                      to="/candidate/profile"
                      className="block w-full py-2.5 px-4 text-center text-sm font-bold text-slate-700 bg-slate-100 rounded-lg"
                    >
                      Edit Profile & CV
                    </Link>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => logout()}
                  className="block w-full py-2.5 px-4 text-center text-sm font-bold text-red-600 bg-red-50 rounded-lg"
                >
                  Log Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  className="py-2.5 px-4 text-center text-sm font-bold text-slate-700 bg-slate-100 rounded-lg"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="py-2.5 px-4 text-center text-sm font-bold text-white bg-[#0B1E36] rounded-lg"
                >
                  Register
                </Link>
              </div>
            )}

            <Link
              to="/request-staff"
              className="block w-full py-3 px-4 text-center text-sm font-bold text-white bg-[#045B0D] hover:bg-[#11851E] rounded-lg shadow-sm"
            >
              Request Workforce Solutions
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
