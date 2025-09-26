export const getInitials = (name) => {
  const words = name.trim().split(' ').filter(Boolean);
  return words.length === 1 ? name.substring(0, 2).toUpperCase() 
    : (words[0][0] + (words[1]?.[0] || words[0][1])).toUpperCase();
};

export const formatDateTime = () => {
  const now = new Date();
  return {
    date: now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  };
};

export const hexToRgba = (hex, alpha = 0.1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

