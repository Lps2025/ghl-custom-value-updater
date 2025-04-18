import React, { useState } from 'react';

export default function Home() {
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  const handleNext = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted!');
  };

  return (
    <div
      style={{
        backgroundImage: 'url("/1f88d17a-c9a3-4c30-a82c-bfdcbc21ea3a.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '80px 20px',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          backgroundColor: '#fff',
          borderRadius: '12px',
          padding: '40px',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ color: '#4a90e2', marginBottom: '30px' }}>
          Step {step} of {totalSteps}
        </h2>

        {step === 1 && (
          <>
            <label style={labelStyle}>Business Name</label>
            <input type="text" name="business_name" style={inputStyle} />

        )}

        {step === 2 && (
          <>
            <label style={labelStyle}>Brand Colors</label>
            <input type="text" name="brand_colors" style={inputStyle} />

            <label style={labelStyle}>Font Preferences</label>
            <input type="text" name="font_preferences" style={inputStyle} />
          </>
        )}

        {step === 3 && (
          <>
            <label style={labelStyle}>Logo URL</label>
            <input type="text" name="logo_url" style={inputStyle} />

            <label style={labelStyle}>Header Image URL</label>
            <input type="text" name="header_image_url" style={inputStyle} />
          </>
        )}

        {step === 4 && (
          <>
            <label style={labelStyle}>Intro Headline</label>
            <input type="text" name="intro_headline" style={inputStyle} />

            <label style={labelStyle}>Intro Text</label>
            <textarea name="intro_text" rows="4" style={inputStyle} />
          </>
        )}

        {step === 5 && (
          <>
            <label style={labelStyle}>About Section</label>
            <textarea name="about_section" rows="4" style={inputStyle} />

            <label style={labelStyle}>Mission Statement</label>
            <textarea name="mission_statement" rows="3" style={inputStyle} />
          </>
        )}

        {step === 6 && (
          <>
            <label style={labelStyle}>Facebook</label>
            <input type="text" name="facebook_url" style={inputStyle} />

            <label style={labelStyle}>Instagram</label>
            <input type="text" name="instagram_url" style={inputStyle} />

            <label style={labelStyle}>TikTok</label>
            <input type="text" name="tiktok_url" style={inputStyle} />
          </>
        )}

        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between' }}>
          {step > 1 && (
            <button type="button" onClick={handleBack} style={buttonStyleSecondary}>
              Back
            </button>
          )}
          {step < totalSteps ? (
            <button type="button" onClick={handleNext} style={buttonStyle}>
              Next
            </button>
          ) : (
            <button type="submit" style={buttonStyle}>
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

// 🔷 Shared Styles
const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: 'bold',
  color: '#333',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '25px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '16px',
};

const buttonStyle = {
  backgroundColor: '#4a90e2',
  color: '#fff',
  padding: '12px 20px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '16px',
};

const buttonStyleSecondary = {
  ...buttonStyle,
  backgroundColor: '#ee8800',
};


