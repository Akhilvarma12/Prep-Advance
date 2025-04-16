// liveblocks.config.js

import { createRoomContext } from "@liveblocks/client";

// Replace with your actual Liveblocks API keys and Room settings
export const { useRoom, LiveblocksProvider } = createRoomContext({
  // Liveblocks authentication
  apiKey: process.env.LIVEBLOCKS_API_KEY, // Ensure your API key is stored securely
  url: "https://api.liveblocks.io", // Default Liveblocks API URL (change if needed)
  
  // Room-specific configurations
  room: "your-room-name", // Unique room name for your collaborative session
  features: {
    awareness: true, // Enable awareness to sync user presence and cursors
    // Add other feature flags like history, undo/redo, etc. as per your needs
  },
});
