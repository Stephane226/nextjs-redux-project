'use client';

import { Box, Typography, IconButton, Button, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react';
import MenuContent from '../menuExtended/menuContent';
import './header.css';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

import MobileMenu from './mobileMenu/MobileMenu';
const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const basketCount = useSelector((state: RootState) => state.basket.count);

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
    <div className="header-container wide-desktop">
       <div className="header-container none-mobile">
         <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      
        py={2}
        sx={{ backgroundColor: '#F7F6F5', position: 'relative' }}
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
        <IconButton className="">
          <Badge badgeContent={basketCount} color="success">
            <ShoppingCartIcon sx={{ fontSize: 28 }} />
          </Badge>
        </IconButton>

        <IconButton className="">
          <PersonIcon sx={{ fontSize: 28 }} />
        </IconButton>


        </Box>
      </Box>
 </div>
      {/* Dropdown (Desktop)   */}
      {  open &&(
        <Box
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          sx={{
            position: 'absolute',
            top: "50px",
            width: "100%",
            left: 0,
            backgroundColor: '#f7f6f5',
            boxShadow: "0 3px 5px rgba(0, 0, 0, 0.1)",
            borderRadius: 2,
            display: 'flex',
            gap: 2,
            zIndex: 10,
          }}
        >
          <MenuContent />
        </Box>
      )}

 
      <MobileMenu />




    </div>
  );
};

export default Header;
