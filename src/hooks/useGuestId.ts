"use client";

import { useEffect, useState } from "react";
import { getGuestId } from "@/lib/guest";

export function useGuestId() {
  const [guestId, setGuestId] = useState("");

  useEffect(() => {
    setGuestId(getGuestId());
  }, []);

  return guestId;
}