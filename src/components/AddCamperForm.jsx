import React, { useState } from 'react';
import { Compass, Check, ArrowRight, ArrowLeft, Image as ImageIcon, Sparkles } from 'lucide-react';

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
  const [imagePack, setImagePack] = useState('images/camper_beach.png'); // Default mock image pack (relative)

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !hostName) {
      alert('Por favor complete los campos requeridos.');
      return;
    }

    const newCamper = {
      id: 'custom-' + Date.now(),
      title,
      type,
      price: Number(price),
      rating: 5.0, // New listing gets 5.0 rating
      reviewsCount: 0,
      passengers: Number(passengers),
      transmission,
      fuel,
      images: [
        imagePack,
        'images/camper_interior.png' // Relative path
      ],
      description,
      host: {
        name: hostName + ' (Tú)',
        avatar: hostName.slice(0, 2).toUpperCase(),
        status: 'Socio Local Nuevo'
      },
      amenities: selectedAmenities.length > 0 ? selectedAmenities : ["Mascotas permitidas", "Mesa y sillas de acampada"],
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
        <h3>¡Tu Camper ya está en el catálogo!</h3>
        <p style={{ maxWidth: '600px', margin: '1rem auto 2.5rem', fontSize: '1.05rem' }}>
          Hemos añadido <strong>{title}</strong> a la base de datos local de CamperVentura. Cualquier viajero puede buscarla ahora y reservarla. ¡Bienvenido a la comunidad de socios en Fuerteventura!
        </p>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setIsSuccess(false);
            onAddSuccess(); // Triggers tab switch to fleet view
          }}
        >
          Ver mi Camper en el Catálogo
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
          {step === 1 && "1. Detalles del Vehículo"}
          {step === 2 && "2. Equipamiento y Localizaciones"}
          {step === 3 && "3. Fotos y Descripción de Aventura"}
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          {step === 1 && "Especifica las características básicas de tu casa sobre ruedas."}
          {step === 2 && "Selecciona lo que incluye tu vehículo y dónde se puede recoger en Fuerteventura."}
          {step === 3 && "Escribe una descripción aventurera y selecciona tus fotos simuladas."}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* STEP 1: Basic Info */}
        {step === 1 && (
          <div className="form-grid animate-scale-in">
            <div className="form-group full-width">
              <label>Título del anuncio *</label>
              <input 
                type="text" 
                placeholder="Ej. Camper Hymer Classic Fuerte" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Tipo de Camper</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="Furgoneta Camper">Furgoneta Camper</option>
                <option value="Autocaravana">Autocaravana</option>
                <option value="4x4 con Tienda">4x4 con Tienda de Techo</option>
              </select>
            </div>

            <div className="form-group">
              <label>Precio por noche (€) *</label>
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
              <label>Plazas / Capacidad</label>
              <select value={passengers} onChange={(e) => setPassengers(e.target.value)}>
                <option value="2">2 personas</option>
                <option value="3">3 personas</option>
                <option value="4">4 personas</option>
                <option value="5">5+ personas</option>
              </select>
            </div>

            <div className="form-group">
              <label>Transmisión</label>
              <select value={transmission} onChange={(e) => setTransmission(e.target.value)}>
                <option value="Manual">Manual</option>
                <option value="Automático">Automático</option>
              </select>
            </div>

            <div className="form-group">
              <label>Combustible</label>
              <select value={fuel} onChange={(e) => setFuel(e.target.value)}>
                <option value="Diésel">Diésel</option>
                <option value="Gasolina">Gasolina</option>
              </select>
            </div>

            <div className="form-group">
              <label>Tu nombre (Anfitrión) *</label>
              <input 
                type="text" 
                placeholder="Ej. Roberto S." 
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
              <label style={{ fontSize: '1rem', color: 'var(--accent-gold)' }}>Equipamiento disponible</label>
              <div className="checkbox-group">
                {availableAmenities.map((amenity) => (
                  <label key={amenity} className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={selectedAmenities.includes(amenity)} 
                      onChange={() => handleAmenityChange(amenity)} 
                    />
                    <span>{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label style={{ fontSize: '1rem', color: 'var(--accent-gold)' }}>Zonas de entrega en Fuerteventura</label>
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
              <label>Descripción de la experiencia en tu camper *</label>
              <textarea 
                rows="5" 
                placeholder="Describe qué hace especial tu vehículo y qué recomiendas a tus futuros inquilinos sobre viajar en él por Fuerteventura..." 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                style={{ resize: 'vertical', width: '100%' }}
                required 
              />
            </div>

            <div className="form-group full-width">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <ImageIcon size={16} /> Selecciona un paquete de fotos para tu prototipo
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
                  <span style={{ fontSize: '0.75rem', fontWeight: '600', display: 'block', textAlign: 'center', marginTop: '0.25rem' }}>Pack Playa Costera</span>
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
                  <span style={{ fontSize: '0.75rem', fontWeight: '600', display: 'block', textAlign: 'center', marginTop: '0.25rem' }}>Pack 4x4 Volcánico</span>
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
                  <span style={{ fontSize: '0.75rem', fontWeight: '600', display: 'block', textAlign: 'center', marginTop: '0.25rem' }}>Pack Interior Cozy</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="form-navigation" style={{ marginTop: '2.5rem' }}>
          {step > 1 ? (
            <button type="button" className="btn btn-secondary" onClick={prevStep}>
              <ArrowLeft size={16} /> Atrás
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button type="button" className="btn btn-primary" onClick={nextStep}>
              Siguiente <ArrowRight size={16} />
            </button>
          ) : (
            <button type="submit" className="btn btn-primary" style={{ background: 'var(--accent-teal)', boxShadow: '0 4px 15px rgba(0, 168, 150, 0.3)' }}>
              <Sparkles size={16} /> Publicar Camper en Fuerteventura
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
