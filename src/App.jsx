import React, { useState, useEffect } from 'react';
import { 
  Compass, Star, MapPin, Calendar, Users, CheckCircle, 
  TrendingUp, Sparkles, Map, Plus, Search, Award, Info, 
  CalendarDays, ShieldCheck, HeartHandshake, Eye, X, ArrowUpRight
} from 'lucide-react';

// Import local components
import Navbar from './components/Navbar';
import CamperCard from './components/CamperCard';
import BookingModal from './components/BookingModal';
import AddCamperForm from './components/AddCamperForm';
import AdventureMap from './components/AdventureMap';

// Import seed data
import { initialCampers } from './data/campers';

// Import Language Context
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCamper, setSelectedCamper] = useState(null);
  const [campers, setCampers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const { language, t } = useLanguage();
  
  // Search state
  const [searchLocation, setSearchLocation] = useState('');
  const [searchStartDate, setSearchStartDate] = useState('');
  const [searchEndDate, setSearchEndDate] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchGuests, setSearchGuests] = useState('');

  // Booking details state
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Load campers and bookings on mount
  useEffect(() => {
    loadCampers();
    loadBookings();
  }, []);

  // Mouse movement tracking for parallax background
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return import.meta.env.BASE_URL + cleanPath;
  };

  const loadCampers = () => {
    // Get custom listings from localStorage
    const storedCustom = JSON.parse(localStorage.getItem('camper_custom_listings') || '[]');
    setCampers([...storedCustom, ...initialCampers]);
  };

  const loadBookings = () => {
    const storedBookings = JSON.parse(localStorage.getItem('camper_bookings') || '[]');
    setBookings(storedBookings);
  };

  const handleBookingSuccess = () => {
    loadBookings();
    setActiveTab('bookings');
    setSelectedCamper(null);
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm(t('bookings.cancel_confirm'))) {
      const storedBookings = JSON.parse(localStorage.getItem('camper_bookings') || '[]');
      const updated = storedBookings.filter(b => b.id !== bookingId);
      localStorage.setItem('camper_bookings', JSON.stringify(updated));
      setBookings(updated);
    }
  };

  const getLocalized = (field) => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[language] || field['es'] || '';
  };

  const getTypeLabel = (type) => {
    const map = {
      'camper': 'fleet.type_camper',
      'Furgoneta Camper': 'fleet.type_camper',
      'motorhome': 'fleet.type_motorhome',
      'Autocaravana': 'fleet.type_motorhome',
      '4x4': 'fleet.type_4x4',
      '4x4 con Tienda': 'fleet.type_4x4'
    };
    const key = map[type];
    return key ? t(key) : type;
  };

  // Filter campers based on search inputs
  const filteredCampers = campers.filter(camper => {
    // Filter by type
    if (searchType) {
      const typeMap = {
        'Furgoneta Camper': 'camper',
        'Autocaravana': 'motorhome',
        '4x4 con Tienda': '4x4'
      };
      const camperTypeNormalized = typeMap[camper.type] || camper.type;
      const searchTypeNormalized = typeMap[searchType] || searchType;
      if (camperTypeNormalized !== searchTypeNormalized) return false;
    }
    
    // Filter by guests capacity
    if (searchGuests && camper.passengers < Number(searchGuests)) return false;
    
    // Filter by location (case insensitive match)
    if (searchLocation) {
      const locMatch = camper.locations.some(loc => 
        loc.toLowerCase().includes(searchLocation.toLowerCase())
      );
      if (!locMatch) return false;
    }
    
    return true;
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveTab('fleet');
  };

  // Booking Pricing Calculations
  const calculateBookingNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 0;
  };

  const getCostBreakdown = (pricePerNight) => {
    const nights = calculateBookingNights();
    const base = pricePerNight * nights;
    const cleaning = 45; // Flat rate
    const service = Math.round(base * 0.08); // 8% fee
    const total = base + cleaning + service;
    return { base, cleaning, service, total };
  };

  const nights = calculateBookingNights();
  const breakdown = selectedCamper ? getCostBreakdown(selectedCamper.price) : { base: 0, cleaning: 0, service: 0, total: 0 };

  return (
    <>
      {/* Interactive Parallax Background */}
      <div 
        className="page-parallax-bg" 
        style={{ 
          transform: `scale(1.06) translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)`,
          backgroundImage: `url('${getImageUrl('images/epic_beach.png')}')`
        }} 
      />
      <div className="page-overlay" />

      {/* Dynamic Header / Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setSelectedCamper(null); }} />

      {/* VIEW: Home Page */}
      {activeTab === 'home' && !selectedCamper && (
        <div className="animate-fade-in">
          {/* Hero Section with Drone Video Background */}
          <section className="hero-section">
            <div className="hero-video-container">
              <video 
                className="hero-video" 
                src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-waves-crashing-on-a-beach-of-golden-sand-34320-large.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
              />
            </div>
            <div className="hero-overlay" />
            <div className="hero-content">
              <span className="hero-tagline animate-fade-in">{t('hero.tagline')}</span>
              <h1 className="hero-title animate-fade-in" style={{ animationDelay: '0.2s' }}>
                {t('hero.title')}
              </h1>
              <p className="hero-desc animate-fade-in" style={{ animationDelay: '0.4s' }}>
                {t('hero.desc')}
              </p>
              <div className="hero-buttons animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <button className="btn btn-primary" onClick={() => setActiveTab('fleet')}>
                  {t('hero.btn_fleet')} <ArrowUpRight size={18} />
                </button>
                <button className="btn btn-secondary" onClick={() => setActiveTab('guide')}>
                  {t('hero.btn_guide')}
                </button>
              </div>
            </div>
          </section>

          {/* Search/Filter Bar Container */}
          <div className="search-container">
            <form onSubmit={handleSearchSubmit} className="search-bar glass">
              <div className="search-group">
                <label>
                  <MapPin size={14} /> {t('search.where')}
                </label>
                <input 
                  type="text" 
                  placeholder={t('search.where_placeholder')} 
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>

              <div className="search-group">
                <label>
                  <CalendarDays size={14} /> {t('search.start')}
                </label>
                <input 
                  type="date" 
                  value={searchStartDate}
                  onChange={(e) => setSearchStartDate(e.target.value)}
                />
              </div>

              <div className="search-group">
                <label>
                  <CalendarDays size={14} /> {t('search.end')}
                </label>
                <input 
                  type="date" 
                  value={searchEndDate}
                  onChange={(e) => setSearchEndDate(e.target.value)}
                />
              </div>

              <div className="search-group">
                <label>
                  <Users size={14} /> {t('search.guests')}
                </label>
                <select 
                  value={searchGuests}
                  onChange={(e) => setSearchGuests(e.target.value)}
                >
                  <option value="">{t('search.any')}</option>
                  <option value="2">{t('search.guests_2')}</option>
                  <option value="3">{t('search.guests_3')}</option>
                  <option value="4">{t('search.guests_4')}</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary">
                <Search size={18} /> {t('search.btn_search')}
              </button>
            </form>
          </div>

          {/* Featured Adventure Fleet */}
          <section className="section container">
            <div className="section-header">
              <span className="section-subtitle">{t('fleet.recommended_subtitle')}</span>
              <h2>{t('fleet.recommended_title')}</h2>
              <p>{t('fleet.recommended_desc')}</p>
            </div>

            <div className="grid grid-cols-3">
              {campers.slice(0, 3).map((camper) => (
                <CamperCard 
                  key={camper.id} 
                  camper={camper} 
                  onViewDetails={() => setSelectedCamper(camper)} 
                />
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
              <button className="btn btn-secondary" onClick={() => setActiveTab('fleet')}>
                {t('fleet.btn_all_fleet')} ({campers.length} campers)
              </button>
            </div>
          </section>

          {/* Experience / Why Us Section */}
          <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
            <div className="container">
              <div className="section-header">
                <span className="section-subtitle">{t('why_us.subtitle')}</span>
                <h2>{t('why_us.title')}</h2>
                <p>{t('why_us.desc')}</p>
              </div>

              <div className="grid grid-cols-3" style={{ gap: '3rem' }}>
                <div style={{ textAlign: 'center', padding: '1rem' }}>
                  <div className="success-icon" style={{ background: 'rgba(255, 107, 53, 0.1)', color: 'var(--accent-orange)', border: '1px solid rgba(255, 107, 53, 0.2)' }}>
                    <ShieldCheck size={28} />
                  </div>
                  <h4 style={{ margin: '1rem 0 0.5rem' }}>{t('why_us.card1_title')}</h4>
                  <p style={{ fontSize: '0.95rem' }}>{t('why_us.card1_desc')}</p>
                </div>

                <div style={{ textAlign: 'center', padding: '1rem' }}>
                  <div className="success-icon" style={{ background: 'rgba(230, 194, 128, 0.1)', color: 'var(--accent-gold)', border: '1px solid rgba(230, 194, 128, 0.2)' }}>
                    <Sparkles size={28} />
                  </div>
                  <h4 style={{ margin: '1rem 0 0.5rem' }}>{t('why_us.card2_title')}</h4>
                  <p style={{ fontSize: '0.95rem' }}>{t('why_us.card2_desc')}</p>
                </div>

                <div style={{ textAlign: 'center', padding: '1rem' }}>
                  <div className="success-icon" style={{ background: 'rgba(2, 128, 144, 0.1)', color: 'var(--accent-teal)', border: '1px solid rgba(2, 128, 144, 0.2)' }}>
                    <HeartHandshake size={28} />
                  </div>
                  <h4 style={{ margin: '1rem 0 0.5rem' }}>{t('why_us.card3_title')}</h4>
                  <p style={{ fontSize: '0.95rem' }}>{t('why_us.card3_desc')}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* VIEW: Fleet / Catalog */}
      {activeTab === 'fleet' && !selectedCamper && (
        <div className="animate-fade-in" style={{ paddingTop: '120px' }}>
          <section className="container" style={{ marginBottom: '5rem' }}>
            <div className="section-header" style={{ marginBottom: '3rem' }}>
              <span className="section-subtitle">{t('fleet.subtitle')}</span>
              <h2>{t('fleet.title')}</h2>
              <p>{t('fleet.desc')}</p>
            </div>

            {/* Filter controls */}
            <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '3rem', border: '1px solid var(--border-color)' }}>
              <div className="grid grid-cols-4" style={{ gap: '1.5rem' }}>
                <div className="form-group">
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-gold)' }}>{t('fleet.filter_location')}</label>
                  <input 
                    type="text" 
                    placeholder={t('search.where_placeholder')} 
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    style={{ background: 'var(--bg-primary)', padding: '0.65rem' }}
                  />
                </div>

                <div className="form-group">
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-gold)' }}>{t('fleet.filter_type')}</label>
                  <select 
                    value={searchType} 
                    onChange={(e) => setSearchType(e.target.value)}
                    style={{ background: 'var(--bg-primary)', padding: '0.65rem' }}
                  >
                    <option value="">{t('fleet.all_types')}</option>
                    <option value="camper">{t('fleet.type_camper')}</option>
                    <option value="motorhome">{t('fleet.type_motorhome')}</option>
                    <option value="4x4">{t('fleet.type_4x4')}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-gold)' }}>{t('fleet.filter_guests')}</label>
                  <select 
                    value={searchGuests} 
                    onChange={(e) => setSearchGuests(e.target.value)}
                    style={{ background: 'var(--bg-primary)', padding: '0.65rem' }}
                  >
                    <option value="">{t('fleet.cap_any')}</option>
                    <option value="2">{t('fleet.cap_2')}</option>
                    <option value="3">{t('fleet.cap_3')}</option>
                    <option value="4">{t('fleet.cap_4')}</option>
                  </select>
                </div>

                <div className="form-group" style={{ justifyContent: 'center' }}>
                  <button 
                    className="btn btn-secondary" 
                    style={{ width: '100%', padding: '0.65rem' }}
                    onClick={() => {
                      setSearchLocation('');
                      setSearchType('');
                      setSearchGuests('');
                    }}
                  >
                    {t('fleet.btn_clear')}
                  </button>
                </div>
              </div>
            </div>

            {/* Listings Grid */}
            {filteredCampers.length > 0 ? (
              <div className="grid grid-cols-3">
                {filteredCampers.map((camper) => (
                  <CamperCard 
                    key={camper.id} 
                    camper={camper} 
                    onViewDetails={() => setSelectedCamper(camper)} 
                  />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '4rem 1rem' }} className="glass">
                <Info size={40} style={{ color: 'var(--accent-gold)', marginBottom: '1.5rem' }} />
                <h3>{t('fleet.no_campers_title')}</h3>
                <p style={{ marginTop: '0.5rem' }}>{t('fleet.no_campers_desc')}</p>
              </div>
            )}
          </section>
        </div>
      )}

      {/* VIEW: Fuerteventura Adventure Guide */}
      {activeTab === 'guide' && !selectedCamper && (
        <div className="animate-fade-in" style={{ paddingTop: '120px' }}>
          <section className="guide-section section">
            <div className="container">
              <div className="section-header">
                <span className="section-subtitle">{t('map.subtitle')}</span>
                <h2>{t('map.title')}</h2>
                <p>{t('map.desc')}</p>
              </div>

              {/* Vector SVG map component */}
              <AdventureMap />
            </div>
          </section>
        </div>
      )}

      {/* VIEW: Become a Partner (Hazte Socio) */}
      {activeTab === 'partner' && !selectedCamper && (
        <div className="animate-fade-in" style={{ paddingTop: '120px' }}>
          <section className="partner-hero">
            <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
              <span className="section-subtitle">{t('partner.subtitle')}</span>
              <h2>{t('partner.title')}</h2>
              <p style={{ marginTop: '0.5rem' }}>{t('partner.desc')}</p>
            </div>
          </section>

          <section className="container">
            {/* Multi-step listing form component */}
            <AddCamperForm onAddSuccess={() => { loadCampers(); setActiveTab('fleet'); }} />
          </section>
        </div>
      )}

      {/* VIEW: User Bookings (Mis Viajes) */}
      {activeTab === 'bookings' && !selectedCamper && (
        <div className="animate-fade-in" style={{ paddingTop: '120px' }}>
          <section className="container" style={{ marginBottom: '6rem' }}>
            <div className="section-header">
              <span className="section-subtitle">{t('bookings.subtitle')}</span>
              <h2>{t('bookings.title')}</h2>
              <p>{t('bookings.desc')}</p>
            </div>

            {bookings.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                {bookings.map((booking) => (
                  <div key={booking.id} className="glass" style={{ padding: '1.75rem', borderRadius: 'var(--radius-md)', display: 'grid', gridTemplateColumns: '1.2fr 2fr 1fr', gap: '2rem', alignItems: 'center', border: '1px solid var(--border-color)' }}>
                    <img 
                      src={getImageUrl(booking.camperImage)} 
                      alt={booking.camperTitle} 
                      style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} 
                    />
                    <div>
                      <div className="flex align-center gap-2" style={{ gap: '0.5rem', marginBottom: '0.35rem' }}>
                        <span className="badge badge-adventure" style={{ fontSize: '0.65rem' }}>{getTypeLabel(booking.camperType)}</span>
                        <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>{booking.bookingCode}</span>
                      </div>
                      <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{booking.camperTitle}</h4>
                      <p style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-secondary)' }}>
                        <Calendar size={14} />
                        <span>{t('bookings.dates')}: {booking.startDate} {language === 'es' ? 'al' : language === 'en' ? 'to' : language === 'de' ? 'bis' : language === 'fr' ? 'au' : 'al'} {booking.endDate}</span>
                      </p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        {t('bookings.duration')}: {booking.nights} {t('bookings.nights')} | {language === 'es' ? 'Reservado' : language === 'en' ? 'Booked' : language === 'de' ? 'Gebucht' : language === 'fr' ? 'Réservé' : 'Prenotato'} el: {booking.bookedAt}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div>
                        <span style={{ fontSize: '0.8rem', display: 'block', color: 'var(--text-secondary)' }}>{t('bookings.price_total')}</span>
                        <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--accent-orange)' }}>{booking.totalPrice}€</span>
                      </div>
                      <button 
                        className="btn" 
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', border: '1px solid rgba(255,0,0,0.2)', color: '#ff4d4d', background: 'rgba(255,0,0,0.05)' }}
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        {t('bookings.btn_cancel')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '5rem 1rem', maxWidth: '600px', margin: '0 auto' }} className="glass">
                <Compass size={44} style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }} className="animate-spin-slow" />
                <h3>{t('bookings.no_bookings_title')}</h3>
                <p style={{ marginTop: '0.5rem', marginBottom: '2rem' }}>{t('bookings.no_bookings_desc')}</p>
                <button className="btn btn-primary" onClick={() => setActiveTab('fleet')}>
                  {t('bookings.btn_explore')}
                </button>
              </div>
            )}
          </section>
        </div>
      )}

      {/* VIEW: Camper Detailed View */}
      {selectedCamper && (
        <div className="animate-fade-in" style={{ paddingTop: '100px', paddingBottom: '5rem' }}>
          <section className="container">
            {/* Back Navigation button */}
            <button 
              className="btn btn-secondary" 
              style={{ marginBottom: '2rem' }}
              onClick={() => setSelectedCamper(null)}
            >
              {t('details.back')}
            </button>

            <div className="glass" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
              {/* Image Gallery Grid */}
              <div className="detail-gallery">
                <div className="gallery-main">
                  <img src={getImageUrl(selectedCamper.images[0])} alt={selectedCamper.title} />
                </div>
                <div className="gallery-thumbs">
                  <div className="gallery-thumb">
                    <img src={getImageUrl(selectedCamper.images[1] || selectedCamper.images[0])} alt={selectedCamper.title} />
                  </div>
                  <div className="gallery-thumb">
                    <img src={getImageUrl(selectedCamper.images[2] || selectedCamper.images[1] || selectedCamper.images[0])} alt={selectedCamper.title} />
                  </div>
                </div>
              </div>

              {/* Detail Body */}
              <div className="detail-body">
                {/* Left side: Information */}
                <div className="detail-info-section">
                  <span className="badge badge-adventure" style={{ marginBottom: '0.5rem' }}>{getTypeLabel(selectedCamper.type)}</span>
                  <h2>{selectedCamper.title}</h2>
                  
                  {/* Host and Rating info */}
                  <div className="detail-host-badge">
                    <div className="detail-host-avatar">
                      {selectedCamper.host.avatar}
                    </div>
                    <div>
                      <span style={{ fontWeight: '600', color: 'white', display: 'block' }}>{t('details.host_by')} {selectedCamper.host.name}</span>
                      <span>{getLocalized(selectedCamper.host.status)}</span>
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--accent-gold)' }}>
                      <Star size={16} fill="var(--accent-gold)" />
                      <strong style={{ fontSize: '1.1rem' }}>{selectedCamper.rating}</strong>
                      <span style={{ color: 'var(--text-muted)' }}>({selectedCamper.reviewsCount} {t('details.reviews')})</span>
                    </div>
                  </div>

                  <p className="detail-description">
                    {getLocalized(selectedCamper.description)}
                  </p>

                  <div className="detail-amenities">
                    <h3>{t('details.amenities_title')}</h3>
                    <div className="amenities-list">
                      {selectedCamper.amenities.map((amenity, idx) => (
                        <div key={idx} className="amenity-item">
                          <CheckCircle size={18} />
                          <span>{getLocalized(amenity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side: Sticky Booking Card Widget */}
                <div className="booking-card glass" style={{ background: 'var(--bg-secondary)' }}>
                  <div className="booking-price">
                    {selectedCamper.price}€ <span>/ {t('details.nights_count')}</span>
                  </div>

                  <form className="booking-form" onSubmit={(e) => { e.preventDefault(); if(nights > 0) setShowBookingModal(true); }}>
                    <div className="booking-field">
                      <label>{t('details.delivery_location')}</label>
                      <select>
                        {selectedCamper.locations.map(loc => (
                          <option key={loc} value={loc}>{loc} (Fuerteventura)</option>
                        ))}
                      </select>
                    </div>

                    <div className="booking-field">
                      <label>{t('details.pickup_date')}</label>
                      <input 
                        type="date" 
                        value={checkInDate} 
                        onChange={(e) => setCheckInDate(e.target.value)} 
                        required 
                      />
                    </div>

                    <div className="booking-field">
                      <label>{t('details.return_date')}</label>
                      <input 
                        type="date" 
                        value={checkOutDate} 
                        onChange={(e) => setCheckOutDate(e.target.value)} 
                        required 
                      />
                    </div>

                    {nights > 0 ? (
                      <>
                        <div className="booking-breakdown animate-scale-in">
                          <div className="breakdown-row">
                            <span>{selectedCamper.price}€ x {nights} {t('details.nights_count')}</span>
                            <span>{breakdown.base}€</span>
                          </div>
                          <div className="breakdown-row">
                            <span>{t('details.cleaning_fee')}</span>
                            <span>{breakdown.cleaning}€</span>
                          </div>
                          <div className="breakdown-row">
                            <span>{t('details.service_fee')}</span>
                            <span>{breakdown.service}€</span>
                          </div>
                          <div className="breakdown-row total">
                            <span>{t('details.total')}</span>
                            <span>{breakdown.total}€</span>
                          </div>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                          {t('details.btn_book')}
                        </button>
                      </>
                    ) : (
                      <button type="button" className="btn btn-secondary" style={{ width: '100%', cursor: 'not-allowed' }} disabled>
                        {t('details.btn_invalid_dates')}
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Confirmation Booking Modal Popup */}
      {showBookingModal && selectedCamper && (
        <BookingModal 
          camper={selectedCamper}
          dates={{ startDate: checkInDate, endDate: checkOutDate }}
          totalNights={nights}
          costBreakdown={breakdown}
          onClose={() => setShowBookingModal(false)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <a href="#home" className="logo-container" onClick={(e) => { e.preventDefault(); setActiveTab('home'); }} style={{ alignSelf: 'flex-start' }}>
              <img 
                src={getImageUrl('images/logo.png?v=2')} 
                alt="CamperVentura Logo" 
                style={{ 
                  height: '75px', 
                  objectFit: 'contain'
                }} 
              />
            </a>
            <p style={{ marginTop: '0.5rem' }}>{t('footer.desc')}</p>
          </div>

          <div className="footer-links">
            <h4>{t('footer.col_platform')}</h4>
            <ul>
              <li><a href="#fleet" onClick={(e) => { e.preventDefault(); setActiveTab('fleet'); }}>{t('navbar.fleet')}</a></li>
              <li><a href="#partner" onClick={(e) => { e.preventDefault(); setActiveTab('partner'); }}>{t('navbar.partner')}</a></li>
              <li><a href="#guide" onClick={(e) => { e.preventDefault(); setActiveTab('guide'); }}>{t('navbar.guide')}</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>{t('footer.col_rules')}</h4>
            <ul>
              <li><a href="#" onClick={(e) => e.preventDefault()}>{t('footer.rule_overnight')}</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>{t('footer.rule_waste')}</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>{t('footer.rule_terms')}</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>{t('footer.col_contact')}</h4>
            <ul style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              <li>{t('footer.address')}</li>
              <li>soporte@camperventura.com</li>
              <li>+34 928 00 00 00</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} CamperVentura. {t('footer.copyright')}</p>
        </div>
      </footer>
    </>
  );
}
