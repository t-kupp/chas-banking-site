export default function formatDateToMonthAndDays(dateString) {
  const months = [
    "januari",
    "februari",
    "mars",
    "april",
    "maj",
    "juni",
    "juli",
    "augusti",
    "september",
    "oktober",
    "november",
    "december",
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${day} ${month}`;
}
