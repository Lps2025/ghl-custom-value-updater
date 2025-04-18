import { useEffect, useState } from "react";

export default function Home() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    location_id: "",
    business_name: "",
    brand_color: "#4a90e2",
    about_text: "",
    // Add other fields here as needed
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.highlevel.tools/sdk.js";
    script.async = true;
    script.onload = () => {
      if (window.HL) {
        window.HL.on("ready", function () {
          const locationId = window.HL?.location?.id;
          setFormData(prev => ({ ...prev, location_id: locationId }));
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/update-custom-value", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then(() => alert("Submitted!"));
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "40px", fontFamily: "Arial" }}>
      <h1 style={{ color: "#4a90e2" }}>LaunchPoint Setup</h1>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <h2>Business Info</h2>
            <label>Business Name</label>
            <input type="text" name="business_name" value={formData.business_name} onChange={handleChange} required />
            <br /><br />
          </>
        )}

        {step === 2 && (
          <>
            <h2>Branding</h2>
            <label>Primary Brand Color</label>
            <input type="text" name="brand_color" value={formData.brand_color} onChange={handleChange} />
            <br /><br />
          </>
        )}

        {step === 3 && (
          <>
            <h2>About Section</h2>
            <label>About Your Business</label>
            <textarea name="about_text" value={formData.about_text} onChange={handleChange} />
            <br /><br />
          </>
        )}

        {/* Add more steps here using step === 4, 5, etc. */}

        <div style={{ marginTop: 20 }}>
          {step > 1 && <button type="button" onClick={prevStep}>Back</button>}
          {step < 3 ? (
            <button type="button" onClick={nextStep} style={{ marginLeft: 10 }}>Next</button>
          ) : (
            <button type="submit" style={{ backgroundColor: "#4a90e2", color: "white" }}>Submit</button>
          )}
        </div>
      </form>
    </div>
  );
}


