const month = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

export function generateDate() {
  const date = new Date();
  const day = date.getDay().toString().padStart(2, "0");
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours().toString().padStart(2, "0");
  const min = date.getMinutes().toString().padStart(2, "0");

  return `${day} de ${month[monthIndex]}., ${hour}:${min} UTC-3`;
}

export function generateHoursAndSeconds() {
  const date = new Date();
  const day = date.getDay().toString().padStart(2, "0");
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours().toString().padStart(2, "0");
  const min = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${hour}h${min}m${seconds}`;
}
