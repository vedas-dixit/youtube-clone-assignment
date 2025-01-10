import { NextResponse } from 'next/server';

const YT_API_KEY = process.env.YT_API_KEY;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const channelId = searchParams.get('channelId');

    if (!channelId) {
      return NextResponse.json(
        { error: "Valid Channel ID is required" },
        { status: 400 }
      );
    }

    const YT_PLAYLISTS_URL = `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=${channelId}&maxResults=10&key=${YT_API_KEY}`;

    const response = await fetch(YT_PLAYLISTS_URL);

    if (!response.ok) {
      const data = await response.json();
      return NextResponse.json(
        { error: data.error.message },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}