import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProductType } from '../Interfaces/Products';
import { PacketType } from '../Interfaces/Packets';

//base url for fetchss..
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getProducts = createAsyncThunk('products/getProducts', async () => {

  const res = await axios.get(`${API_BASE_URL}/packets-and-products`);
  return res.data.data
});

interface ProductState {
  products: {
    products: ProductType[];  
    packets: PacketType[];    
  };
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: {
    products: [],
    packets: []
  },
  loading: false,
  error: null,
};
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        console.log(action.payload )
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Bilinmeyen bir hata oluştu';
      });
  },
});

export default productSlice.reducer;
