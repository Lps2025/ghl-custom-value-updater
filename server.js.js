const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/update-custom-value', async (req, res) => {
  const { locationId, customFieldId, value } = req.body;

  try {
    const response = await axios.put(
      `https://services.leadconnectorhq.com/locations/${locationId}/customFields/${customFieldId}`,
      { value },
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          Version: '2021-07-28',
        },
      }
    );

    res.status(200).json({ message: 'Custom value updated successfully', data: response.data });
  } catch (error) {
    console.error('Error updating custom value:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to update custom value' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
