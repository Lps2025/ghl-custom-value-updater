// Pages/index.js
"use client";

import React, { useEffect, useState } from "react";

const Home = () => {
  const [locationId, setLocationId] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      if (window?.app) {
        const context = await window.app.getContext();
        const locId = context?.locationId;
        setLocationId(locId);
        setIsReady(true);
      }
    };

    initApp();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-4 text-indigo-600">
          Launch Point Studio App
        </h1>
        {isReady ? (
          <p className="text-gray-700">
            App initialized successfully! <br />
            <span className="font-medium">Location ID:</span> {locationId}
          </p>
        ) : (
          <p className="text-gray-400">Initializing...</p>
        )}
      </div>
    </div>
  );
};

export default Home;

