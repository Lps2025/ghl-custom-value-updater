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
    <div style={styles.container}>
      <h1 style={styles.heading}>LaunchPoint Setup Form</h1>

      <form method="POST" action="/api/update-custom-value" style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>Business Name</label>
          <input type="text" name="business_name" style={styles.input} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Brand Color</label>
          <input type="text" name="brand_color" style={styles.input} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>About Section</label>
          <textarea name="about_text" rows="4" style={styles.textarea}></textarea>
        </div>

        <input type="hidden" name="location_id" value="" />

        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    background: "#f7f9fc",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "28px",
    color: "#4a90e2",
    marginBottom: "30px",
  },
  form: {
    maxWidth: "600px",
    margin: "0 auto",
  },
  field: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "12px 24px",
    backgroundColor: "#4a90e2",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s",
  }
};

