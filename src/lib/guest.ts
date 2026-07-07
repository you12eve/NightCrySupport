const GUEST_ID_KEY = "guest_id";

export function getGuestId(): string {
  if (typeof window === "undefined") {
    return "";
  }

  let guestId = localStorage.getItem(GUEST_ID_KEY);

  if (!guestId) {
    guestId = crypto.randomUUID();
    localStorage.setItem(GUEST_ID_KEY, guestId);
  }

  return guestId;
}