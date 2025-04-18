import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function OAuthCallback() {
  const router = useRouter();
  const [status, setStatus] = useState("Authorizing...");

  useEffect(() => {
    const fetchToken = async () => {
      const { code, location_id } = router.query;

      if (!code || !location_id) return;

      try {
        const response = await axios.post("https://services.leadconnectorhq.com/oauth/token", {
          client_id: process.env.NEXT_PUBLIC_GHL_CLIENT_ID,
          client_secret: process.env.GHL_CLIENT_SECRET,
          grant_type: "authorization_code",
          code: code,
          user_type: "Location",
          redirect_uri: "https://launchpointstudio-website-builder-dk8u-hfp8yimha.vercel.app/oauth/callback"
        });

        console.log("✅ Token response:", response.data);

        // You would store the token securely here (e.g., in a DB)
        setStatus("✅ Authorized successfully!");

        // Optionally redirect somewhere else
        // router.push("/");

      } catch (err) {
        console.error("❌ Error fetching token:", err);
        setStatus("❌ Authorization failed. Check console.");
      }
    };

    if (router.isReady) fetchToken();
  }, [router.isReady, router.query]);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>OAuth Callback</h1>
      <p>{status}</p>
    </div>
  );
}
