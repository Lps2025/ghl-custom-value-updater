
import { useEffect, useState } from "react";

export default function Home() {
  const [locationId, setLocationId] = useState(null);
  const [formData, setFormData] = useState({
    business_name: "",
    tagline: "",
    primary_color: "",
    secondary_color: "",
    hero_heading: "",
    hero_subheading: "",
    about_heading: "",
    about_text: "",
    facebook: "",
    instagram: "",
    featured_image_1: "",
    featured_image_2: "",
    featured_image_3: "",
  });

  useEffect(() => {
    const init = async () => {
      const { locationId } = await window.hlApp.init();
      setLocationId(locationId);
    };
    init();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!locationId) return alert("Location ID not set yet!");

    const response = await fetch("/api/update-custom-value", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locationId, ...formData }),
    });

    const result = await response.json();
    if (result.success) {
      alert("Custom values updated!");
    } else {
      alert("Update failed. See console for details.");
      console.error(result);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>LaunchPoint Setup</h1>
      <form onSubmit={handleSubmit}>
        <label>Business Name</label>
        <input name="business_name" onChange={handleChange} /><br />
        <label>Tagline</label>
        <input name="tagline" onChange={handleChange} /><br />
        <label>Primary Color</label>
        <input name="primary_color" onChange={handleChange} /><br />
        <label>Secondary Color</label>
        <input name="secondary_color" onChange={handleChange} /><br />
        <label>Hero Heading</label>
        <input name="hero_heading" onChange={handleChange} /><br />
        <label>Hero Subheading</label>
        <input name="hero_subheading" onChange={handleChange} /><br />
        <label>About Heading</label>
        <input name="about_heading" onChange={handleChange} /><br />
        <label>About Text</label>
        <textarea name="about_text" onChange={handleChange} /><br />
        <label>Facebook</label>
        <input name="facebook" onChange={handleChange} /><br />
        <label>Instagram</label>
        <input name="instagram" onChange={handleChange} /><br />
        <label>Featured Image 1</label>
        <input name="featured_image_1" onChange={handleChange} /><br />
        <label>Featured Image 2</label>
        <input name="featured_image_2" onChange={handleChange} /><br />
        <label>Featured Image 3</label>
        <input name="featured_image_3" onChange={handleChange} /><br />
        <button type="submit">Update Custom Values</button>
      </form>
    </div>
  );
}

