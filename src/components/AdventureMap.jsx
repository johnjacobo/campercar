import React, { useState } from 'react';
import { Compass, MapPin, Sparkles } from 'lucide-react';

const spots = [
  {
    id: 'corralejo',
    name: 'Dunas de Corralejo',
    type: 'Surf y Paisaje Lunático',
    coordinates: { x: 340, y: 90 },
    description: 'Kilómetros de arena dorada traída del Sáhara. El mejor spot para acampar bajo las estrellas con vistas a la Isla de Lobos y practicar kitesurf.',
    activity: 'Kitesurf, Stargazing, Surf',
    difficulty: 'Fácil'
  },
  {
    id: 'el-cotillo',
    name: 'Lagos de El Cotillo',
    type: 'Atardeceres y Snorkel',
    coordinates: { x: 230, y: 120 },
    description: 'Lagunas naturales de aguas tranquilas y cristalinas protegidas por arrecifes de basalto. Los atardeceres aquí son los más espectaculares de toda la isla.',
    activity: 'Snorkel, Sunset, Gastronomía',
    difficulty: 'Fácil'
  },
  {
    id: 'betancuria',
    name: 'Valle de Betancuria',
    type: 'Historia y Senderismo',
    coordinates: { x: 260, y: 250 },
    description: 'Enclavado en un macizo montañoso de origen volcánico antiguo. Un contraste verde y rocoso en el corazón de Fuerteventura con cielos nocturnos Starlight certificados.',
    activity: 'Astronomía, Senderismo, Fotografía',
    difficulty: 'Media'
  },
  {
    id: 'cofete',
    name: 'Playa Salvaje de Cofete',
    type: 'Aventura Extrema 4x4',
    coordinates: { x: 90, y: 410 },
    description: 'La joya salvaje de la isla. 12 km de playa virgen custodiada por montañas de más de 800m. Acceso por pista de tierra de aventura. Pernoctar aquí en camper es una experiencia mística.',
    activity: 'Exploración 4x4, Meditación, Senderismo',
    difficulty: 'Difícil (Pista de tierra)'
  },
  {
    id: 'sotavento',
    name: 'Laguna de Sotavento',
    type: 'Viento y Playas Infinitas',
    coordinates: { x: 190, y: 390 },
    description: 'Una enorme barrera de arena crea una laguna natural de marea de 4km de longitud. El epicentro mundial de Windsurf e ideal para descansar sintiendo la brisa.',
    activity: 'Windsurf, Relax, Yoga',
    difficulty: 'Fácil'
  }
];

export default function AdventureMap() {
  const [activeSpot, setActiveSpot] = useState(spots[0]);

  return (
    <div className="adventure-layout">
      <div className="spots-list">
        {spots.map((spot) => (
          <div
            key={spot.id}
            className={`spot-item ${activeSpot.id === spot.id ? 'active' : ''}`}
            onClick={() => setActiveSpot(spot)}
          >
            <div className="spot-title-row">
              <h4>{spot.name}</h4>
              <span className="spot-tag">{spot.activity.split(',')[0]}</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: activeSpot.id === spot.id ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
              {spot.type}
            </p>
          </div>
        ))}
      </div>

      <div className="map-container glass">
        {/* SVG Simulado de Fuerteventura */}
        <svg viewBox="0 0 500 500" className="map-svg">
          {/* Océano y Red de coordenadas estéticas */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.015)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Silueta vectorial simplificada de Fuerteventura */}
          <path
            className="island-path"
            d="M 230 100 
               C 270 80, 310 70, 360 80 
               C 380 90, 390 110, 370 130
               C 340 160, 300 200, 290 230
               C 280 250, 290 280, 270 310
               C 250 330, 220 340, 200 360
               C 180 370, 190 395, 170 410
               C 140 430, 100 440, 70 430
               C 50 420, 60 395, 90 380
               C 110 370, 130 360, 150 350
               C 180 330, 185 300, 190 280
               C 200 250, 210 200, 205 170
               C 200 140, 215 115, 230 100 Z"
          />

          {/* Marcadores */}
          {spots.map((spot) => (
            <g
              key={spot.id}
              className={`map-marker ${activeSpot.id === spot.id ? 'active' : ''}`}
              transform={`translate(${spot.coordinates.x}, ${spot.coordinates.y})`}
              onClick={() => setActiveSpot(spot)}
            >
              <circle r="7" />
              <circle r="12" fill="none" stroke="var(--accent-orange)" strokeWidth="1.5" style={{ opacity: activeSpot.id === spot.id ? 1 : 0 }} />
              <text y="-18">{spot.name.split(' ')[0]}</text>
            </g>
          ))}
        </svg>

        {/* Ventana de información */}
        {activeSpot && (
          <div className="map-info-popup glass animate-fade-in" style={{ background: 'rgba(22, 24, 31, 0.95)' }}>
            <div className="flex align-center gap-2" style={{ gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Compass size={18} className="animate-spin-slow" style={{ color: 'var(--accent-orange)' }} />
              <span className="badge badge-adventure">{activeSpot.activity.split(',')[0]}</span>
              <span className="badge badge-gold" style={{ fontSize: '0.75rem' }}>Dificultad: {activeSpot.difficulty}</span>
            </div>
            <h4>{activeSpot.name}</h4>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.4', margin: '0.35rem 0 0.75rem', color: 'var(--text-secondary)' }}>
              {activeSpot.description}
            </p>
            <div className="flex align-center" style={{ gap: '1rem', fontSize: '0.8rem', color: 'var(--accent-gold)' }}>
              <div className="flex align-center" style={{ gap: '0.25rem' }}>
                <MapPin size={12} />
                <span>Fuerteventura, Canarias</span>
              </div>
              <div className="flex align-center" style={{ gap: '0.25rem' }}>
                <Sparkles size={12} />
                <span>{activeSpot.activity}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
