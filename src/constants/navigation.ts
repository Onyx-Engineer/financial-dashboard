import {
  Dashboard as DashboardIcon,
  TableChart as TableChartIcon,
  TrendingUp as TrendingUpIcon,
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
