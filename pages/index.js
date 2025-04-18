import { useState } from 'react';
import Head from 'next/head';

const steps = [
  {
    title: 'Business Info',
    fields: [
      { name: 'business_name', label: 'Business Name' },
      { name: 'business_type', label: 'Business Type' },
      { name: 'location', label: 'Location' },
      { name: 'contact_email', label: 'Contact Email' },
      { name: 'contact_phone', label: 'Contact Phone' },
    ]
  },
  {
    title: 'Branding',
    fields: [
      { name: 'brand_colors', label: 'Brand Colors (Hex or Description)' },
      { name: 'logo_url', label: 'Logo URL' },
      { name: 'font_preferences', label: 'Font Preferences' },
    ]
  },
  {
    title: 'Featured Images',
    fields: [
      { name: 'header_image_url', label: 'Header Image URL' },
      { name: 'gallery_images', label: 'Gallery Images (List URLs)' },
    ]
  },
  {
    title: 'Section Content',
    fields: [
      { name: 'services_offered', label: 'Services Offered' },
      { name: 'products_offered', label: 'Products Offered' },
      { name: 'menu_url', label: 'Menu URL (if applicable)' },
    ]
  },
  {
    title: 'About Section',
    fields: [
      { name: 'about_us', label: 'About Us Content' },
      { name: 'team_info', label: 'Team Information' },
      { name: 'testimonials', label: 'Testimonials' },
    ]
  },
  {
    title: 'Social Media & Contact',
    fields: [
      { name: 'facebook_url', label: 'Facebook URL' },
      { name: 'instagram_url', label: 'Instagram URL' },
      { name: 'tiktok_url', label: 'TikTok URL' },
      { name: 'other_social', label: 'Other Social Media Links' },
    ]
  },
];

export default function Home() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Here you can add your axios call to submit the formData
  };

  const currentStep = steps[step];

  return (
    <>
      <Head>
        <title>Website Builder Survey</title>
      </Head>
      <div style={{
        backgroundImage: 'url(/hex-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '60px 20px'
      }}>
        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          background: '#fff',
          padding: '40px',
          borderRadius: '10px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h3 style={{ margin: 0, color: '#4a90e2' }}>Launch Point Studio</h3>
            <h1 style={{ margin: '5px 0', fontSize: '2rem', color: '#333' }}>Website Builder</h1>
          </div>

          <div style={{ marginBottom: '20px', color: '#4a90e2', fontWeight: 'bold' }}>
            Step {step + 1} of {steps.length}
          </div>

          <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#222' }}>{currentStep.title}</h2>

          <form onSubmit={handleSubmit}>
            {currentStep.fields.map((field) => (
              <div key={field.name} style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '500' }}>
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    fontSize: '1rem'
                  }}
                />
              </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
              {step > 0 && (
                <button
                  type="button"
                  onClick={prevStep}
                  style={{
                    background: '#ccc',
                    color: '#333',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Back
                </button>
              )}
              {step < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  style={{
                    background: '#4a90e2',
                    color: '#fff',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  style={{
                    background: '#ee8800',
                    color: '#fff',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
