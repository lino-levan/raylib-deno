import {
  getCurrentMonitor,
  getMonitorCount,
  getMonitorName,
  getMonitorPosition,
} from "raylib";

console.log("Monitor count:", getMonitorCount());

const monitor = getCurrentMonitor();
console.log("Current monitor:", monitor);
console.log("Current monitor name:", getMonitorName(monitor));
console.log(getMonitorPosition(monitor));
