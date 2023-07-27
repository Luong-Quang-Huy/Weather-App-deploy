export const toSring = (value) => {
  const target = value.slice(4);
  return add(target);
};

const add = (value) => {
  const target = value + "1204";
  return subtract(target);
};

const subtract = (value) => {
  const target = value.replace("9", "66");
  return next(target);
};

const next = (value) => {
  return value.replace("s", "aa");
};

export const getIconLink = (code) => {
    return `https://openweathermap.org/img/wn/${code}@2x.png`;
}

//API KEY
export const apiKey = "aad2sd2e6db9f30a1120ace2a0a81c";

export const getForeignDate = (dt, timezoneOffset) => {

  const localOffset = new Date().getTimezoneOffset();
  const utcTimeStamp = dt * 1000 + (localOffset * 60 * 1000);
  const foreignTimestamp = utcTimeStamp + timezoneOffset * 1000;

  return new Date(foreignTimestamp);
};
