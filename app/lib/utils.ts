export function fetcher(route: string) {
  return fetch(route)
    .then((r) => r.ok && r.json())
    .then((data) => data || null);
}

export const delay = async (cb: any, d = 5000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      cb();
      resolve(true);
    }, d);
  });
};

export function validateEmail(email: string) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export const colors = {
  opensea: "#2081E2",
};

export function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
