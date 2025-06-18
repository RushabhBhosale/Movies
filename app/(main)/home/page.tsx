"use client";

import { useState, useEffect } from "react";
import {
  subscribeUser,
  unsubscribeUser,
  sendNotification,
} from "../../actions";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Enhanced Install Prompt Component with Auto-popup
function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Detect iOS
    const iOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(iOS);

    // Check if already installed
    const standalone = window.matchMedia("(display-mode: standalone)").matches;
    setIsStandalone(standalone);

    // Handle beforeinstallprompt event for Android/Chrome
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);

      // Show install prompt automatically if not already installed
      if (!standalone) {
        setShowInstallPrompt(true);
      }
    };

    // Show iOS instructions automatically if on iOS and not installed
    if (iOS && !standalone) {
      // Small delay to let the page load
      setTimeout(() => {
        setShowIOSInstructions(true);
      }, 1000);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowInstallPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    setShowIOSInstructions(false);
  };

  if (isStandalone) {
    return null; // Don't show install button if already installed
  }

  return (
    <>
      {/* Android/Chrome Install Popup */}
      {showInstallPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Install App
              </h3>
              <p className="text-gray-600 mb-4">
                Install this app on your device for a better experience!
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleInstallClick}
                  className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Install
                </button>
                <button
                  onClick={handleDismiss}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* iOS Install Instructions Popup */}
      {showIOSInstructions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Install App
              </h3>
              <p className="text-gray-600 mb-4">
                To install this app on your iOS device:
              </p>
              <div className="text-left text-sm text-gray-700 mb-4">
                <ol className="list-decimal list-inside space-y-2">
                  <li>
                    Tap the Share button{" "}
                    <span className="text-blue-500">⎋</span> at the bottom of
                    the screen
                  </li>
                  <li>
                    Scroll down and tap "Add to Home Screen"{" "}
                    <span className="text-blue-500">➕</span>
                  </li>
                  <li>Tap "Add" in the top right corner</li>
                </ol>
              </div>
              <button
                onClick={handleDismiss}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Regular Install Button (always visible) */}
      <div className="mt-8 p-4 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Install App</h3>
        {deferredPrompt ? (
          <button
            onClick={handleInstallClick}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Add to Home Screen
          </button>
        ) : (
          <div>
            <p className="text-sm text-gray-600 mb-2">
              Install this app for a better experience
            </p>
            {isIOS && (
              <p className="text-sm text-gray-500">
                On iOS: Tap Share <span className="text-blue-500">⎋</span> then
                "Add to Home Screen" <span className="text-blue-500">➕</span>
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
        updateViaCache: "none",
      });
      const sub = await registration.pushManager.getSubscription();
      setSubscription(sub);
    } catch (error) {
      console.error("Service worker registration failed:", error);
    }
  }

  async function subscribeToPush() {
    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
        ),
      });
      setSubscription(sub);
      const serializedSub = JSON.parse(JSON.stringify(sub));
      await subscribeUser(serializedSub);
    } catch (error) {
      console.error("Push subscription failed:", error);
    }
  }

  async function unsubscribeFromPush() {
    try {
      await subscription?.unsubscribe();
      setSubscription(null);
      await unsubscribeUser();
    } catch (error) {
      console.error("Unsubscribe failed:", error);
    }
  }

  async function sendTestNotification() {
    if (subscription && message.trim()) {
      try {
        await sendNotification(message);
        setMessage("");
      } catch (error) {
        console.error("Send notification failed:", error);
      }
    }
  }

  if (!isSupported) {
    return (
      <div className="p-4 border border-gray-200 rounded-lg">
        <p className="text-gray-600">
          Push notifications are not supported in this browser.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Push Notifications</h3>
      {subscription ? (
        <div className="space-y-4">
          <p className="text-green-600">
            ✓ You are subscribed to push notifications.
          </p>
          <button
            onClick={unsubscribeFromPush}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            Unsubscribe
          </button>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter notification message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendTestNotification}
              disabled={!message.trim()}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send Test
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-gray-600 mb-2">
            You are not subscribed to push notifications.
          </p>
          <button
            onClick={subscribeToPush}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Subscribe
          </button>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My PWA App</h1>
          <p className="text-gray-600">
            A Progressive Web App built with Next.js
          </p>
        </div>

        <InstallPrompt />
        <PushNotificationManager />
      </div>
    </div>
  );
}
