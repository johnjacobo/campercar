import React, { useState, useEffect } from 'react';
import { Compass, Menu, X, Landmark, Heart, Shield, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ activeTab, setActiveTab }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t('navbar.home') },
    { id: 'fleet', label: t('navbar.fleet') },
    { id: 'guide', label: t('navbar.guide') },
    { id: 'partner', label: t('navbar.partner') },
    { id: 'bookings', label: t('navbar.bookings') }
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} glass`}>
      <div className="container flex align-center justify-between">
        {/* Logo */}
        <a href="#home" className="logo-container" onClick={(e) => { e.preventDefault(); setActiveTab('home'); }} style={{ padding: 0 }}>
          <img 
            src={import.meta.env.BASE_URL + 'images/logo.png?v=2'} 
            alt="CamperVentura Logo" 
            style={{ 
              height: isScrolled ? '70px' : '85px', 
              objectFit: 'contain',
              transition: 'height var(--transition-normal)'
            }} 
          />
        </a>

        {/* Desktop Links */}
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={activeTab === item.id ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(item.id);
                  window.scrollTo(0, 0);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Host CTA, Language Selector & Profile */}
        <div className="flex align-center" style={{ gap: '1rem' }}>
          {/* Language Selector Dropdown */}
          <div className="lang-selector" style={{ position: 'relative' }}>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)} 
              className="lang-select glass"
              style={{
                padding: '0.45rem 0.65rem',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontWeight: '700',
                outline: 'none',
                fontFamily: 'var(--font-headings)'
              }}
            >
              <option value="es" style={{ background: '#1c1e24' }}>🇪🇸 ES</option>
              <option value="en" style={{ background: '#1c1e24' }}>🇬🇧 EN</option>
              <option value="de" style={{ background: '#1c1e24' }}>🇩🇪 DE</option>
              <option value="fr" style={{ background: '#1c1e24' }}>🇫🇷 FR</option>
              <option value="it" style={{ background: '#1c1e24' }}>🇮🇹 IT</option>
            </select>
          </div>

          <button 
            className="btn btn-primary" 
            style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem', display: activeTab === 'partner' ? 'none' : 'block' }}
            onClick={() => { setActiveTab('partner'); window.scrollTo(0, 0); }}
          >
            {t('navbar.cta_rent')}
          </button>
          
          <div className="detail-host-avatar" style={{ cursor: 'pointer', width: '36px', height: '36px' }} title="Mi Perfil">
            <User size={18} />
          </div>
          
          {/* Mobile Menu Toggle */}
          <div className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="glass" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '1.5rem',
          gap: '1rem',
          borderBottom: '1px solid var(--border-color)',
          zIndex: 999
        }}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              style={{
                padding: '0.5rem 0',
                fontWeight: '600',
                color: activeTab === item.id ? 'var(--accent-orange)' : 'var(--text-primary)'
              }}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
                window.scrollTo(0, 0);
              }}
            >
              {item.label}
            </a>
          ))}
          <button 
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.5rem' }}
            onClick={() => {
              setActiveTab('partner');
              setIsMobileMenuOpen(false);
              window.scrollTo(0, 0);
            }}
          >
            {t('navbar.cta_rent')}
          </button>
        </div>
      )}
    </nav>
  );
}
