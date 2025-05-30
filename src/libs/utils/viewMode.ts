import dayjs from "dayjs";
import { ViewMode } from "@/types/product";

const VIEW_MODE_STORAGE_KEY = "product_view_mode";
const VIEW_MODE_TIMESTAMP_KEY = "product_view_mode_timestamp";
const EXPIRATION_SECONDS = 24 * 60 * 60;

const isClient = typeof window !== "undefined";

const clearStoredViewMode = () => {
  localStorage.removeItem(VIEW_MODE_STORAGE_KEY);
  localStorage.removeItem(VIEW_MODE_TIMESTAMP_KEY);
};

export const getStoredViewMode = (): ViewMode | null => {
  if (!isClient) return null;

  const stored = localStorage.getItem(VIEW_MODE_STORAGE_KEY);
  const timestamp = localStorage.getItem(VIEW_MODE_TIMESTAMP_KEY);

  if (!stored || !timestamp) return null;

  const now = dayjs().unix();
  const storedTime = parseInt(timestamp, 10);

  if (now - storedTime > EXPIRATION_SECONDS) {
    clearStoredViewMode();
    return null;
  }

  return stored as ViewMode;
};

export const generateRandomViewMode = (): ViewMode =>
  Math.random() < 0.5 ? ViewMode.LIST : ViewMode.GRID;

export const storeViewMode = (viewMode: ViewMode): void => {
  if (!isClient) return;

  localStorage.setItem(VIEW_MODE_STORAGE_KEY, viewMode);
  localStorage.setItem(VIEW_MODE_TIMESTAMP_KEY, dayjs().unix().toString());
};

export const getViewMode = (): ViewMode => {
  const stored = getStoredViewMode();
  if (stored) return stored;

  const newViewMode = generateRandomViewMode();
  storeViewMode(newViewMode);
  return newViewMode;
};
