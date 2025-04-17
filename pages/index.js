import { useEffect, useState } from 'react';

export default function Home() {
  const [locationId, setLocationId] = useState('');
  const [formData, setFormData] = useState({
    business_name: '',
    business_phone: '',
    business_email: '',
  });
  const [status, setStatus] = useState('');

  // Load GHL SDK script manually
  useEffect(() => {
    const existingScript = document.getElementById('ghl-sdk');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://embed.highlevel.tools/sdk.js';
      script.id = 'ghl-sdk';
      script.async = true;
      script.onload = () => {
        if (window.GHL) {
          window.GHL.on('ready', () => {
            const location = window.GHL?.location;
            if (location?.id) {
              setLocationId(location.id);
            }
          });
        }
      };
      document.body.appendChild(script);
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Saving...');

    try {
      const res = await fetch('/api/update-custom-value', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locationId,
          customValues: formData,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus('✅ Saved!');
      } else {
        setStatus(`❌ Error: ${result.error || 'Something went wrong'}`);
      }
    } catch (err) {
      setStatus(`❌ Request failed: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>🚀 Business Info Setup</h1>

      {locationId ? (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Business Name:</label>
            <input
              type="text"
              name="business_name"
              value={formData.business_name}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>Phone:</label>
            <input
              type="text"
              name="business_phone"
              value={formData.business_phone}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>Email:</label>
            <input
              type="email"
              name="business_email"
              value={formData.business_email}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>

          <button type="submit" style={{ padding: '10px 20px' }}>Save</button>
        </form>
      ) : (
        <p>Loading GHL SDK...</p>
      )}

      {status && <p style={{ marginTop: '1rem' }}>{status}</p>}
    </div>
  );
}

