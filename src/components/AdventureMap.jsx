import React, { useState } from 'react';
import { Compass, MapPin, Sparkles, Droplet, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const spots = [
  // Normativas y Cuidados
  {
    id: 'pernocta',
    category: 'regulations',
    name: 'Pernoctar vs Acampar',
    image: 'images/camper_beach.png',
    type: {
      es: 'Normativa General de Pernocta',
      en: 'General Overnight Rules',
      de: 'Allgemeine Übernachtungsregeln',
      fr: 'Règles Générales de Bivouac',
      it: 'Regole Generali di Pernottamento'
    },
    coordinates: { x: 250, y: 190 },
    description: {
      es: 'Está permitido pernoctar (dormir dentro de la camper correctamente estacionada). Según la Ordenanza del Cabildo, la libre acampada (desplegar toldos, mesas, sillas o verter líquidos) está estrictamente prohibida en suelo rústico y espacios públicos.',
      en: 'Overnight stay is permitted (sleeping inside a correctly parked camper). Under the Cabildo\'s Ordinance, free camping (deploying awnings, tables, chairs, or dumping liquids) is strictly prohibited on rustic land and public spaces.',
      de: 'Übernachten ist erlaubt (Schlafen im ordnungsgemäß geparkten Camper). Gemäß der Verordnung des Cabildos ist das freie Campen (Ausrollen von Markisen, Tischen, Stühlen oder Ablassen von Flüssigkeiten) auf rustikalem Land und im öffentlichen Raum streng verboten.',
      fr: 'Bivouac autorisé (dormir à l\'intérieur du van correctement stationné). Selon l\'ordonnance du Cabildo, le camping sauvage (déployer des auvents, tables, chaises ou vider des liquides) est strictement interdit sur les terrains rustiques et espaces publics.',
      it: 'Pernottamento consentito (dormire all\'interno del camper correttamente parcheggiato). Secondo l\'ordinanza del Cabildo, il campeggio libero (apertura di tendalini, tavoli, sedie o scarico di liquidi) è severamente vietato su terreni rustici e spazi pubblici.'
    },
    activity: {
      es: 'Pernocta Legal, DGT',
      en: 'Legal Overnight, DGT',
      de: 'Legales Übernachten, DGT',
      fr: 'Bivouac Légal, DGT',
      it: 'Pernottamento Legale, DGT'
    },
    address: 'Ordenanza Cabildo de Fuerteventura (DGT 08/V-74)'
  },
  {
    id: 'zonas-protegidas',
    category: 'regulations',
    name: 'Espacios Naturales',
    image: 'images/camper_volcano.png',
    type: {
      es: 'Protección de Parques Naturales',
      en: 'Protected Natural Parks',
      de: 'Geschützte Naturparks',
      fr: 'Parcs Naturels Protégés',
      it: 'Parchi Naturali Protetti'
    },
    coordinates: { x: 310, y: 120 },
    description: {
      es: 'Fuerteventura es Reserva de la Biosfera. La ordenanza insular prohíbe acampar o estacionar fuera de pistas autorizadas en espacios protegidos y Red Natura 2000 (como Corralejo, Cofete y Jandía). Multas severas por infracción ecológica.',
      en: 'Fuerteventura is a Biosphere Reserve. The insular ordinance prohibits camping or parking off-road in protected areas and Natura 2000 sites (such as Corralejo, Cofete, and Jandía). Strict fines apply for ecological violations.',
      de: 'Fuerteventura ist ein Biosphärenreservat. Die Inselverordnung verbietet das Campen oder Parken abseits der Straßen in Schutzgebieten und Natura-2000-Gebieten (wie Corralejo, Cofete und Jandía). Hohe Geldstrafen bei Umweltverstößen.',
      fr: 'Fuerteventura est une réserve de biosphère. L\'ordonnance insulaire interdit le camping et le stationnement hors-piste dans les espaces protégés et sites Natura 2000 (comme Corralejo, Cofete et Jandía). Amendes sévères pour infraction écologique.',
      it: 'Fuerteventura è una Riserva della Biosfera. L\'ordinanza insulare vieta il campeggio e il parcheggio fuoristrada nelle aree protette e nei siti Natura 2000 (come Corralejo, Cofete e Jandía). Multe severe per violazioni ecologiche.'
    },
    activity: {
      es: 'Parques Naturales, Multas',
      en: 'Natural Parks, Fines',
      de: 'Naturparks, Bußgelder',
      fr: 'Parcs Naturels, Amendes',
      it: 'Parchi Naturali, Multe'
    },
    address: 'Espacios Protegidos y Red Natura 2000'
  },
  {
    id: 'gestion-residuos',
    category: 'regulations',
    name: 'Vertido Cero y Aguas',
    image: 'images/camper_service.png',
    type: {
      es: 'Cuidado Ambiental Ecológico',
      en: 'Eco-Friendly Environmental Care',
      de: 'Umweltschonende Entsorgung',
      fr: 'Respect de l\'Environnement',
      it: 'Rispetto dell\'Ambiente Ecologico'
    },
    coordinates: { x: 230, y: 280 },
    description: {
      es: 'Está prohibido verter aguas grises/negras en el suelo, barrancos o playas. La ordenanza insular del Cabildo exige realizar el vaciado exclusivamente en áreas de servicios de acogida autorizadas (Puntos Limpios) para proteger el frágil ecosistema.',
      en: 'Dumping gray/black water on the ground, ravines, or beaches is prohibited. The Cabildo\'s insular ordinance requires emptying exclusively at authorized reception service areas (Clean Points) to protect the fragile ecosystem.',
      de: 'Das Ablassen von Grau-/Schwarzwasser auf dem Boden, in Schluchten oder an Stränden ist verboten. Die Verordnung des Cabildos verlangt die Entleerung ausschließlich an zugelassenen Servicestellen (Puntos Limpios) zum Schutz des empfindlichen Ökosystems.',
      fr: 'Il est interdit de vider les eaux grises/noires sur le sol, les ravins ou les plages. L\'ordonnance insulaire du Cabildo exige la vidange exclusivement dans les aires de services agréées (Points Propres) pour protéger l\'écosystème fragile.',
      it: 'È vietato scaricare acque grigie/nere sul terreno, nei calanchi o sulle spiagge. L\'ordinanza insulare del Cabildo impone lo scarico esclusivamente nelle aree di servizio autorizzate (Punti di Scarico) per proteggere il fragile ecosistema.'
    },
    activity: {
      es: 'Vaciado, Ecología',
      en: 'Disposal, Ecology',
      de: 'Entsorgung, Ökologie',
      fr: 'Vidange, Écologie',
      it: 'Scarico, Ecologia'
    },
    address: 'Red de Puntos Limpios del Cabildo'
  },
  {
    id: 'respeto-comunidad',
    category: 'regulations',
    name: 'Respeto al Entorno Local',
    image: 'images/epic_beach.png',
    type: {
      es: 'Convivencia y Limpieza',
      en: 'Coexistence & Tidiness',
      de: 'Zusammenleben & Sauberkeit',
      fr: 'Cohabitation & Propreté',
      it: 'Convivenza & Pulizia'
    },
    coordinates: { x: 270, y: 350 },
    description: {
      es: 'Evita aglomeraciones de campers en playas urbanas. Respeta el descanso de los residentes locales, mantén bajos los niveles de ruido y llévate toda la basura contigo. Fuerteventura es un paraíso que protegemos entre todos.',
      en: 'Avoid crowding campers on urban beaches. Respect the rest of local residents, keep noise levels low, and take all your trash with you. Fuerteventura is a paradise we protect together.',
      de: 'Vermeiden Sie Camper-Ansammlungen an Stadtstränden. Respektieren Sie die Ruhe der Anwohner, halten Sie den Lärmpegel niedrig und nehmen Sie Ihren Müll mit. Fuerteventura is ein Paradies, das wir gemeinsam schützen.',
      fr: 'Évitez les rassemblements de campers sur les plages urbaines. Respectez le repos des habitants locaux, gardez le bruit bas et emportez tous vos déchets. Fuerteventura est un paradis que nous protégeons ensemble.',
      it: 'Evita l\'affollamento di camper sulle spiagge urbane. Rispetta il riposo dei residenti locali, mantieni bassi i livelli di rumore e porta via tutti i rifiuti. Fuerteventura è un paradiso che proteggiamo insieme.'
    },
    activity: {
      es: 'Comunidad, Basura Cero',
      en: 'Community, Zero Waste',
      de: 'Gemeinschaft, Müllfrei',
      fr: 'Communauté, Zéro Déchet',
      it: 'Comunità, Rifiuti Zero'
    },
    address: 'Buenas Prácticas Camper'
  },

  // Spots de Aventura
  {
    id: 'corralejo',
    category: 'adventure',
    name: 'Dunas de Corralejo',
    image: 'images/corralejo_dunes.png',
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
    image: 'images/lagos_cotillo.png',
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
    image: 'images/valle_betancuria.png',
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
    image: 'images/playa_cofete.png',
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
      de: 'Das wilde Juwel der Insel. 12 km unberührter Strand, bewacht von über 800 m hohen Bergen. Zufahrt über eine abenteuerliche Schotterpiste. Die Nacht hier im Camper zu verbringen, es una experiencia mística.',
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
    category: 'adventure',
    name: 'Laguna de Sotavento',
    image: 'images/laguna_sotavento.png',
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
      it: "Una enorme barriera di sabbia crea una laguna di marea naturale lunga 4 km. L'epicentro mundial de Windsurf e ideale per riposare sentendo la brezza."
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
  {
    id: 'aguas-verdes',
    category: 'adventure',
    name: 'Charcos de Aguas Verdes',
    image: 'images/pool_aguas_verdes.png',
    type: {
      es: 'Piscinas de Roca Volcánica y Mar Salvaje',
      en: 'Volcanic Rock Pools & Wild Sea',
      de: 'Vulkangestein-Pools & Wildes Meer',
      fr: 'Piscines de Roche Volcanique & Mer Sauvage',
      it: 'Piscine di Roccia Vulcanica & Mare Selvaggio'
    },
    coordinates: { x: 200, y: 220 },
    geoCoordinates: { lat: 28.4550, lng: -14.0945 },
    description: {
      es: 'Un paraíso de charcos vírgenes esculpidos en piedra volcánica en la costa oeste. Ideales para relajarse y observar la vida marina durante la marea baja. Se recomienda llevar calzado escarpín y precaución con el oleaje exterior.',
      en: 'A paradise of pristine pools carved into volcanic stone on the west coast. Ideal for relaxing and watching marine life during low tide. Reef shoes and caution with external waves are highly recommended.',
      de: 'Ein Paradies aus unberührten, in Vulkangestein gehauenen Becken an der Westküste. Ideal zum Entspannen und Beobachten des Meereslebens bei Ebbe. Badeschuhe und Vorsicht vor äußeren Wellen werden dringend empfohlen.',
      fr: 'Un paradis de vasques sauvages sculptées dans la roche volcanique sur la côte ouest. Idéal pour se détendre et observer la vie marine à marée basse. Chaussures d\'eau et prudence face aux vagues recommandées.',
      it: 'Un paradiso di piscine naturali incontaminate scavate nella pietra vulcanica sulla costa occidentale. Ideale per rilassarsi e observar la vita marina durante la bassa marea. Si consigliano scarpette da scoglio e cautela con le onde esterne.'
    },
    activity: {
      es: 'Charcos, Senderismo, Relax',
      en: 'Tide Pools, Hiking, Relax',
      de: 'Gezeitenbecken, Wandern, Relax',
      fr: 'Piscines de Marée, Randonnée, Détente',
      it: 'Piscine Naturali, Trekking, Relax'
    },
    difficulty: 'diff_medium',
    address: 'Playa del Valle, Betancuria'
  },
  {
    id: 'puertito-lobos',
    category: 'adventure',
    name: 'Lagunas de Puertito de Lobos',
    image: 'images/pool_puertito_lobos.png',
    type: {
      es: 'Lagunas Turquesas e Islote Virgen',
      en: 'Turquoise Lagoons & Pristine Islet',
      de: 'Türkisfarbene Lagunen & Unberührte Insel',
      fr: 'Lagons Turquoise & Îlot Sauvage',
      it: 'Lagune Turchesi & Isolotto Incontaminato'
    },
    coordinates: { x: 385, y: 75 },
    geoCoordinates: { lat: 28.7490, lng: -13.8220 },
    description: {
      es: 'Piscinas naturales de aguas turquesas y transparentes y poca profundidad, ideales para hacer snorkel. Situadas en el islote de Lobos, accesible en taxi-barco desde Corralejo. Un ecosistema único protegido.',
      en: 'Natural pools of shallow, crystal-clear turquoise waters, perfect for snorkeling. Located on Lobos Islet, accessible by water taxi from Corralejo. A protected and unique ecosystem.',
      de: 'Natürliche Becken mit flachem, kristallklarem, türkisfarbenem Wasser, perfekt zum Schnorcheln. Auf der Insel Lobos, erreichbar mit dem Wassertaxi von Corralejo. Ein geschütztes und einzigartiges Ökosystem.',
      fr: 'Piscines naturelles d\'eaux turquoise peu profondes et cristallines, parfaites pour le snorkeling. Situées sur l\'îlot de Lobos, accessible en bateau-taxi depuis Corralejo. Un écosystème protégé unique.',
      it: 'Piscine naturali di acque turchesi poco profonde e cristalline, perfette per lo snorkeling. Situate sull\'isolotto di Lobos, raggiungibile in water taxi da Corralejo. Un ecosistema unico e protetto.'
    },
    activity: {
      es: 'Snorkel, Kayak, Islote',
      en: 'Snorkeling, Kayak, Islet Tour',
      de: 'Schnorcheln, Kajak, Inseltour',
      fr: 'Snorkeling, Kayak, Visite d\'Îlot',
      it: 'Snorkeling, Kayak, Tour dell\'Isolotto'
    },
    difficulty: 'diff_easy',
    address: 'Islote de Lobos, Corralejo'
  },
  {
    id: 'charcos-cotillo',
    category: 'adventure',
    name: 'Charcos de El Cotillo',
    image: 'images/pool_charcos_cotillo.png',
    type: {
      es: 'Calas de Arena Blanca y Arrecife',
      en: 'White Sand Coves & Reef Barrier',
      de: 'Weiße Sandbuchten & Riffbarriere',
      fr: 'Criques de Sable Blanc & Récif',
      it: 'Calette di Sabbia Bianca & Barriera'
    },
    coordinates: { x: 210, y: 90 },
    geoCoordinates: { lat: 28.7125, lng: -14.0145 },
    description: {
      es: 'Conjunto de lagunas de aguas calmas formadas por un arrecife natural de basalto negro, con arena blanca y fina. Es muy seguro para familias y niños pequeños. Situado junto al emblemático Faro del Tostón.',
      en: 'A series of calm lagoons formed by a natural black basalt reef, featuring fine white sand. Very safe for families and young children. Located next to the iconic Tostón Lighthouse.',
      de: 'Eine Reihe von ruhigen Lagunen, die durch ein natürliches schwarzes Basaltriff gebildet werden, mit feinem weißen Sand. Sehr sicher für Familien und kleine Kinder. Neben dem berühmten Tostón-Leuchtturm.',
      fr: 'Une série de lagunes calmes formées par un récif naturel de basalte noir, con du sable blanc très fin. Très sûr pour les familles et les jeunes enfants. Situé à côté de l\'emblématique phare de Tostón.',
      it: 'Una serie di lagune calme formate da una barriera naturale di basalto nero, con sabbia bianca e finissima. Molto sicuro per famiglie e bambini piccoli. Situato vicino all\'iconico Faro del Tostón.'
    },
    activity: {
      es: 'Familiar, Faro, Baño Seguro',
      en: 'Family-Friendly, Lighthouse, Safe Swim',
      de: 'Familienfreundlich, Leuchtturm, Sicheres Baden',
      fr: 'Familial, Phare, Baignade Sûre',
      it: 'Ideale per Famiglie, Faro, Bagno Sicuro'
    },
    difficulty: 'diff_easy',
    address: 'Faro del Tostón, El Cotillo'
  },

  // Puntos Limpios / Servicios
  {
    id: 'disa-mercadona',
    category: 'service',
    name: 'DISA Nueva Mercadona',
    image: 'images/service_disa_mercadona.png',
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
      it: 'Stazione di servicio molto conosciuta dai camperisti a Puerto del Rosario. Dispone di una griglia per lo scarico delle acque grigie e de un punto habilitato per lo scarico delle acque nere. Chiedere al personale prima dell\'uso.'
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
  const [activeCategory, setActiveCategory] = useState('regulations');
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
        /* Desktop styles: hide inline accordion */
        @media (min-width: 769px) {
          .spot-item-expanded-inline {
            display: none !important;
          }
        }
        
        /* Mobile styles: hide bottom card, style inline accordion and buttons */
        @media (max-width: 768px) {
          .desktop-only-info-card {
            display: none !important;
          }
          .adventure-layout {
            display: flex !important;
            flex-direction: column !important;
            gap: 2rem !important;
            width: 100% !important;
            max-width: 100% !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
          }
          .category-tabs-container {
            flex-direction: column !important;
            width: 100%;
            gap: 0.5rem !important;
            padding: 0 0.5rem !important;
          }
          .category-tabs-container button {
            width: 100% !important;
            justify-content: center;
            font-size: 0.82rem !important;
            padding: 0.65rem 1rem !important;
          }
          .spots-list {
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
          .spot-item {
            padding: 1rem !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
          .spot-item-expanded-inline {
            display: flex !important;
            flex-direction: column;
            gap: 0.85rem;
            margin-top: 1rem;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            padding-top: 0.85rem;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
          .spot-item-expanded-inline p {
            word-break: break-word !important;
            overflow-wrap: break-word !important;
          }
          /* Prevent slide translate on mobile to fit accordion nicely */
          .spot-item.active {
            transform: none !important;
          }
          .spot-title-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.25rem !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          .spot-title-row h4 {
            font-size: 1.05rem !important;
            word-break: break-word !important;
            width: 100% !important;
            min-width: 0 !important;
            margin: 0 !important;
          }
          .spot-tag {
            font-size: 0.72rem !important;
            margin: 0 !important;
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
          <div className="category-tabs-container flex" style={{ gap: '0.35rem', marginBottom: '1.25rem', padding: '0 0.5rem', flexWrap: 'wrap' }}>
            {['regulations', 'adventure', 'service'].map((cat) => {
              const Icon = cat === 'regulations' ? Shield : (cat === 'service' ? Droplet : Compass);
              return (
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
                    outline: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <Icon size={14} style={{ 
                    color: activeCategory === cat 
                      ? 'white' 
                      : (cat === 'regulations' 
                          ? 'var(--accent-gold)' 
                          : (cat === 'service' ? 'var(--accent-teal)' : 'var(--accent-orange)'))
                  }} />
                  {t(`map.tab_${cat === 'service' ? 'services' : cat}`)}
                </button>
              );
            })}
          </div>

          {/* Lista Filtrada */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '380px', overflowY: 'auto', padding: '0 0.25rem', width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
            {filteredSpots.map((spot) => (
              <div
                key={spot.id}
                className={`spot-item ${activeSpot.id === spot.id ? 'active' : ''}`}
                onClick={() => setActiveSpot(spot)}
                style={{
                  borderLeft: activeSpot.id === spot.id 
                    ? `4px solid ${
                        spot.category === 'regulations' 
                          ? 'var(--accent-gold)' 
                          : (spot.category === 'service' ? 'var(--accent-teal)' : 'var(--accent-orange)')
                      }` 
                    : '1px solid var(--border-color)',
                  cursor: 'pointer'
                }}
              >
                <div className="spot-title-row">
                  <h4>{spot.name}</h4>
                  <span 
                    className="spot-tag"
                    style={{
                      color: spot.category === 'regulations' 
                        ? 'var(--accent-gold)' 
                        : (spot.category === 'service' ? 'var(--accent-teal)' : 'var(--accent-orange)')
                    }}
                  >
                    {getLocalized(spot.activity).split(',')[0]}
                  </span>
                </div>
                <p style={{ fontSize: '0.9rem', color: activeSpot.id === spot.id ? 'var(--text-primary)' : 'var(--text-secondary)', margin: 0 }}>
                  {getLocalized(spot.type)}
                </p>

                {/* Inline Accordion for Mobile */}
                {activeSpot.id === spot.id && (
                  <div className="spot-item-expanded-inline animate-fade-in">
                    <div style={{ 
                      width: '100%', 
                      height: '150px', 
                      borderRadius: '8px', 
                      overflow: 'hidden', 
                      position: 'relative', 
                      background: 'var(--bg-tertiary)', 
                      marginBottom: '0.5rem',
                      display: 'block',
                      maxWidth: '100%',
                      flexShrink: 0
                    }}>
                      <img 
                        src={import.meta.env.BASE_URL + spot.image} 
                        alt={spot.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                      />
                    </div>
                    <p style={{ fontSize: '0.82rem', lineHeight: '1.4', color: 'var(--text-secondary)', margin: '0 0 0.75rem' }}>
                      {getLocalized(spot.description)}
                    </p>
                    <div className="flex align-center justify-between" style={{ gap: '0.5rem', flexWrap: 'wrap', fontSize: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.65rem', width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
                      <div className="flex align-center" style={{ gap: '0.25rem', color: 'var(--text-muted)', maxWidth: '100%', overflow: 'hidden', minWidth: 0, flex: 1 }}>
                        {spot.category === 'regulations' ? <Shield size={12} style={{ flexShrink: 0, color: 'var(--accent-gold)' }} /> : <MapPin size={12} style={{ flexShrink: 0, color: 'var(--accent-orange)' }} />}
                        <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                          {spot.address || `${t('footer.address').split(',')[0]}, Canarias`}
                        </span>
                      </div>
                      {spot.category !== 'regulations' && (
                        <a 
                          href={spot.geoCoordinates 
                            ? `https://www.google.com/maps/search/?api=1&query=${spot.geoCoordinates.lat},${spot.geoCoordinates.lng}`
                            : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.name + ', Fuerteventura')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            padding: '0.35rem 0.65rem',
                            fontSize: '0.7rem',
                            borderRadius: '6px',
                            gap: '0.25rem',
                            margin: 0,
                            boxShadow: 'none',
                            minHeight: 'auto',
                            lineHeight: '1',
                            display: 'inline-flex',
                            alignItems: 'center'
                          }}
                        >
                          <MapPin size={10} />
                          {t('map.btn_directions')}
                        </a>
                      )}
                    </div>
                  </div>
                )}
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
                      : (spot.category === 'regulations' 
                          ? 'var(--accent-gold)' 
                          : (spot.category === 'service' ? 'var(--accent-teal)' : 'var(--accent-orange)')),
                      stroke: 'white',
                      strokeWidth: 2,
                      transition: 'all var(--transition-fast)'
                    }} 
                  />
                  <circle 
                    r="13" 
                    fill="none" 
                    stroke={
                      spot.category === 'regulations' 
                        ? 'var(--accent-gold)' 
                        : (spot.category === 'service' ? 'var(--accent-teal)' : 'var(--accent-orange)')
                    } 
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
              className="spot-info-card desktop-only-info-card glass animate-fade-in" 
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
                    ) : activeSpot.category === 'regulations' ? (
                      <>
                        <Shield size={14} style={{ color: 'var(--accent-gold)' }} />
                        <span className="badge badge-gold" style={{ fontSize: '0.72rem', background: 'rgba(230, 194, 128, 0.15)', color: 'var(--accent-gold)', border: '1px solid rgba(230, 194, 128, 0.3)' }}>
                          {t('map.tab_regulations')}
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
                
                {/* Fila inferior: Dirección/Normativa y Botón de Google Maps */}
                <div className="flex align-center justify-between" style={{ marginTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.65rem', gap: '1rem', flexWrap: 'wrap' }}>
                  <div className="flex align-center" style={{ gap: '0.35rem', fontSize: '0.8rem', color: 'var(--accent-gold)' }}>
                    {activeSpot.category === 'regulations' ? (
                      <Shield size={13} style={{ flexShrink: 0 }} />
                    ) : (
                      <MapPin size={13} style={{ flexShrink: 0 }} />
                    )}
                    <span 
                      style={{ 
                        maxWidth: '220px', 
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
                  
                  {activeSpot.category !== 'regulations' && (
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
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
