// src/components/SideBar.tsx
import React from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Box,
    Avatar,
    Typography,
    Button,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import DevicesIcon from "@mui/icons-material/Devices";
import ImageIcon from "@mui/icons-material/Image";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ChatIcon from "@mui/icons-material/Chat";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const drawerWidth = 250;

const SideBar: React.FC<{ open?: boolean }> = ({ open = true }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
        await logout();
        navigate("/login");
        } catch (err) {
        console.error("Error al cerrar sesión:", err);
        }
    };

    const menuItems = [
        { text: "Usuarios", icon: <PeopleIcon />, path: "/user/list" },
        { text: "Dispositivos", icon: <DevicesIcon />, path: "/device/list" },
        { text: "Firmas", icon: <ImageIcon />, path: "/digitalSignature/list" },
        { text: "Preguntas", icon: <HelpOutlineIcon />, path: "/securityQuestion/list" },
        { text: "Respuestas", icon: <ChatIcon />, path: "/answer/list" },
    ];

    return (
        <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            padding: 2,
            },
        }}
        >
        {/* Header con info del usuario */}
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <Typography variant="h6" color="green" fontWeight="bold">
            Security - Verde
            </Typography>

            {user && (
            <Box
                mt={2}
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
            >
                <Avatar
                src={user.photoURL ?? "/favicon.ico"}
                alt="avatar"
                sx={{ width: 56, height: 56, mb: 1 }}
                />
                <Typography variant="subtitle1" fontWeight="medium">
                {user.displayName ?? "Usuario"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {user.email ?? ""}
                </Typography>
            </Box>
            )}
        </Box>

        <Divider />

        {/* Lista de navegación */}
        <List>
            {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
                </ListItemButton>
            </ListItem>
            ))}
        </List>

        <Box flexGrow={1} />

        {/* Botón de cerrar sesión */}
        <Box p={2}>
            <Button
            variant="outlined"
            color="error"
            fullWidth
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            >
            Cerrar sesión
            </Button>
        </Box>
        </Drawer>
    );
};

export default SideBar;
