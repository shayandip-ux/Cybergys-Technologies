export const DASHBOARD_ACTIVITY_STORAGE_KEY = "bestpicks-admin-activities-v1";
export const DASHBOARD_ACTIVITY_EVENT = "bestpicks-admin-activities-updated";

export const initialDashboardActivities = [
  { id: "act-1", title: "Provider profile submitted", detail: "Pinewood Protect", date: "Oct 15, 2026", time: "2:14 PM", tone: "rose" },
  { id: "act-2", title: "Category updated", detail: "Health insurance", date: "Oct 15, 2026", time: "10:32 AM", tone: "rose" },
  { id: "act-3", title: "Lead export completed", detail: "128 leads · CSV", date: "Oct 14, 2026", time: "5:18 PM", tone: "green" },
  { id: "act-4", title: "Provider approved", detail: "Harborline Financial", date: "Oct 14, 2026", time: "11:03 AM", tone: "violet" },
  { id: "act-5", title: "New provider application", detail: "Clearwater Coverage", date: "Oct 12, 2026", time: "9:18 AM", tone: "blue" },
  { id: "act-6", title: "Category paused", detail: "Pet insurance", date: "Oct 10, 2026", time: "4:05 PM", tone: "amber" },
];

export function readDashboardActivities() {
  try {
    const storedActivities = window.localStorage.getItem(DASHBOARD_ACTIVITY_STORAGE_KEY);
    if (!storedActivities) return initialDashboardActivities;

    const activities = JSON.parse(storedActivities);
    return Array.isArray(activities) ? activities : initialDashboardActivities;
  } catch {
    return initialDashboardActivities;
  }
}
