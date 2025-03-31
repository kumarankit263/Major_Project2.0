

import React, { useEffect } from 'react';

function RightAdd() {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5285546768035104";
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <ins className="adsbygoogle"
         style={{ display: "inline-block", width: "300px", height: "600px" }}
         data-ad-client="ca-pub-5285546768035104"
         data-ad-slot="4846997957"
         >
    </ins>
  );
}

export default RightAdd;

