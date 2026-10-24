"use client";

import { useState, useEffect, useCallback } from "react";

interface CountdownOptions {
  storageKey?: string;
  initialMinutes?: number;
  autoResetOnExpire?: boolean;
}

interface CountdownResult {
  minutes: string;
  seconds: string;
  formatted: string;
  totalSecondsRemaining: number;
  progressPercent: number;
  isExpired: boolean;
  isMounted: boolean;
  resetTimer: () => void;
}

/**
 * Persistent session countdown timer.
 * Automatically saves expiration timestamp to localStorage so refreshes don't reset it.
 */
export function useCountdownTimer({
  storageKey,
  initialMinutes = 15,
  autoResetOnExpire = false,
}: CountdownOptions = {}): CountdownResult {
  const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60);
  const [isMounted, setIsMounted] = useState(false);

  const getTargetTimestamp = useCallback(() => {
    if (typeof window === "undefined" || !storageKey) {
      return Date.now() + initialMinutes * 60 * 1000;
    }

    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (!isNaN(parsed) && parsed > Date.now()) {
          return parsed;
        }
      }
      const newTarget = Date.now() + initialMinutes * 60 * 1000;
      localStorage.setItem(storageKey, newTarget.toString());
      return newTarget;
    } catch {
      return Date.now() + initialMinutes * 60 * 1000;
    }
  }, [storageKey, initialMinutes]);

  const resetTimer = useCallback(() => {
    const newTarget = Date.now() + initialMinutes * 60 * 1000;
    if (typeof window !== "undefined" && storageKey) {
      try {
        localStorage.setItem(storageKey, newTarget.toString());
      } catch {}
    }
    setTotalSeconds(initialMinutes * 60);
  }, [storageKey, initialMinutes]);

  useEffect(() => {
    setIsMounted(true);
    const targetTimestamp = getTargetTimestamp();

    const updateTimer = () => {
      const now = Date.now();
      const diffSeconds = Math.max(0, Math.floor((targetTimestamp - now) / 1000));

      if (diffSeconds <= 0 && autoResetOnExpire) {
        resetTimer();
      } else {
        setTotalSeconds(diffSeconds);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [getTargetTimestamp, autoResetOnExpire, resetTimer]);

  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  const minutesStr = mins.toString().padStart(2, "0");
  const secondsStr = secs.toString().padStart(2, "0");
  const formatted = `${minutesStr}:${secondsStr}`;

  const initialTotalSeconds = initialMinutes * 60;
  const progressPercent = Math.min(
    100,
    Math.max(0, Math.round((totalSeconds / initialTotalSeconds) * 100))
  );

  return {
    minutes: minutesStr,
    seconds: secondsStr,
    formatted,
    totalSecondsRemaining: totalSeconds,
    progressPercent,
    isExpired: totalSeconds <= 0,
    isMounted,
    resetTimer,
  };
}

/**
 * Daily Dispatch Cutoff Timer (e.g. 5:00 PM IST daily cutoff)
 * Displays time remaining for Same-Day dispatch.
 */
export function useDailyCutoffTimer(cutoffHourIST: number = 17) {
  const [remaining, setRemaining] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
    formatted: "00h : 00m : 00s",
    isMounted: false,
  });

  useEffect(() => {
    const calculateRemaining = () => {
      const now = new Date();
      // Convert to IST (UTC + 5:30)
      const istTime = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      );

      const cutoff = new Date(istTime);
      cutoff.setHours(cutoffHourIST, 0, 0, 0);

      // If already past cutoff for today, count down to tomorrow's cutoff
      if (istTime.getTime() >= cutoff.getTime()) {
        cutoff.setDate(cutoff.getDate() + 1);
      }

      const diffMs = cutoff.getTime() - istTime.getTime();
      const totalSec = Math.max(0, Math.floor(diffMs / 1000));

      const h = Math.floor(totalSec / 3600);
      const m = Math.floor((totalSec % 3600) / 60);
      const s = totalSec % 60;

      const hoursStr = h.toString().padStart(2, "0");
      const minutesStr = m.toString().padStart(2, "0");
      const secondsStr = s.toString().padStart(2, "0");

      setRemaining({
        hours: hoursStr,
        minutes: minutesStr,
        seconds: secondsStr,
        formatted: `${hoursStr}h : ${minutesStr}m : ${secondsStr}s`,
        isMounted: true,
      });
    };

    calculateRemaining();
    const interval = setInterval(calculateRemaining, 1000);
    return () => clearInterval(interval);
  }, [cutoffHourIST]);

  return remaining;
}
