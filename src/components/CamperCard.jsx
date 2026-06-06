import React from 'react';
import { Star, Users, Zap, ShowerHead, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function CamperCard({ camper, onViewDetails }) {
  const { language, t } = useLanguage();

  const getQuickIcon = (amenityObj) => {
    const nameEs = typeof amenityObj === 'string' ? amenityObj : (amenityObj.es || '');
    if (nameEs.toLowerCase().includes('solar')) return <Zap size={12} />;
    if (nameEs.toLowerCase().includes('ducha')) return <ShowerHead size={12} />;
    return null;
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

  const getSeatsLabel = () => {
    const labels = {
      es: "plazas",
      en: "seats",
      de: "Plätze",
      fr: "places",
      it: "posti"
    };
    return labels[language] || labels['es'];
  };

  return (
    <div className="camper-card glass animate-scale-in" onClick={onViewDetails} style={{ cursor: 'pointer' }}>
      <div className="camper-img-container">
        <img
          src={camper.images[0].startsWith('http') ? camper.images[0] : import.meta.env.BASE_URL + camper.images[0]}
          alt={camper.title}
          className="camper-img"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80";
          }}
        />
        <span className="badge badge-adventure camper-type-badge">{getTypeLabel(camper.type)}</span>
        <div className="camper-price-tag">
          <span className="camper-price-num">{camper.price}€</span>
          <span style={{ fontSize: '0.75rem', fontWeight: '500', color: 'var(--text-secondary)' }}>/{t('details.nights_count')}</span>
        </div>
      </div>

      <div className="camper-info">
        <div className="camper-title-row">
          <h3>{camper.title}</h3>
          <div className="camper-rating">
            <Star size={14} fill="var(--accent-gold)" stroke="var(--accent-gold)" />
            <span>{camper.rating}</span>
          </div>
        </div>

        <div className="camper-specs">
          <div className="camper-spec-item" title={t('search.guests')}>
            <Users size={14} />
            <span>{camper.passengers} {getSeatsLabel()}</span>
          </div>
          <div className="camper-spec-item" title={t('partner.label_transmission')}>
            <span>•</span>
            <span>{getLocalized(camper.transmission)}</span>
          </div>
          <div className="camper-spec-item" title={t('partner.label_fuel')}>
            <span>•</span>
            <span>{getLocalized(camper.fuel)}</span>
          </div>
        </div>

        <div className="camper-features">
          {camper.amenities.slice(0, 3).map((amenity, idx) => (
            <span key={idx} className="badge">
              {getQuickIcon(amenity)}
              <span style={{ marginLeft: getQuickIcon(amenity) ? '0.25rem' : 0 }}>{getLocalized(amenity)}</span>
            </span>
          ))}
          {camper.amenities.length > 3 && (
            <span className="badge" style={{ color: 'var(--accent-gold)' }}>+{camper.amenities.length - 3} {language === 'es' ? 'más' : language === 'en' ? 'more' : language === 'de' ? 'mehr' : language === 'fr' ? 'plus' : 'altro'}</span>
          )}
        </div>

        <button 
          className="btn btn-secondary camper-card-btn"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails();
          }}
        >
          <Eye size={16} />
          {t('bookings.btn_explore').split(' ')[0]} {t('details.total').toLowerCase() === 'total' ? 'details' : language === 'es' ? 'Detalles' : language === 'en' ? 'Details' : language === 'de' ? 'Details' : language === 'fr' ? 'Détails' : 'Dettagli'}
        </button>
      </div>
    </div>
  );
}
