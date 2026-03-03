const CONFIG = {
  API_URL: "https://script.google.com/macros/s/AKfycbzzpaPp6av7Faa92u18nQ5FHw79srrPzlF4uLzo5B4KrnZicaNAxjVnWr1-cT4jRrI/exec",
  END_TIME: "2026-03-10T23:59:59",
  TEAMS: ["Đội Hoa Hồng", "Đội Hướng Dương", "Đội Tulip"],
  VOTING_ENABLED: true
};

// Load admin overrides from localStorage if available
(function() {
  try {
    const saved = localStorage.getItem("adminConfig");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.END_TIME) CONFIG.END_TIME = parsed.END_TIME;
      if (parsed.TEAMS && parsed.TEAMS.length) CONFIG.TEAMS = parsed.TEAMS;
      if (typeof parsed.VOTING_ENABLED === "boolean") CONFIG.VOTING_ENABLED = parsed.VOTING_ENABLED;
    }
  } catch(e) {}
})();
