export function capitalizeFirst(s) {
  return s.charAt(0).toUpperCase() + s.substring(1, s.length);
}

function reduce(s, split, joiner, fn) {
  const reduced = s.split(split).reduce((curr, prev) => {
    if(prev) {
      prev += joiner;
    }

    curr = fn(curr);
    return prev ? prev + curr : curr;
  });

  return fn(reduced);
}

export const toTitle = s => reduce(s, '-', ' ', capitalizeFirst);
export const toClassName = s => reduce(s, ' ', '-', s => s.toLowerCase());