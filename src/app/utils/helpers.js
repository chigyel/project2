export const formatDate = (dateStr) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

export const formatTime = (timeStr) => {
  const [hours, minutes] = timeStr.split(':');
  const time = new Date();
  time.setHours(parseInt(hours, 10));
  time.setMinutes(parseInt(minutes, 10));
  return time.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
};

export const getStatusBadge = (status) => {
  switch (status) {
    case 'live':
      return '<span class="badge bg-success">Live</span>';
    case 'final':
      return '<span class="badge bg-secondary">Final</span>';
    default:
      return '<span class="badge bg-info">Not Started</span>';
  }
};

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};