"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { fetchYouTubePlaylists, fetchChannelPlaylists } from "@/lib/youtube";
import { MoreVertical, Loader2 } from "lucide-react";

export default function Dashboard() {
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [channelId, setChannelId] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchedPlaylists, setSearchedPlaylists] = useState<any[]>([]);


  useEffect(() => {
    async function getPlaylists() {
      if (session?.accessToken) {
        try {
          const data = await fetchYouTubePlaylists(session.accessToken);
          setPlaylists(data.items);
        } catch (error) {
          console.error("Error fetching playlists:", error);
        } finally {
          setLoading(false);
        }
      }
    }
    getPlaylists();
  }, [session]);

  async function handleSearch() {
    if (!channelId.trim()) return;
    setSearchLoading(true);
    setSearchedPlaylists([]);

    try {
      const data = await fetchChannelPlaylists(channelId);
      setPlaylists(data.items);
    } catch (error) {
      console.error("Error fetching channel playlists:", error);
    } finally {
      setSearchLoading(false);
    }
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] text-white flex items-center justify-center">
        <p className="text-lg">Please log in to view playlists.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white pt-9 pl-20">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-4">Playlists</h1>
        
        <div className="relative flex items-center space-x-2">
          <input
            type="text"
            placeholder="Enter Channel ID"
            value={channelId}
            onChange={(e) => setChannelId(e.target.value)}
            className="p-2 rounded-md bg-[#272727] text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            disabled={searchLoading}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            {searchLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Find This Channel's Playlists"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {(searchedPlaylists.length > 0 ? searchedPlaylists : playlists).map((playlist) => (
          <div key={playlist.id} className="group">
            <div className="relative">
              <Link href={`/dashboard/${playlist.id}`} className="block relative">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-[#272727]">
                  <img
                    src={playlist.snippet.thumbnails.medium.url}
                    alt={playlist.snippet.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 text-xs rounded">
                    {playlist.contentDetails?.itemCount || 0} {playlist.contentDetails?.itemCount === 1 ? "video" : "videos"}
                  </div>
                </div>
              </Link>
              
              <button className="absolute top-2 right-2 p-1.5 rounded-full bg-[#272727] bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical size={16} />
              </button>
            </div>

            <div className="mt-2">
              <Link href={`/dashboard/${playlist.id}`}>
                <h3 className="font-medium text-sm line-clamp-2 hover:text-gray-300">
                  {playlist.snippet.title}
                </h3>
              </Link>
              <div className="flex flex-col mt-1 text-xs text-gray-400">
                <span>{playlist.status?.privacyStatus || "Public"} • Playlist</span>
                <span>Updated {new Date(playlist.snippet.publishedAt).toLocaleDateString()}</span>
                <Link href={`/dashboard/${playlist.id}`} className="text-gray-400 hover:text-white mt-1">
                  View full playlist
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
