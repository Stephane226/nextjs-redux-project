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

import styles from './mobileMenu.module.css';

interface SubmenuState {
  [key: string]: boolean;
}

const MobileMenu: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [submenu, setSubmenu] = useState<SubmenuState>({
    pakets: false,
  });

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const toggleSubmenu = (key: string) => {
    setSubmenu((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={styles.mobileHeader}>
      <Typography className={styles.menuHeader}>beije.</Typography>

      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <Box className={styles.menuDrawer} role="presentation">
          <Typography className={styles.menuTitle}>Ürünler</Typography>

          <List>

            <ListItem disablePadding>
              <ListItemButton onClick={() => toggleSubmenu('pakets')}>
                <ListItemText primary="Paketler" />
                {submenu.pakets ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>

            <Collapse in={submenu.pakets} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {[
                  'Popüler Paketler',
                  'Ped Paketleri',
                  'Günlük Ped Paketleri',
                  'Tampon Paketleri',
                  'Deneme Paketi',
                  'Özel Paketler',
                ].map((text, index) => (
                  <ListItem key={index} sx={{ pl: 4 }} disablePadding>
                    <ListItemButton>
                      <ListItemText
                        primary={
                          <Typography>
                            {text}
                            {text === 'Özel Paketler' && (
                              <span className={styles.badge}>Yeni</span>
                            )}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>

            <Divider sx={{ my: 1 }} />


            {[
              'beije Ped',
              'beije Günlük Ped',
              'beije Tampon',
              'beije Kap',
              'Isı Bandı',
              'beije Cycle Essentials',
            ].map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>


      <Box className={styles.rightIcons}>


        <IconButton className={styles.iconWrapper}>
          <Badge badgeContent={1} color="success">
            <ShoppingCartIcon sx={{ fontSize: 32 }} />
          </Badge>
        </IconButton>

        <IconButton className={styles.iconWrapper}>
          <PersonIcon sx={{ fontSize: 32 }} />
        </IconButton>

        <IconButton onClick={toggleDrawer} size="large">
          <MenuIcon />
        </IconButton>
      </Box>
    </div>
  );
};

export default MobileMenu;
