import { useEffect, useState } from "react";
import { ContributionCalendar } from "@/types/github";

const CACHE_KEY = "github_streak_cache";
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours in milliseconds

export function useGithub(username: string) {
  const [calendar, setCalendar] = useState<ContributionCalendar | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchContribution = async () => {
      try {
        setLoading(true);
        // 1. Check if we have valid cached data
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_TTL) {
            if (mounted) {
              setCalendar(data);
              setLoading(false);
            }
            return;
          }
        }

        // 2. Fetch fresh data
        const response = await fetch(`/api/github?user=${username}`);
        if (!response.ok) {
          throw new Error("Failed to load Github streak!");
        }

        const data = (await response.json()) as ContributionCalendar;
        
        // 3. Save the fresh data to local storage for next time
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data, timestamp: Date.now() })
        );

        if (mounted) {
          setCalendar(data);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setLoading(false);
        }
      }
    };

    fetchContribution();

    return () => {
      mounted = false;
    };
  }, [username]);

  return { calendar, loading, error };
}