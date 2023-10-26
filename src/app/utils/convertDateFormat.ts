export function convertDateFormat(dateString: string): string {
  const parts = dateString.split("-");
  if (parts.length === 3) {
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    const currentYear = new Date().getFullYear();
    const fullYear = currentYear - (currentYear % 100) + Number(year);

    const date = new Date(fullYear, Number(month) - 1, Number(day));

    return date.toISOString().split("T")[0];
  } else {
    return dateString;
  }
}
