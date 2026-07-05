// 名词解释（或曰翻译）：

// 假名
// Kana

// 音
// On

// 五十音
// Gojuuon

// 平假名
// Hiragana

// 片假名
// Katakana

// 平文式罗马字（赫本式罗马字） ヘボン式ローマ字
// Hepburn-romanization

// 训令式罗马字（文部省式罗马字） 訓令式ローマ字
// Kunrei-shiki-romanization

// 清音
// Seion

const seion = {
  lines: ["a", "k", "s", "t", "n", "h", "m", "y", "r", "w", "-"],
  hiragana: {
    a: ["あ", "い", "う", "え", "お"],
    k: ["か", "き", "く", "け", "こ"],
    s: ["さ", "し", "す", "せ", "そ"],
    t: ["た", "ち", "つ", "て", "と"],
    n: ["な", "に", "ぬ", "ね", "の"],
    h: ["は", "ひ", "ふ", "へ", "ほ"],
    m: ["ま", "み", "む", "め", "も"],
    y: ["や", "(い)", "ゆ", "(え)", "よ"],
    r: ["ら", "り", "る", "れ", "ろ"],
    w: ["わ", "(い)", "(う)", "(え)", "を"],
    "-": ["ん"],
  },
  katakana: {
    a: ["ア", "イ", "ウ", "エ", "オ"],
    k: ["カ", "キ", "ク", "ケ", "コ"],
    s: ["サ", "シ", "ス", "セ", "ソ"],
    t: ["タ", "チ", "ツ", "テ", "ト"],
    n: ["ナ", "ニ", "ヌ", "ネ", "ノ"],
    h: ["ハ", "ヒ", "フ", "ヘ", "ホ"],
    m: ["マ", "ミ", "ム", "メ", "モ"],
    y: ["ヤ", "(イ)", "ユ", "(エ)", "ヨ"],
    r: ["ラ", "リ", "ル", "レ", "ロ"],
    w: ["ワ", "(イ)", "(ウ)", "(エ)", "ヲ"],
    "-": ["ン"],
  },
  "hepburn-romanization": {
    a: ["a", "i", "u", "e", "o"],
    k: ["ka", "ki", "ku", "ke", "ko"],
    s: ["sa", "shi", "su", "se", "so"],
    t: ["ta", "chi", "tsu", "te", "to"],
    n: ["na", "ni", "nu", "ne", "no"],
    h: ["ha", "hi", "fu", "he", "ho"],
    m: ["ma", "mi", "mu", "me", "mo"],
    y: ["ya", "(i)", "yu", "(e)", "yo"],
    r: ["ra", "ri", "ru", "re", "ro"],
    w: ["wa", "(i)", "(u)", "(e)", "o"],
    "-": ["n"],
  },
  "kunrei-shiki-romanization": {
    a: ["a", "i", "u", "e", "o"],
    k: ["ka", "ki", "ku", "ke", "ko"],
    s: ["sa", "si", "su", "se", "so"],
    t: ["ta", "ti", "tu", "te", "to"],
    n: ["na", "ni", "nu", "ne", "no"],
    h: ["ha", "hi", "hu", "he", "ho"],
    m: ["ma", "mi", "mu", "me", "mo"],
    y: ["ya", "(i)", "yu", "(e)", "yo"],
    r: ["ra", "ri", "ru", "re", "ro"],
    w: ["wa", "(i)", "(u)", "(e)", "o"],
    "-": ["n"],
  },
};

// 浊音
// Dakuon

const dakuon = {
  lines: ["g", "z", "d", "b", "p"],
  hiragana: {
    g: ["が", "ぎ", "ぐ", "げ", "ご"],
    z: ["ざ", "じ", "ず", "ぜ", "ぞ"],
    d: ["だ", "ぢ", "づ", "で", "ど"],
    b: ["ば", "び", "ぶ", "べ", "ぼ"],
    p: ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ"],
  },
  katakana: {
    g: ["ガ", "ギ", "グ", "ゲ", "ゴ"],
    z: ["ザ", "ジ", "ズ", "ゼ", "ゾ"],
    d: ["ダ", "ヂ", "ヅ", "デ", "ド"],
    b: ["バ", "ビ", "ブ", "ベ", "ボ"],
    p: ["パ", "ピ", "プ", "ペ", "ポ"],
  },
  "hepburn-romanization": {
    g: ["ga", "gi", "gu", "ge", "go"],
    z: ["za", "ji", "zu", "ze", "zo"],
    d: ["da", "ji", "zu", "de", "do"],
    b: ["ba", "bi", "bu", "be", "bo"],
    p: ["pa", "pi", "pu", "pe", "po"],
  },
  "kunrei-shiki-romanization": {
    g: ["ga", "gi", "gu", "ge", "go"],
    z: ["za", "zi", "zu", "ze", "zo"],
    d: ["da", "zi", "zu", "de", "do"],
    b: ["ba", "bi", "bu", "be", "bo"],
    p: ["pa", "pi", "pu", "pe", "po"],
  },
};

// 拗音
// Youon
const youon = {
  lines: ["k", "s", "t", "n", "h", "m", "r", "g", "z", "b", "p"],
  hiragana: {
    k: ["きゃ", "きゅ", "きょ"],
    s: ["しゃ", "しゅ", "しょ"],
    t: ["ちゃ", "ちゅ", "ちょ"],
    n: ["にゃ", "にゅ", "にょ"],
    h: ["ひゃ", "ひゅ", "ひょ"],
    m: ["みゃ", "みゅ", "みょ"],
    r: ["りゃ", "りゅ", "りょ"],
    g: ["ぎゃ", "ぎゅ", "ぎょ"],
    z: ["じゃ", "じゅ", "じょ"],
    b: ["びゃ", "びゅ", "びょ"],
    p: ["ぴゃ", "ぴゅ", "ぴょ"],
  },
  katakana: {
    k: ["キャ", "キュ", "キョ"],
    s: ["シャ", "シュ", "ショ"],
    t: ["チャ", "チュ", "チョ"],
    n: ["ニャ", "ニュ", "ニョ"],
    h: ["ヒャ", "ヒュ", "ヒョ"],
    m: ["ミャ", "ミュ", "ミョ"],
    r: ["リャ", "リュ", "リョ"],
    g: ["ギャ", "ギュ", "ギョ"],
    z: ["ジャ", "ジュ", "ジョ"],
    b: ["ビャ", "ビュ", "ビョ"],
    p: ["ピャ", "ピュ", "ピョ"],
  },
  "hepburn-romanization": {
    k: ["kya", "kyu", "kyo"],
    s: ["sha", "shu", "sho"],
    t: ["cha", "chu", "cho"],
    n: ["nya", "nyu", "nyo"],
    h: ["hya", "hyu", "hyo"],
    m: ["mya", "myu", "myo"],
    r: ["rya", "ryu", "ryo"],
    g: ["gya", "gyu", "gyo"],
    z: ["ja", "ju", "jo"],
    b: ["bya", "byu", "byo"],
    p: ["pya", "pyu", "pyo"],
  },
  "kunrei-shiki-romanization": {
    k: ["kya", "kyu", "kyo"],
    s: ["sya", "syu", "syo"],
    t: ["tya", "tyu", "tyo"],
    n: ["nya", "nyu", "nyo"],
    h: ["hya", "hyu", "hyo"],
    m: ["mya", "myu", "myo"],
    r: ["rya", "ryu", "ryo"],
    g: ["gya", "gyu", "gyo"],
    z: ["zya", "zyu", "zyo"],
    b: ["bya", "byu", "byo"],
    p: ["pya", "pyu", "pyo"],
  },
};

// 五十音总括
const gojuuon = {
  seion: seion,
  dakuon: dakuon,
  youon: youon,
};

// 设置项
const settingDefault = {
  volume: 0.6,
  bgVolume: 0.6,
  zenBg: "../audio/鹿威.m4a",
  romanization: "hepburn-romanization",
  displayMode: "auto",
  from: "hiragana",
  to: "katakana",
};

var setting = settingDefault;

// 选择的五十音
const selectedOnDefault = {
  s: {
    lines: ["a", "k", "s", "t", "n", "h", "m", "y", "r", "w", "-"],
    a: {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
    },
    k: {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
    },
    s: {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
    },
    t: {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
    },
    n: {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
    },
    h: {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
    },
    m: {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
    },
    y: {
      0: false,
      // 1: false,
      2: false,
      // 3: false,
      4: false,
    },
    r: {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
    },
    w: {
      0: false,
      // 1: false,
      // 2: false,
      // 3: false,
      4: false,
    },
    "-": {
      0: false,
    },
  },
  d: {
    lines: ["g", "z", "d", "b", "p"],
    g: {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
    },
    z: {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
    },
    d: {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
    },
    b: {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
    },
    p: {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
    },
  },
  y: {
    lines: ["k", "s", "t", "n", "h", "m", "r", "g", "z", "b", "p"],
    k: {
      0: false,
      1: false,
      2: false,
    },
    s: {
      0: false,
      1: false,
      2: false,
    },
    t: {
      0: false,
      1: false,
      2: false,
    },
    n: {
      0: false,
      1: false,
      2: false,
    },
    h: {
      0: false,
      1: false,
      2: false,
    },
    m: {
      0: false,
      1: false,
      2: false,
    },
    r: {
      0: false,
      1: false,
      2: false,
    },
    g: {
      0: false,
      1: false,
      2: false,
    },
    z: {
      0: false,
      1: false,
      2: false,
    },
    b: {
      0: false,
      1: false,
      2: false,
    },
    p: {
      0: false,
      1: false,
      2: false,
    },
  },
};

var selectedOn = selectedOnDefault;

// 学习记录
const studyRecordDefault = {
  s: {
    lines: ["a", "k", "s", "t", "n", "h", "m", "y", "r", "w", "-"],
    a: {
      0: { right: 0, wrong: 0, hesitate: 0 },
      1: { right: 0, wrong: 0, hesitate: 0 },
      2: { right: 0, wrong: 0, hesitate: 0 },
      3: { right: 0, wrong: 0, hesitate: 0 },
      4: { right: 0, wrong: 0, hesitate: 0 },
    },
    k: {
      0: { right: 0, wrong: 0, hesitate: 0 },
      1: { right: 0, wrong: 0, hesitate: 0 },
      2: { right: 0, wrong: 0, hesitate: 0 },
      3: { right: 0, wrong: 0, hesitate: 0 },
      4: { right: 0, wrong: 0, hesitate: 0 },
    },
    s: {
      0: { right: 0, wrong: 0, hesitate: 0 },
      1: { right: 0, wrong: 0, hesitate: 0 },
      2: { right: 0, wrong: 0, hesitate: 0 },
      3: { right: 0, wrong: 0, hesitate: 0 },
      4: { right: 0, wrong: 0, hesitate: 0 },
    },
    t: {
      0: { right: 0, wrong: 0, hesitate: 0 },
      1: { right: 0, wrong: 0, hesitate: 0 },
      2: { right: 0, wrong: 0, hesitate: 0 },
      3: { right: 0, wrong: 0, hesitate: 0 },
      4: { right: 0, wrong: 0, hesitate: 0 },
    },
    n: {
      0: { right: 0, wrong: 0, hesitate: 0 },
      1: { right: 0, wrong: 0, hesitate: 0 },
      2: { right: 0, wrong: 0, hesitate: 0 },
      3: { right: 0, wrong: 0, hesitate: 0 },
      4: { right: 0, wrong: 0, hesitate: 0 },
    },
    h: {
      0: { right: 0, wrong: 0, hesitate: 0 },
      1: { right: 0, wrong: 0, hesitate: 0 },
      2: { right: 0, wrong: 0, hesitate: 0 },
      3: { right: 0, wrong: 0, hesitate: 0 },
      4: { right: 0, wrong: 0, hesitate: 0 },
    },
    m: {
      0: { right: 0, wrong: 0, hesitate: 0 },
      1: { right: 0, wrong: 0, hesitate: 0 },
      2: { right: 0, wrong: 0, hesitate: 0 },
      3: { right: 0, wrong: 0, hesitate: 0 },
      4: { right: 0, wrong: 0, hesitate: 0 },
    },
    y: {
      0: { right: 0, wrong: 0, hesitate: 0 },
      // 1: { right: 0, wrong: 0, hesitate: 0 },
      2: { right: 0, wrong: 0, hesitate: 0 },
      // 3: { right: 0, wrong: 0, hesitate: 0 },
      4: { right: 0, wrong: 0, hesitate: 0 },
    },
    r: {
      0: { right: 0, wrong: 0, hesitate: 0 },
      1: { right: 0, wrong: 0, hesitate: 0 },
      2: { right: 0, wrong: 0, hesitate: 0 },
      3: { right: 0, wrong: 0, hesitate: 0 },
      4: { right: 0, wrong: 0, hesitate: 0 },
    },
    w: {
      0: { right: 0, wrong: 0, hesitate: 0 },
      // 1: { right: 0, wrong: 0, hesitate: 0 },
      // 2: { right: 0, wrong: 0, hesitate: 0 },
      // 3: { right: 0, wrong: 0, hesitate: 0 },
      4: { right: 0, wrong: 0, hesitate: 0 },
    },
    "-": {
      0: { right: 0, wrong: 0, hesitate: 0 },
    },
  },
  d: {
    lines: ["g", "z", "d", "b", "p"],
    g: {
      0: { right: 0, wrong: 0, hesitate: 0 },
      1: { right: 0, wrong: 0, hesitate: 0 },
      2: { right: 0, wrong: 0, hesitate: 0 },
      3: { right: 0, wrong: 0, hesitate: 0 },
      4: { right: 0, wrong: 0, hesitate: 0 },
    },
    z: {
      0: { right: 0, wrong: 0, hesitate: 0 },
      1: { right: 0, wrong: 0, hesitate: 0 },
      2: { right: 0, wrong: 0, hesitate: 0 },
      3: { right: 0, wrong: 0, hesitate: 0 },
      4: { right: 0, wrong: 0, hesitate: 0 },
    },
    d: {
      0: { right: 0, wrong: 0, hesitate: 0 },
      1: { right: 0, wrong: 0, hesitate: 0 },
      2: { right: 0, wrong: 0, hesitate: 0 },
      3: { right: 0, wrong: 0, hesitate: 0 },
      4: { right: 0, wrong: 0, hesitate: 0 },
    },
    b: {
      0: { right: 0, wrong: 0, hesitate: 0 },
      1: { right: 0, wrong: 0, hesitate: 0 },
      2: { right: 0, wrong: 0, hesitate: 0 },
      3: { right: 0, wrong: 0, hesitate: 0 },
      4: { right: 0, wrong: 0, hesitate: 0 },
    },
    p: {
      0: { right: 0, wrong: 0, hesitate: 0 },
      1: { right: 0, wrong: 0, hesitate: 0 },
      2: { right: 0, wrong: 0, hesitate: 0 },
      3: { right: 0, wrong: 0, hesitate: 0 },
      4: { right: 0, wrong: 0, hesitate: 0 },
    },
  },
  y: {
    lines: ["k", "s", "t", "n", "h", "m", "r", "g", "z", "b", "p"],
    k: {
      0: { right: 0, wrong: 0, hesitate: 0 },
      1: { right: 0, wrong: 0, hesitate: 0 },
      2: { right: 0, wrong: 0, hesitate: 0 },
    },
    s: {
      0: { right: 0, wrong: 0, hesitate: 0 },
      1: { right: 0, wrong: 0, hesitate: 0 },
      2: { right: 0, wrong: 0, hesitate: 0 },
    },
    t: {
      0: { right: 0, wrong: 0, hesitate: 0 },
      1: { right: 0, wrong: 0, hesitate: 0 },
      2: { right: 0, wrong: 0, hesitate: 0 },
    },
    n: {
      0: { right: 0, wrong: 0, hesitate: 0 },
      1: { right: 0, wrong: 0, hesitate: 0 },
      2: { right: 0, wrong: 0, hesitate: 0 },
    },
    h: {
      0: { right: 0, wrong: 0, hesitate: 0 },
      1: { right: 0, wrong: 0, hesitate: 0 },
      2: { right: 0, wrong: 0, hesitate: 0 },
    },
    m: {
      0: { right: 0, wrong: 0, hesitate: 0 },
      1: { right: 0, wrong: 0, hesitate: 0 },
      2: { right: 0, wrong: 0, hesitate: 0 },
    },
    r: {
      0: { right: 0, wrong: 0, hesitate: 0 },
      1: { right: 0, wrong: 0, hesitate: 0 },
      2: { right: 0, wrong: 0, hesitate: 0 },
    },
    g: {
      0: { right: 0, wrong: 0, hesitate: 0 },
      1: { right: 0, wrong: 0, hesitate: 0 },
      2: { right: 0, wrong: 0, hesitate: 0 },
    },
    z: {
      0: { right: 0, wrong: 0, hesitate: 0 },
      1: { right: 0, wrong: 0, hesitate: 0 },
      2: { right: 0, wrong: 0, hesitate: 0 },
    },
    b: {
      0: { right: 0, wrong: 0, hesitate: 0 },
      1: { right: 0, wrong: 0, hesitate: 0 },
      2: { right: 0, wrong: 0, hesitate: 0 },
    },
    p: {
      0: { right: 0, wrong: 0, hesitate: 0 },
      1: { right: 0, wrong: 0, hesitate: 0 },
      2: { right: 0, wrong: 0, hesitate: 0 },
    },
  },
};

var studyRecord = studyRecordDefault;

// 版本信息，更新使用
const version = "1.0.1";
const globalVariableVersion = "1.0.1";

export default {
  gojuuon,
  seion,
  dakuon,
  youon,
  settingDefault,
  setting,
  selectedOnDefault,
  selectedOn,
  studyRecordDefault,
  studyRecord,
  version,
  globalVariableVersion,
};
