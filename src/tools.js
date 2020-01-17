export const notesAdur2score = (notes, duration) => {
  let result = [];
  /*
  for (let i = 0; i < notes.length; i++) {
    result.push({
      note: notes[i],
      dur: duration[i]
    });
  }
  */
  result = notes.map((value, index) => {
    return {
      note: value,
      dur: duration[index]
    };
  });

  return result;
};

export const hsl2color = (hue, sat, light) => {
  let max, min;
  const rgb = { r: 0, g: 0, b: 0 };
  let zone = 0;

  hue = hue == 360 ? 0 : hue;
  zone = Math.floor(hue / 60.0);

  if (light <= 49) {
    max = 2.55 * (light + light * (sat / 100));
    min = 2.55 * (light - light * (sat / 100));
  } else {
    max = 2.55 * (light + (100 - light) * (sat / 100));
    min = 2.55 * (light - (100 - light) * (sat / 100));
  }

  if (zone == 0) {
    rgb.r = max;
    rgb.g = min + (max - min) * (hue / 60);
    rgb.b = min;
  } else if (zone == 1) {
    rgb.r = min + (max - min) * ((120 - hue) / 60);
    rgb.g = max;
    rgb.b = min;
  } else if (zone == 2) {
    rgb.r = min;
    rgb.g = max;
    rgb.b = min + (max - min) * ((hue - 120) / 60);
  } else if (zone == 3) {
    rgb.r = min;
    rgb.g = min + (max - min) * ((240 - hue) / 60);
    rgb.b = max;
  } else if (zone == 4) {
    rgb.r = min + (max - min) * ((hue - 240) / 60);
    rgb.g = min;
    rgb.b = max;
  } else if (zone == 5) {
    rgb.r = max;
    rgb.g = min;
    rgb.b = min + (max - min) * ((360 - hue) / 60);
  }

  rgb.r = Math.round(rgb.r);
  rgb.g = Math.round(rgb.g);
  rgb.b = Math.round(rgb.b);
  return rgb;
};

export const Color2RGBstring = color => {
  color.r = color.r.toString(16);
  if (color.r.length == 1) color.r = "0" + color.r;

  color.g = color.g.toString(16);
  if (color.g.length == 1) color.g = "0" + color.g;

  color.b = color.b.toString(16);
  if (color.b.length == 1) color.b = "0" + color.b;

  return "#" + color.r + color.g + color.b;
};

export const levelsetmax = notes => {
  let max = 0;
  notes.forEach(val => {
    if (val != null) {
      let tmp = val.split("");
      let num = tmp[tmp.length - 1];
      max = num > max ? num : max;
    }
  });
  return max;
};

export const levelsetmin = notes => {
  let min = 10;
  notes.forEach(val => {
    if (val != null) {
      let tmp = val.split("");
      let num = tmp[tmp.length - 1];
      min = num < min ? num : min;
    }
  });
  return min;
};

export const note2number = (note, min) => {
  let splitnote = note.split("");
  let x = splitnote[1] == "#" ? Number(splitnote[2]) : Number(splitnote[1]);
  let number = 7 * (x - min);

  switch (splitnote[0].toUpperCase()) {
    case "C":
      number += 6;
      break;
    case "D":
      number += 5;
      break;
    case "E":
      number += 4;
      break;
    case "F":
      number += 3;
      break;
    case "G":
      number += 2;
      break;
    case "A":
      number += 1;
      break;
    case "B":
      number += 0;
      break;
  }

  return number;
};

export const calcvols = (target, length, param) => {
  let arr = [];
  arr[0] = param;

  for (let i = 0; i < length / 2 - 1; i++) {
    let value = param / (i + 2);
    arr.push(value);
    arr.unshift(value);
  }

  for (let i = 0; i < target; i++) {
    let buf = arr.pop();
    arr.unshift(buf);
  }

  return arr;
};
