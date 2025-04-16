const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.put('/update-custom-value', async (req, res) => {
  const { locationId, customValueId, newValue } = req.body;

  if (!locationId || !customValueId || !newValue) {
    return res.status(400).json({ error: 'Missing locationId, customValueId, or newValue' });
  }

  try {
    const response = await fetch(`https://api.gohighlevel.com/v1/locations/${locationId}/customValues/${customValueId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${process.env.GHL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value: newValue }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    res.json({ message: 'Custom value updated successfully', data });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
