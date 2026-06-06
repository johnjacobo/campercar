import React, { useState } from 'react';
import { Calendar, CheckCircle2, ShieldAlert, Sparkles, X, HeartHandshake } from 'lucide-react';

export default function BookingModal({ camper, dates, totalNights, costBreakdown, onClose, onBookingSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !agreedTerms) {
      alert('Por favor, rellene todos los campos y acepte la normativa.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API request delay
    setTimeout(() => {
      const code = 'CV-' + Math.floor(100000 + Math.random() * 900000);
      const newBooking = {
        id: 'booking-' + Date.now(),
        bookingCode: code,
        camperId: camper.id,
        camperTitle: camper.title,
        camperType: camper.type,
        camperImage: camper.images[0],
        startDate: dates.startDate,
        endDate: dates.endDate,
        nights: totalNights,
        totalPrice: costBreakdown.total,
        customerName: name,
        status: 'Confirmado',
        bookedAt: new Date().toLocaleDateString('es-ES')
      };

      // Save to localStorage
      const existingBookings = JSON.parse(localStorage.getItem('camper_bookings') || '[]');
      existingBookings.unshift(newBooking);
      localStorage.setItem('camper_bookings', JSON.stringify(existingBookings));

      setBookingCode(code);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="detail-overlay">
        <div className="detail-modal glass success-card" style={{ maxWidth: '500px', background: 'var(--bg-secondary)' }}>
          <div className="success-icon animate-scale-in">
            <CheckCircle2 size={40} />
          </div>
          <h3>¡Aventura Confirmada!</h3>
          <p style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            Código de reserva: <span style={{ color: 'var(--accent-orange)' }}>{bookingCode}</span>
          </p>
          <p>
            Hemos guardado tu reserva en <strong>Mis Viajes</strong>. Se ha enviado un correo de confirmación simulado a <strong>{email}</strong> con la guía de ruta de Fuerteventura.
          </p>
          
          <div className="glass" style={{
            padding: '1rem',
            borderRadius: 'var(--radius-sm)',
            textAlign: 'left',
            marginBottom: '2rem',
            fontSize: '0.85rem',
            border: '1px solid rgba(255, 107, 53, 0.2)'
          }}>
            <h5 style={{ color: 'var(--accent-gold)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Sparkles size={14} /> Recomendaciones de la Isla
            </h5>
            <ul style={{ listStyle: 'inside circle', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <li>Recogida del vehículo: Aeropuerto Fuerteventura (o concertado).</li>
              <li>Traer carné de conducir en vigor (mínimo 2 años de antigüedad).</li>
              <li>¡Respeta la naturaleza! Pernocta solo en zonas permitidas.</li>
            </ul>
          </div>

          <button 
            className="btn btn-primary" 
            style={{ width: '100%' }}
            onClick={() => {
              onBookingSuccess();
              onClose();
            }}
          >
            Ir a Mis Viajes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-overlay">
      <div className="detail-modal glass" style={{ maxWidth: '600px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
        <button className="close-modal-btn" onClick={onClose} aria-label="Cerrar modal">
          <X size={20} />
        </button>

        <div style={{ padding: '2.5rem' }}>
          <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <HeartHandshake style={{ color: 'var(--accent-orange)' }} /> Confirmar Aventura
          </h2>

          {/* Quick Summary */}
          <div className="flex align-center gap-4" style={{ gap: '1.5rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
            <img 
              src={camper.images[0].startsWith('http') ? camper.images[0] : import.meta.env.BASE_URL + camper.images[0]} 
              alt={camper.title} 
              style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} 
            />
            <div>
              <span className="badge badge-adventure" style={{ fontSize: '0.7rem' }}>{camper.type}</span>
              <h4 style={{ margin: '0.25rem 0 0.5rem' }}>{camper.title}</h4>
              <p style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={14} style={{ color: 'var(--accent-gold)' }} />
                <span>{dates.startDate} al {dates.endDate} ({totalNights} noches)</span>
              </p>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="booking-field">
              <label>Nombre Completo</label>
              <input 
                type="text" 
                placeholder="Ej. Juan Pérez" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
            
            <div className="form-grid" style={{ marginBottom: 0 }}>
              <div className="booking-field">
                <label>Correo Electrónico</label>
                <input 
                  type="email" 
                  placeholder="juan@email.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className="booking-field">
                <label>Teléfono móvil</label>
                <input 
                  type="tel" 
                  placeholder="+34 600 000 000" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  required 
                />
              </div>
            </div>

            {/* Price Summary Breakdown */}
            <div className="booking-breakdown" style={{ marginTop: '0.5rem', padding: '1rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)' }}>
              <div className="breakdown-row">
                <span>{camper.price}€ x {totalNights} noches</span>
                <span>{costBreakdown.base}€</span>
              </div>
              <div className="breakdown-row">
                <span>Gastos de preparación e higiene</span>
                <span>{costBreakdown.cleaning}€</span>
              </div>
              <div className="breakdown-row">
                <span>Tasa de servicio CamperVentura</span>
                <span>{costBreakdown.service}€</span>
              </div>
              <div className="breakdown-row total">
                <span>Total estimado</span>
                <span>{costBreakdown.total}€</span>
              </div>
            </div>

            {/* Normativa local de Canarias */}
            <div className="flex" style={{ gap: '0.75rem', marginTop: '0.5rem', alignItems: 'flex-start' }}>
              <ShieldAlert size={28} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
              <label className="checkbox-label" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <input 
                  type="checkbox" 
                  checked={agreedTerms} 
                  onChange={(e) => setAgreedTerms(e.target.checked)} 
                  required 
                />
                <span>
                  Acepto la normativa de pernocta de las Islas Canarias (no acampar en playas protegidas, usar depósitos de aguas grises y dejar los espacios limpios).
                </span>
              </label>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '1rem' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Procesando tu aventura...' : `Confirmar Reserva por ${costBreakdown.total}€`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
