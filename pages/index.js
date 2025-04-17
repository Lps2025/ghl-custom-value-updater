import { useEffect, useState } from 'react';

export default function Home() {
  const [locationId, setLocationId] = useState('');

  useEffect(() => {
    const loadGhlSdk = async () => {
      try {
        const sdkModule = await import('https://embed.highlevel.tools/sdk.js');
        const { GHL } = sdkModule;

        GHL.on('ready', () => {
          console.log('GHL SDK Ready!');
          const location = GHL?.location;
          if (location?.id) {
            setLocationId(location.id);
          }
        });
      } catch (error) {
        console.error('Failed to load GHL SDK:', error);
      }
    };

    loadGhlSdk();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>🚀 Welcome to Your GHL Embedded App</h1>
      <p>This app is running inside a subaccount view using the Embedded SDK.</p>

      {locationId ? (
        <p><strong>Location ID:</strong> {locationId}</p>
      ) : (
        <p>Loading SDK...</p>
      )}
    </div>
  );
}
