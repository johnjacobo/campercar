import React, { useState } from 'react';
import { Compass, MapPin, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const spots = [
  {
    id: 'corralejo',
    name: 'Dunas de Corralejo',
    type: {
      es: 'Surf y Paisaje Lunático',
      en: 'Surf & Lunar Landscape',
      de: 'Surfen & Mondlandschaft',
      fr: 'Surf & Paysage Lunaire',
      it: 'Surf & Paesaggio Lunare'
    },
    coordinates: { x: 340, y: 90 },
    description: {
      es: 'Kilómetros de arena dorada traída del Sáhara. El mejor spot para acampar bajo las estrellas con vistas a la Isla de Lobos y practicar kitesurf.',
      en: 'Kilometers of golden sand brought from the Sahara. The best spot to camp under the stars with views of Lobos Island and practice kitesurf.',
      de: 'Kilometerlanger goldener Sand aus der Sahara. Der beste Ort, um unter den Sternen mit Blick auf die Insel Lobos zu campen und Kitesurfen zu üben.',
      fr: "Des kilomètres de sable doré apportés du Sahara. Le meilleur spot pour camper sous les étoiles avec vue sur l'île de Lobos et pratiquer le kitesurf.",
      it: "Chilometri di sabbia dorata portata dal Sahara. Il posto migliore per campeggiare sotto le stelle con vista sull'Isola di Lobos e praticare kitesurf."
    },
    activity: {
      es: 'Kitesurf, Estrellas, Surf',
      en: 'Kitesurfing, Stargazing, Surf',
      de: 'Kitesurfen, Sterne, Surfen',
      fr: 'Kitesurf, Étoiles, Surf',
      it: 'Kitesurf, Stelle, Surf'
    },
    difficulty: 'diff_easy'
  },
  {
    id: 'el-cotillo',
    name: 'Lagos de El Cotillo',
    type: {
      es: 'Atardeceres y Snorkel',
      en: 'Sunsets & Snorkeling',
      de: 'Sonnenuntergänge & Schnorcheln',
      fr: 'Coucher de soleil & Snorkeling',
      it: 'Tramonti & Snorkeling'
    },
    coordinates: { x: 230, y: 120 },
    description: {
      es: 'Lagunas naturales de aguas tranquilas y cristalinas protegidas por arrecifes de basalto. Los atardeceres aquí son los más espectaculares de toda la isla.',
      en: 'Natural lagoons of calm, crystal-clear waters protected by basalt reefs. The sunsets here are the most spectacular on the whole island.',
      de: 'Natürliche Lagunen mit ruhigem, kristallklarem Wasser, geschützt durch Basaltriffe. Die Sonnenuntergänge hier sind die spektakulärsten auf der ganzen Insel.',
      fr: 'Lagons naturels aux eaux calmes et cristallines protégés par des récifs de basalte. Les couchers de soleil ici sont les plus spectaculaires de toute l\'île.',
      it: 'Lagune naturali di acque calme e cristalline protette da barriere di basalto. I tramonti qui sono i più spettacolari di tutta l\'isola.'
    },
    activity: {
      es: 'Snorkel, Atardecer, Mariscos',
      en: 'Snorkeling, Sunset, Seafood',
      de: 'Schnorcheln, Sonnenuntergang, Meeresfrüchte',
      fr: 'Snorkeling, Coucher de soleil, Fruits de mer',
      it: 'Snorkeling, Tramonto, Frutti di mare'
    },
    difficulty: 'diff_easy'
  },
  {
    id: 'betancuria',
    name: 'Valle de Betancuria',
    type: {
      es: 'Historia y Senderismo',
      en: 'History & Hiking',
      de: 'Geschichte & Wandern',
      fr: 'Histoire & Randonnée',
      it: 'Storia & Trekking'
    },
    coordinates: { x: 260, y: 250 },
    description: {
      es: 'Enclavado en un macizo montañoso de origen volcánico antiguo. Un contraste verde y rocoso en el corazón de Fuerteventura con cielos nocturnos Starlight certificados.',
      en: 'Nestled in a mountainous massif of ancient volcanic origin. A green and rocky contrast in the heart of Fuerteventura with certified Starlight night skies.',
      de: 'Eingebettet in ein Gebirgsmassiv alten vulkanischen Ursprungs. Ein grüner und felsiger Kontrast im Herzen von Fuerteventura mit zertifiziertem Starlight-Nachthimmel.',
      fr: 'Niché dans un massif montagneux d\'ancienne origine volcanique. Un contraste vert et rocheux au cœur de Fuerteventura avec un ciel nocturne certifié Starlight.',
      it: 'Immerso in un massiccio montuoso di antica origine vulcanica. Un contrasto verde e roccioso nel cuore di Fuerteventura con cieli notturni certificati Starlight.'
    },
    activity: {
      es: 'Astronomía, Senderismo, Cultura',
      en: 'Astronomy, Hiking, Culture',
      de: 'Astronomie, Wandern, Kultur',
      fr: 'Astronomie, Randonnée, Culture',
      it: 'Astronomia, Trekking, Cultura'
    },
    difficulty: 'diff_medium'
  },
  {
    id: 'cofete',
    name: 'Playa Salvaje de Cofete',
    type: {
      es: 'Aventura Extrema 4x4',
      en: '4x4 Extreme Adventure',
      de: '4x4 Extrem-Abenteuer',
      fr: 'Aventure Extrême 4x4',
      it: 'Avventura Estrema 4x4'
    },
    coordinates: { x: 90, y: 410 },
    description: {
      es: 'La joya salvaje de la isla. 12 km de playa virgen custodiada por montañas de más de 800m. Acceso por pista de tierra de aventura. Pernoctar aquí en camper es una experiencia mística.',
      en: 'The wild jewel of the island. 12 km of pristine beach guarded by mountains over 800m. Access by dirt track adventure. Spending the night here in a camper is a mystical experience.',
      de: 'Das wilde Juwel der Insel. 12 km unberührter Strand, bewacht von über 800 m hohen Bergen. Zufahrt über eine abenteuerliche Schotterpiste. Die Nacht hier im Camper zu verbringen, ist eine mystische Erfahrung.',
      fr: "Le joyau sauvage de l'île. 12 km de plage vierge gardée par des montagnes de plus de 800m. Accès par piste de terre d'aventure. Passer la nuit ici en camper est une expérience mystique.",
      it: "Il gioiello selvaggio dell'isola. 12 km di spiaggia incontaminata custodita da montagne di oltre 800m. Accesso da pista sterrata d'avventura. Pernottare qui in camper è un'esperienza mistica."
    },
    activity: {
      es: '4x4, Meditación, Aislamiento',
      en: '4x4 Exploration, Meditation, Solitude',
      de: '4x4 Erkundung, Meditation, Einsamkeit',
      fr: 'Exploration 4x4, Méditation, Solitude',
      it: 'Esplorazione 4x4, Meditazione, Solitudine'
    },
    difficulty: 'diff_hard'
  },
  {
    id: 'sotavento',
    name: 'Laguna de Sotavento',
    type: {
      es: 'Viento y Playas Infinitas',
      en: 'Wind & Endless Beaches',
      de: 'Wind & Unendliche Strände',
      fr: 'Vent & Plages Infinies',
      it: 'Vento & Spiagge Infinite'
    },
    coordinates: { x: 190, y: 390 },
    description: {
      es: 'Una enorme barrera de arena crea una laguna natural de marea de 4km de longitud. El epicentro mundial de Windsurf e ideal para descansar sintiendo la brisa.',
      en: 'A huge sand barrier creates a 4km long natural tidal lagoon. The world epicenter of Windsurfing and ideal for resting while feeling the breeze.',
      de: 'Eine riesige Sandbarriere bildet eine 4 km lange natürliche Gezeitenlagune. Das weltweite Epizentrum des Windsurfens und ideal zum Ausruhen, während man die Brise spürt.',
      fr: "Une immense barrière de sable crée une lagune de marée naturelle de 4 km de long. L'épicentre mondial de la planche à voile et idéal pour se reposer en sentant la brise.",
      it: "Una enorme barriera di sabbia crea una laguna di marea naturale lunga 4 km. L'epicentro mondiale del Windsurf e ideale per riposare sentendo la brezza."
    },
    activity: {
      es: 'Windsurf, Yoga, Relax',
      en: 'Windsurfing, Yoga, Relax',
      de: 'Windsurfen, Yoga, Relax',
      fr: 'Planche à Voile, Yoga, Relax',
      it: 'Windsurf, Yoga, Relax'
    },
    difficulty: 'diff_easy'
  }
];

export default function AdventureMap() {
  const [activeSpot, setActiveSpot] = useState(spots[0]);
  const { language, t } = useLanguage();

  const getLocalized = (field) => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[language] || field['es'] || '';
  };

  return (
    <div className="adventure-layout">
      <div className="spots-list">
        <h4 style={{ marginBottom: '1rem', padding: '0 0.5rem', color: 'var(--accent-gold)' }}>{t('map.spots_list_title')}</h4>
        {spots.map((spot) => (
          <div
            key={spot.id}
            className={`spot-item ${activeSpot.id === spot.id ? 'active' : ''}`}
            onClick={() => setActiveSpot(spot)}
          >
            <div className="spot-title-row">
              <h4>{spot.name}</h4>
              <span className="spot-tag">{getLocalized(spot.activity).split(',')[0]}</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: activeSpot.id === spot.id ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
              {getLocalized(spot.type)}
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
              <span className="badge badge-adventure">{getLocalized(activeSpot.activity).split(',')[0]}</span>
              <span className="badge badge-gold" style={{ fontSize: '0.75rem' }}>{t('map.difficulty')}: {t(`map.${activeSpot.difficulty}`)}</span>
            </div>
            <h4>{activeSpot.name}</h4>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.4', margin: '0.35rem 0 0.75rem', color: 'var(--text-secondary)' }}>
              {getLocalized(activeSpot.description)}
            </p>
            <div className="flex align-center" style={{ gap: '1rem', fontSize: '0.8rem', color: 'var(--accent-gold)' }}>
              <div className="flex align-center" style={{ gap: '0.25rem' }}>
                <MapPin size={12} />
                <span>{t('footer.address').split(',')[0]}, Canarias</span>
              </div>
              <div className="flex align-center" style={{ gap: '0.25rem' }}>
                <Sparkles size={12} />
                <span>{getLocalized(activeSpot.activity)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
