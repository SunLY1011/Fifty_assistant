import { createStore } from "vuex";

const STORAGE_KEY = "gojuuon_store_v1";
const APP_VERSION = "1.0.1";
const lines = ["a", "k", "s", "t", "n", "h", "m", "y", "r", "w", "-"];
const lineLengths = { a: 5, k: 5, s: 5, t: 5, n: 5, h: 5, m: 5, y: 3, r: 5, w: 3, "-": 1 };

function buildSelectedOnDefault() {
  const obj = { lines: lines.slice() };
  for (let l = 0; l < lines.length; l++) {
    const line = lines[l];
    obj[line] = {};
    for (let i = 0; i < lineLengths[line]; i++) obj[line][i] = false;
  }
  return obj;
}

function buildStudyRecordDefault() {
  const obj = { lines: lines.slice() };
  for (let l = 0; l < lines.length; l++) {
    const line = lines[l];
    obj[line] = {};
    for (let i = 0; i < lineLengths[line]; i++) obj[line][i] = { right: 0, wrong: 0, hesitate: 0 };
  }
  return obj;
}

function todayKey() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

const defaultState = {
  setting: { volume: 0.6, bgVolume: 0.6, zenBg: "../audio/鹿威.m4a", romanization: "hepburn-romanization", displayMode: "auto", from: "hiragana", to: "katakana" },
  selectedOn: buildSelectedOnDefault(),
  studyRecord: buildStudyRecordDefault(),
  wrongBook: [],
  dailyStats: {},
  appMeta: { version: APP_VERSION, installDate: null, lastActive: null, totalSessions: 0, isFirstLaunch: true }
};

function loadFromStorage() {
  try {
    if (typeof localStorage === "undefined") return null;
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { console.warn("[store] load failed:", e); return null; }
}

function saveToStorage(state) {
  try {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      setting: state.setting, selectedOn: state.selectedOn,
      studyRecord: state.studyRecord, wrongBook: state.wrongBook,
      dailyStats: state.dailyStats, appMeta: state.appMeta
    }));
  } catch (e) { console.warn("[store] save failed:", e); }
}

function mergeDeep(target, source) {
  if (!source || typeof source !== "object") return target;
  const keys = Object.keys(source);
  for (let k = 0; k < keys.length; k++) {
    const key = keys[k];
    if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
      if (!target[key] || typeof target[key] !== "object") target[key] = {};
      mergeDeep(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

const persisted = loadFromStorage();
const initialState = JSON.parse(JSON.stringify(defaultState));
if (persisted) {
  mergeDeep(initialState, persisted);
  if (initialState.appMeta) initialState.appMeta.isFirstLaunch = false;
} else {
  if (typeof localStorage !== "undefined") {
    const ls = localStorage.getItem("setting");
    const sl = localStorage.getItem("selectedOn");
    const sr = localStorage.getItem("studyRecord");
    if (ls) {
      try {
        mergeDeep(initialState.setting, JSON.parse(ls));
      } catch (e) {
        /* ignore parse error */
      }
    }
    if (sl) {
      try {
        mergeDeep(initialState.selectedOn, JSON.parse(sl));
      } catch (e) {
        /* ignore parse error */
      }
    }
    if (sr) {
      try {
        mergeDeep(initialState.studyRecord, JSON.parse(sr));
      } catch (e) {
        /* ignore parse error */
      }
    }
  }
  if (!initialState.appMeta.installDate) initialState.appMeta.installDate = todayKey();
}
initialState.appMeta.lastActive = todayKey();
initialState.appMeta.version = APP_VERSION;

export default createStore({
  state: initialState,
  mutations: {
    UPDATE_SETTING(state, payload) {
      if (payload) Object.keys(payload).forEach(k => state.setting[k] = payload[k]);
    },
    SET_SELECTED(state, { line, index, value }) {
      if (state.selectedOn[line]) state.selectedOn[line][index] = !!value;
    },
    TOGGLE_SELECTED(state, { line, index }) {
      if (state.selectedOn[line]) state.selectedOn[line][index] = !state.selectedOn[line][index];
    },
    SET_LINE_ALL(state, { line, value }) {
      if (state.selectedOn[line]) for (let i = 0; i < lineLengths[line]; i++) state.selectedOn[line][i] = !!value;
    },
    RECORD_ANSWER(state, { line, index, result }) {
      if (state.studyRecord[line] && state.studyRecord[line][index]) {
        const rec = state.studyRecord[line][index];
        if (result === "right") rec.right++;
        else if (result === "wrong") rec.wrong++;
        else if (result === "hesitate") rec.hesitate++;
        const charKey = line + ":" + index;
        const total = rec.right + rec.wrong;
        const wr = total > 0 ? rec.wrong / total : 0;
        if (wr >= 0.3 || rec.wrong >= 3) { if (!state.wrongBook.includes(charKey)) state.wrongBook.push(charKey); }
        else if (wr < 0.1 && rec.right >= 5) { const i = state.wrongBook.indexOf(charKey); if (i !== -1) state.wrongBook.splice(i, 1); }
      }
      const key = todayKey();
      if (!state.dailyStats[key]) state.dailyStats[key] = { right: 0, wrong: 0, hesitate: 0, sessionCount: 0 };
      if (result === "right") state.dailyStats[key].right++;
      else if (result === "wrong") state.dailyStats[key].wrong++;
      else if (result === "hesitate") state.dailyStats[key].hesitate++;
    },
    INCREMENT_SESSION(state) {
      state.appMeta.totalSessions = (state.appMeta.totalSessions || 0) + 1;
      const key = todayKey();
      if (!state.dailyStats[key]) state.dailyStats[key] = { right: 0, wrong: 0, hesitate: 0, sessionCount: 0 };
      state.dailyStats[key].sessionCount++;
      state.appMeta.lastActive = key;
    },
    UPDATE_APP_META(state, payload) {
      if (payload) Object.keys(payload).forEach(k => state.appMeta[k] = payload[k]);
    },
    RESET_STUDY_RECORD(state) { state.studyRecord = buildStudyRecordDefault(); state.wrongBook = []; },
    RESET_ALL(state) {
      const fresh = JSON.parse(JSON.stringify(defaultState));
      fresh.appMeta.installDate = todayKey();
      fresh.appMeta.lastActive = todayKey();
      fresh.appMeta.isFirstLaunch = false;
      Object.keys(fresh).forEach(k => state[k] = fresh[k]);
    }
  },
  actions: {
    saveSetting({ commit, state }, p) { commit("UPDATE_SETTING", p); saveToStorage(state); },
    toggleSelected({ commit, state }, p) { commit("TOGGLE_SELECTED", p); saveToStorage(state); },
    setSelected({ commit, state }, p) { commit("SET_SELECTED", p); saveToStorage(state); },
    setLineAll({ commit, state }, p) { commit("SET_LINE_ALL", p); saveToStorage(state); },
    recordAnswer({ commit, state }, p) { commit("RECORD_ANSWER", p); saveToStorage(state); },
    startSession({ commit, state }) { commit("INCREMENT_SESSION"); saveToStorage(state); },
    resetStudy({ commit, state }) { commit("RESET_STUDY_RECORD"); saveToStorage(state); },
    resetAll({ commit, state }) { commit("RESET_ALL"); saveToStorage(state); }
  },
  getters: {
    totalRight(state) { let t = 0; for (let l = 0; l < lines.length; l++) for (let i = 0; i < lineLengths[lines[l]]; i++) if (state.studyRecord[lines[l]]) t += state.studyRecord[lines[l]][i].right; return t; },
    totalWrong(state) { let t = 0; for (let l = 0; l < lines.length; l++) for (let i = 0; i < lineLengths[lines[l]]; i++) if (state.studyRecord[lines[l]]) t += state.studyRecord[lines[l]][i].wrong; return t; },
    accuracy(state, getters) { const r = getters.totalRight, w = getters.totalWrong, t = r + w; return t > 0 ? Math.round((r / t) * 100) : 0; },
    wrongBookCount(state) { return state.wrongBook.length; },
    todayStats(state) { return state.dailyStats[todayKey()] || { right: 0, wrong: 0, hesitate: 0, sessionCount: 0 }; },
    streakDays(state) {
      const keys = Object.keys(state.dailyStats).sort().reverse();
      let s = 0; const current = new Date(todayKey());
      for (let i = 0; i < keys.length; i++) {
        const exp = new Date(current); exp.setDate(current.getDate() - i);
        const ek = exp.getFullYear() + "-" + String(exp.getMonth() + 1).padStart(2, "0") + "-" + String(exp.getDate()).padStart(2, "0");
        if (keys.includes(ek) && state.dailyStats[ek].sessionCount > 0) s++; else if (i > 0) break;
      } return s;
    },
    daysSinceInstall(state) {
      if (!state.appMeta.installDate) return 0;
      return Math.max(0, Math.floor((new Date() - new Date(state.appMeta.installDate)) / 86400000));
    }
  }
});