import React, { useState, useEffect } from 'react';
import { Compass, Menu, X, Landmark, Heart, Shield, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ activeTab, setActiveTab }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
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

  // Handle click outside of custom dropdown to close it
  useEffect(() => {
    if (!isLangMenuOpen) return;
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.lang-selector-wrapper')) {
        setIsLangMenuOpen(false);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [isLangMenuOpen]);

  const navItems = [
    { id: 'home', label: t('navbar.home') },
    { id: 'fleet', label: t('navbar.fleet') },
    { id: 'guide', label: t('navbar.guide') },
    { id: 'partner', label: t('navbar.partner') },
    { id: 'bookings', label: t('navbar.bookings') }
  ];

  const langDetails = {
    es: { flagUrl: "https://flagcdn.com/w40/es.png", name: "Español" },
    en: { flagUrl: "https://flagcdn.com/w40/gb.png", name: "English" },
    de: { flagUrl: "https://flagcdn.com/w40/de.png", name: "Deutsch" },
    fr: { flagUrl: "https://flagcdn.com/w40/fr.png", name: "Français" },
    it: { flagUrl: "https://flagcdn.com/w40/it.png", name: "Italiano" }
  };

  return (
    <>
      <style>{`
        .lang-item-btn:hover {
          background: rgba(255, 255, 255, 0.05) !important;
        }
        .lang-trigger-btn:hover {
          background: rgba(255, 255, 255, 0.15) !important;
          transform: translateY(-1px);
        }
        @media (max-width: 768px) {
          .desktop-only-btn {
            display: none !important;
          }
        }
      `}</style>

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

          {/* Header Actions */}
          <div className="flex align-center" style={{ gap: '1rem' }}>
            
            {/* Desktop-only: "Alquila tu Camper" CTA */}
            <button 
              className="btn btn-primary desktop-only-btn" 
              style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem', display: activeTab === 'partner' ? 'none' : 'block' }}
              onClick={() => { setActiveTab('partner'); window.scrollTo(0, 0); }}
            >
              {t('navbar.cta_rent')}
            </button>
            
            {/* Profile Avatar (Visible on both desktop & mobile) */}
            <div className="detail-host-avatar" style={{ cursor: 'pointer', width: '36px', height: '36px' }} title="Mi Perfil">
              <User size={18} />
            </div>

            {/* Custom Language Selector Dropdown (Visible on both desktop & mobile) */}
            <div className="lang-selector-wrapper" style={{ position: 'relative' }}>
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} 
                className="lang-trigger-btn glass"
                style={{
                  padding: '0.45rem 0.65rem',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  outline: 'none',
                  transition: 'all var(--transition-normal)',
                  width: '42px',
                  height: '36px'
                }}
                title="Seleccionar Idioma / Select Language"
              >
                <img 
                  src={langDetails[language]?.flagUrl} 
                  alt={langDetails[language]?.name} 
                  style={{ width: '22px', height: '14px', objectFit: 'cover', borderRadius: '2px', display: 'block' }} 
                />
              </button>

              {isLangMenuOpen && (
                <div 
                  className="glass" 
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '0.5rem',
                    borderRadius: '10px',
                    background: 'rgba(22, 24, 31, 0.95)',
                    border: '1px solid var(--border-color)',
                    minWidth: '160px',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
                    zIndex: 1100,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '0.35rem',
                    animation: 'scaleIn 0.15s ease-out'
                  }}
                >
                  {Object.entries(langDetails).map(([code, details]) => (
                    <button
                      key={code}
                      onClick={() => {
                        setLanguage(code);
                        setIsLangMenuOpen(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.6rem 0.8rem',
                        borderRadius: '6px',
                        color: language === code ? 'var(--accent-orange)' : 'var(--text-primary)',
                        background: language === code ? 'rgba(255, 107, 53, 0.08)' : 'transparent',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontWeight: language === code ? '700' : '500',
                        fontSize: '0.85rem',
                        transition: 'background 0.15s ease',
                        width: '100%',
                        outline: 'none',
                        border: 'none'
                      }}
                      className="lang-item-btn"
                    >
                      <img 
                        src={details.flagUrl} 
                        alt={details.name} 
                        style={{ width: '18px', height: '12px', objectFit: 'cover', borderRadius: '1.5px' }} 
                      />
                      <span>{details.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Mobile Menu Toggle Button */}
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
    </>
  );
}
