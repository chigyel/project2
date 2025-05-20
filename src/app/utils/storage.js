export const getLoggedInUser = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('loggedInUser'));
  }
  return null;
};

export const getFixtures = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('sportFixtures')) || {
      football: { mens: [], womens: [] },
      volleyball: { mens: [], womens: [] },
      basketball: { mens: [], womens: [] },
      futsal: { mens: [], womens: [] },
    };
  }
  return {
    football: { mens: [], womens: [] },
    volleyball: { mens: [], womens: [] },
    basketball: { mens: [], womens: [] },
    futsal: { mens: [], womens: [] },
  };
};

export const getLogos = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('teamLogos')) || [];
  }
  return [];
};

export const saveFixtures = (fixtures) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('sportFixtures', JSON.stringify(fixtures));
  }
};

export const saveLogos = (logos) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('teamLogos', JSON.stringify(logos));
  }
};