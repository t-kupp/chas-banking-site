export default function formatDateToSwedish(dateString) {
  const date = new Date(dateString);

  // Extract year, month, day, hours, and minutes
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed, so we add 1
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Return the formatted date string: yyyy-mm-dd hours:minutes
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
