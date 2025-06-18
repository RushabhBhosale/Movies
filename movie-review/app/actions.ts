// app/actions.ts
"use server";
import webpush from "web-push";

console.log("VAPID_PUBLIC_KEY", process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY);
console.log("VAPID_PRIVATE_KEY", process.env.VAPID_PRIVATE_KEY);

// Configure VAPID details
webpush.setVapidDetails(
  "mailto: <rushabhbhosale25757@gmail.com>",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

// In-memory storage for demo purposes
// In production, use a database
let subscription: any = null;

export async function subscribeUser(sub: PushSubscription) {
  try {
    subscription = sub;
    // In production, store in database:
    // await db.subscriptions.create({ data: sub })
    console.log("User subscribed to push notifications");
    return { success: true };
  } catch (error) {
    console.error("Error subscribing user:", error);
    return { success: false, error: "Failed to subscribe user" };
  }
}

export async function unsubscribeUser() {
  try {
    subscription = null;
    // In production, remove from database:
    // await db.subscriptions.delete({ where: { ... } })
    console.log("User unsubscribed from push notifications");
    return { success: true };
  } catch (error) {
    console.error("Error unsubscribing user:", error);
    return { success: false, error: "Failed to unsubscribe user" };
  }
}

export async function sendNotification(message: string) {
  if (!subscription) {
    throw new Error("No subscription available");
  }

  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: "PWA Notification",
        body: message,
        icon: "/icon-192x192.png",
        badge: "/badge-72x72.png",
        tag: "pwa-notification",
        timestamp: Date.now(),
        requireInteraction: false,
        actions: [
          {
            action: "open",
            title: "Open App",
            icon: "/icon-192x192.png",
          },
          {
            action: "close",
            title: "Close",
            icon: "/close-icon.png",
          },
        ],
      })
    );
    console.log("Push notification sent successfully");
    return { success: true };
  } catch (error) {
    console.error("Error sending push notification:", error);
    return { success: false, error: "Failed to send notification" };
  }
}
