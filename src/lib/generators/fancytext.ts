export interface StyledText {
  styleName: string;
  text: string;
}

// Unicode offsets and lookup tables for styled characters
const CHAR_MAPS: Record<string, {
  A: number; a: number; digits?: Record<string, string>;
  customMap?: Record<string, string>;
}> = {
  doubleStruck: {
    A: 0x1D538, // 𝔸
    a: 0x1D552, // 𝕒
    digits: {
      "0": "𝟘", "1": "𝟙", "2": "𝟚", "3": "𝟛", "4": "𝟜",
      "5": "𝟝", "6": "𝟞", "7": "𝟟", "8": "𝟠", "9": "𝟡"
    }
  },
  boldSans: {
    A: 0x1D5EA, // 𝗔
    a: 0x1D604, // 𝗮
    digits: {
      "0": "𝟬", "1": "𝟭", "2": "𝟮", "3": "𝟯", "4": "𝟰",
      "5": "𝟱", "6": "𝟲", "7": "𝟳", "8": "𝟴", "9": "𝟵"
    }
  },
  italicSans: {
    A: 0x1D622, // 𝘈
    a: 0x1D63C, // 𝘢
  },
  boldItalicSans: {
    A: 0x1D65A, // 𝘼
    a: 0x1D674, // 𝙖
  },
  script: {
    A: 0x1D49C, // 𝒜
    a: 0x1D4B6, // 𝒶
  },
  scriptBold: {
    A: 0x1D4D0, // 𝓐
    a: 0x1D4EA, // 𝓪
  },
  gothic: {
    A: 0x1D504, // 𝔄
    a: 0x1D51E, // 𝔞
  },
  gothicBold: {
    A: 0x1D538, // 𝕬
    a: 0x1D552, // 𝖇
  },
  monospace: {
    A: 0x1D670, // 𝙰
    a: 0x1D68A, // 𝚊
    digits: {
      "0": "𝟶", "1": "𝟷", "2": "𝟸", "3": "𝟹", "4": "𝟺",
      "5": "𝟻", "6": "𝟼", "7": "𝟽", "8": "𝟾", "9": "𝟿"
    }
  }
};

// Custom glyph maps for styles that don't follow continuous ranges
const BUBBLE_OUTLINE_MAP = "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ";
const BUBBLE_FILLED_MAP  = "🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩"; // Filled A-Z and a-z mapping
const SQUARE_OUTLINE_MAP = "🄰🄱🄲展现🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉🄰🄱🄲展现🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉";

// Simple mapping helper
function translateString(str: string, styleKey: string): string {
  const mapData = CHAR_MAPS[styleKey];
  if (!mapData) return str;

  let result = "";
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const code = str.charCodeAt(i);

    if (code >= 65 && code <= 90) {
      // Uppercase A-Z
      result += String.fromCodePoint(mapData.A + (code - 65));
    } else if (code >= 97 && code <= 122) {
      // Lowercase a-z
      result += String.fromCodePoint(mapData.a + (code - 97));
    } else if (mapData.digits && code >= 48 && code <= 57) {
      // Digits 0-9
      result += mapData.digits[char] || char;
    } else {
      result += char;
    }
  }

  return result;
}

// Custom map-based translators
function translateWithGlyphs(str: string, glyphString: string): string {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code >= 65 && code <= 90) {
      // Uppercase
      const index = code - 65;
      result += Array.from(glyphString)[index] || str[i];
    } else if (code >= 97 && code <= 122) {
      // Lowercase
      const index = 26 + (code - 97);
      result += Array.from(glyphString)[index] || str[i];
    } else if (code >= 48 && code <= 57) {
      // Map numbers to circled numbers if outline
      if (glyphString === BUBBLE_OUTLINE_MAP) {
        const numCircle = ["🄿", "①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨"]; // 0-9 circle mapping
        const digitIndex = code - 48;
        result += numCircle[digitIndex] || str[i];
      } else {
        result += str[i];
      }
    } else {
      result += str[i];
    }
  }
  return result;
}

export function generateFancyText(text: string): StyledText[] {
  const targetText = text.trim() || "Type style text";

  return [
    {
      styleName: "Serif Bold Italic 𝑩𝒐𝒍𝒅",
      text: translateString(targetText, "boldItalicSans") // Fallback
    },
    {
      styleName: "Mathematical Script 𝒜𝓈𝓉𝒽𝑒𝓉𝒾𝒸",
      text: translateString(targetText, "script")
    },
    {
      styleName: "Script Bold 𝓕𝓪𝓷𝓬𝔂",
      text: translateString(targetText, "scriptBold")
    },
    {
      styleName: "Double-Struck 𝔻𝕠𝕦𝕓𝕝𝕖",
      text: translateString(targetText, "doubleStruck")
    },
    {
      styleName: "Bold Sans 𝗕𝗼𝗹𝗱",
      text: translateString(targetText, "boldSans")
    },
    {
      styleName: "Italic Sans 𝘐𝘵𝘢𝘭𝘪𝘤",
      text: translateString(targetText, "italicSans")
    },
    {
      styleName: "Medieval Gothic 𝔊𝔬𝔱𝔥𝔦𝔠",
      text: translateString(targetText, "gothic")
    },
    {
      styleName: "Gothic Bold 𝕲𝖔𝖙𝖍𝖎𝖈",
      text: translateString(targetText, "gothicBold")
    },
    {
      styleName: "Bubble Outline ⒶⒺⓈⓉⒽⒺⓉⒾⒸ",
      text: translateWithGlyphs(targetText, BUBBLE_OUTLINE_MAP)
    },
    {
      styleName: "Bubble Filled 🅐🅔🅢🅣🅗🅔🅣🅘🅒",
      text: translateWithGlyphs(targetText, BUBBLE_FILLED_MAP)
    },
    {
      styleName: "Square Outline 🄰🄴🅂🅃🄷🄴🅃🄸🄲",
      text: translateWithGlyphs(targetText, SQUARE_OUTLINE_MAP)
    },
    {
      styleName: "Retro Monospace 𝙼𝚘𝚗𝚘",
      text: translateString(targetText, "monospace")
    },
    {
      styleName: "Strikethrough S̶t̶r̶i̶k̶e̶",
      text: targetText.split("").map(c => c + "\u0336").join("")
    },
    {
      styleName: "Underline U̲n̲d̲e̲r̲l̲i̲n̲e̲",
      text: targetText.split("").map(c => c + "\u0332").join("")
    },
    {
      styleName: "Reversed / Mirror ʇxǝʇ",
      text: targetText
        .split("")
        .reverse()
        .map(c => {
          const normal = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
          const reverse = "ɐqɔpǝɟƃɥıɾʞlɯuodbɹsʇnʌʍxʎzⱯᗺƆᗡƎℲ⅁HIᒋʞᒋ𝔗NᗡԀΌᴚS┴∩ΛMᙏ⅄Z0⇂ᄅƐㄣ59ㄥ86";
          const idx = normal.indexOf(c);
          return idx !== -1 ? reverse[idx] : c;
        })
        .join("")
    }
  ];
}
