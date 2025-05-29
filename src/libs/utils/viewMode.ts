import dayjs from "dayjs";
import { ViewMode } from "@/types/product";

const VIEW_MODE_STORAGE_KEY = "product_view_mode";
const VIEW_MODE_TIMESTAMP_KEY = "product_view_mode_timestamp";

export function getStoredViewMode(): ViewMode | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(VIEW_MODE_STORAGE_KEY);
  const timestamp = localStorage.getItem(VIEW_MODE_TIMESTAMP_KEY);

  if (!stored || !timestamp) return null;

  const now = dayjs().unix();
  const storedTime = parseInt(timestamp, 10);
  const twentyFourHours = 24 * 60 * 60;

  if (now - storedTime > twentyFourHours) {
    localStorage.removeItem(VIEW_MODE_STORAGE_KEY);
    localStorage.removeItem(VIEW_MODE_TIMESTAMP_KEY);
    return null;
  }

  return stored as ViewMode;
}

export function generateRandomViewMode(): ViewMode {
  return Math.random() < 0.5 ? "list" : "grid";
}

export function storeViewMode(viewMode: ViewMode): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(VIEW_MODE_STORAGE_KEY, viewMode);
  localStorage.setItem(VIEW_MODE_TIMESTAMP_KEY, dayjs().unix().toString());
}

export function getOrGenerateViewMode(): ViewMode {
  const stored = getStoredViewMode();

  if (stored) {
    return stored;
  }

  const newViewMode = generateRandomViewMode();
  storeViewMode(newViewMode);
  return newViewMode;
}
