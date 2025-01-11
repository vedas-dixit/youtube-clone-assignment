export async function fetchYouTubePlaylists(accessToken: string) {
  const response = await fetch(
    "https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&mine=true&maxResults=10",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch playlists");
  }

  return response.json();
}

export async function fetchPlaylistVideos(
  accessToken: string,
  playlistId: string,
) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=10`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch playlist videos");
  }

  return response.json();
}

export const fetchChannelPlaylists = async (channelId: string) => {
  const API_KEY = process.env.NEXT_PUBLIC_YT_API_KEY;
  const maxResults = 50;
  console.log("aoihihoafoia");
  console.log("API Key:", process.env.NEXTAUTH_SECRET);
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlists?` +
        `part=snippet,contentDetails` +
        `&channelId=${channelId}` +
        `&maxResults=${maxResults}` +
        `&key=${API_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching playlists:", error);
    throw error;
  }
};
