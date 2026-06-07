import React, { useState } from 'react';
import { Compass, MapPin, Sparkles, Droplet } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const spots = [
  {
    id: 'corralejo',
    category: 'adventure',
    name: 'Dunas de Corralejo',
    image: 'images/camper_beach.png',
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
    category: 'adventure',
    name: 'Lagos de El Cotillo',
    image: 'images/camper_beach.png',
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
    category: 'adventure',
    name: 'Valle de Betancuria',
    image: 'images/camper_volcano.png',
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
    category: 'adventure',
    name: 'Playa Salvaje de Cofete',
    image: 'images/camper_volcano.png',
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
      it: "Il gioiello selvaggio dell'isola. 12 km di spiaggia incontaminata custodita da montagne di oltre 800m. Accesso da pista sterrata d'avventura. Pernottare qui in camper es un'esperienza mistica."
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
    category: 'adventure',
    name: 'Laguna de Sotavento',
    image: 'images/epic_beach.png',
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
  },
  // Puntos Limpios / Servicios
  {
    id: 'disa-mercasosa',
    category: 'service',
    name: 'DISA Nueva Mercasosa',
    image: 'images/service_disa_mercasosa.png',
    type: {
      es: 'Estación de Servicio y Vaciado',
      en: 'Service & Disposal Station',
      de: 'Service- & Entsorgungsstation',
      fr: 'Station-service & Vidange',
      it: 'Stazione di Servizio & Scarico'
    },
    coordinates: { x: 310, y: 190 },
    geoCoordinates: { lat: 28.4975, lng: -13.8828 },
    address: 'Carretera de La Oliva FV-10, Km 2.7, Puerto del Rosario',
    description: {
      es: 'Estación de servicio muy conocida por los autocaravanistas en Puerto del Rosario. Dispone de rejilla para vaciado de aguas grises y un punto habilitado para el vaciado de aguas negras. Recuerda preguntar al personal antes de usar los servicios.',
      en: 'Service station well known by motorhome owners in Puerto del Rosario. Equipped with a grate for gray water drainage and an area for black water disposal. Please ask the staff before using the services.',
      de: 'Tankstelle, die unter Wohnmobilisten in Puerto del Rosario sehr bekannt ist. Sie verfügt über ein Gitter zur Entsorgung von Grauwasser und eine Vorrichtung zur Entsorgung von Schwarzwasser. Bitte fragen Sie das Personal vor der Nutzung.',
      fr: 'Station-service bien connue des camping-caristes à Puerto del Rosario. Équipée d\'une grille pour l\'évacuation des eaux grises et d\'un point pour les eaux noires. Veuillez demander au personnel avant l\'utilisation.',
      it: 'Stazione di servicio molto conosciuta dai camperisti a Puerto del Rosario. Dispone di una griglia per lo scarico delle acque grigie e di un punto habilitato per lo scarico delle acque nere. Chiedere al personale prima dell\'uso.'
    },
    activity: {
      es: 'Aguas Grises, Aguas Negras, Gasolinera',
      en: 'Gray Water, Black Water, Gas Station',
      de: 'Grauwasser, Schwarzwasser, Tankstelle',
      fr: 'Eaux Grises, Eaux Noires, Station-service',
      it: 'Acque Grigie, Acque Nere, Stazione di Servizio'
    }
  },
  {
    id: 'disa-matorral',
    category: 'service',
    name: 'DISA El Matorral',
    image: 'images/service_disa_matorral.png',
    type: {
      es: 'Punto de Vaciado Ecológico',
      en: 'Eco-Disposal Point',
      de: 'Öko-Entsorgungsstelle',
      fr: 'Point Éco-Vidange',
      it: 'Punto di Scarico Ecologico'
    },
    coordinates: { x: 300, y: 220 },
    geoCoordinates: { lat: 28.4552, lng: -13.8698 },
    address: 'Polígono Industrial El Matorral, Antigua',
    description: {
      es: 'Punto estratégico cerca del aeropuerto de Fuerteventura. Cuenta con un punto limpio gratuito para el vaciado de depósitos de aguas grises y negras. Ideal para vaciar antes de devolver tu vehículo.',
      en: 'Strategic location near Fuerteventura Airport. Features a free eco-station for gray and black water disposal. Ideal for emptyings before returning your vehicle.',
      de: 'Strategischer Punkt in der Nähe des Flughafens Fuerteventura. Bietet eine kostenlose Öko-Station zur Grauwasser- und Schwarzwasserentsorgung. Ideal vor der Fahrzeugrückgabe.',
      fr: 'Point stratégique à proximité de l\'aéroport de Fuerteventura. Dispose d\'un point éco gratuit pour la vidange des eaux grises et noires. Idéal avant de restituer le véhicule.',
      it: 'Punto strategico vicino all\'aeroporto di Fuerteventura. Dispone di una stazione ecologica gratuita per lo scarico di acque grigie e nere. Ideale prima di riconsegnare il veicolo.'
    },
    activity: {
      es: 'Aguas Grises, Aguas Negras, Aeropuerto',
      en: 'Gray Water, Black Water, Airport Area',
      de: 'Grauwasser, Schwarzwasser, Flughafenbereich',
      fr: 'Eaux Grises, Eaux Noires, Zone Aéroport',
      it: 'Acque Grigie, Acque Nere, Zona Aeroporto'
    }
  },
  {
    id: 'punto-cotillo',
    category: 'service',
    name: 'Punto Amigo Cotillo',
    image: 'images/service_punto_cotillo.png',
    type: {
      es: 'Área de Servicios Privada',
      en: 'Private Service Area',
      de: 'Private Servicestelle',
      fr: 'Aire de Services Privée',
      it: 'Area di Servizio Privata'
    },
    coordinates: { x: 220, y: 135 },
    geoCoordinates: { lat: 28.6811, lng: -14.0097 },
    address: 'Avenida Hermanas del Castillo Carreras, 1, El Cotillo',
    description: {
      es: 'Punto de servicios ubicado a la entrada del pintoresco pueblo de El Cotillo. Ofrece vaciado de aguas residuales y llenado de agua potable limpia (con coste mínimo de mantenimiento).',
      en: 'Service point located at the entrance of the picturesque village of El Cotillo. Offers wastewater disposal and fresh drinking water refill (with a minimal maintenance fee).',
      de: 'Servicestelle am Eingang des malerischen Dorfes El Cotillo. Bietet Abwasserentsorgung und Trinkwasserauffüllung (mit einer geringen Wartungsgebühr).',
      fr: 'Point de services situé à l\'entrée du pittoresque village d\'El Cotillo. Propose la vidange des eaux usées et le remplissage d\'eau potable (avec un coût d\'entretien minime).',
      it: 'Punto di servizio situato all\'ingresso del pittoresco villaggio di El Cotillo. Offre lo scarico delle acque reflue e il carico di agua potabile pulita (con costo minimo di manutenzione).'
    },
    activity: {
      es: 'Vaciado, Agua Potable, El Cotillo',
      en: 'Disposal, Fresh Water, El Cotillo',
      de: 'Entsorgung, Frischwasser, El Cotillo',
      fr: 'Vidange, Eau Propre, El Cotillo',
      it: 'Scarico, Acqua Potabile, El Cotillo'
    }
  },
  {
    id: 'area-antigua',
    category: 'service',
    name: 'Área Ecológica Antigua',
    image: 'images/service_area_antigua.png',
    type: {
      es: 'Área Ecológica de Servicios',
      en: 'Eco Service Station',
      de: 'Öko-Servicestation',
      fr: 'Aire de Services Écologique',
      it: 'Area di Servizio Ecologica'
    },
    coordinates: { x: 240, y: 280 },
    geoCoordinates: { lat: 28.4231, lng: -14.0135 },
    address: 'Acceso FV-2, cruce Antigua',
    description: {
      es: 'Excelente punto limpio ecológico y gratuito promovido localmente. Permite el cambio completo de aguas (vaciado de grises, negras y toma de agua limpia). Se accede fácilmente desde la autovía principal FV-2.',
      en: 'Excellent free eco-station promoted locally. Allows a full water exchange (gray and black water disposal, plus fresh water intake). Easily accessible from the main FV-2 highway.',
      de: 'Hervorragende, lokal geförderte kostenlose Öko-Entsorgungsstelle. Ermöglicht kompletten Wasserwechsel (Entsorgung von Grau- und Schwarzwasser, Frischwasseranschluss). Einfacher Zugang von der FV-2.',
      fr: 'Excellente station écologique gratuite promue localement. Permet un changement d\'eau complet (vidange des eaux grises, noires et prise d\'eau propre). Facilement accessible depuis la FV-2.',
      it: 'Eccellente punto ecologico gratuito promosso a livello locale. Consente il cambio completo delle acque (scarico acque grigie, nere e allacciamento agua pulita). Facilmente accessibile dalla FV-2.'
    },
    activity: {
      es: 'Aguas Completas, Gratis, Acceso FV-2',
      en: 'Full Services, Free, FV-2 Access',
      de: 'Vollservice, Kostenlos, FV-2 Zufahrt',
      fr: 'Services Complets, Gratuit, Accès FV-2',
      it: 'Servizi Completi, Gratis, Accesso FV-2'
    }
  },
  {
    id: 'punto-tarajalejo',
    category: 'service',
    name: 'Punto Tarajalejo',
    image: 'images/service_punto_tarajalejo.png',
    type: {
      es: 'Área de Autocaravanas Municipal',
      en: 'Municipal Motorhome Area',
      de: 'Kommunaler Wohnmobilstellplatz',
      fr: 'Aire Municipale de Camping-cars',
      it: 'Area Comunale Camper'
    },
    coordinates: { x: 180, y: 350 },
    geoCoordinates: { lat: 28.1925, lng: -14.1205 },
    address: 'Tarajalejo, Tuineje (Junto a costa)',
    description: {
      es: 'Punto oficial del Ayuntamiento de Tuineje habilitado junto a la costa. Equipado con rejillas para vaciado de aguas grises, arqueta de aguas negras y grifos para rellenar el depósito de agua limpia.',
      en: 'Official Tuineje council point near the coast. Equipped with gray water grates, black water disposal, and fresh water taps for refilling.',
      de: 'Offizielle Servicestelle der Gemeinde Tuineje direkt an der Küste. Ausgestattet mit Grauwassergittern, Schwarzwasserentsorgung und Frischwasserhähnen.',
      fr: 'Point officiel de la municipalité de Tuineje près de la côte. Équipé de grilles pour eaux grises, vidange des eaux noires et robinets d\'eau propre.',
      it: 'Punto ufficiale del Comune di Tuineje situato vicino alla costa. Attrezzato con griglie per scarico acque grigie, pozzetto acque nere e rubinetti per acqua pulita.'
    },
    activity: {
      es: 'Vaciado, Agua Potable, Costa Sur',
      en: 'Disposal, Fresh Water, South Coast',
      de: 'Entsorgung, Frischwasser, Südküste',
      fr: 'Vidange, Eau Propre, Côte Sud',
      it: 'Scarico, Acqua Potabile, Costa Sud'
    }
  },
  {
    id: 'bp-corralejo',
    category: 'service',
    name: 'BP Corralejo',
    image: 'images/service_bp_corralejo.png',
    type: {
      es: 'Gasolinera con Servicios Camper',
      en: 'Petrol Station with Camper Services',
      de: 'Tankstelle mit Camper-Services',
      fr: 'Station-service avec Services Camper',
      it: 'Stazione di Servizio con Servizi Camper'
    },
    coordinates: { x: 310, y: 80 },
    geoCoordinates: { lat: 28.7294, lng: -13.8753 },
    address: 'Avenida Juan Carlos I, Corralejo',
    description: {
      es: 'Ubicada en el núcleo turístico de Corralejo. Dispone de servicios para el vaciado de aguas grises y negras de forma gratuita. El llenado de agua limpia se realiza mediante fichas de pago.',
      en: 'Located in the tourist hub of Corralejo. Features free gray and black water disposal services. Fresh water refill is available using paid tokens.',
      de: 'Liegt im Tourismuszentrum von Corralejo. Bietet kostenlose Grauwasser- und Schwarzwasserentsorgung. Frischwasserbefüllung ist gegen Wertmarken möglich.',
      fr: 'Située dans le centre touristique de Corralejo. Propose des services de vidange d\'eaux grises et noires gratuits. Remplissage d\'agua propre disponible via jetons payants.',
      it: 'Situata nel centro turistico di Corralejo. Dispone di servizi per lo scarico di acque grigie e nere gratuiti. Il rifornimento di agua pulita è a pagamento tramite gettoni.'
    },
    activity: {
      es: 'Vaciado Gratis, Corralejo, Gasolinera',
      en: 'Free Disposal, Corralejo, Gas Station',
      de: 'Freie Entsorgung, Corralejo, Tankstelle',
      fr: 'Vidange Gratuite, Corralejo, Station-service',
      it: 'Scarico Gratis, Corralejo, Stazione'
    }
  }
];

export default function AdventureMap() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { language, t } = useLanguage();

  const filteredSpots = spots.filter(spot => {
    if (activeCategory === 'all') return true;
    return spot.category === activeCategory;
  });

  const [activeSpot, setActiveSpot] = useState(filteredSpots[0] || spots[0]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    const newFiltered = spots.filter(spot => cat === 'all' || spot.category === cat);
    if (newFiltered.length > 0) {
      setActiveSpot(newFiltered[0]);
    }
  };

  const getLocalized = (field) => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[language] || field['es'] || '';
  };

  const mapUrl = activeSpot.geoCoordinates 
    ? `https://www.google.com/maps/search/?api=1&query=${activeSpot.geoCoordinates.lat},${activeSpot.geoCoordinates.lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeSpot.name + ', Fuerteventura')}`;

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .popup-image-container {
            display: none !important;
          }
        }
      `}</style>
      
      <div className="adventure-layout">
        {/* Barra Lateral con Pestañas y Lista */}
        <div className="spots-list">
          <h4 style={{ marginBottom: '0.85rem', padding: '0 0.5rem', color: 'var(--accent-gold)' }}>
            {t('map.spots_list_title')}
          </h4>
          
          {/* Pestañas de Categoría */}
          <div className="flex" style={{ gap: '0.35rem', marginBottom: '1.25rem', padding: '0 0.5rem', flexWrap: 'wrap' }}>
            {['all', 'adventure', 'service'].map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className="glass"
                style={{
                  padding: '0.45rem 0.8rem',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  background: activeCategory === cat ? 'var(--accent-orange)' : 'rgba(255, 255, 255, 0.05)',
                  color: activeCategory === cat ? 'white' : 'var(--text-secondary)',
                  border: activeCategory === cat ? '1px solid var(--accent-orange)' : '1px solid var(--border-color)',
                  transition: 'all var(--transition-fast)',
                  outline: 'none'
                }}
              >
                {t(`map.tab_${cat === 'service' ? 'services' : cat}`)}
              </button>
            ))}
          </div>

          {/* Lista Filtrada */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '380px', overflowY: 'auto', padding: '0 0.25rem' }}>
            {filteredSpots.map((spot) => (
              <div
                key={spot.id}
                className={`spot-item ${activeSpot.id === spot.id ? 'active' : ''}`}
                onClick={() => setActiveSpot(spot)}
                style={{
                  borderLeft: activeSpot.id === spot.id 
                    ? `4px solid ${spot.category === 'service' ? 'var(--accent-teal)' : 'var(--accent-orange)'}` 
                    : '1px solid var(--border-color)'
                }}
              >
                <div className="spot-title-row">
                  <h4>{spot.name}</h4>
                  <span 
                    className="spot-tag"
                    style={{
                      color: spot.category === 'service' ? 'var(--accent-teal)' : 'var(--accent-gold)'
                    }}
                  >
                    {getLocalized(spot.activity).split(',')[0]}
                  </span>
                </div>
                <p style={{ fontSize: '0.9rem', color: activeSpot.id === spot.id ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                  {getLocalized(spot.type)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Lado derecho: Mapa y popup apilados verticalmente (evita superposición y cortes) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
          {/* Contenedor del Mapa SVG (Proporción horizontal) */}
          <div className="map-container glass" style={{ height: '360px', position: 'relative', overflow: 'hidden' }}>
            <svg viewBox="0 0 500 500" className="map-svg" style={{ width: '100%', height: '100%', display: 'block' }}>
              {/* Cuadrícula estética de fondo */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.015)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Silueta vectorial de Fuerteventura */}
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

              {/* Marcadores Interactivos */}
              {filteredSpots.map((spot) => (
                <g
                  key={spot.id}
                  className={`map-marker ${activeSpot.id === spot.id ? 'active' : ''}`}
                  transform={`translate(${spot.coordinates.x}, ${spot.coordinates.y})`}
                  onClick={() => setActiveSpot(spot)}
                >
                  {/* Círculos dinámicos con color según categoría */}
                  <circle 
                    r={activeSpot.id === spot.id ? 9 : 6.5} 
                    style={{ 
                      fill: activeSpot.id === spot.id 
                      ? 'var(--accent-gold)' 
                      : (spot.category === 'service' ? 'var(--accent-teal)' : 'var(--accent-orange)'),
                      stroke: 'white',
                      strokeWidth: 2,
                      transition: 'all var(--transition-fast)'
                    }} 
                  />
                  <circle 
                    r="13" 
                    fill="none" 
                    stroke={spot.category === 'service' ? 'var(--accent-teal)' : 'var(--accent-orange)'} 
                    strokeWidth="1.5" 
                    style={{ 
                      opacity: activeSpot.id === spot.id ? 1 : 0,
                      transition: 'all var(--transition-fast)'
                    }} 
                  />
                  <text y="-18" style={{ fontSize: '10px', fill: 'white', fontWeight: '700' }}>
                    {spot.name.split(' ')[0]}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Tarjeta de Información Estática Abajo (nunca obstruye los puntos del mapa) */}
          {activeSpot && (
            <div 
              className="glass animate-fade-in" 
              style={{ 
                background: 'rgba(22, 24, 31, 0.96)', 
                border: '1px solid var(--border-color)',
                display: 'flex',
                gap: '1.25rem',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)'
              }}
            >
              {/* Imagen en Desktop */}
              <div 
                className="popup-image-container"
                style={{ 
                  width: '140px', 
                  height: '115px',
                  flexShrink: 0, 
                  borderRadius: '10px', 
                  overflow: 'hidden', 
                  background: 'var(--bg-tertiary)'
                }}
              >
                <img 
                  src={import.meta.env.BASE_URL + activeSpot.image} 
                  alt={activeSpot.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>

              {/* Información textual */}
              <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div className="flex align-center gap-2" style={{ gap: '0.5rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                    {activeSpot.category === 'service' ? (
                      <>
                        <Droplet size={14} style={{ color: 'var(--accent-teal)' }} />
                        <span className="badge badge-blue" style={{ fontSize: '0.72rem', textTransform: 'none', background: 'rgba(0, 168, 150, 0.15)', color: 'var(--accent-teal)', border: '1px solid rgba(0, 168, 150, 0.3)' }}>
                          {t('map.tab_services')}
                        </span>
                      </>
                    ) : (
                      <>
                        <Compass size={14} className="animate-spin-slow" style={{ color: 'var(--accent-orange)' }} />
                        <span className="badge badge-adventure" style={{ fontSize: '0.72rem' }}>
                          {getLocalized(activeSpot.activity).split(',')[0]}
                        </span>
                        <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>
                          {t('map.difficulty')}: {t(`map.${activeSpot.difficulty}`)}
                        </span>
                      </>
                    )}
                  </div>
                  
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'white', marginBottom: '0.25rem' }}>
                    {activeSpot.name}
                  </h4>
                  
                  <p style={{ fontSize: '0.88rem', lineHeight: '1.45', margin: '0.25rem 0 0.85rem', color: 'var(--text-secondary)' }}>
                    {getLocalized(activeSpot.description)}
                  </p>
                </div>
                
                {/* Fila inferior: Dirección y Botón de Google Maps */}
                <div className="flex align-center justify-between" style={{ marginTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.65rem', gap: '1rem', flexWrap: 'wrap' }}>
                  <div className="flex align-center" style={{ gap: '0.35rem', fontSize: '0.8rem', color: 'var(--accent-gold)' }}>
                    <MapPin size={13} style={{ flexShrink: 0 }} />
                    <span 
                      style={{ 
                        maxWidth: '180px', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        whiteSpace: 'nowrap',
                        color: 'var(--text-muted)'
                      }} 
                      title={activeSpot.address || `${t('footer.address').split(',')[0]}, Canarias`}
                    >
                      {activeSpot.address || `${t('footer.address').split(',')[0]}, Canarias`}
                    </span>
                  </div>
                  
                  <a 
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{
                      padding: '0.45rem 0.85rem',
                      fontSize: '0.75rem',
                      borderRadius: '8px',
                      gap: '0.4rem',
                      margin: 0,
                      boxShadow: 'none',
                      minHeight: 'auto',
                      lineHeight: '1'
                    }}
                  >
                    <MapPin size={11} />
                    {t('map.btn_directions')}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
