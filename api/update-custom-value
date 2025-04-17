import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method is allowed' });
  }

  try {
    const { locationId, customFieldKey, customFieldValue, apiKey } = req.body;

    if (!locationId || !customFieldKey || !customFieldValue || !apiKey) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const url = `https://rest.gohighlevel.com/v1/locations/${locationId}/customFields/${customFieldKey}`;
    
    const response = await axios.put(
      url,
      { value: customFieldValue },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.status(200).json({ success: true, response: response.data });
  } catch (error) {
    console.error('Error updating custom value:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to update custom value' });
  }
}
