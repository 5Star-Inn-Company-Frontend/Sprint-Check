// utils/fetchAllAppData.js
export async function fetchAllAppData(token) {
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  const ApiKey = import.meta.env.VITE_API_KEY;
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const dashboardPromise = fetch(`${baseURL}/dashboard`, { headers }).then(
    (res) => res.json()
  );

  const billingPromise = fetch(`${baseURL}/wallet-history`, { headers }).then(
    (res) => res.json()
  );

  const historyPromise = fetch(`${baseURL}/history`, { headers }).then((res) =>
    res.json()
  );

  return Promise.all([dashboardPromise, billingPromise, historyPromise]);
}
