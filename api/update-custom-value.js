import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { locationId, customValueKey, customValueValue, apiKey } = req.body;

  if (!locationId || !customValueKey || !customValueValue || !apiKey) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const response = await axios.put(
      `https://rest.gohighlevel.com/v1/locations/${locationId}/customFields/${customValueKey}`,
      {
        value: customValueValue
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return res.status(200).json({ message: 'Custom value updated successfully', data: response.data });
  } catch (error) {
    console.error('Error updating custom value:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to update custom value', details: error.response?.data || error.message });
  }
}
