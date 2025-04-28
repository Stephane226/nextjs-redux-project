'use client';

import { Box, Typography } from "@mui/material";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import "./menuContent.css";

export default function MenuContent() {
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <Typography>Yükleniyor...</Typography>
      </Box>
    );
  }
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <Typography>Hata: {error}</Typography>
      </Box>
    );
  }



  return (
    <Box className="product-section wide-desktop">
      {/* products ...  */}
      <Box className="product-category">
        <Typography variant="h6" className="category-title">Menstrual Ürünler</Typography>
        <Box className="product-list">
          {products.products.map((product) => (
            <Box key={product._id} className="product-card">
              <img src={product.image} alt={product.title} className="product-image" loading="lazy" />
              <Typography className="product-title">{product.title}</Typography>
            </Box>
          ))}
        </Box>
      </Box>


      {/* Packets here... */}
      <Box className="product-category">
        <Box className="category-header">
          <Typography variant="h6" className="category-title">Paketler</Typography>
          <Typography className="view-all">Tüm Paketler →</Typography>
        </Box>
        <Box className="product-list">
          {products.packets.map((product) => (
            <Box key={product._id} className="packet-card">
              <img src={product.image} alt={product.title} className="product-image" loading="lazy" />
              <Typography className="product-title">{product.title}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

    </Box>
  );
}
