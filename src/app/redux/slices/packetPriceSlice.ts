import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//base url for fetchss..
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface VerifyPacketPriceResponse {
  success: boolean;
}

interface PacketPriceState {
  loading: boolean;
  error: string | null;
  success: boolean | null;
}

const initialState: PacketPriceState = {
  loading: false,
  error: null,
  success: null,
};

// Async thunk for verifying packet price ...
export const verifyPacketPrice = createAsyncThunk(
  'products/verifyPacketPrice',
  async (
    { packetData, token }: { packetData: { packet: { _id: string; count: number }[]; totalPrice: number }; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/verify-packet-price`,
        packetData,
        {
          headers: {
            'x-auth-token': token,  
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);


const packetPriceSlice = createSlice({
  name: 'packetPrice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyPacketPrice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPacketPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
      })
      .addCase(verifyPacketPrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; 
      });
  },
});

export default packetPriceSlice.reducer;
