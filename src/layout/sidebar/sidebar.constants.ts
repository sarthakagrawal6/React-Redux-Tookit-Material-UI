import DASHBOARD_ICON from "assets/images/dashboard_icon.png";
import ROUTES from "routes/routes";
interface SidebarItem {
  id: string;
  title: string;
  imgURL: string;
  url: string;
}

export const SIDE_BAR_ITEMS: SidebarItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    imgURL: DASHBOARD_ICON,
    url: ROUTES.FEATURE_ROUTES.DASHBOARD,
  },

  {
    id: "categories",
    title: "Categories",
    imgURL: DASHBOARD_ICON,
    url: ROUTES.FEATURE_ROUTES.CATEGORIES,
  },
];
