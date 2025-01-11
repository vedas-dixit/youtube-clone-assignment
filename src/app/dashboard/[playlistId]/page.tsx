"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchPlaylistVideos } from "@/lib/youtube";
import { MoreVertical, Play, Plus, Share2, Pencil } from "lucide-react";

interface VideoSnippet {
  title: string;
  channelTitle: string;
  thumbnails: {
    medium: {
      url: string;
    };
  };
  playlistTitle?: string;
}

interface Video {
  id: string;
  snippet: VideoSnippet;
}

export default function PlaylistVideos({
  params,
}: {
  params: Promise<{ playlistId: string }>;
}) {
  const { data: session } = useSession();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  // Ensure that params is resolved before using it
  const [resolvedParams, setResolvedParams] = useState<{
    playlistId: string;
  } | null>(null);

  useEffect(() => {
    async function resolveParams() {
      const resolved = await params; // Resolve the promise here
      setResolvedParams(resolved);
    }
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (resolvedParams?.playlistId && session?.accessToken) {
      async function getVideos() {
        try {
          const data = await fetchPlaylistVideos(
            session?.accessToken || "",
            resolvedParams?.playlistId || "",
          );
          setVideos(data.items);
        } catch (error) {
          console.error("Error fetching videos:", error);
        } finally {
          setLoading(false);
        }
      }
      getVideos();
    }
  }, [session, resolvedParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] text-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-400 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  const playlistThumbnail = videos[0]?.snippet.thumbnails.medium.url;
  const playlistTitle = videos[0]?.snippet.playlistTitle || "Playlist";

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white pt-16 pl-20">
      <div className="sticky top-0 z-10 bg-[#0F0F0F] p-4 border-b border-gray-800 text-5xl">
        Playlists
      </div>

      <div className="flex flex-col md:flex-row gap-6 p-6">
        <div className="w-full md:w-80 flex-shrink-0">
          <div className="rounded-lg overflow-hidden mb-4 aspect-video">
            <img
              src={playlistThumbnail}
              alt={playlistTitle}
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-xl font-semibold mb-2">{playlistTitle}</h1>
          <div className="text-sm text-gray-400 mb-4">
            <p>by {videos[0]?.snippet.channelTitle}</p>
            <p>{videos.length} videos • Private</p>
          </div>

          <div className="flex flex-col gap-2">
            <button className="w-full bg-white text-black py-2 px-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-gray-200">
              <Play size={18} />
              Play all
            </button>
            <div className="flex gap-2">
              <button className="flex-1 bg-[#272727] hover:bg-[#3F3F3F] py-2 px-4 rounded-full flex items-center justify-center gap-2">
                <Plus size={18} />
                Save
              </button>
              <button className="flex-1 bg-[#272727] hover:bg-[#3F3F3F] py-2 px-4 rounded-full flex items-center justify-center gap-2">
                <Share2 size={18} />
                Share
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <button className="text-sm text-gray-400 hover:text-white flex items-center gap-1">
              <Pencil size={16} />
              Edit
            </button>
            <button className="text-sm text-gray-400 hover:text-white">
              Sort
            </button>
          </div>

          <div className="space-y-2">
            {videos.map((video, index) => (
              <div
                key={video.id}
                className="flex gap-4 p-2 hover:bg-[#272727] rounded-lg group"
              >
                <div className="text-gray-400 w-8 text-center">{index + 1}</div>
                <div className="relative flex-shrink-0">
                  <div className="aspect-video w-40 rounded-lg overflow-hidden">
                    <img
                      src={video.snippet.thumbnails.medium.url}
                      alt={video.snippet.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium line-clamp-2">
                    {video.snippet.title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {video.snippet.channelTitle}
                  </p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-2">
                  <MoreVertical size={16} className="text-gray-400" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
