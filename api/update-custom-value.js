import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const payload = req.body;

    const locationId = payload.locationId;

    const customValueMap = {
      // 🏢 Business Info
      business_name: payload['Business Name'],
      business_address: payload['Business Address'],
      business_email: payload['Business Email'],
      business_phone_: payload['Business Phone #'],
      business_hours: payload['Business Hours'],

      // 🎨 Branding
      brand_tagline: payload['Brand Tagline'],
      brand_slogan: payload['Brand Slogan'],
      primary_brand_color: payload['Primary Brand Color'],
      secondary_brand_color: payload['Secondary Brand Color'],
      background_color: payload['Background Color'],
      button_color: payload['Button Color'],
      order_button_color: payload['Order Button Color'],
      calltoaction_text: payload['Call-to-action Text'],
      background_image: payload['Background Image'],
      brand_logo: payload['Business Logo'],

      // 🖼️ Featured Images
      web_image_1: payload['Image 1'],
      web_image_1_title: payload['Image 1 Title'],
      web_image_1_description: payload['Image 1 Description'],
      web_image_2: payload['Image 2'],
      web_image_2_title: payload['Image 2 Title'],
      web_image_2_description: payload['Image 2 Description'],
      web_image_3: payload['Image 3'],
      web_image_3_title: payload['Image 3 Title'],
      web_image_3_description: payload['Image 3 Description'],

      // 🧱 Section Content
      section_2_title: payload['Title'],
      menu_image_1: payload['Row 1 Image'],
      row_1_title: payload['Row 1 Title'],
      row_1_textdescription: payload['Row 1 Description'],
      menu_image_2: payload['Row 2 Image'],
      row_2_title: payload['Row 2 Title'],
      row_2_textdescription: payload['Row 2 Text/Description'],
      menu_image_3: payload['Row 3 Image'],
      row_3_title: payload['Row 3 Title'],
      row_3_textdescription: payload['Row 3 Text/Description'],

      // 👤 About
      additional_image: payload['About Us Image'],
      about_us: payload['About Us Text'],

      // 📲 Social Media
      social_media_links__instagram: payload['Instagram'],
      social_media_links__fb: payload['Facebook'],
      social_media_links__linkedin: payload['LinkedIn'],
      social_media_links__tiktok: payload['tiktok'],
      social_media_links__x: payload['X'],
    };

    const accessToken = process.env.GHL_API_KEY; // store securely in Vercel env vars

    // Loop through each key-value pair and update via API
    for (const [key, value] of Object.entries(customValueMap)) {
      if (value) {
        await axios.put(
          `https://api.leadconnectorhq.com/v1/locations/${locationId}/customValues/${key}`,
          { value },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
              Version: '2021-07-28',
            },
          }
        );
      }
    }

    return res.status(200).json({ message: 'Custom values updated successfully!' });

  } catch (error) {
    console.error('Error updating custom values:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to update custom values' });
  }
}
