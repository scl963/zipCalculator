import React from 'react';
import distanceCalculator from './distanceCalulator';

const Output = function (props) {
  let zipOneData = props.zipOneData;
  let zipTwoData = props.zipTwoData;

  if (zipOneData.lat && zipTwoData.lat) {
    let distance = distanceCalculator(zipOneData.lat, zipOneData.long, zipTwoData.lat, zipTwoData.long);
    return <h3>{`The distance from ${zipOneData.city}, ${zipOneData.state} ${zipOneData.zipcode}
     to ${zipTwoData.city}, ${zipTwoData.state} ${zipTwoData.zipcode} is approximately ${distance} miles!`}</h3>
  } else {
    return <p>Are you sure you entered a valid zip code?</p>
  }
};

export default Output;