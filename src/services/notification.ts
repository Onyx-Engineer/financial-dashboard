import { useCallback, useEffect, useState } from "react";

export type NotificationType = "success" | "error" | "warning" | "info";

export interface NotificationItem {
  id: string;
  message: string;
  type: NotificationType;
  duration?: number;
  timestamp: number;
}

interface NotificationQueue {
  items: NotificationItem[];
  currentNotification: NotificationItem | null;
}

class NotificationService {
  private queue: NotificationItem[] = [];
  private currentNotification: NotificationItem | null = null;
  private listeners: Set<(state: NotificationQueue) => void> = new Set();
  private timeoutId: number | null = null;

  private generateId(): string {
    return `notification-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  }

  private notifyListeners(): void {
    const state: NotificationQueue = {
      items: [...this.queue],
      currentNotification: this.currentNotification,
    };
    this.listeners.forEach((listener) => listener(state));
  }

  private processQueue(): void {
    if (this.currentNotification || this.queue.length === 0) {
      return;
    }

    const nextNotification = this.queue.shift()!;
    this.currentNotification = nextNotification;
    this.notifyListeners();

    // Auto-dismiss after duration
    const duration = nextNotification.duration ?? 4000;
    if (duration > 0) {
      this.timeoutId = window.setTimeout(() => {
        this.dismiss();
      }, duration);
    }
  }

  notify(
    message: string,
    type: NotificationType = "info",
    duration?: number
  ): string {
    const notification: NotificationItem = {
      id: this.generateId(),
      message,
      type,
      duration,
      timestamp: Date.now(),
    };

    this.queue.push(notification);
    this.notifyListeners();
    this.processQueue();

    return notification.id;
  }

  dismiss(id?: string): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    if (id) {
      // Remove specific notification from queue
      this.queue = this.queue.filter((item) => item.id !== id);

      // If dismissing current notification
      if (this.currentNotification?.id === id) {
        this.currentNotification = null;
      }
    } else {
      // Dismiss current notification
      this.currentNotification = null;
    }

    this.notifyListeners();

    // Process next in queue
    setTimeout(() => this.processQueue(), 150);
  }

  subscribe(listener: (state: NotificationQueue) => void): () => void {
    this.listeners.add(listener);

    // Immediately notify with current state
    const state: NotificationQueue = {
      items: [...this.queue],
      currentNotification: this.currentNotification,
    };
    listener(state);

    return () => {
      this.listeners.delete(listener);
    };
  }

  clear(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    this.queue = [];
    this.currentNotification = null;
    this.notifyListeners();
  }

  getQueueLength(): number {
    return this.queue.length + (this.currentNotification ? 1 : 0);
  }
}

// Singleton instance
const notificationService = new NotificationService();

// Simple API functions
export const notify = {
  success: (message: string, duration?: number) =>
    notificationService.notify(message, "success", duration),
  error: (message: string, duration?: number) =>
    notificationService.notify(message, "error", duration),
  warning: (message: string, duration?: number) =>
    notificationService.notify(message, "warning", duration),
  info: (message: string, duration?: number) =>
    notificationService.notify(message, "info", duration),
  dismiss: (id?: string) => notificationService.dismiss(id),
  clear: () => notificationService.clear(),
};

// Convenient single function
export const notifyUser = (
  message: string,
  type?: NotificationType,
  duration?: number
) => notificationService.notify(message, type, duration);

// Hook for component usage
export const useNotification = () => {
  const [state, setState] = useState<NotificationQueue>({
    items: [],
    currentNotification: null,
  });

  useEffect(() => {
    const unsubscribe = notificationService.subscribe(setState);
    return unsubscribe;
  }, []);

  const notifyWithHook = useCallback(
    (message: string, type?: NotificationType, duration?: number) => {
      return notificationService.notify(message, type, duration);
    },
    []
  );

  const dismissWithHook = useCallback((id?: string) => {
    notificationService.dismiss(id);
  }, []);

  const clearWithHook = useCallback(() => {
    notificationService.clear();
  }, []);

  return {
    ...state,
    notify: notifyWithHook,
    dismiss: dismissWithHook,
    clear: clearWithHook,
    queueLength: notificationService.getQueueLength(),
  };
};

export default notificationService;
