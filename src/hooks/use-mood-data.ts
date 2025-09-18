'use client';

import { useState, useEffect, useCallback } from 'react';

export type MoodEntry = {
  date: string; // YYYY-MM-DD
  mood: number; // e.g., 1-5
};

const STORAGE_KEY = 'mindcare-mood-data';

export function useMoodData() {
  const [moodData, setMoodData] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        setMoodData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Failed to parse mood data from localStorage", error);
      setMoodData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addMoodEntry = useCallback((entry: Omit<MoodEntry, 'date'>) => {
    const today = new Date().toISOString().split('T')[0];
    const newEntry: MoodEntry = { ...entry, date: today };

    setMoodData(currentData => {
      const existingEntryIndex = currentData.findIndex(d => d.date === today);
      let newData;
      if (existingEntryIndex > -1) {
        // Update today's entry
        newData = [...currentData];
        newData[existingEntryIndex] = newEntry;
      } else {
        // Add new entry
        newData = [...currentData, newEntry];
      }
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      } catch (error) {
        console.error("Failed to save mood data to localStorage", error);
      }
      return newData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    });
  }, []);

  return { moodData, addMoodEntry, isLoading };
}
