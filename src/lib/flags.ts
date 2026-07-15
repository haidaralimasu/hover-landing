/**
 * Real, official flag SVG artwork - not emoji, not a color
 * approximation. Source: flag-icons (MIT license,
 * github.com/lipis/flag-icons), the square 1x1 variant designed for
 * circular-icon use. Downloaded once and inlined as string constants -
 * React Native has no filesystem/fetch-based SVG loading at runtime,
 * so this is the reliable way to ship real flag vector data.
 */

export const flagUsXml = `<svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-us" viewBox="0 0 512 512">
  <path fill="#bd3d44" d="M0 0h512v512H0"/>
  <path stroke="#fff" stroke-width="40" d="M0 58h512M0 137h512M0 216h512M0 295h512M0 374h512M0 453h512"/>
  <path fill="#192f5d" d="M0 0h390v275H0z"/>
  <marker id="us-a" markerHeight="30" markerWidth="30">
    <path fill="#fff" d="m15 0 9.3 28.6L0 11h30L5.7 28.6"/>
  </marker>
  <path fill="none" marker-mid="url(#us-a)" d="m0 0 18 11h65 65 65 65 66L51 39h65 65 65 65L18 66h65 65 65 65 66L51 94h65 65 65 65L18 121h65 65 65 65 66L51 149h65 65 65 65L18 177h65 65 65 65 66L51 205h65 65 65 65L18 232h65 65 65 65 66z"/>
</svg>`;

export const flagGbXml = `<svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-gb" viewBox="0 0 512 512">
  <path fill="#012169" d="M0 0h512v512H0z"/>
  <path fill="#FFF" d="M512 0v64L322 256l190 187v69h-67L254 324 68 512H0v-68l186-187L0 74V0h62l192 188L440 0z"/>
  <path fill="#C8102E" d="m184 324 11 34L42 512H0v-3zm124-12 54 8 150 147v45zM512 0 320 196l-4-44L466 0zM0 1l193 189-59-8L0 49z"/>
  <path fill="#FFF" d="M176 0v512h160V0zM0 176v160h512V176z"/>
  <path fill="#C8102E" d="M0 208v96h512v-96zM208 0v512h96V0z"/>
</svg>`;

export const flagEuXml = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="flag-icons-eu" viewBox="0 0 512 512">
  <defs>
    <g id="eu-d">
      <g id="eu-b">
        <path id="eu-a" d="m0-1-.3 1 .5.1z"/>
        <use xlink:href="#eu-a" transform="scale(-1 1)"/>
      </g>
      <g id="eu-c">
        <use xlink:href="#eu-b" transform="rotate(72)"/>
        <use xlink:href="#eu-b" transform="rotate(144)"/>
      </g>
      <use xlink:href="#eu-c" transform="scale(-1 1)"/>
    </g>
  </defs>
  <path fill="#039" d="M0 0h512v512H0z"/>
  <g fill="#fc0" transform="translate(256 258.4)scale(25.28395)">
    <use xlink:href="#eu-d" width="100%" height="100%" y="-6"/>
    <use xlink:href="#eu-d" width="100%" height="100%" y="6"/>
    <g id="eu-e">
      <use xlink:href="#eu-d" width="100%" height="100%" x="-6"/>
      <use xlink:href="#eu-d" width="100%" height="100%" transform="rotate(-144 -2.3 -2.1)"/>
      <use xlink:href="#eu-d" width="100%" height="100%" transform="rotate(144 -2.1 -2.3)"/>
      <use xlink:href="#eu-d" width="100%" height="100%" transform="rotate(72 -4.7 -2)"/>
      <use xlink:href="#eu-d" width="100%" height="100%" transform="rotate(72 -5 .5)"/>
    </g>
    <use xlink:href="#eu-e" width="100%" height="100%" transform="scale(-1 1)"/>
  </g>
</svg>`;

export const flagInXml = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="flag-icons-in" viewBox="0 0 512 512">
  <path fill="#f93" d="M0 0h512v170.7H0z"/>
  <path fill="#fff" d="M0 170.7h512v170.6H0z"/>
  <path fill="#128807" d="M0 341.3h512V512H0z"/>
  <g transform="translate(256 256)scale(3.41333)">
    <circle r="20" fill="#008"/>
    <circle r="17.5" fill="#fff"/>
    <circle r="3.5" fill="#008"/>
    <g id="in-d">
      <g id="in-c">
        <g id="in-b">
          <g id="in-a" fill="#008">
            <circle r=".9" transform="rotate(7.5 -8.8 133.5)"/>
            <path d="M0 17.5.6 7 0 2l-.6 5z"/>
          </g>
          <use xlink:href="#in-a" width="100%" height="100%" transform="rotate(15)"/>
        </g>
        <use xlink:href="#in-b" width="100%" height="100%" transform="rotate(30)"/>
      </g>
      <use xlink:href="#in-c" width="100%" height="100%" transform="rotate(60)"/>
    </g>
    <use xlink:href="#in-d" width="100%" height="100%" transform="rotate(120)"/>
    <use xlink:href="#in-d" width="100%" height="100%" transform="rotate(-120)"/>
  </g>
</svg>`;

export const flagAeXml = `<svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-ae" viewBox="0 0 512 512">
  <path fill="#00732f" d="M0 0h512v170.7H0z"/>
  <path fill="#fff" d="M0 170.7h512v170.6H0z"/>
  <path fill="#000001" d="M0 341.3h512V512H0z"/>
  <path fill="red" d="M0 0h180v512H0z"/>
</svg>`;

export const flagJpXml = `<svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-jp" viewBox="0 0 512 512">
  <defs>
    <clipPath id="jp-a">
      <path fill-opacity=".7" d="M177.2 0h708.6v708.7H177.2z"/>
    </clipPath>
  </defs>
  <g fill-rule="evenodd" stroke-width="1pt" clip-path="url(#jp-a)" transform="translate(-128)scale(.72249)">
    <path fill="#fff" d="M0 0h1063v708.7H0z"/>
    <circle cx="523.1" cy="344.1" r="194.9" fill="#bc002d" transform="translate(-59.7 -34.5)scale(1.1302)"/>
  </g>
</svg>`;

export const flagSgXml = `<svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-sg" viewBox="0 0 512 512">
  <defs>
    <clipPath id="sg-a">
      <path fill-opacity=".7" d="M27.7 0h708.6v708.7H27.7z"/>
    </clipPath>
  </defs>
  <g fill-rule="evenodd" clip-path="url(#sg-a)" transform="translate(-20)scale(.72249)">
    <path fill="#fff" d="M0 0h1063v708.7H0z"/>
    <path fill="#df0000" d="M0 0h1063v354.3H0z"/>
    <path fill="#fff" d="M245.2 59.4a124.6 124.6 0 0 0 1.1 243.9 126.9 126.9 0 1 1-1.1-243.9"/>
    <path fill="#fff" d="m202 162.4-18.9-13.8 23.5-.2 7.2-22.3 7.5 22.3h23.4l-18.8 14 7.2 22.3L214 171l-19 13.8zm26 76.9-19-13.8 23.5-.2 7.3-22.3 7.4 22.2h23.5l-19 14 7.3 22.3-19-13.6-19 13.8zm86.3-.6-19-13.8 23.4-.2 7.3-22.3 7.4 22.3H357l-18.9 14 7.3 22.3-19.1-13.7-19 13.8zm25.7-76.2-19-13.8 23.5-.2 7.2-22.3 7.5 22.2h23.4l-18.8 14 7.2 22.3-19.1-13.6-19 13.8zM271.7 112l-19-13.8 23.5-.2 7.3-22.3 7.4 22.3h23.5l-19 14 7.3 22.2-19-13.6-19 13.8z"/>
  </g>
</svg>`;

export const flagCaXml = `<svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-ca" viewBox="0 0 512 512">
  <path fill="#fff" d="M81.1 0h362.3v512H81.1z"/>
  <path fill="#d52b1e" d="M-100 0H81.1v512H-100zm543.4 0h181.1v512H443.4zM135.3 247.4l-14 4.8 65.4 57.5c5 14.8-1.7 19.1-6 26.9l71-9-1.8 71.5 14.8-.5-3.3-70.9 71.2 8.4c-4.4-9.3-8.3-14.2-4.3-29l65.4-54.5-11.4-4.1c-9.4-7.3 4-34.8 6-52.2 0 0-38.1 13.1-40.6 6.2l-9.9-18.5-34.6 38c-3.8 1-5.4-.6-6.3-3.8l16-79.7-25.4 14.3q-3.3 1.3-5.6-2.4l-24.5-49-25.2 50.9q-3 2.7-5.4.8l-24.2-13.6 14.5 79.2c-1.1 3-3.9 4-7.1 2.3l-33.3-37.8c-4.3 7-7.3 18.4-13 21-5.7 2.3-25-4.9-37.9-7.7 4.4 15.9 18.2 42.3 9.5 51z"/>
</svg>`;

export const flagAuXml = `<svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-au" viewBox="0 0 512 512">
  <path fill="#00008B" d="M0 0h512v512H0z"/>
  <path fill="#fff" d="M256 0v32l-95 96 95 93.5V256h-33.5L127 162l-93 94H0v-34l93-93.5L0 37V0h31l96 94 93-94z"/>
  <path fill="red" d="m92 162 5.5 17L21 256H0v-1.5zm62-6 27 4 75 73.5V256zM256 0l-96 98-2-22 75-76zM0 .5 96.5 95 67 91 0 24.5z"/>
  <path fill="#fff" d="M88 0v256h80V0zM0 88v80h256V88z"/>
  <path fill="red" d="M0 104v48h256v-48zM104 0v256h48V0z"/>
  <path fill="#fff" d="m202 402.8-45.8 5.4 4.6 45.9-32.8-32.4-33 32.2 4.9-45.9-45.8-5.8L93 377.4 69 338l43.6 15 15.8-43.4 15.5 43.5 43.7-14.7-24.3 39.2 38.8 25.1Zm222.7 8-20.5 2.6 2.2 20.5-14.8-14.4-14.7 14.5 2-20.5-20.5-2.4 17.3-11.2-10.9-17.5 19.6 6.5 6.9-19.5 7.1 19.4 19.5-6.7-10.7 17.6zM415 293.6l2.7-13-9.8-9 13.2-1.5 5.5-12.1 5.5 12.1 13.2 1.5-9.8 9 2.7 13-11.6-6.6zm-84.1-60-20.3 2.2 1.8 20.3-14.4-14.5-14.8 14.1 2.4-20.3-20.2-2.7 17.3-10.8-10.5-17.5 19.3 6.8 7.2-19.1 6.7 19.3 19.4-6.3-10.9 17.3zm175.8-32.8-20.9 2.7 2.3 20.9-15.1-14.7-15 14.8 2.1-21-20.9-2.4 17.7-11.5-11.1-17.9 20 6.7 7-19.8 7.2 19.8 19.9-6.9-11 18zm-82.1-83.5-20.7 2.3 1.9 20.8-14.7-14.8L376 140l2.4-20.7-20.7-2.8 17.7-11-10.7-17.9 19.7 6.9 7.3-19.5 6.8 19.7 19.8-6.5-11.1 17.6z"/>
</svg>`;

export const flagDeXml = `<svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-de" viewBox="0 0 512 512">
  <path fill="#fc0" d="M0 341.3h512V512H0z"/>
  <path fill="#000001" d="M0 0h512v170.7H0z"/>
  <path fill="red" d="M0 170.7h512v170.6H0z"/>
</svg>`;

export const flagFrXml = `<svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-fr" viewBox="0 0 512 512">
  <path fill="#fff" d="M0 0h512v512H0z"/>
  <path fill="#000091" d="M0 0h170.7v512H0z"/>
  <path fill="#e1000f" d="M341.3 0H512v512H341.3z"/>
</svg>`;

export const flagCnXml = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="flag-icons-cn" viewBox="0 0 512 512">
  <defs>
    <path id="cn-a" fill="#ff0" d="M1-.3-.7.8 0-1 .6.8-1-.3z"/>
  </defs>
  <path fill="#ee1c25" d="M0 0h512v512H0z"/>
  <use xlink:href="#cn-a" width="30" height="20" transform="translate(128 128)scale(76.8)"/>
  <use xlink:href="#cn-a" width="30" height="20" transform="rotate(-121 142.6 -47)scale(25.5827)"/>
  <use xlink:href="#cn-a" width="30" height="20" transform="rotate(-98.1 198 -82)scale(25.6)"/>
  <use xlink:href="#cn-a" width="30" height="20" transform="rotate(-74 272.4 -114)scale(25.6137)"/>
  <use xlink:href="#cn-a" width="30" height="20" transform="matrix(16 -19.968 19.968 16 256 230.4)"/>
</svg>`;

export const flagKrXml = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="flag-icons-kr" viewBox="0 0 512 512">
  <path fill="#fff" fill-rule="evenodd" d="M0 0h512v512H0Z"/>
  <g fill-rule="evenodd" transform="rotate(-56.3 367.2 -111.2)scale(9.375)">
    <g id="kr-b">
      <path id="kr-a" fill="#000001" d="M-6-26H6v2H-6Zm0 3H6v2H-6Zm0 3H6v2H-6Z"/>
      <use xlink:href="#kr-a" width="100%" height="100%" y="44"/>
    </g>
    <path stroke="#fff" d="M0 17v10"/>
    <path fill="#cd2e3a" d="M0-12a12 12 0 0 1 0 24Z"/>
    <path fill="#0047a0" d="M0-12a12 12 0 0 0 0 24A6 6 0 0 0 0 0Z"/>
    <circle cy="-6" r="6" fill="#cd2e3a"/>
  </g>
  <g fill-rule="evenodd" transform="rotate(-123.7 196.5 59.5)scale(9.375)">
    <use xlink:href="#kr-b" width="100%" height="100%"/>
    <path stroke="#fff" d="M0-23.5v3M0 17v3.5m0 3v3"/>
  </g>
</svg>`;

export const flagNgXml = `<svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-ng" viewBox="0 0 512 512">
  <g fill-rule="evenodd" stroke-width="1pt">
    <path fill="#fff" d="M0 0h512v512H0z"/>
    <path fill="#008753" d="M341.3 0H512v512H341.3zM0 0h170.7v512H0z"/>
  </g>
</svg>`;

export const flagZaXml = `<svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-za" viewBox="0 0 512 512">
  <defs>
    <clipPath id="za-a">
      <path fill-opacity=".7" d="M70.1 0h499.6v499.6H70.1z"/>
    </clipPath>
  </defs>
  <g clip-path="url(#za-a)" transform="translate(-71.9)scale(1.0248)">
    <g fill-rule="evenodd" stroke-width="1pt">
      <path fill="#000001" d="M0 397.9v-296l220.4 147.9z"/>
      <path fill="#000c8a" d="m150.4 499.7 247.4-166.5h351.6v166.5z"/>
      <path fill="#e1392d" d="M134.5 0h615v166.6H397.7S137.8-1.6 134.5 0"/>
      <path fill="#ffb915" d="M0 62.5v39.3l220.4 148L0 397.8v39.4l277.6-187.4z"/>
      <path fill="#007847" d="M0 62.5V0h92.6l294 199h362.8v101.7H386.6l-294 198.9H0v-62.4l277.6-187.4z"/>
      <path fill="#fff" d="M92.6 0h57.8l247.4 166.6h351.6V199H386.6zm0 499.7h57.8l247.4-166.5h351.6v-32.4H386.6z"/>
    </g>
  </g>
</svg>`;

export const flagPhXml = `<svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-ph" viewBox="0 0 512 512">
  <path fill="#0038a8" d="M0 0h512v256H0z"/>
  <path fill="#ce1126" d="M0 256h512v256H0z"/>
  <path fill="#fff" d="M443.4 256 0 512V0"/>
  <path fill="#fcd116" d="m25.2 44.4 15.4 13.3 17.9-9.8-8 18.7 15 14L45 78.9l-8.6 18.4-4.7-19.8-20.2-2.6L29 64.4zM372.1 229l.4 20.3 19.3 6.7-19.3 6.7-.4 20.3-12.3-16.2-19.5 6L352 256l-11.7-16.7 19.5 5.9zM36.5 414.7l8.6 18.4 20.3-1.7-14.8 14 7.9 18.7-17.9-9.8-15.4 13.3 3.9-20-17.5-10.5 20.2-2.6zM158.9 148l-6.6 6.6 3.2 50.3-3.3.3-6-45.9-5.5 5.4 8.2 41a51 51 0 0 0-18.4 7.7l-23.3-34.8h-7.7l28.2 36.8-2.5 2.1-33.3-38h-9.4v9.5l38 33.3-2.2 2.5-36.8-28.2v7.7l34.8 23.3a51 51 0 0 0-7.6 18.4l-41-8.2-5.5 5.5 46 6-.4 3.4-50.3-3.3-6.7 6.6 6.7 6.6 50.3-3.2.3 3.3-45.9 6 5.4 5.5 41-8.2a51 51 0 0 0 7.7 18.4l-34.8 23.3v7.7l36.8-28.2 2.1 2.5-38 33.3v9.4H92l33.3-38 2.5 2.2-28.2 36.8h7.7l23.3-34.8a51 51 0 0 0 18.4 7.6l-8.2 41 5.5 5.5 6-46 3.3.4-3.2 50.3 6.6 6.7 6.6-6.7-3.2-50.3 3.3-.3 6 45.9 5.5-5.4-8.2-41a51 51 0 0 0 18.4-7.7l23.3 34.8h7.7L190 296.6l2.5-2.1 33.3 38h9.4V323l-38-33.3 2.2-2.5 36.8 28.2v-7.7l-34.8-23.3A51 51 0 0 0 209 266l41 8.2 5.5-5.5-46-6 .4-3.3 50.3 3.2 6.7-6.6-6.7-6.6-50.3 3.3q0-1.8-.3-3.4l45.9-6-5.4-5.5-41 8.2a51 51 0 0 0-7.7-18.4l34.8-23.3v-7.7l-36.8 28.2-2.1-2.5 38-33.3v-9.4h-9.5l-33.3 38-2.5-2.2 28.2-36.8h-7.7l-23.3 34.8a51 51 0 0 0-18.4-7.6l8.2-41-5.5-5.5-6 46-3.3-.4 3.2-50.3z"/>
</svg>`;

export const flagIdXml = `<svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-id" viewBox="0 0 512 512">
  <path fill="#e70011" d="M0 0h512v256H0Z"/>
  <path fill="#fff" d="M0 256h512v256H0Z"/>
</svg>`;


/**
 * Ordered flag set + column layout, matching the mobile app's
 * CurrencyArt.FlagFlow (onboarding-1 "flags flowing across borders").
 */
export const FLAG_XMLS: string[] = [
  flagUsXml, flagGbXml, flagEuXml, flagInXml, flagAeXml, flagJpXml, flagSgXml,
  flagCaXml, flagAuXml, flagDeXml, flagFrXml, flagCnXml, flagKrXml, flagNgXml,
  flagZaXml, flagPhXml, flagIdXml,
];

/** Same column grouping the app uses: tight vertical trains of 3–4 flags. */
export const FLAG_COLUMNS: number[] = [4, 3, 4, 3, 3];

/** SVG string → inline data URI, safe for <img src>. */
export function flagDataUri(xml: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(xml)}`;
}
