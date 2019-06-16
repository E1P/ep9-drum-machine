const detectMob = () => {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    return true;
  } else {
    return false;
  }
};

const calculateAverages = arrOfArr => {
  const resultArr = [];
  for (let i = 0; i < arrOfArr[0].length; i++) {
    let sum = 0;
    for (let j = 0; j < arrOfArr.length; j++) {
      sum += Math.trunc(arrOfArr[j][i]);
    }
    resultArr.push(sum / arrOfArr.length);
  }
  return resultArr;
};

export { detectMob, calculateAverages };
