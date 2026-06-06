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

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCamper, setSelectedCamper] = useState(null);
  const [campers, setCampers] = useState([]);
  const [bookings, setBookings] = useState([]);
  
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
    if (window.confirm('¿Seguro que deseas cancelar esta aventura en fuerteventura?')) {
      const storedBookings = JSON.parse(localStorage.getItem('camper_bookings') || '[]');
      const updated = storedBookings.filter(b => b.id !== bookingId);
      localStorage.setItem('camper_bookings', JSON.stringify(updated));
      setBookings(updated);
    }
  };

  // Filter campers based on search inputs
  const filteredCampers = campers.filter(camper => {
    // Filter by type
    if (searchType && camper.type !== searchType) return false;
    
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
              {/* Drone video showing waves breaking on golden beach sands (simulating Fuerteventura) */}
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
              <span className="hero-tagline animate-fade-in">Fuerteventura, Islas Canarias</span>
              <h1 className="hero-title animate-fade-in" style={{ animationDelay: '0.2s' }}>
                No es un paseo más, es tu próxima aventura
              </h1>
              <p className="hero-desc animate-fade-in" style={{ animationDelay: '0.4s' }}>
                Alquila campers y autocaravanas locales para recorrer los volcanes, acantilados y playas salvajes de la isla del viento. Vive con total libertad.
              </p>
              <div className="hero-buttons animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <button className="btn btn-primary" onClick={() => setActiveTab('fleet')}>
                  Explorar Campers <ArrowUpRight size={18} />
                </button>
                <button className="btn btn-secondary" onClick={() => setActiveTab('guide')}>
                  Ver Guía de Spots
                </button>
              </div>
            </div>
          </section>

          {/* Search/Filter Bar Container */}
          <div className="search-container">
            <form onSubmit={handleSearchSubmit} className="search-bar glass">
              <div className="search-group">
                <label>
                  <MapPin size={14} /> Dónde recoger
                </label>
                <input 
                  type="text" 
                  placeholder="Ej. Corralejo, Aeropuerto..." 
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>

              <div className="search-group">
                <label>
                  <CalendarDays size={14} /> Inicio viaje
                </label>
                <input 
                  type="date" 
                  value={searchStartDate}
                  onChange={(e) => setSearchStartDate(e.target.value)}
                />
              </div>

              <div className="search-group">
                <label>
                  <CalendarDays size={14} /> Fin viaje
                </label>
                <input 
                  type="date" 
                  value={searchEndDate}
                  onChange={(e) => setSearchEndDate(e.target.value)}
                />
              </div>

              <div className="search-group">
                <label>
                  <Users size={14} /> Pasajeros
                </label>
                <select 
                  value={searchGuests}
                  onChange={(e) => setSearchGuests(e.target.value)}
                >
                  <option value="">Cualquiera</option>
                  <option value="2">2 personas</option>
                  <option value="3">3 personas</option>
                  <option value="4">4+ personas</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary">
                <Search size={18} /> Buscar
              </button>
            </form>
          </div>

          {/* Featured Adventure Fleet */}
          <section className="section container">
            <div className="section-header">
              <span className="section-subtitle">Flota de Aventura</span>
              <h2>Nuestras recomendadas para recorrer la isla</h2>
              <p>Vehículos seleccionados y equipados por locales que conocen cada rincón de Fuerteventura.</p>
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
                Ver todo el catálogo ({campers.length} campers)
              </button>
            </div>
          </section>

          {/* Experience / Why Us Section */}
          <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
            <div className="container">
              <div className="section-header">
                <span className="section-subtitle">Vive Fuerteventura</span>
                <h2>¿Por qué alquilar con nosotros?</h2>
                <p>Nuestra plataforma conecta viajeros con socios locales amantes del Caravaning.</p>
              </div>

              <div className="grid grid-cols-3" style={{ gap: '3rem' }}>
                <div style={{ textAlign: 'center', padding: '1rem' }}>
                  <div className="success-icon" style={{ background: 'rgba(255, 107, 53, 0.1)', color: 'var(--accent-orange)', border: '1px solid rgba(255, 107, 53, 0.2)' }}>
                    <ShieldCheck size={28} />
                  </div>
                  <h4 style={{ margin: '1rem 0 0.5rem' }}>Socios Locales Verificados</h4>
                  <p style={{ fontSize: '0.95rem' }}>Todos los campers y anfitriones pasan una inspección técnica e higiénica previa para garantizar tu seguridad en ruta.</p>
                </div>

                <div style={{ textAlign: 'center', padding: '1rem' }}>
                  <div className="success-icon" style={{ background: 'rgba(230, 194, 128, 0.1)', color: 'var(--accent-gold)', border: '1px solid rgba(230, 194, 128, 0.2)' }}>
                    <Sparkles size={28} />
                  </div>
                  <h4 style={{ margin: '1rem 0 0.5rem' }}>Equipamiento Off-Grid</h4>
                  <p style={{ fontSize: '0.95rem' }}>Placas solares, duchas, cocina y todo lo necesario para vivir libremente sin necesidad de camping tradicional.</p>
                </div>

                <div style={{ textAlign: 'center', padding: '1rem' }}>
                  <div className="success-icon" style={{ background: 'rgba(2, 128, 144, 0.1)', color: 'var(--accent-teal)', border: '1px solid rgba(2, 128, 144, 0.2)' }}>
                    <HeartHandshake size={28} />
                  </div>
                  <h4 style={{ margin: '1rem 0 0.5rem' }}>Guía y Rutas de Aventura</h4>
                  <p style={{ fontSize: '0.95rem' }}>Accede a recomendaciones locales personalizadas de zonas autorizadas para pernoctar y spots para practicar surf.</p>
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
              <span className="section-subtitle">Nuestra Flota</span>
              <h2>Encuentra tu Camper Ideal</h2>
              <p>Filtra por zona de recogida, tipo de vehículo o equipamiento para encontrar tu compañera de aventura.</p>
            </div>

            {/* Filter controls */}
            <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '3rem', border: '1px solid var(--border-color)' }}>
              <div className="grid grid-cols-4" style={{ gap: '1.5rem' }}>
                <div className="form-group">
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-gold)' }}>Zona de Recogida</label>
                  <input 
                    type="text" 
                    placeholder="Ej. Corralejo, Cotillo..." 
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    style={{ background: 'var(--bg-primary)', padding: '0.65rem' }}
                  />
                </div>

                <div className="form-group">
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-gold)' }}>Tipo de Vehículo</label>
                  <select 
                    value={searchType} 
                    onChange={(e) => setSearchType(e.target.value)}
                    style={{ background: 'var(--bg-primary)', padding: '0.65rem' }}
                  >
                    <option value="">Todos los tipos</option>
                    <option value="Furgoneta Camper">Furgoneta Camper</option>
                    <option value="Autocaravana">Autocaravana</option>
                    <option value="4x4 con Tienda">4x4 con Tienda de Techo</option>
                  </select>
                </div>

                <div className="form-group">
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-gold)' }}>Capacidad Pasajeros</label>
                  <select 
                    value={searchGuests} 
                    onChange={(e) => setSearchGuests(e.target.value)}
                    style={{ background: 'var(--bg-primary)', padding: '0.65rem' }}
                  >
                    <option value="">Cualquier capacidad</option>
                    <option value="2">Mínimo 2 personas</option>
                    <option value="3">Mínimo 3 personas</option>
                    <option value="4">Mínimo 4 personas</option>
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
                    Limpiar Filtros
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
                <h3>No se encontraron campers</h3>
                <p style={{ marginTop: '0.5rem' }}>Prueba a modificar los filtros o a buscar otra zona de recogida en Fuerteventura.</p>
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
                <span className="section-subtitle">Mapa de Aventura</span>
                <h2>Explora Fuerteventura</h2>
                <p>Haz clic en los puntos interactivos del mapa para descubrir recomendaciones exclusivas para tu viaje en camper.</p>
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
              <span className="section-subtitle">Únete como Socio</span>
              <h2>Gana dinero compartiendo tu aventura</h2>
              <p style={{ marginTop: '0.5rem' }}>Registra tu autocaravana o campervan local, conéctate con viajeros responsables y conviértete en parte de nuestra comunidad.</p>
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
              <span className="section-subtitle">Mis Viajes</span>
              <h2>Tus Aventuras Programadas</h2>
              <p>Aquí puedes consultar tus reservas activas, códigos de confirmación y el estado de tus alquileres.</p>
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
                        <span className="badge badge-adventure" style={{ fontSize: '0.65rem' }}>{booking.camperType}</span>
                        <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>{booking.bookingCode}</span>
                      </div>
                      <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{booking.camperTitle}</h4>
                      <p style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-secondary)' }}>
                        <Calendar size={14} />
                        <span>Fechas: {booking.startDate} al {booking.endDate}</span>
                      </p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        Duración: {booking.nights} noches | Reservado el: {booking.bookedAt}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div>
                        <span style={{ fontSize: '0.8rem', display: 'block', color: 'var(--text-secondary)' }}>Precio Total</span>
                        <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--accent-orange)' }}>{booking.totalPrice}€</span>
                      </div>
                      <button 
                        className="btn" 
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', border: '1px solid rgba(255,0,0,0.2)', color: '#ff4d4d', background: 'rgba(255,0,0,0.05)' }}
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '5rem 1rem', maxWidth: '600px', margin: '0 auto' }} className="glass">
                <Compass size={44} style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }} className="animate-spin-slow" />
                <h3>Aún no tienes viajes reservados</h3>
                <p style={{ marginTop: '0.5rem', marginBottom: '2rem' }}>Explora nuestra flota de campers en Fuerteventura y reserva tu próximo gran viaje de aventura hoy mismo.</p>
                <button className="btn btn-primary" onClick={() => setActiveTab('fleet')}>
                  Explorar Campers
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
              ← Volver al catálogo
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
                  <span className="badge badge-adventure" style={{ marginBottom: '0.5rem' }}>{selectedCamper.type}</span>
                  <h2>{selectedCamper.title}</h2>
                  
                  {/* Host and Rating info */}
                  <div className="detail-host-badge">
                    <div className="detail-host-avatar">
                      {selectedCamper.host.avatar}
                    </div>
                    <div>
                      <span style={{ fontWeight: '600', color: 'white', display: 'block' }}>Por {selectedCamper.host.name}</span>
                      <span>{selectedCamper.host.status}</span>
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--accent-gold)' }}>
                      <Star size={16} fill="var(--accent-gold)" />
                      <strong style={{ fontSize: '1.1rem' }}>{selectedCamper.rating}</strong>
                      <span style={{ color: 'var(--text-muted)' }}>({selectedCamper.reviewsCount} evaluaciones)</span>
                    </div>
                  </div>

                  <p className="detail-description">
                    {selectedCamper.description}
                  </p>

                  <div className="detail-amenities">
                    <h3>Equipamiento Incluido</h3>
                    <div className="amenities-list">
                      {selectedCamper.amenities.map((amenity, idx) => (
                        <div key={idx} className="amenity-item">
                          <CheckCircle size={18} />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side: Sticky Booking Card Widget */}
                <div>
                  <div className="booking-card glass" style={{ background: 'var(--bg-secondary)' }}>
                    <div className="booking-price">
                      {selectedCamper.price}€ <span>/ noche</span>
                    </div>

                    <form className="booking-form" onSubmit={(e) => { e.preventDefault(); if(nights > 0) setShowBookingModal(true); }}>
                      <div className="booking-field">
                        <label>Lugar de entrega en la isla</label>
                        <select>
                          {selectedCamper.locations.map(loc => (
                            <option key={loc} value={loc}>{loc} (Fuerteventura)</option>
                          ))}
                        </select>
                      </div>

                      <div className="booking-field">
                        <label>Fecha de Recogida</label>
                        <input 
                          type="date" 
                          value={checkInDate} 
                          onChange={(e) => setCheckInDate(e.target.value)} 
                          required 
                        />
                      </div>

                      <div className="booking-field">
                        <label>Fecha de Devolución</label>
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
                              <span>{selectedCamper.price}€ x {nights} noches</span>
                              <span>{breakdown.base}€</span>
                            </div>
                            <div className="breakdown-row">
                              <span>Preparación higiénica</span>
                              <span>{breakdown.cleaning}€</span>
                            </div>
                            <div className="breakdown-row">
                              <span>Tasa de servicio (8%)</span>
                              <span>{breakdown.service}€</span>
                            </div>
                            <div className="breakdown-row total">
                              <span>Total</span>
                              <span>{breakdown.total}€</span>
                            </div>
                          </div>

                          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                            Reservar Aventura
                          </button>
                        </>
                      ) : (
                        <button type="button" className="btn btn-secondary" style={{ width: '100%', cursor: 'not-allowed' }} disabled>
                          Selecciona fechas válidas
                        </button>
                      )}
                    </form>
                  </div>
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
            <p style={{ marginTop: '0.5rem' }}>No es un paseo más, es tu próxima aventura. Alquila vehículos autónomos de caravaning en Fuerteventura, Canarias.</p>
          </div>

          <div className="footer-links">
            <h4>Plataforma</h4>
            <ul>
              <li><a href="#fleet" onClick={(e) => { e.preventDefault(); setActiveTab('fleet'); }}>Explorar Campers</a></li>
              <li><a href="#partner" onClick={(e) => { e.preventDefault(); setActiveTab('partner'); }}>Hazte Socio Local</a></li>
              <li><a href="#guide" onClick={(e) => { e.preventDefault(); setActiveTab('guide'); }}>Mapa de Fuerteventura</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Normativas</h4>
            <ul>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Pernocta en Canarias</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Zonas de vertido</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Términos de servicio</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Contacto</h4>
            <ul style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              <li>Fuerteventura, Islas Canarias</li>
              <li>soporte@camperventura.com</li>
              <li>+34 928 00 00 00</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} CamperVentura. Todos los derechos reservados. Hecho con pasión por la aventura.</p>
        </div>
      </footer>
    </>
  );
}
