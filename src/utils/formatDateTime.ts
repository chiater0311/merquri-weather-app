export function formatDateTime(dt: number, timezone: number): string {
  const ms = (dt + timezone) * 1000;
  const date = new Date(ms);

  const pad = (n: number) => n.toString().padStart(2, "0");

  const day = pad(date.getUTCDate());
  const month = pad(date.getUTCMonth() + 1);
  const year = date.getUTCFullYear();

  let hours = date.getUTCHours();
  const minutes = pad(date.getUTCMinutes());
  const ampm = hours >= 12 ? "pm" : "am";

  hours = hours % 12 || 12;

  return `${day}-${month}-${year} ${hours}:${minutes}${ampm}`;
}
