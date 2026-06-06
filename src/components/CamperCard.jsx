import React from 'react';
import { Star, Users, ShieldAlert, Zap, ShowerHead, Eye } from 'lucide-react';

export default function CamperCard({ camper, onViewDetails }) {
  // Map icons to amenities for quick card tags
  const getQuickIcon = (amenity) => {
    if (amenity.toLowerCase().includes('solar')) return <Zap size={12} />;
    if (amenity.toLowerCase().includes('ducha')) return <ShowerHead size={12} />;
    return null;
  };

  return (
    <div className="camper-card glass animate-scale-in" onClick={onViewDetails} style={{ cursor: 'pointer' }}>
      <div className="camper-img-container">
        <img
          src={camper.images[0]}
          alt={camper.title}
          className="camper-img"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80"; // fallback
          }}
        />
        <span className="badge badge-adventure camper-type-badge">{camper.type}</span>
        <div className="camper-price-tag">
          <span className="camper-price-num">{camper.price}€</span>
          <span style={{ fontSize: '0.75rem', fontWeight: '500', color: 'var(--text-secondary)' }}>/noche</span>
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
          <div className="camper-spec-item" title="Capacidad de pasajeros">
            <Users size={14} />
            <span>{camper.passengers} plazas</span>
          </div>
          <div className="camper-spec-item" title="Transmisión">
            <span>•</span>
            <span>{camper.transmission}</span>
          </div>
          <div className="camper-spec-item" title="Combustible">
            <span>•</span>
            <span>{camper.fuel}</span>
          </div>
        </div>

        <div className="camper-features">
          {camper.amenities.slice(0, 3).map((amenity, idx) => (
            <span key={idx} className="badge">
              {getQuickIcon(amenity)}
              <span style={{ marginLeft: getQuickIcon(amenity) ? '0.25rem' : 0 }}>{amenity}</span>
            </span>
          ))}
          {camper.amenities.length > 3 && (
            <span className="badge" style={{ color: 'var(--accent-gold)' }}>+{camper.amenities.length - 3} más</span>
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
          Ver Detalles
        </button>
      </div>
    </div>
  );
}
