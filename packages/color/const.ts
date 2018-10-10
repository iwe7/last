export const BASELINES = {
  hue: [0, 360],
  sat: [0.1, 1],
  lum: [0.2, 0.9]
};
export const HUE = {
  orange: [20, 47],
  yellow: [47, 74],
  green: [74, 168],
  cyan: [168, 201],
  blue: [201, 251],
  violet: [251, 280],
  magenta: [280, 355],
  red: [355, 380],
  warm: [281, 441],
  cool: [81, 281],
  random: [0, 360]
};

export const SATURATION = {
  neutral: [0.1, 0.2],
  pale: [0.2, 0.4],
  muted: [0.4, 0.7],
  rich: [0.7, 1]
};

export const LUMINOSITY = {
  dark: [0.2, 0.4],
  midtone: [0.4, 0.7],
  light: [0.7, 0.9]
};

export const DESCRIPTOR = {
  deep: {
    sat: [0.6, 1],
    lum: [0, 0.4]
  },
  bold: {
    sat: [0.8, 1],
    lum: [0.3, 0.6]
  },
  bright: {
    sat: [0.7, 1],
    lum: [0.5, 0.75]
  },
  vibrant: {
    sat: [0.9, 1],
    lum: [0.6, 0.8]
  },
  dull: {
    sat: [0.2, 0.6],
    lum: [0.6, 0.3]
  },
  pastel: {
    sat: [0.6, 1],
    lum: [0.75, 1]
  },
  neon: {
    sat: [0.95, 1],
    lum: [0.5, 0.7]
  },
  black: {
    lum: [0, 0.2],
    sat: [0, 0.1]
  },
  gray: {
    lum: [0.2, 0.9],
    sat: [0, 0.1]
  },
  white: {
    lum: [0.95, 1],
    sat: [0, 0.1]
  }
};

const buildTermList = function() {
  var fullObject = Object.assign({}, HUE);
  var terms = [];
  fullObject = Object.assign(fullObject, SATURATION);
  fullObject = Object.assign(fullObject, LUMINOSITY);
  fullObject = Object.assign(fullObject, DESCRIPTOR);
  for (var prop in fullObject) {
    terms.push(prop);
  }
  return terms;
};

export const TERMS = buildTermList();

export const isValidTerm = (word: string): boolean => {
  for (let term of TERMS) {
    if (word === term) {
      return true;
    }
  }
  return false;
};

export const containsValidTerms = (query: string): boolean => {
  var descriptors = query.includes(" ") ? query.split(" ") : query;
  if (descriptors instanceof Array) {
    var results = [];
    for (let descriptor of descriptors) {
      results.push(isValidTerm(descriptor));
    }
    for (let result of results) {
      if (!result) {
        return false;
      }
    }
    return true;
  } else {
    return isValidTerm(query);
  }
};
