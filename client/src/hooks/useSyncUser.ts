import { useEffect, useRef } from "react";
import { syncUserToDb } from "../utils/syncUserToDb";

export const useSyncUser = () => {
  const hasSynced = useRef(false);

  useEffect(() => {
    if (hasSynced.current) return;

    hasSynced.current = true;
    console.log("[useSyncUser] hook triggered");

    syncUserToDb().catch((err) => {
      console.error("[useSyncUser] Failed to sync user:", err);
      hasSynced.current = false; // allow retry on next mount if needed
    });
  }, []);
};
