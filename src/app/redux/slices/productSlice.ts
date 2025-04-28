import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProductType } from '../Interfaces/Products';
import { PacketType } from '../Interfaces/Packets';

export const getProducts = createAsyncThunk('products/getProducts', async () => {
  const res = await axios.get('https://96318a87-0588-4da5-9843-b3d7919f1782.mock.pstmn.io/packets-and-products');
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
