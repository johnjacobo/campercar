import React, { useState, useEffect } from 'react';
import { Compass, Menu, X, Landmark, Heart, Shield, User } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    { id: 'home', label: 'Inicio' },
    { id: 'fleet', label: 'Explorar Campers' },
    { id: 'guide', label: 'Guía Fuerteventura' },
    { id: 'partner', label: 'Hazte Socio' },
    { id: 'bookings', label: 'Mis Viajes' }
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} glass`}>
      <div className="container flex align-center justify-between">
        {/* Logo */}
        <a href="#home" className="logo-container" onClick={(e) => { e.preventDefault(); setActiveTab('home'); }} style={{ gap: 0 }}>
          <div style={{ background: 'white', padding: '4px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', height: '48px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
            <img 
              src={import.meta.env.BASE_URL + 'images/logo.png'} 
              alt="CamperVentura Logo" 
              style={{ height: '100%', objectFit: 'contain' }} 
            />
          </div>
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

        {/* Host CTA & Profile Mockup */}
        <div className="flex align-center" style={{ gap: '1rem' }}>
          <button 
            className="btn btn-primary" 
            style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem', display: activeTab === 'partner' ? 'none' : 'block' }}
            onClick={() => { setActiveTab('partner'); window.scrollTo(0, 0); }}
          >
            Alquila tu Camper
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
            Alquila tu Camper
          </button>
        </div>
      )}
    </nav>
  );
}
