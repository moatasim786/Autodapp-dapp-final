export const setStyles = (styles) => {
  const range = document.createRange();
  const arr = [];
  Object.entries(styles).forEach(([key]) => {
    const obj = JSON.stringify(styles[key], null, "\t")
      .replace(/"/g, "")
      .replace(/,\n/g, ";")
      .replace(/\}/g, ";}");
    arr.push(`.${key}${obj}`);
  });
  const res = `<style>${[...arr].join("")}</style>`;
  const frag = range.createContextualFragment(res);
  document.querySelector("head").append(frag);
};

export const shortAddress = (address) => {
  if (typeof address !== "string") {
    address = "" + address;
  }
  return `${address.slice(0, 7)}...${address.slice(-4)}`;
};

export const convertToNormal = (value, decimal, fixed) =>
  parseFloat(
    fixed ? (value / +`1E${decimal}`).toFixed(fixed) : value / +`1E${decimal}`
  );

export const copyToClipBoard = async (copyTextRef) => {
  try {
    await navigator.clipboard.writeText(copyTextRef.current.innerHTML)
  } catch (e) {
    console.error('copying is failed')
  }
}

export const saveLocal = (item, data) => {
  localStorage.setItem(item, JSON.stringify(data))
}

export const loadLocal = (item) => {
  const data = localStorage.getItem(item)

  if (data) {
    return JSON.parse(data)
  }
}

export const exitApp = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('autodapp_user_option')
}

export const findRoute = (route) => {
  const options = loadLocal('autodapp_user_option')

  if (!options) return false

  return !!options.find(o => o?.option === route)
}

export function throttle (callback, limit) {
    var wait = false;                  // Initially, we're not waiting
    return function () {               // We return a throttled function
        if (!wait) {                   // If we're not waiting
            callback.call();           // Execute users function
            wait = true;               // Prevent future invocations
            setTimeout(function () {   // After a period of time
                wait = false;          // And allow future invocations
            }, limit);
        }
    }
}