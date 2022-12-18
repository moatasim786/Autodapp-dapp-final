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
