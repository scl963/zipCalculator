function distanceCalculator(latOne, longOne, latTwo, longTwo) {
  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  let r = 6371e3; // metres
  let radsLatOne = toRadians(latOne);
  let radsLatTwo = toRadians(latTwo);
  let latDist = toRadians(latTwo - latOne);
  let longDist = toRadians(longTwo - longOne);

  let a = Math.sin(latDist / 2) * Math.sin(latDist / 2) +
    Math.cos(radsLatOne) * Math.cos(radsLatTwo) *
    Math.sin(longDist / 2) * Math.sin(longDist / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = r * c;

  return Math.round(d * 0.00062137);
};

export default distanceCalculator;