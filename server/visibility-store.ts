import fs from "fs";

export type VisibilityMap = Record<string, boolean>;

const FILE_PATH = "./visibility.json";

const DEFAULT_VISIBILITY: VisibilityMap = {
  youtube: true,
  sponsors: true,
  community: true,
  faq: true,
  portfolio: true,
  social: true,
  summerOfStem: true,
};

// Load existing file or create default
function load(): VisibilityMap {
  try {
    if (!fs.existsSync(FILE_PATH)) {
      fs.writeFileSync(FILE_PATH, JSON.stringify(DEFAULT_VISIBILITY, null, 2));
      return DEFAULT_VISIBILITY;
    }

    return JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
  } catch {
    return DEFAULT_VISIBILITY;
  }
}

// Save to disk
function save(data: VisibilityMap) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}

// in-memory cache (fast access)
let cache: VisibilityMap = load();

export function getVisibility() {
  return cache;
}

export function setVisibility(sectionId: string, visible: boolean) {
  cache[sectionId] = visible;
  save(cache);
}