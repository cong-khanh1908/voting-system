const CONFIG = {
  API_URL: "https://script.google.com/macros/s/AKfycbzzpaPp6av7Faa92u18nQ5FHw79srrPzlF4uLzo5B4KrnZicaNAxjVnWr1-cT4jRrI/exec",
  END_TIME: "2026-03-10T23:59:59",
  TEAMS: ["Đội Hoa Hồng", "Đội Hướng Dương", "Đội Tulip"],
  VOTING_ENABLED: true
};

// Loads live settings from the Google Apps Script API.
// Overwrites CONFIG fields with whatever is stored in the Settings sheet.
CONFIG.loadFromAPI = function(callback) {
  fetch(CONFIG.API_URL)
    .then(r => r.json())
    .then(data => {
      if (data.settings) {
        const s = data.settings;
        if (s.end_time)  CONFIG.END_TIME = s.end_time;
        if (s.teams && s.teams.length) CONFIG.TEAMS = s.teams;
        if (typeof s.voting_enabled === "boolean") CONFIG.VOTING_ENABLED = s.voting_enabled;
      }
      if (callback) callback();
    })
    .catch(() => { if (callback) callback(); });
};
