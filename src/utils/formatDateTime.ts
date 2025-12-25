export function formatDateTime(dt: number, timezone: number): string {
  const utc = dt * 1000;
  const localTime = utc + timezone * 1000;
  const date = new Date(localTime);

  const pad = (n: number) => n.toString().padStart(2, "0");

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = pad(date.getMinutes());
  const ampm = hours >= 12 ? "pm" : "am";

  hours = hours % 12 || 12;

  return `${day}-${month}-${year} ${hours}:${minutes}${ampm}`;
}
