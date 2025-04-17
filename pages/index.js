import { useEffect, useState } from "react";
import { GHL } from 'https://embed.highlevel.tools/sdk.js';

export default function Home() {
  const [locationId, setLocationId] = useState("");

  useEffect(() => {
    HL.on("ready", async () => {
      const context = await HL.getContext();
      setLocationId(context.locationId);
    });
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

        <input type="hidden" name="location_id" value={locationId} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
