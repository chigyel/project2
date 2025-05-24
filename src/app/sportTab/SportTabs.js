"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFutbol, 
  faVolleyballBall, 
  faBasketballBall, 
  faList, 
  faPlus,
  faTrash,
  faPen,
  faCalendarAlt,
  faClock,
  faMapMarkerAlt,
  faTag
} from '@fortawesome/free-solid-svg-icons';
import GenderToggle from '../components/GenderToggle';
import FixtureCard from '../components/FixtureCard';
import { formatDate, formatTime, getStatusBadge } from '../utils/helpers';

export default function SportTabs({ 
  currentSport, 
  setCurrentSport, 
  loggedInUser, 
  fixtures, 
  setFixtures,
  currentGender,
  setCurrentGender
}) {
  const [showAddFixtureModal, setShowAddFixtureModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [fixtureToDelete, setFixtureToDelete] = useState(null);
  const [fixtureToUpdateScore, setFixtureToUpdateScore] = useState(null);
  const [logos, setLogos] = useState([]);
  const [newFixture, setNewFixture] = useState({
    sport: 'football',
    gender: 'mens',
    team1: '',
    team2: '',
    date: '',
    time: '',
    venue: '',
    team1Logo: '',
    team2Logo: '',
    team1Score: '0',
    team2Score: '0',
    status: 'not_started'
  });

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const res = await fetch('/api/logos');
        if (!res.ok) {
          throw new Error('Failed to fetch logos');
        }
        const data = await res.json();
        setLogos(data);
      } catch (error) {
        console.error('Error fetching logos:', error);
        alert('Failed to load team logos.');
      }
    };
    fetchLogos();
  }, []);

  const sports = [
    { id: 'football', name: 'Football', icon: faFutbol },
    { id: 'volleyball', name: 'Volleyball', icon: faVolleyballBall },
    { id: 'basketball', name: 'Basketball', icon: faBasketballBall },
    { id: 'futsal', name: 'Futsal', icon: faFutbol },
    { id: 'all', name: 'All Fixtures', icon: faList }
  ];
  const [teamList, setTeamList] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('/api/teams');
        const text = await response.text();
        console.log('Raw /api/teams response:', text);
        const data = JSON.parse(text);
        setTeamList(data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };
    fetchTeams();
  }, []);

  const handleSportChange = (sport) => {
    setCurrentSport(sport);
  };

  const handleAddFixture = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (
      !newFixture.sport ||
      !newFixture.gender ||
      !newFixture.team1 ||
      !newFixture.team2 ||
      !newFixture.date ||
      !newFixture.time ||
      !newFixture.venue
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    if (newFixture.team1 === newFixture.team2) {
      alert('Team 1 and Team 2 cannot be the same.');
      return;
    }

    try {
      const res = await fetch('/api/fixture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFixture),
      });

      if (res.status === 201) {
        const fixturesRes = await fetch('/api/fixture');
        if (!fixturesRes.ok) {
          throw new Error('Failed to fetch updated fixtures');
        }
        const fixturesData = await fixturesRes.json();
        
        const organizedFixtures = {
          football: { mens: [], womens: [] },
          volleyball: { mens: [], womens: [] },
          basketball: { mens: [], womens: [] },
          futsal: { mens: [], womens: [] },
        };

        fixturesData.forEach(fixture => {
          if (organizedFixtures[fixture.sport] && organizedFixtures[fixture.sport][fixture.gender]) {
            organizedFixtures[fixture.sport][fixture.gender].push(fixture);
          }
        });

        setFixtures(organizedFixtures);
        setNewFixture({
          sport: 'football',
          gender: 'mens',
          team1: '',
          team2: '',
          date: '',
          time: '',
          venue: '',
          team1Logo: '',
          team2Logo: '',
          team1Score: '0',
          team2Score: '0',
          status: 'not_started',
        });
        setShowAddFixtureModal(false);
      } else {
        const error = await res.json();
        alert(error.message || 'Failed to add fixture.');
      }
    } catch (err) {
      console.error('Add fixture failed:', err);
      alert('Server error. Please try again later.');
    }
  };

  const handleDeleteFixture = async () => {
    if (fixtureToDelete) {
      const { sport, gender, index } = fixtureToDelete;
      const fixture = fixtures[sport][gender][index];

      try {
        const res = await fetch(`/api/fixture/${fixture.id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          const fixturesRes = await fetch('/api/fixture');
          const fixturesData = await fixturesRes.json();
          
          const organizedFixtures = {
            football: { mens: [], womens: [] },
            volleyball: { mens: [], womens: [] },
            basketball: { mens: [], womens: [] },
            futsal: { mens: [], womens: [] },
          };

          fixturesData.forEach(fixture => {
            if (organizedFixtures[fixture.sport] && organizedFixtures[fixture.sport][fixture.gender]) {
              organizedFixtures[fixture.sport][fixture.gender].push(fixture);
            }
          });

          setFixtures(organizedFixtures);
          setShowDeleteModal(false);
          setFixtureToDelete(null);
        } else {
          alert('Failed to delete fixture.');
        }
      } catch (err) {
        console.error('Error deleting fixture:', err);
        alert('Failed to delete fixture.');
      }
    }
  };

  const handleUpdateScore = async () => {
    if (!fixtureToUpdateScore) return;

    const { sport, gender, index } = fixtureToUpdateScore;
    const fixture = fixtures[sport][gender][index];

    const updatedScore = {
      id: fixture.id,
      team1Score: parseInt(document.getElementById('team1-score').value, 10),
      team2Score: parseInt(document.getElementById('team2-score').value, 10),
      status: document.getElementById('match-status').value,
    };

    try {
      const res = await fetch('/api/fixture/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedScore),
      });

      if (!res.ok) {
        throw new Error('Failed to update fixture');
      }

      const updatedFixture = await res.json();
      const updatedFixtures = { ...fixtures };
      updatedFixtures[sport][gender][index] = updatedFixture;

      setFixtures(updatedFixtures);
      setShowScoreModal(false);
      setFixtureToUpdateScore(null);
    } catch (err) {
      console.error('Error updating fixture:', err);
      alert('Failed to update fixture.');
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <ul className="nav nav-tabs" id="sportTabs">
          {sports.map((sport) => (
            <li className="nav-item" key={sport.id}>
              <button
                className={`nav-link ${currentSport === sport.id ? 'active' : ''}`}
                onClick={() => handleSportChange(sport.id)}
              >
                <FontAwesomeIcon icon={sport.icon} className="me-2" />
                {sport.name}
              </button>
            </li>
          ))}
        </ul>
        <div>
          {loggedInUser.role === 'admin' && (
            <>
              <Link href="/manage-logo" className="btn btn-secondary me-2">
                Manage Logos
              </Link>
              <button 
                className="btn btn-primary" 
                onClick={() => setShowAddFixtureModal(true)}
              >
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Add Fixture
              </button>
            </>
          )}
          <button className="btn btn-danger ms-2" onClick={() => {
            localStorage.removeItem('loggedInUser');
            window.location.href = '/';
          }}>
            Logout
          </button>
        </div>
      </div>

      {currentSport !== 'all' && (
        <div id={`${currentSport}-content`} className="sport-content active">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>{currentSport.charAt(0).toUpperCase() + currentSport.slice(1)} Fixtures</h2>
            <div className="d-flex align-items-center">
              <div className="btn-group me-3">
                <button
                  className={`btn ${currentGender === 'mens' ? 'btn-primary' : 'btn-light'}`}
                  onClick={() => setCurrentGender('mens')}
                  style={{ 
                    backgroundColor: currentGender === 'mens' ? '#0d6efd' : '#f8f9fa',
                    color: currentGender === 'mens' ? 'white' : '#212529',
                    border: '1px solid #dee2e6'
                  }}
                >
                  Men's
                </button>
                <button
                  className={`btn ${currentGender === 'womens' ? 'btn-primary' : 'btn-light'}`}
                  onClick={() => setCurrentGender('womens')}
                  style={{ 
                    backgroundColor: currentGender === 'womens' ? '#0d6efd' : '#f8f9fa',
                    color: currentGender === 'womens' ? 'white' : '#212529',
                    border: '1px solid #dee2e6'
                  }}
                >
                  Women's
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            {fixtures[currentSport]?.[currentGender]?.length > 0 ? (
              fixtures[currentSport][currentGender].map((fixture, index) => (
                <FixtureCard 
                  key={`${currentSport}-${currentGender}-${fixture.id}-${index}`}
                  fixture={fixture}
                  sport={currentSport}
                  gender={currentGender}
                  index={index}
                  loggedInUser={loggedInUser}
                  onDelete={() => {
                    setFixtureToDelete({ sport: currentSport, gender: currentGender, index });
                    setShowDeleteModal(true);
                  }}
                  onUpdateScore={() => {
                    setFixtureToUpdateScore({ sport: currentSport, gender: currentGender, index });
                    setShowScoreModal(true);
                  }}
                />
              ))
            ) : (
              <div className="col-12">
                <div className="empty-state">
                  <i className="fas fa-calendar-times"></i>
                  <h5>No {currentGender === 'mens' ? "Men's" : "Women's"} {currentSport.charAt(0).toUpperCase() + currentSport.slice(1)} fixtures available</h5>
                  <p>Click the "Add Fixture" button to add some matches!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {currentSport === 'all' && (
        <div id="all-content" className="sport-content active">
          <h2>All Fixtures</h2>
          <div className="row">
            {Object.entries(fixtures).some(([sport, genders]) =>
              Object.values(genders).some(fixtures => fixtures.length > 0)
            ) ? (
              Object.entries(fixtures).map(([sport, genders]) =>
                Object.entries(genders).map(([gender, fixtures]) =>
                  fixtures.map((fixture, index) => (
                    <FixtureCard 
                      key={`${sport}-${gender}-${fixture.id}`}
                      fixture={fixture}
                      sport={sport}
                      gender={gender}
                      index={index}
                      loggedInUser={loggedInUser}
                      onDelete={() => {
                        setFixtureToDelete({ sport, gender, index });
                        setShowDeleteModal(true);
                      }}
                      onUpdateScore={() => {
                        setFixtureToUpdateScore({ sport, gender, index });
                        setShowScoreModal(true);
                      }}
                      showSportInfo
                    />
                  ))
                )
              )
            ) : (
              <div className="col-12">
                <div className="empty-state">
                  <i className="fas fa-calendar-times"></i>
                  <h5>No fixtures available</h5>
                  <p>Click the "Add Fixture" button to add some matches!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Modal show={showAddFixtureModal} onHide={() => setShowAddFixtureModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Fixture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAddFixture}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="fixture-sport" className="form-label">Sport</label>
                <select
                  id="fixture-sport"
                  className="form-select"
                  required
                  value={newFixture.sport}
                  onChange={(e) => setNewFixture({ ...newFixture, sport: e.target.value })}
                >
                  <option value="football">Football</option>
                  <option value="volleyball">Volleyball</option>
                  <option value="basketball">Basketball</option>
                  <option value="futsal">Futsal</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="fixture-gender" className="form-label">Category</label>
                <select
                  id="fixture-gender"
                  className="form-select"
                  required
                  value={newFixture.gender}
                  onChange={(e) => setNewFixture({ ...newFixture, gender: e.target.value })}
                >
                  <option value="mens">Men's</option>
                  <option value="womens">Women's</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="fixture-team1" className="form-label">Team 1</label>
                <select
                  id="fixture-team1"
                  className="form-select"
                  required
                  value={newFixture.team1}
                  onChange={(e) => {
                    setNewFixture({
                      ...newFixture,
                      team1: e.target.value,
                      team1Logo: logos.find(logo => logo.team === e.target.value)?.url || ''
                    });
                  }}
                >
                  <option value="">Select Team</option>
                  {teamList.map((team) => (
                    <option key={`team1-${team.teamName}`} value={team.teamName}>
                      {team.teamName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="fixture-team2" className="form-label">Team 2</label>
                <select
                  id="fixture-team2"
                  className="form-select"
                  required
                  value={newFixture.team2}
                  onChange={(e) => {
                    setNewFixture({
                      ...newFixture,
                      team2: e.target.value,
                      team2Logo: logos.find(logo => logo.team === e.target.value)?.url || ''
                    });
                  }}
                >
                  <option value="">Select Team</option>
                  {teamList.map((team) => (
                    <option key={`team2-${team.teamName}`} value={team.teamName}>
                      {team.teamName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="fixture-date" className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="fixture-date"
                  required
                  value={newFixture.date}
                  onChange={(e) => setNewFixture({ ...newFixture, date: e.target.value })}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="fixture-time" className="form-label">Time</label>
                <input
                  type="time"
                  className="form-control"
                  id="fixture-time"
                  required
                  value={newFixture.time}
                  onChange={(e) => setNewFixture({ ...newFixture, time: e.target.value })}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="fixture-venue" className="form-label">Venue</label>
                <select
                  id="fixture-venue"
                  className="form-select"
                  required
                  value={newFixture.venue}
                  onChange={(e) => setNewFixture({ ...newFixture, venue: e.target.value })}
                >
                  <option value="">Select a venue</option>
                  <option value="Football Ground">Football Ground</option>
                  <option value="Outdoor Basketball Ground">Outdoor Basketball Ground</option>
                  <option value="Indoor Basketball Ground">Indoor Basketball Ground</option>
                  <option value="Volleyball Ground 1">Volleyball Ground 1</option>
                  <option value="Volleyball Ground 2">Volleyball Ground 2</option>
                  <option value="Futsal Ground 1">Futsal Ground 1</option>
                  <option value="Futsal Ground 2">Futsal Ground 2</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowAddFixtureModal(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Add Fixture
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this fixture?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteFixture}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showScoreModal} onHide={() => setShowScoreModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Score</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {fixtureToUpdateScore && (() => {
            const fixture = fixtures[fixtureToUpdateScore.sport][fixtureToUpdateScore.gender][fixtureToUpdateScore.index];
            return (
              <form id="update-score-form">
                <div className="mb-3">
                  <label htmlFor="team1-score" className="form-label">{fixture.team1} Score</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    id="team1-score" 
                    defaultValue={fixture.team1Score} 
                    min="0"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="team2-score" className="form-label">{fixture.team2} Score</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    id="team2-score" 
                    defaultValue={fixture.team2Score} 
                    min="0"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="match-status" className="form-label">Match Status</label>
                  <select 
                    id="match-status" 
                    className="form-select" 
                    defaultValue={fixture.status}
                  >
                    <option value="not_started">To be Played</option>
                    <option value="live">Live</option>
                    <option value="final">Final</option>
                  </select>
                </div>
              </form>
            );
          })()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowScoreModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateScore}>
            Update Score
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}