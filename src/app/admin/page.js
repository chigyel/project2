'use client';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SportTabs from '../sportTab/SportTabs';
import { getLoggedInUser } from '../utils/storage';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [fixtures, setFixtures] = useState({
    football: { mens: [], womens: [] },
    volleyball: { mens: [], womens: [] },
    basketball: { mens: [], womens: [] },
    futsal: { mens: [], womens: [] },
  });
  const [currentSport, setCurrentSport] = useState('football');
  const [currentGender, setCurrentGender] = useState('mens');

  useEffect(() => {
    const user = getLoggedInUser();
    if (!user || user.role !== 'admin') {
      router.push('/login');
    } else {
      setLoggedInUser(user);
    }
  }, [router]);

  useEffect(() => {
    if (loggedInUser) {
      // Fetch fixtures
      const fetchFixtures = async () => {
        try {
          const response = await fetch('/api/fixture');
          const data = await response.json();
          
          // Organize fixtures by sport and gender
          const organizedFixtures = {
            football: { mens: [], womens: [] },
            volleyball: { mens: [], womens: [] },
            basketball: { mens: [], womens: [] },
            futsal: { mens: [], womens: [] },
          };

          // Sort fixtures by date and time
          const sortedFixtures = data.sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);
            return dateA - dateB;
          });

          // Organize sorted fixtures
          sortedFixtures.forEach(fixture => {
            if (organizedFixtures[fixture.sport] && organizedFixtures[fixture.sport][fixture.gender]) {
              organizedFixtures[fixture.sport][fixture.gender].push(fixture);
            }
          });

          setFixtures(organizedFixtures);
        } catch (error) {
          console.error('Error fetching fixtures:', error);
        }
      };

      fetchFixtures();
    }
  }, [loggedInUser]);

  if (!loggedInUser) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="container">
        <SportTabs 
          currentSport={currentSport}
          setCurrentSport={setCurrentSport}
          loggedInUser={loggedInUser}
          fixtures={fixtures}
          setFixtures={setFixtures}
          currentGender={currentGender}
          setCurrentGender={setCurrentGender}
        />
      </div>
    </Layout>
  );
} 