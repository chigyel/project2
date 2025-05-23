"use client";  // <--- Add this line at the very top

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol, faVolleyballBall, faBasketballBall, faList } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    setLoggedInUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = '/login';
  };

  return (
    <div className="hero-section text-center">
      <div className="container position-relative">
        <div className="college-logo">
          <Image src="/images/logo.png" alt="College Logo" width={100} height={100} />
          <Image src="/images/volley.png" alt="College Logo 2" width={100} height={100} className="ms-2" />
        </div>
        <div className="my-logo">
          <Image src="/images/kangtsey.png" alt="My Logo" width={100} height={100} />
          <Image src="/images/basket.png" alt="My Logo 2" width={100} height={100} className="ms-2" />
        </div>
        <h1 className="display-4 fw-bold">CST SPORTS</h1>
        <p className="lead">All your sports fixtures in one place!</p>
      </div>
    </div>
  );
}
