import React, { useEffect, useRef } from "react";

const PlainModal = ({
  isOpen,
  onClose,
  children,
  size,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: string;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  let width = size === "lg" ? 800 : size === "md" ? 600 : 400;

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, isOpen]);

  if (!isOpen) return <></>; // ✅ Hook is always called

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="relative w-full bg-background rounded-xl shadow-lg"
        style={{ maxWidth: `${width}px` }}
      >
        <button
          onClick={onClose}
          className="absolute z-50 top-4 right-4 text-white cursor-pointer"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default PlainModal;
