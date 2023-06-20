export const convertDate = (
  date: string | number | Date
): string | number | Date => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const resultDate = new Date(date);
  return `${
    resultDate.getUTCDate() +
    " " +
    monthNames[resultDate.getUTCMonth()] +
    " " +
    resultDate.getUTCFullYear()
  } `;
};
export const convertStatus = (status: number) => {
  switch (status) {
    case 1:
      return "ACTIVE";
    case 2:
      return "BLOCKED";
    case 0:
      return "DELETED";
    default:
  }
};
