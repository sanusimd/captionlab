export interface HistoryItem {
  id: string;
  toolId: string; // 'instagram' | 'youtube' | 'hashtag' | 'fancytext' | 'blogtitle'
  toolName: string;
  input: string;
  output: string;
  timestamp: number;
  isFavorite: boolean;
  hashtags?: string[];
}

export function isLocalStorageAvailable(): boolean {
  return typeof window !== "undefined" && window.localStorage !== undefined;
}

export function saveToHistory(item: Omit<HistoryItem, "id" | "timestamp" | "isFavorite">): HistoryItem {
  const newItem: HistoryItem = {
    ...item,
    id: `${item.toolId}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    timestamp: Date.now(),
    isFavorite: false,
  };

  if (!isLocalStorageAvailable()) return newItem;

  try {
    const rawHistory = localStorage.getItem("captionhall_history");
    const history: HistoryItem[] = rawHistory ? JSON.parse(rawHistory) : [];
    
    // Add to beginning of history list
    history.unshift(newItem);
    
    // Cap history size to 50 items to keep localStorage light
    const cappedHistory = history.slice(0, 50);
    
    localStorage.setItem("captionhall_history", JSON.stringify(cappedHistory));
  } catch (error) {
    console.error("Failed to save to localStorage history:", error);
  }

  return newItem;
}

export function getHistory(): HistoryItem[] {
  if (!isLocalStorageAvailable()) return [];

  try {
    const rawHistory = localStorage.getItem("captionhall_history");
    return rawHistory ? JSON.parse(rawHistory) : [];
  } catch (error) {
    console.error("Failed to read localStorage history:", error);
    return [];
  }
}

export function removeFromHistory(id: string): void {
  if (!isLocalStorageAvailable()) return;

  try {
    const rawHistory = localStorage.getItem("captionhall_history");
    if (!rawHistory) return;
    
    const history: HistoryItem[] = JSON.parse(rawHistory);
    const updatedHistory = history.filter((item) => item.id !== id);
    
    localStorage.setItem("captionhall_history", JSON.stringify(updatedHistory));
  } catch (error) {
    console.error("Failed to remove item from history:", error);
  }
}

export function toggleFavorite(id: string): boolean {
  if (!isLocalStorageAvailable()) return false;

  let newState = false;
  try {
    const rawHistory = localStorage.getItem("captionhall_history");
    if (!rawHistory) return false;
    
    const history: HistoryItem[] = JSON.parse(rawHistory);
    const updatedHistory = history.map((item) => {
      if (item.id === id) {
        newState = !item.isFavorite;
        return { ...item, isFavorite: newState };
      }
      return item;
    });
    
    localStorage.setItem("captionhall_history", JSON.stringify(updatedHistory));
  } catch (error) {
    console.error("Failed to toggle favorite status:", error);
  }
  return newState;
}
