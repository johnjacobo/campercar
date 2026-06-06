import React, { useState } from 'react';
import { Calendar, CheckCircle2, ShieldAlert, Sparkles, X, HeartHandshake } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function BookingModal({ camper, dates, totalNights, costBreakdown, onClose, onBookingSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingCode, setBookingCode] = useState('');
  const { language, t } = useLanguage();

  const termsLabel = {
    es: "Acepto la normativa de pernocta de las Islas Canarias (no acampar en playas protegidas, usar depósitos de aguas grises y dejar los espacios limpios).",
    en: "I accept the overnight camping regulations of the Canary Islands (no camping on protected beaches, use greywater tanks, and keep spaces clean).",
    de: "Ich akzeptiere die Übernachtungsvorschriften der Kanarischen Inseln (kein Camping an geschützten Stränden, Nutzung von Grauwassertanks und sauberes Hinterlassen der Plätze).",
    fr: "J'accepte la réglementation sur le bivouac des îles Canaries (pas de camping sur les plages protégées, utilisation de réservoirs d'eaux grises et respect de la propreté).",
    it: "Accetto le norme sul pernottamento delle Isole Canarie (divieto di campeggio sulle spiagge protette, utilizzo di serbatoi per le acque grigie e mantenimento della pulizia)."
  };

  const validationAlert = {
    es: "Por favor, rellene todos los campos y acepte la normativa.",
    en: "Please fill in all fields and accept the regulations.",
    de: "Bitte füllen Sie alle Felder aus und akzeptieren Sie die Vorschriften.",
    fr: "Veuillez remplir tous les champs et accepter la réglementation.",
    it: "Si prega di compilare tutti i campi e accettare il regolamento."
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !agreedTerms) {
      alert(validationAlert[language] || validationAlert['es']);
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
        bookedAt: new Date().toLocaleDateString(language === 'es' ? 'es-ES' : language === 'en' ? 'en-US' : language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : 'it-IT')
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
          <h3>{t('bookingModal.success_title')}</h3>
          <p style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            {t('bookings.booking_code')}: <span style={{ color: 'var(--accent-orange)' }}>{bookingCode}</span>
          </p>
          <p>
            {t('bookingModal.success_desc').replace('{email}', email)}
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
              <Sparkles size={14} /> {t('map.spots_list_title')}
            </h5>
            <ul style={{ listStyle: 'inside circle', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <li>{t('bookingModal.info_pickup')}</li>
              <li>{t('bookingModal.info_insurance')}</li>
              <li>{t('bookingModal.info_support')}</li>
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
            {t('navbar.bookings')}
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
            <HeartHandshake style={{ color: 'var(--accent-orange)' }} /> {t('bookingModal.title')}
          </h2>

          {/* Quick Summary */}
          <div className="flex align-center gap-4" style={{ gap: '1.5rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
            <img 
              src={camper.images[0].startsWith('http') ? camper.images[0] : import.meta.env.BASE_URL + camper.images[0]} 
              alt={camper.title} 
              style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} 
            />
            <div>
              <span className="badge badge-adventure" style={{ fontSize: '0.7rem' }}>{getTypeLabel(camper.type)}</span>
              <h4 style={{ margin: '0.25rem 0 0.5rem' }}>{camper.title}</h4>
              <p style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={14} style={{ color: 'var(--accent-gold)' }} />
                <span>{dates.startDate} {language === 'es' ? 'al' : language === 'en' ? 'to' : language === 'de' ? 'bis' : language === 'fr' ? 'au' : 'al'} {dates.endDate} ({totalNights} {t('bookings.nights')})</span>
              </p>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="booking-field">
              <label>{t('bookingModal.placeholder_name')}</label>
              <input 
                type="text" 
                placeholder={t('bookingModal.placeholder_name')} 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
            
            <div className="form-grid" style={{ marginBottom: 0 }}>
              <div className="booking-field">
                <label>{t('bookingModal.placeholder_email')}</label>
                <input 
                  type="email" 
                  placeholder="name@email.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className="booking-field">
                <label>{t('bookingModal.placeholder_phone')}</label>
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
                <span>{camper.price}€ x {totalNights} {t('bookings.nights')}</span>
                <span>{costBreakdown.base}€</span>
              </div>
              <div className="breakdown-row">
                <span>{t('details.cleaning_fee')}</span>
                <span>{costBreakdown.cleaning}€</span>
              </div>
              <div className="breakdown-row">
                <span>{t('details.service_fee')}</span>
                <span>{costBreakdown.service}€</span>
              </div>
              <div className="breakdown-row total">
                <span>{t('details.total')}</span>
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
                  {termsLabel[language] || termsLabel['es']}
                </span>
              </label>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '1rem' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? t('bookingModal.btn_canceling') : `${t('bookingModal.btn_confirm')} (${costBreakdown.total}€)`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
