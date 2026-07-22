import fs from "fs";
import path from "path";

export type NotificationData = {
  message: string;
  active: boolean;
};

const FILE_PATH = path.join(process.cwd(), "notification.json");

const DEFAULT: NotificationData = {
  message: "Summer of STEM registration is currently closed — check back soon for the next open window!",
  active: true,
};

function load(): NotificationData {
  try {
    if (!fs.existsSync(FILE_PATH)) {
      fs.writeFileSync(FILE_PATH, JSON.stringify(DEFAULT, null, 2), "utf-8");
      return { ...DEFAULT };
    }
    const raw = fs.readFileSync(FILE_PATH, "utf-8");
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT };
  }
}

function save(data: NotificationData) {
  try {
    const tmp = FILE_PATH + ".tmp";
    fs.writeFileSync(tmp, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tmp, FILE_PATH);
  } catch (err) {
    console.error("Failed to save notification.json:", err);
  }
}

export function getNotification(): NotificationData {
  return load();
}

export function setNotification(data: Partial<NotificationData>): NotificationData {
  const current = load();
  const updated = { ...current, ...data };
  save(updated);
  return updated;
}
