'use client';

import { Box, Typography, IconButton, Button, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react';
import MenuContent from '../menuExtended/menuContent';
import './header.css';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open: boolean) => () => {
    setMobileOpen(open);
  };

  const open = Boolean(anchorEl);

  return (
    <div className="header-container">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={4}
        py={2}
        sx={{ borderBottom: '1px solid #eee', backgroundColor: '#F7F6F5', position: 'relative' }}
      >
        {/* Logo */}
        <Typography variant="h6" color="orange" sx={{ fontWeight: 'bold' }}>
          beije.
        </Typography>

        {/* Desktop Navbar */}
        <Box className="desktop-navbar" display="flex" gap={4} alignItems="center">
          <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} sx={{ position: 'relative' }}>
            <Button sx={{ color: 'black', fontWeight: 'bold' }}>
              Tüm Ürünler
            </Button>
          </Box>
          <Button sx={{ color: 'black' }}>Biz Kimiz?</Button>
          <Button sx={{ color: 'black' }}>Bağış Kültürü</Button>
          <Button sx={{ color: 'black' }}>Regl Testi!</Button>
          <Button sx={{ color: 'black' }}>Kendi Paketini Oluştur</Button>
        </Box>

        {/* Mobile Navbar (Menu + Icons) */}
        <Box className="mobile-navbar" display="flex" alignItems="center" gap={2}>
          <IconButton>
            <ShoppingCartIcon />
          </IconButton>
          <IconButton>
            <PersonIcon />
          </IconButton>
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Dropdown (Desktop) */}
      {open && (
        <Box
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          sx={{
            position: 'absolute',
            top: "73px",
            width: "100%",
            left: 0,
            backgroundColor: 'white',
            boxShadow: 3,
            borderRadius: 2,
            display: 'flex',
            gap: 2,
            zIndex: 10,
          }}
        >
          <MenuContent />
        </Box>
      )}

      {/* Drawer (Mobile) */}
      <Drawer
        anchor="top"
        open={mobileOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: "100%", height: "auto" }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {['Tüm Ürünler', 'Biz Kimiz?', 'Bağış Kültürü', 'Regl Testi!', 'Kendi Paketini Oluştur'].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default Header;
