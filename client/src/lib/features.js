import moment from "moment";

const fileFormat = (url = "") => {
  const fileExt = url.split(".").pop();

  if (fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg")
    return "video";

  if (fileExt === "mp3" || fileExt === "wav") return "audio";
  if (
    fileExt === "png" ||
    fileExt === "jpg" ||
    fileExt === "jpeg" ||
    fileExt === "gif"
  )
    return "image";

  return "file";
};

const transformImage = (url = "", width = 100) => {
  const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);

  return newUrl;
};

const getLast7Days = () => {
  const currentDate = moment();

  const last7Days = [];

  for (let i = 0; i < 7; i++) {
    const dayDate = currentDate.clone().subtract(i, "days");
    const dayName = dayDate.format("dddd");

    last7Days.unshift(dayName);
  }

  return last7Days;
};

const getOrSaveFromStorage = ({ key, value, get }) => {
  if (get) {
    const item = localStorage.getItem(key);
    if (!item || item === "undefined") return null;

    try {
      return JSON.parse(item);
    } catch (e) {
      console.error(`Invalid JSON for key: ${key}`, e);
      return null;
    }
  } else {
    if (value !== undefined) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      console.warn(`Attempted to store undefined for key: ${key}`);
    }
  }
};


export { fileFormat, transformImage, getLast7Days , getOrSaveFromStorage};
