import {
  Dashboard as DashboardIcon,
  TableChart as TableChartIcon,
  TrendingUp as TrendingUpIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
} from "@mui/icons-material";

export interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
  exact?: boolean;
}

export const mainNavItems: NavItem[] = [
  {
    path: "/",
    label: "Dashboard",
    icon: DashboardIcon,
    exact: true,
  },
  {
    path: "/performance",
    label: "Performance",
    icon: TrendingUpIcon,
  },
  {
    path: "/holdings",
    label: "Holdings",
    icon: TableChartIcon,
  },
];

export const secondaryNavItems: NavItem[] = [
  {
    path: "/settings",
    label: "Settings",
    icon: SettingsIcon,
  },
  {
    path: "/help",
    label: "Help",
    icon: HelpIcon,
  },
];
