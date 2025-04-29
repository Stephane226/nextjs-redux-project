'use client';

import React, { useState } from 'react';
import {
  Box, Button, Card, CardContent, Typography, Stack, IconButton,
  Divider, Tabs, Tab, Collapse
} from '@mui/material';
import { Add, Remove, Delete, ExpandLess, ExpandMore } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { verifyPacketPrice } from '../../redux/slices/packetPriceSlice';
import { SubProduct } from '../../redux/Interfaces/Products';
import styles from './packetCreationPage.module.css';
import FavoriteIcon from '@mui/icons-material/Favorite';

type SelectedProduct = {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  category: string; 
};

const PacketCreationPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [tabValue, setTabValue] = useState(0);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [cartCount, setCartCount] = useState(0);

  const { products } = useSelector((state: RootState) => state.products);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSectionToggle = (id: string) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleQuantityChange = (product: SubProduct, delta: number, category: string) => {
    setSelectedProducts(prev => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        const newQuantity = existing.quantity + delta;
        if (newQuantity <= 0) {
          return prev.filter(item => item._id !== product._id);
        }
        return prev.map(item => item._id === product._id ? { ...item, quantity: newQuantity } : item);
      } else if (delta > 0) {
        return [...prev, {
          _id: product._id,
          name: product.name,
          quantity: delta,
          price: product.price,
          category: category, 
        }];
      }
      return prev;
    });
  };

  const totalPrice = selectedProducts.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const handleVerifyAndAddToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Token bulunamadı. Lütfen tekrar giriş yapın.');
      return;
    }

    const packetData = {
      packet: selectedProducts.map(p => ({ _id: p._id, count: p.quantity })),
      totalPrice: totalPrice,
    };

    try {
      const response = await dispatch(verifyPacketPrice({ packetData, token }));

      if (response.meta.requestStatus === 'fulfilled') {
        setSelectedProducts([]);
        setCartCount(prev => prev + 1);
      } else {
        alert('Fiyat doğrulama başarısız oldu.');
      }
    } catch (error) {
      console.error('Error verifying packet:', error);
    }
  };

  const menstrualProducts = products.products.filter(p => p.type === 'Menstrual');
  const otherProducts = products.products.filter(p => p.type === 'Other');
  const currentProducts = tabValue === 0 ? menstrualProducts : otherProducts;

  return (
    <div className="wide-desktop">
      <Box className={styles.layout}>
        {/* Sol Panel */}
        <Box className={styles.leftPanel}>
          <Box className={styles.header}>
            <h1 className={styles.packHead}>Kendi Paketini Oluştur</h1>
            <span  className={styles.howWork}>
              Nasıl Çalışır?
            </span>
          </Box>

          <p className={styles.pText}>
            Tercih ve ihtiyaçların doğrultusunda seçeceğin ürünlerden ve miktarlardan, sana özel bir paket oluşturalım.
          </p>

          {/* Tabs */}
          <Card sx={{ mb: 2 }} className={styles.lgBlock}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              centered
              TabIndicatorProps={{
                style: { backgroundColor: 'black' },
              }}
              textColor="inherit"
            >
              <Tab
                label="Menstrual Ürünler"
                sx={{
                  color: 'black',
                  '&.Mui-selected': { color: 'black' },
                }}
              />
              <Tab
                label="Destekleyici Ürünler"
                sx={{
                  color: 'black',
                  '&.Mui-selected': { color: 'black' },
                }}
              />
            </Tabs>

            <CardContent sx={{ padding:"0px !important"}}>
              <Stack spacing={2} mt={2}>
                {currentProducts.map((product) => (
                  <Box key={product._id} className={styles.collapsBlock}>
                    <Box
                      className={styles.productToggle}
                      onClick={() => handleSectionToggle(product._id)}
                    >
                      <Typography fontWeight="bold">{product.title}</Typography>
                      {openSections[product._id] ? <ExpandLess sx={{fontSize:"40px"}} /> : <ExpandMore sx={{fontSize:"40px"}} />}
                    </Box>

                    {/* Alt Ürünler */}
                    <Collapse in={openSections[product._id]}>
                      <Card className={styles.tipCard}>
                        <FavoriteIcon sx={{ color: '#B9D54D', marginRight: "10px", fontSize: "32px" }} />
                        <span className={styles.tipText}>
                          Döngüleri yoğun geçen kullanıcıların X’i günde 3 adet standart ped tercih ediyor.
                        </span>
                      </Card>

                      {product.subProducts?.map((subProduct) => (
                        <Box key={subProduct._id} className={styles.subProduct}>
                          <Typography>{subProduct.name}</Typography>
                          <Box display="flex" alignItems="center" className={styles.addRemoverBox}>
                            <IconButton onClick={(e) => { e.stopPropagation(); handleQuantityChange(subProduct, -1, product.title); }}>
                              <Remove />
                            </IconButton>
                            <Typography>
                              {selectedProducts.find(p => p._id === subProduct._id)?.quantity || 0}
                            </Typography>
                            <IconButton onClick={(e) => { e.stopPropagation(); handleQuantityChange(subProduct, 1, product.title); }}>
                              <Add />
                            </IconButton>
                          </Box>
                        </Box>
                      ))}
                    </Collapse>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Box>

        {/* Sağ Panel */}
        <div className={styles.rightPanel}>
          <Box className={styles.rightPanelCnt}>
            <div className={styles.rightPanelCntHead}> 
            <Typography variant="h5" className={styles.packageTitle}>Paketin</Typography>
            <span>  ● 2 Ayda bir gönderim </span>
            </div>

            <Typography variant="body2" className={styles.description}>
              Kişisel ihtiyacına yönelik istediğin miktarda ped, günlük ped, tampon veya destekleyici ürünler ekleyerek kendine özel paket oluşturabilirsin.
            </Typography>

            <div className={styles.CardContent}>
              <div>
                {selectedProducts.length === 0 ? (
                  <Typography>Henüz ürün seçilmedi.</Typography>
                ) : (
                  <div>
                    {Object.entries(
                      selectedProducts.reduce((acc, item) => {
                        if (!acc[item.category]) {
                          acc[item.category] = [];
                        }
                        acc[item.category].push(item);
                        return acc;
                      }, {} as { [key: string]: SelectedProduct[] })
                    ).map(([category, items]) => (
                      <Box key={category}  className={styles.cartCard}>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                          <Typography fontWeight="bold" fontSize="18px">{category}</Typography>
                          <IconButton
                            onClick={() => {
                              setSelectedProducts(prev => prev.filter(p => p.category !== category));
                            }}
                            size="small"
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>

                        <Stack spacing={1} mt={1}>
                          {items.map(subItem => (
                            <Box key={subItem._id} display="flex" alignItems="center" justifyContent="space-between">
                              <Box className={styles.flexdPrice}>
                                <Typography fontSize="14px">  {subItem.quantity } {subItem.name}</Typography>
                                <span  className={styles.priced}>
                                 {subItem.price}₺
                                </span>
                              </Box>
                            
                            </Box>
                          ))}
                        </Stack>
                      </Box>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Toplam price ... */}
            {selectedProducts.length > 0 && (
              <Box className={styles.totalSection}>
                <Divider sx={{ my: 2 }} />
                <Typography className={styles.totalPrice}>Toplam: {totalPrice}₺</Typography>
              </Box>
            )}

            {/* Sepete Ekle btm... */}
            <Button
  className={
    selectedProducts.length === 0
      ? styles.addToCartButtonDisabled
      : styles.addToCartButton
  }
  disabled={selectedProducts.length === 0}
  onClick={handleVerifyAndAddToCart}
>
  Sepete Ekle ({totalPrice}₺)
</Button>
          </Box>
        </div>

      </Box>
    </div>
  );
};

export default PacketCreationPage;
