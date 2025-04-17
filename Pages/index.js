<!DOCTYPE html>
<html lang="en">
  <head>
    <title>LaunchPoint App</title>
    <script src="https://app.gohighlevel.com/embedded/sdk.js"></script>
    <script>
      window.addEventListener("load", async () => {
        const { locationId } = await window.hlApp.init();
        console.log("Embedded App Initialized: Location ID →", locationId);

        // Send to API
        const response = await fetch("/api/update-custom-value", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            locationId,
            testField: "hello world"
          }),
        });

        const result = await response.json();
        console.log("API response:", result);
      });
    </script>
  </head>
  <body>
    <h1>🎯 LaunchPoint GHL App</h1>
    <p>This is running as an embedded app using the GHL SDK.</p>
  </body>
</html>
