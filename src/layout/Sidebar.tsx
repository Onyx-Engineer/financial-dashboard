import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { mainNavItems } from "../constants/navigation";
import type { NavItem } from "../constants/navigation";

interface SidebarProps {
  mobileOpen: boolean;
  onMobileToggle: () => void;
}

const DRAWER_WIDTH = 240;

const Sidebar = ({ mobileOpen, onMobileToggle }: SidebarProps) => {
  const location = useLocation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [isCollapsed, setIsCollapsed] = useState(false);

  const drawerWidth = isCollapsed && isDesktop ? 72 : DRAWER_WIDTH;

  const handleDrawerToggle = () => {
    if (isDesktop) {
      setIsCollapsed(!isCollapsed);
    } else {
      onMobileToggle();
    }
  };

  const renderNavItems = (items: NavItem[]) => {
    return items.map((item) => {
      const isActive = item.exact
        ? location.pathname === item.path
        : location.pathname.startsWith(item.path);

      return (
        <ListItem key={item.path} disablePadding>
          <ListItemButton
            component={Link}
            to={item.path}
            selected={isActive}
            sx={{
              minHeight: 48,
              justifyContent: isCollapsed && isDesktop ? "center" : "initial",
              px: 2.5,
              "&.Mui-selected": {
                backgroundColor: "primary.50",
                borderRight: "3px solid",
                borderColor: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.100",
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isCollapsed && isDesktop ? 0 : 2,
                justifyContent: "center",
                color: isActive ? "primary.main" : "inherit",
              }}
            >
              <item.icon />
            </ListItemIcon>
            {(!isCollapsed || !isDesktop) && (
              <ListItemText
                primary={item.label}
                sx={{
                  opacity: 1,
                  color: isActive ? "primary.main" : "text.primary",
                  "& .MuiTypography-root": {
                    fontWeight: isActive ? 600 : 400,
                  },
                }}
              />
            )}
          </ListItemButton>
        </ListItem>
      );
    });
  };

  const drawer = (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isCollapsed && isDesktop ? "center" : "space-between",
          padding: theme.spacing(2),
        }}
      >
        {(!isCollapsed || !isDesktop) && (
          <Box
            component="img"
            sx={{
              height: 32,
              width: "auto",
            }}
            alt="Logo"
            src="/logo.svg"
          />
        )}
        <IconButton onClick={handleDrawerToggle}>
          {isCollapsed && isDesktop ? <MenuIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>
      <Divider />
      <List>{renderNavItems(mainNavItems)}</List>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      aria-label="main navigation"
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
            backgroundColor: "background.paper",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "background.paper",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
