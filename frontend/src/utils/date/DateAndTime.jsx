export const relativeTimeString = (prevTime) => {
  const currentDate = new Date();
  const postDate = new Date(prevTime);

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const expTime = currentDate - postDate;

  if (expTime < msPerMinute) {
    return Math.round(expTime / 1000) + " seconds ago";
  } else if (expTime < msPerHour) {
    return Math.round(expTime / msPerMinute) + " m ago";
  } else if (expTime < msPerDay) {
    return Math.round(expTime / msPerHour) + " h ago";
  } else if (expTime < msPerMonth) {
    return Math.round(expTime / msPerDay) + " d ago";
  } else if (expTime < msPerYear) {
    return Math.round(expTime / msPerMonth) + " months ago";
  } else {
    return Math.round(expTime / msPerYear) + " yr ago";
  }
};
