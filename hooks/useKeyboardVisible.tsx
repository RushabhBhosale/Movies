// hooks/useKeyboardVisible.ts
import { useEffect, useState } from "react";

export function useKeyboardVisible(threshold = 150) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateKeyboardVisibility = () => {
      const heightDiff = window.innerHeight - window.visualViewport?.height!;
      setIsVisible(heightDiff > threshold);
    };

    window.visualViewport?.addEventListener("resize", updateKeyboardVisibility);
    return () => {
      window.visualViewport?.removeEventListener(
        "resize",
        updateKeyboardVisibility
      );
    };
  }, [threshold]);

  return isVisible;
}
