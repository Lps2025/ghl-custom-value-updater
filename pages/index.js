import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.highlevel.tools/sdk.js";
    script.async = true;
    script.onload = () => {
      if (window.HL) {
        window.HL.on("ready", function () {
          const locationId = window.HL?.location?.id;
          const input = document.querySelector('input[name="location_id"]');
          if (input && locationId) {
            input.value = locationId;
          }
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ color: "#4a90e2" }}>LaunchPoint Setup Form</h1>

      <form method="POST" action="/api/update-custom-value" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

        {/* Branding Info */}
        <label>Business Name</label>
        <input type="text" name="business_name" />

        <label>Primary Brand Color</label>
        <input type="text" name="brand_color" />

        <label>Logo Image URL</label>
        <input type="text" name="logo_url" />

        {/* Hero Section */}
        <label>Hero Headline</label>
        <input type="text" name="hero_headline" />

        <label>Hero Subtext</label>
        <textarea name="hero_text" rows="2" />

        {/* Menu Section */}
        <label>Menu Image URL</label>
        <input type="text" name="menu_image" />

        {/* About Section */}
        <label>About Section Text</label>
        <textarea name="about_text" rows="3" />

        {/* Contact/Social */}
        <label>Phone Number</label>
        <input type="text" name="phone_number" />

        <label>Email Address</label>
        <input type="text" name="email_address" />

        <label>Facebook URL</label>
        <input type="text" name="facebook_url" />

        <label>Instagram URL</label>
        <input type="text" name="instagram_url" />

        {/* Location Hidden Field */}
        <input type="hidden" name="location_id" value="" />

        <button type="submit" style={{ backgroundColor: "#4a90e2", color: "white", padding: "10px 20px", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Submit
        </button>
      </form>
    </div>
  );
}

