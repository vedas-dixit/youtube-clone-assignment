import { NextApiRequest, NextApiResponse } from 'next';

const YT_API_KEY = process.env.YT_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { channelId } = req.query;

    if (!channelId || Array.isArray(channelId)) {
      return res.status(400).json({ error: "Valid Channel ID is required" });
    }

    const YT_PLAYLISTS_URL = `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=${channelId}&maxResults=10&key=${YT_API_KEY}`;

    const response = await fetch(YT_PLAYLISTS_URL);

    if (!response.ok) {
      const data = await response.json();
      return res.status(response.status).json({ error: data.error.message });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
