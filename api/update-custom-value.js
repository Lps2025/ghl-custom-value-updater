const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { locationId, customFieldKey, customFieldValue, apiKey } = req.body;

  if (!locationId || !customFieldKey || !customFieldValue || !apiKey) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: locationId, customFieldKey, customFieldValue, or apiKey',
    });
  }

  try {
    const response = await axios.put(
      `https://rest.gohighlevel.com/v1/locations/${locationId}/customFields`,
      {
        [customFieldKey]: customFieldValue,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
};
