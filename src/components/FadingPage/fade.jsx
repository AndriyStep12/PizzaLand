import React, { useState, useEffect } from 'react';
import loadingImg from '../images/loading.gif'

const DisappearingPage = () => {
  const [showPage, setShowPage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPage(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showPage ? (
        <img src={loadingImg} alt="" />
      ) : null}
    </div>
  );
};

export default DisappearingPage;
