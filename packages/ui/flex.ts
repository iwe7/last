/**
 * @param {Number} [baseFontSize = 100] - 基础fontSize, 默认100px;
 * @param {Number} [fontscale = 1] - 有的业务希望能放大一定比例的字体;
 */
export const autoflex = (baseFontSize: number, fontscale: number) => {
  const designWidth = 750;
  const rem2px = 100;
  console.log(window.innerWidth);
  console.log(designWidth);
//   document.documentElement.style.fontSize =
//     (((document.body.clientWidth / designWidth) * rem2px) / 16) * 100 + "%";

  const _baseFontSize = baseFontSize || 100;
  const _fontscale = fontscale || 1;

  const doc = window.document;
  const ua = navigator.userAgent;
  const matches: any = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
  const UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
  const isUCHd =
    UCversion && parseInt(UCversion[1].split(".").join(""), 10) >= 80;
  const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
  let dpr = window.devicePixelRatio || 1;
  if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
    // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
    dpr = 1;
  }
  const scale = 1 / dpr;

  let metaEl = doc.querySelector('meta[name="viewport"]');
  if (!metaEl) {
    metaEl = doc.createElement("meta");
    metaEl.setAttribute("name", "viewport");
    doc.head.appendChild(metaEl);
  }
  metaEl.setAttribute(
    "content",
    `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`
  );
  //   const fontSize = (_baseFontSize / 2) * dpr * _fontscale;
  //   doc.documentElement.style.fontSize = `${fontSize}px`;
//   doc.body.style.fontSize = `1.2rem`;
};

// 开始设置，可以根据业务需求修改参数
export default autoflex;
