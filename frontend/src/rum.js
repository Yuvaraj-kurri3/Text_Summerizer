export function sendRUM(eventType, data = {}) {
  const payload = {
    eventType,
    timestamp: Date.now(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    data,
  };

  navigator.sendBeacon(
    "https://text-summerizer-vs2o.onrender.com/api/rum",
    JSON.stringify(payload)
  );
}
