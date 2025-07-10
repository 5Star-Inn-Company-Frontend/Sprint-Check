// utils/fetchAllAppData.js
export async function fetchAllAppData(token) {
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const dashboardPromise = fetch(
    "https://sprintcheck.megasprintlimited.com.ng/api/dashboard",
    { headers }
  ).then((res) => res.json());

  const billingPromise = fetch(
    "https://sprintcheck.megasprintlimited.com.ng/api/wallet-history",
    { headers }
  ).then((res) => res.json());

  const historyPromise = fetch(
    "https://sprintcheck.megasprintlimited.com.ng/api/history",
    { headers }
  ).then((res) => res.json());

  return Promise.all([dashboardPromise, billingPromise, historyPromise]);
}
