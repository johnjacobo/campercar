export const initialCampers = [
  {
    id: "camper-1",
    title: "Ocean Breeze Custom Van",
    type: "camper", // type ID: camper, motorhome, 4x4
    price: 85,
    rating: 4.92,
    reviewsCount: 38,
    passengers: 2,
    transmission: {
      es: "Manual",
      en: "Manual",
      de: "Manuell",
      fr: "Manuelle",
      it: "Manuale"
    },
    fuel: {
      es: "Diésel",
      en: "Diesel",
      de: "Diesel",
      fr: "Diesel",
      it: "Diesel"
    },
    images: [
      "images/camper_beach.png",
      "images/camper_interior.png"
    ],
    description: {
      es: "Perfecta furgoneta camperizada a mano en madera natural para parejas aventureras. Diseñada para despertar viendo el amanecer en Cofete. Equipamiento de primer nivel para vivir off-grid de forma totalmente autónoma.",
      en: "Perfect hand-crafted custom camper van in natural wood for adventurous couples. Designed to wake up watching the sunrise in Cofete. First-class equipment to live off-grid completely autonomously.",
      de: "Perfekter, handgefertigter Campervan aus Naturholz für abenteuerlustige Paare. Entworfen, um beim Aufwachen den Sonnenaufgang in Cofete zu beobachten. Erstklassige Ausstattung für ein völlig autarkes Leben abseits des Stromnetzes.",
      fr: "Parfait van aménagé à la main en bois naturel pour les couples aventureux. Conçu pour se réveiller face au lever du soleil à Cofete. Équipement haut de gamme pour vivre en totale autonomie hors réseau.",
      it: "Perfetto campervan artigianale in legno naturale per coppie avventurose. Progettato per svegliarsi guardando l'alba a Cofete. Attrezzatura di prima classe per vivere off-grid in modo completamente autonomo."
    },
    host: {
      name: "Alejandro L.",
      avatar: "AL",
      status: {
        es: "Socio Pro Fuerteventura",
        en: "Pro Partner Fuerteventura",
        de: "Pro Partner Fuerteventura",
        fr: "Partenaire Pro Fuerteventura",
        it: "Socio Pro Fuerteventura"
      }
    },
    amenities: [
      { es: "Placa Solar 150W", en: "150W Solar Panel", de: "150W Solarpanel", fr: "Panneau Solaire 150W", it: "Pannello Solare 150W" },
      { es: "Ducha exterior de presión", en: "Outdoor pressure shower", de: "Außendruckdusche", fr: "Douche extérieure à pression", it: "Doccia esterna a pressione" },
      { es: "Cocina de gas (2 fuegos)", en: "Gas stove (2 burners)", de: "Gaskocher (2 Brenner)", fr: "Réchaud à gaz (2 feux)", it: "Fornello a gas (2 fuochi)" },
      { es: "Nevera de compresor 40L", en: "40L Compressor fridge", de: "40L Kompressorkühlschrank", fr: "Réfrigérateur à compresseur 40L", it: "Frigorifero a compressore 40L" },
      { es: "Cama doble de viscoelástica", en: "Memory foam double bed", de: "Doppelbett mit Memory-Foam", fr: "Lit double en mousse à mémoire de forme", it: "Letto matrimoniale in memory foam" },
      { es: "Kit de snorkel y surf rack", en: "Snorkeling kit & surf rack", de: "Schnorchel-Set & Surfbrettträger", fr: "Kit de snorkeling & rack de surf", it: "Kit da snorkeling & porta surf" },
      { es: "Mascotas permitidas", en: "Pets allowed", de: "Haustiere erlaubt", fr: "Animaux acceptés", it: "Animali ammessi" }
    ],
    locations: ["Corralejo", "El Cotillo", "Lajares"]
  },
  {
    id: "camper-2",
    title: "Volcano Nomad 4x4 Camper",
    type: "4x4",
    price: 110,
    rating: 4.88,
    reviewsCount: 19,
    passengers: 3,
    transmission: {
      es: "Manual",
      en: "Manual",
      de: "Manuell",
      fr: "Manuelle",
      it: "Manuale"
    },
    fuel: {
      es: "Diésel",
      en: "Diesel",
      de: "Diesel",
      fr: "Diesel",
      it: "Diesel"
    },
    images: [
      "images/camper_volcano.png",
      "images/camper_interior.png"
    ],
    description: {
      es: "Explora los caminos más inaccesibles y duerme sobre el techo de tu vehículo en los volcanes más espectaculares de la isla. Equipada con tracción 4x4 real y una tienda de techo rígida de apertura rápida de 2 segundos.",
      en: "Explore the most inaccessible paths and sleep on the roof of your vehicle on the most spectacular volcanoes of the island. Equipped with real 4x4 traction and a 2-second quick-opening hard shell roof tent.",
      de: "Erkunde die unzugänglichsten Pfade und schlafe auf dem Dach deines Fahrzeugs auf den spektakulärsten Vulkanen der Insel. Ausgestattet mit echtem Allradantrieb (4x4) und einem in 2 Sekunden schnell öffnenden Hartschalen-Dachzelt.",
      fr: "Explorez les chemins les plus inaccessibles et dormez sur le toit de votre véhicule sur les volcans les plus spectaculaires de l'île. Équipé d'une vraie traction 4x4 et d'une tente de toit rigide à ouverture rapide en 2 secondes.",
      it: "Esplora i sentieri più inaccessibili e dormi sul tetto del tuo veicolo sui vulcani più spettacolari dell'isola. Equipaggiato con vera trazione 4x4 e una tenda da tetto rigida ad apertura rapida in 2 secondi."
    },
    host: {
      name: "Elena M.",
      avatar: "EM",
      status: {
        es: "Superhost Local",
        en: "Local Superhost",
        de: "Lokaler Superhost",
        fr: "Superhost Local",
        it: "Superhost Locale"
      }
    },
    amenities: [
      { es: "Tracción 4x4", en: "4x4 Traction", de: "Allradantrieb (4x4)", fr: "Traction 4x4", it: "Trazione 4x4" },
      { es: "Tienda de techo rígida", en: "Hard-shell roof tent", de: "Hartschalen-Dachzelt", fr: "Tente de toit rigide", it: "Tenda da tetto rigida" },
      { es: "Mesa y sillas de acampada", en: "Camping table & chairs", de: "Campingtisch & Stühle", fr: "Table & chaises de camping", it: "Tavolo & sedie da campeggio" },
      { es: "Ducha de presión solar", en: "Solar pressure shower", de: "Solardruckdusche", fr: "Douche solaire à pression", it: "Doccia solare a pressione" },
      { es: "Cocina portátil Campingaz", en: "Campingaz portable stove", de: "Tragbarer Campingaz-Kocher", fr: "Réchaud portable Campingaz", it: "Fornello portatile Campingaz" },
      { es: "Nevera termoeléctrica", en: "Thermoelectric cooler", de: "Thermoelektrische Kühlbox", fr: "Glacière thermoélectrique", it: "Frigorifero termoelettrico" },
      { es: "Iluminación LED interior", en: "Interior LED lighting", de: "LED-Innenbeleuchtung", fr: "Éclairage LED intérieur", it: "Illuminazione interna a LED" },
      { es: "Depósito de agua 50L", en: "50L Water tank", de: "50L Wassertank", fr: "Réservoir d'eau 50L", it: "Serbatoio dell'acqua 50L" }
    ],
    locations: ["Puerto del Rosario", "El Cotillo", "Gran Tarajal"]
  },
  {
    id: "camper-3",
    title: "Sunset Wanderer Cruiser",
    type: "motorhome",
    price: 140,
    rating: 4.95,
    reviewsCount: 42,
    passengers: 4,
    transmission: {
      es: "Automático",
      en: "Automatic",
      de: "Automatik",
      fr: "Automatique",
      it: "Automatico"
    },
    fuel: {
      es: "Diésel",
      en: "Diesel",
      de: "Diesel",
      fr: "Diesel",
      it: "Diesel"
    },
    images: [
      "images/camper_beach.png",
      "images/camper_volcano.png",
      "images/camper_interior.png"
    ],
    description: {
      es: "Tu hogar de lujo en movimiento por toda la isla. Disfruta de la máxima comodidad con baño completo (ducha interior caliente y W.C. químico), amplia cocina con salón y capacidad para toda la familia o grupo de amigos.",
      en: "Your luxury home on the move across the island. Enjoy maximum comfort with a full bathroom (indoor hot shower and chemical toilet), large kitchen with lounge, and capacity for the whole family or group of friends.",
      de: "Dein luxuriöses Zuhause auf Rädern für die ganze Insel. Genieße maximalen Komfort mit komplettem Badezimmer (Innendusche mit Warmwasser und chemischer Toilette), großer Küche mit Wohnbereich und Platz für die ganze Familie oder eine Gruppe von Freunden.",
      fr: "Votre maison de luxe mobile sur toute l'île. Profitez d'un confort maximal avec une salle de bain complète (douche chaude intérieure et WC chimique), une grande cuisine avec salon et de la place pour toute la famille ou un groupe d'amis.",
      it: "La tua casa di lusso in movimento per tutta l'isola. Goditi il massimo comfort con bagno completo (doccia calda interna e WC chimico), ampia cucina con soggiorno e capacità per tutta la famiglia o gruppo di amici."
    },
    host: {
      name: "Marcus K.",
      avatar: "MK",
      status: {
        es: "Socio Pro Fuerteventura",
        en: "Pro Partner Fuerteventura",
        de: "Pro Partner Fuerteventura",
        fr: "Partenaire Pro Fuerteventura",
        it: "Socio Pro Fuerteventura"
      }
    },
    amenities: [
      { es: "Ducha interior con agua caliente", en: "Indoor hot water shower", de: "Innendusche mit Warmwasser", fr: "Douche intérieure à eau chaude", it: "Doccia interna con acqua calda" },
      { es: "W.C. Químico", en: "Chemical Toilet", de: "Chemietoilette", fr: "WC Chimique", it: "WC Chimico" },
      { es: "Cocina completa y horno", en: "Full kitchen & oven", de: "Vollwertige Küche & Backofen", fr: "Cuisine complète & four", it: "Cucina completa & forno" },
      { es: "Calefacción estacionaria", en: "Stationary heating", de: "Standheizung", fr: "Chauffage stationnaire", it: "Riscaldamento ausiliario" },
      { es: "Toldo exterior gigante", en: "Giant outdoor awning", de: "Riesige Außenmarkise", fr: "Auvent extérieur géant", it: "Tendalino esterno gigante" },
      { es: "Televisor Smart TV", en: "Smart TV", de: "Smart TV", fr: "Smart TV", it: "Smart TV" },
      { es: "Portabicicletas", en: "Bike rack", de: "Fahrradträger", fr: "Porte-vélos", it: "Portabici" },
      { es: "Placa solar y batería litio", en: "Solar panel & lithium battery", de: "Solarpanel & Lithium-Batterie", fr: "Panneau solaire & batterie lithium", it: "Pannello solare & batteria al litio" }
    ],
    locations: ["Costa Calma", "Morro Jable", "Gran Tarajal"]
  }
];
