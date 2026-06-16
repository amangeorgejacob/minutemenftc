import fs from "fs";
import path from "path";

export type VisibilityMap = Record<string, boolean>;

const FILE_PATH = path.join(process.cwd(), "visibility.json");

const DEFAULT_VISIBILITY: VisibilityMap = {
  sponsors: true,
  community: true,
  faq: true,
  portfolio: true,
  social: true,
  summerOfStem: true,
  ourMentors: true,
};

/**
 * Safely load visibility data from disk
 */
function load(): VisibilityMap {
  try {
    console.log("Loading visibility.json...");

    // Create file if missing
    if (!fs.existsSync(FILE_PATH)) {
      console.log("visibility.json not found. Creating default file...");

      fs.writeFileSync(
        FILE_PATH,
        JSON.stringify(DEFAULT_VISIBILITY, null, 2),
        "utf-8"
      );

      return { ...DEFAULT_VISIBILITY };
    }

    const raw = fs.readFileSync(FILE_PATH, "utf-8");

    console.log("visibility.json content:", raw);

    const parsed = JSON.parse(raw);

    // Merge with defaults to avoid missing keys
    return {
      ...DEFAULT_VISIBILITY,
      ...parsed,
    };
  } catch (err) {
    console.error("Failed to load visibility.json:", err);

    return { ...DEFAULT_VISIBILITY };
  }
}

/**
 * Atomic save to avoid corruption
 */
function save(data: VisibilityMap) {
  try {
    const tempPath = FILE_PATH + ".tmp";

    fs.writeFileSync(
      tempPath,
      JSON.stringify(data, null, 2),
      "utf-8"
    );

    fs.renameSync(tempPath, FILE_PATH);

    console.log("Saved visibility.json:", data);
  } catch (err) {
    console.error("Failed to save visibility.json:", err);
  }
}

/**
 * In-memory cache
 */
let cache: VisibilityMap = load();

/**
 * Always refresh from disk before returning
 */
export function getVisibility(): VisibilityMap {
  cache = load();

  return { ...cache };
}

/**
 * Update visibility setting
 */
export function setVisibility(
  sectionId: string,
  visible: boolean
): VisibilityMap {
  console.log(
    `Updating visibility: ${sectionId} -> ${visible}`
  );

  // Reload latest data before modifying
  cache = load();

  cache[sectionId] = visible;

  save(cache);

  return { ...cache };
}