export const storage = {
  get: (key) => {
    try { return JSON.parse(localStorage.getItem(key)) || (key.includes('Notes') ? {} : []); }
    catch { return key.includes('Notes') ? {} : []; }
  },
  set: (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch { return false; }
  }
};