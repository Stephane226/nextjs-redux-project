'use client';

import React, { useState } from 'react';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Box,
  Typography,
  Divider,
  Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import styles from './mobileMenu.module.css';
import Link from 'next/link';


interface SubmenuState {
  [key: string]: boolean;
}

const MobileMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [submenu, setSubmenu] = useState<SubmenuState>({
    products: false,
    packets: false,
  });

  const { products, loading, error } = useSelector((state: RootState) => state.products);

  const toggleDrawer = () => setOpen(!open);
  const toggleSubmenu = (key: string) => setSubmenu(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className={styles.mobileHeader}>
      <span className={styles.menuHeader}>beije.</span>

      <Drawer
        anchor="top"
        open={open}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            mt: '64px',
            minHeight: 'calc(50% - 74px)',

          },
        }}
      >
        <Box className={styles.menuDrawer} role="presentation">
          <List>
            {/* Menstrual Products */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => toggleSubmenu('products')}>
                <ListItemText primary="Ürünler" />
                {submenu.products ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>

            <Collapse in={submenu.products} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {!loading && !error && products.products.map((product) => (
                  <ListItem key={product._id} sx={{ pl: 4 }} disablePadding>
                    <ListItemButton>
                      <ListItemText primary={product.title} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>

            {/* Packets */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => toggleSubmenu('packets')}>
                <ListItemText primary="Paketler" />
                {submenu.packets ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>

            <Collapse in={submenu.packets} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {!loading && !error && products.packets.map((packet) => (
                  <ListItem key={packet._id} sx={{ pl: 4 }} disablePadding>
                    <ListItemButton>
                      <ListItemText primary={packet.title} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>

            <Divider sx={{ my: 1 }} />

            {/* Static Links */}
            {[
              'Biz Kimiz?',
              'Bağış Kültürü',
              'Regl Testi!',
              'Kendi Paketini Oluştur',
            ].map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Link href="/verify-price" passHref>
            <span className={styles.customizebtn}>
              Kendi ürünlerini özelleştir
            </span>
          </Link>

        </Box>
      </Drawer>

      {/* Icons */}
      <Box className={styles.rightIcons}>
        <IconButton className={styles.iconWrapper}>
          <Badge badgeContent={1} color="success">
            <ShoppingCartIcon sx={{ fontSize: 28 }} />
          </Badge>
        </IconButton>

        <IconButton className={styles.iconWrapper}>
          <PersonIcon sx={{ fontSize: 28 }} />
        </IconButton>

        <IconButton onClick={toggleDrawer}>
          <MenuIcon sx={{ fontSize: 32 }} />
        </IconButton>
      </Box>
    </div>
  );
};

export default MobileMenu;
