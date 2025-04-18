import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.highlevel.tools/sdk.js";
    script.async = true;
    script.onload = () => {
      if (window.HL) {
        window.HL.on("ready", function () {
          console.log("✅ GHL SDK is ready");

<<<<<<< HEAD
=======
          // Example: automatically get the locationId and inject it
>>>>>>> e9d7aaf (Local changes before pulling remote)
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
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>LaunchPoint Setup Form</h1>

      <form method="POST" action="/api/update-custom-value">
        <label>Business Name</label><br />
        <input type="text" name="business_name" /><br /><br />

        <label>Brand Color</label><br />
        <input type="text" name="brand_color" /><br /><br />

        <label>About Section</label><br />
        <textarea name="about_text"></textarea><br /><br />

        <input type="hidden" name="location_id" value="" />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
