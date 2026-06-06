import React, { useState } from 'react';
import { Check, ArrowRight, ArrowLeft, Image as ImageIcon, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const availableAmenities = [
  "Placa Solar 150W",
  "Ducha exterior de presión",
  "Ducha interior con agua caliente",
  "Cocina de gas (2 fuegos)",
  "Nevera de compresor 40L",
  "W.C. Químico",
  "Cama doble de viscoelástica",
  "Kit de snorkel y surf rack",
  "Mascotas permitidas",
  "Tracción 4x4",
  "Tienda de techo rígida"
];

const amenitiesMap = {
  "Placa Solar 150W": { es: "Placa Solar 150W", en: "150W Solar Panel", de: "150W Solarpanel", fr: "Panneau Solaire 150W", it: "Pannello Solare 150W" },
  "Ducha exterior de presión": { es: "Ducha exterior de presión", en: "Outdoor pressure shower", de: "Außendruckdusche", fr: "Douche extérieure à pression", it: "Doccia esterna a pressione" },
  "Ducha interior con agua caliente": { es: "Ducha interior con agua caliente", en: "Indoor hot water shower", de: "Innendusche mit Warmwasser", fr: "Douche intérieure à eau chaude", it: "Doccia interna con acqua calda" },
  "Cocina de gas (2 fuegos)": { es: "Cocina de gas (2 fuegos)", en: "Gas stove (2 burners)", de: "Gaskocher (2 Brenner)", fr: "Réchaud à gaz (2 feux)", it: "Fornello a gas (2 fuochi)" },
  "Nevera de compresor 40L": { es: "Nevera de compresor 40L", en: "40L Compressor fridge", de: "40L Kompressorkühlschrank", fr: "Réfrigérateur à compresseur 40L", it: "Frigorifero a compressore 40L" },
  "W.C. Químico": { es: "W.C. Químico", en: "Chemical Toilet", de: "Chemietoilette", fr: "WC Chimique", it: "WC Chimico" },
  "Cama doble de viscoelástica": { es: "Cama doble de viscoelástica", en: "Memory foam double bed", de: "Doppelbett mit Memory-Foam", fr: "Lit double en mousse à mémoire de forme", it: "Letto matrimoniale in memory foam" },
  "Kit de snorkel y surf rack": { es: "Kit de snorkel y surf rack", en: "Snorkeling kit & surf rack", de: "Schnorchel-Set & Surfbrettträger", fr: "Kit de snorkeling & rack de surf", it: "Kit da snorkeling & porta surf" },
  "Mascotas permitidas": { es: "Mascotas permitidas", en: "Pets allowed", de: "Haustiere erlaubt", fr: "Animaux acceptés", it: "Animali ammessi" },
  "Tracción 4x4": { es: "Tracción 4x4", en: "4x4 Traction", de: "Allradantrieb (4x4)", fr: "Traction 4x4", it: "Trazione 4x4" },
  "Tienda de techo rígida": { es: "Tienda de techo rígida", en: "Hard-shell roof tent", de: "Hartschalen-Dachzelt", fr: "Tente de toit rigide", it: "Tenda da tetto rigida" }
};

const transmissionMap = {
  "Manual": { es: "Manual", en: "Manual", de: "Manuell", fr: "Manuelle", it: "Manuale" },
  "Automático": { es: "Automático", en: "Automatic", de: "Automatik", fr: "Automatique", it: "Automatico" }
};

const fuelMap = {
  "Diésel": { es: "Diésel", en: "Diesel", de: "Diesel", fr: "Diesel", it: "Diesel" },
  "Gasolina": { es: "Gasolina", en: "Gasoline", de: "Benzin", fr: "Essence", it: "Benzina" }
};

const availableLocations = [
  "Corralejo",
  "El Cotillo",
  "Lajares",
  "Puerto del Rosario",
  "Gran Tarajal",
  "Costa Calma",
  "Morro Jable"
];

export default function AddCamperForm({ onAddSuccess }) {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const { language, t } = useLanguage();

  // Form states
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Furgoneta Camper');
  const [price, setPrice] = useState(70);
  const [passengers, setPassengers] = useState(2);
  const [transmission, setTransmission] = useState('Manual');
  const [fuel, setFuel] = useState('Diésel');
  const [description, setDescription] = useState('');
  const [hostName, setHostName] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [imagePack, setImagePack] = useState('images/camper_beach.png');

  const handleAmenityChange = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleLocationChange = (loc) => {
    if (selectedLocations.includes(loc)) {
      setSelectedLocations(selectedLocations.filter(l => l !== loc));
    } else {
      setSelectedLocations([...selectedLocations, loc]);
    }
  };

  const typeMap = {
    "Furgoneta Camper": "camper",
    "Autocaravana": "motorhome",
    "4x4 con Tienda": "4x4"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !hostName) {
      alert(t('partner.validation_error'));
      return;
    }

    const savedAmenities = selectedAmenities.map(a => amenitiesMap[a] || { es: a });
    const savedType = typeMap[type] || "camper";

    const newCamper = {
      id: 'custom-' + Date.now(),
      title,
      type: savedType,
      price: Number(price),
      rating: 5.0,
      reviewsCount: 0,
      passengers: Number(passengers),
      transmission: transmissionMap[transmission] || { es: transmission },
      fuel: fuelMap[fuel] || { es: fuel },
      images: [
        imagePack,
        'images/camper_interior.png'
      ],
      description: {
        es: description,
        en: description,
        de: description,
        fr: description,
        it: description
      },
      host: {
        name: hostName + ` (${language === 'es' ? 'Tú' : language === 'en' ? 'You' : language === 'de' ? 'Du' : language === 'fr' ? 'Toi' : 'Tu'})`,
        avatar: hostName.slice(0, 2).toUpperCase(),
        status: {
          es: "Socio Local Nuevo",
          en: "New Local Partner",
          de: "Neuer lokaler Partner",
          fr: "Nouveau Partenaire Local",
          it: "Nuovo Socio Locale"
        }
      },
      amenities: savedAmenities.length > 0 ? savedAmenities : [amenitiesMap["Mascotas permitidas"]],
      locations: selectedLocations.length > 0 ? selectedLocations : ["Corralejo"]
    };

    // Save to localStorage
    const storedCustom = JSON.parse(localStorage.getItem('camper_custom_listings') || '[]');
    storedCustom.unshift(newCamper);
    localStorage.setItem('camper_custom_listings', JSON.stringify(storedCustom));

    setIsSuccess(true);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  if (isSuccess) {
    return (
      <div className="success-card glass animate-fade-in" style={{ background: 'var(--bg-secondary)', padding: '4rem 2rem' }}>
        <div className="success-icon animate-scale-in">
          <Check size={40} />
        </div>
        <h3>{t('partner.success_title')}</h3>
        <p style={{ maxWidth: '600px', margin: '1rem auto 2.5rem', fontSize: '1.05rem' }}>
          {t('partner.success_desc').replace('{title}', title)}
        </p>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setIsSuccess(false);
            onAddSuccess();
          }}
        >
          {t('partner.btn_view_fleet')}
        </button>
      </div>
    );
  }

  return (
    <div className="partner-container glass animate-fade-in" style={{ background: 'var(--bg-secondary)' }}>
      {/* Step Indicator */}
      <div className="form-step-indicator">
        <div className={`step-bubble ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>1</div>
        <div className={`step-bubble ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>2</div>
        <div className={`step-bubble ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>3</div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>
          {step === 1 && t('partner.step1_title')}
          {step === 2 && t('partner.step2_title')}
          {step === 3 && t('partner.step3_title')}
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          {step === 1 && t('partner.step1_desc')}
          {step === 2 && t('partner.step2_desc')}
          {step === 3 && t('partner.step3_desc')}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* STEP 1: Basic Info */}
        {step === 1 && (
          <div className="form-grid animate-scale-in">
            <div className="form-group full-width">
              <label>{t('partner.label_title')}</label>
              <input 
                type="text" 
                placeholder={t('partner.placeholder_title')} 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
              />
            </div>

            <div className="form-group">
              <label>{t('partner.label_type')}</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="Furgoneta Camper">{t('fleet.type_camper')}</option>
                <option value="Autocaravana">{t('fleet.type_motorhome')}</option>
                <option value="4x4 con Tienda">{t('fleet.type_4x4')}</option>
              </select>
            </div>

            <div className="form-group">
              <label>{t('partner.label_price')}</label>
              <input 
                type="number" 
                min="30" 
                max="500" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                required 
              />
            </div>

            <div className="form-group">
              <label>{t('partner.label_passengers')}</label>
              <select value={passengers} onChange={(e) => setPassengers(e.target.value)}>
                <option value="2">2 {language === 'es' ? 'personas' : language === 'en' ? 'people' : language === 'de' ? 'Personen' : language === 'fr' ? 'personnes' : 'persone'}</option>
                <option value="3">3 {language === 'es' ? 'personas' : language === 'en' ? 'people' : language === 'de' ? 'Personen' : language === 'fr' ? 'personnes' : 'persone'}</option>
                <option value="4">4 {language === 'es' ? 'personas' : language === 'en' ? 'people' : language === 'de' ? 'Personen' : language === 'fr' ? 'personnes' : 'persone'}</option>
                <option value="5">5+ {language === 'es' ? 'personas' : language === 'en' ? 'people' : language === 'de' ? 'Personen' : language === 'fr' ? 'personnes' : 'persone'}</option>
              </select>
            </div>

            <div className="form-group">
              <label>{t('partner.label_transmission')}</label>
              <select value={transmission} onChange={(e) => setTransmission(e.target.value)}>
                <option value="Manual">{language === 'es' ? 'Manual' : language === 'en' ? 'Manual' : language === 'de' ? 'Manuell' : language === 'fr' ? 'Manuelle' : 'Manuale'}</option>
                <option value="Automático">{language === 'es' ? 'Automático' : language === 'en' ? 'Automatic' : language === 'de' ? 'Automatik' : language === 'fr' ? 'Automatique' : 'Automatico'}</option>
              </select>
            </div>

            <div className="form-group">
              <label>{t('partner.label_fuel')}</label>
              <select value={fuel} onChange={(e) => setFuel(e.target.value)}>
                <option value="Diésel">{language === 'es' ? 'Diésel' : language === 'en' ? 'Diesel' : language === 'de' ? 'Diesel' : language === 'fr' ? 'Diesel' : 'Diesel'}</option>
                <option value="Gasolina">{language === 'es' ? 'Gasolina' : language === 'en' ? 'Gasoline' : language === 'de' ? 'Benzin' : language === 'fr' ? 'Essence' : 'Benzina'}</option>
              </select>
            </div>

            <div className="form-group">
              <label>{t('partner.label_host')}</label>
              <input 
                type="text" 
                placeholder={t('partner.placeholder_host')} 
                value={hostName} 
                onChange={(e) => setHostName(e.target.value)} 
                required 
              />
            </div>
          </div>
        )}

        {/* STEP 2: Amenities and Locations */}
        {step === 2 && (
          <div className="animate-scale-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="form-group">
              <label style={{ fontSize: '1rem', color: 'var(--accent-gold)' }}>{t('partner.label_amenities')}</label>
              <div className="checkbox-group">
                {availableAmenities.map((amenity) => (
                  <label key={amenity} className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={selectedAmenities.includes(amenity)} 
                      onChange={() => handleAmenityChange(amenity)} 
                    />
                    <span>{amenitiesMap[amenity][language] || amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '1rem', color: 'var(--accent-gold)' }}>{t('partner.label_locations')}</label>
              <div className="checkbox-group" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                {availableLocations.map((loc) => (
                  <label key={loc} className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={selectedLocations.includes(loc)} 
                      onChange={() => handleLocationChange(loc)} 
                    />
                    <span>{loc}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Images and Description */}
        {step === 3 && (
          <div className="form-grid animate-scale-in">
            <div className="form-group full-width">
              <label>{t('partner.label_desc')}</label>
              <textarea 
                rows="5" 
                placeholder={t('partner.placeholder_desc')} 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                style={{ resize: 'vertical', width: '100%' }}
                required 
              />
            </div>

            <div className="form-group full-width">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <ImageIcon size={16} /> {t('partner.label_images')}
              </label>
              <div className="grid grid-cols-3" style={{ gap: '1rem', marginTop: '0.5rem' }}>
                {/* Beach camper pack */}
                <div 
                  className="glass" 
                  style={{
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    border: imagePack === 'images/camper_beach.png' ? '2px solid var(--accent-orange)' : '1px solid var(--border-color)',
                    background: imagePack === 'images/camper_beach.png' ? 'rgba(255, 107, 53, 0.1)' : 'transparent'
                  }}
                  onClick={() => setImagePack('images/camper_beach.png')}
                >
                  <img src="images/camper_beach.png" alt="Playa Pack" style={{ borderRadius: '4px', height: '80px', width: '100%', objectFit: 'cover' }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: '600', display: 'block', textAlign: 'center', marginTop: '0.25rem' }}>{t('partner.image_beach')}</span>
                </div>

                {/* Volcano camper pack */}
                <div 
                  className="glass" 
                  style={{
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    border: imagePack === 'images/camper_volcano.png' ? '2px solid var(--accent-orange)' : '1px solid var(--border-color)',
                    background: imagePack === 'images/camper_volcano.png' ? 'rgba(255, 107, 53, 0.1)' : 'transparent'
                  }}
                  onClick={() => setImagePack('images/camper_volcano.png')}
                >
                  <img src="images/camper_volcano.png" alt="Volcán Pack" style={{ borderRadius: '4px', height: '80px', width: '100%', objectFit: 'cover' }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: '600', display: 'block', textAlign: 'center', marginTop: '0.25rem' }}>{t('partner.image_volcano')}</span>
                </div>

                {/* Cozy Interior template */}
                <div 
                  className="glass" 
                  style={{
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    border: imagePack === 'images/camper_interior.png' ? '2px solid var(--accent-orange)' : '1px solid var(--border-color)',
                    background: imagePack === 'images/camper_interior.png' ? 'rgba(255, 107, 53, 0.1)' : 'transparent'
                  }}
                  onClick={() => setImagePack('images/camper_interior.png')}
                >
                  <img src="images/camper_interior.png" alt="Interior Pack" style={{ borderRadius: '4px', height: '80px', width: '100%', objectFit: 'cover' }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: '600', display: 'block', textAlign: 'center', marginTop: '0.25rem' }}>{t('partner.image_interior')}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="form-navigation" style={{ marginTop: '2.5rem' }}>
          {step > 1 ? (
            <button type="button" className="btn btn-secondary" onClick={prevStep}>
              <ArrowLeft size={16} /> {t('partner.btn_back')}
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button type="button" className="btn btn-primary" onClick={nextStep}>
              {t('partner.btn_next')} <ArrowRight size={16} />
            </button>
          ) : (
            <button type="submit" className="btn btn-primary" style={{ background: 'var(--accent-teal)', boxShadow: '0 4px 15px rgba(0, 168, 150, 0.3)' }}>
              <Sparkles size={16} /> {t('partner.btn_submit')}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
