import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faCalendarAlt, faClock, faMapMarkerAlt, faTag } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { formatDate, formatTime, getStatusBadge } from '../utils/helpers';

export default function FixtureCard({ 
  fixture, 
  sport, 
  gender, 
  loggedInUser, 
  onDelete, 
  onUpdateScore,
  showSportInfo = false
}) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card fixture-card">
        <div className={`fixture-header ${sport}-header`}>
          <div className="fixture-header-overlay">
            {loggedInUser?.role === 'admin' && (
              <>
                <button className="delete-btn" onClick={onDelete}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button className="update-score-btn" onClick={onUpdateScore}>
                  <FontAwesomeIcon icon={faPen} />
                </button>
              </>
            )}
            <div className="d-flex align-items-center mb-2">
              {fixture.team1Logo && (
                <Image 
                  src={fixture.team1Logo} 
                  alt={`${fixture.team1} logo`} 
                  width={50} 
                  height={50} 
                  className="team-logo" 
                />
              )}
              <h5 className="team-name">
                {fixture.team1} {fixture.team1Score || '0'} - {fixture.team2Score || '0'} {fixture.team2}
              </h5>
              {fixture.team2Logo && (
                <Image 
                  src={fixture.team2Logo} 
                  alt={`${fixture.team2} logo`} 
                  width={50} 
                  height={50} 
                  className="team-logo" 
                />
              )}
            </div>
            <p className="mb-1" dangerouslySetInnerHTML={{ __html: getStatusBadge(fixture.status) }} />
            <p className="mb-1">
              <FontAwesomeIcon icon={faCalendarAlt} className="fixture-details-icon" />
              {formatDate(fixture.date)}
            </p>
            <p className="mb-1">
              <FontAwesomeIcon icon={faClock} className="fixture-details-icon" />
              {formatTime(fixture.time)}
            </p>
            <p className="mb-1">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="fixture-details-icon" />
              {fixture.venue}
            </p>
            {showSportInfo && (
              <p className="mb-0">
                <FontAwesomeIcon icon={faTag} className="fixture-details-icon" />
                {sport.charAt(0).toUpperCase() + sport.slice(1)} ({gender === 'mens' ? "Men&apos;s" : "Women&apos;s"})
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}