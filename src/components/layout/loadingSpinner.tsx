import React, { useState, useEffect } from "react";

export default function LoadingSpinner({ loading }: { loading: boolean }) {
  const [visible, setVisible] = useState(loading);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (loading) {
      setVisible(true);
    } else {
      timeoutId = setTimeout(() => {
        setVisible(false);
      }, 700); // Adjust the duration to match the animation duration
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loading]);

  return (
    <>
      <div className="relative h-screen">
        {visible && (
          <div
            className={(!loading && "animate-out fade-out duration-700") || ""}
          >
            <div
              className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-2${
                (loading && "animate-in fade-in-90 duration-700") || ""
              } `}
            >
              <span className="loading loading-spinner text-secondary w-10 h-10 mb-16"></span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
