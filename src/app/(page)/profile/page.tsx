'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/app/redux/store';
import { fetchProfile } from '@/app/redux/slices/authSlice';
import { Box, Typography, CircularProgress } from '@mui/material';

const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchProfile());
    console.log("profile")
    console.log(profile)
  }, [dispatch]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" textAlign="center" mt={5}>
        {error}
      </Typography>
    );
  }

  if (!profile) {
    return (
      <Typography textAlign="center" mt={5}>
        Kullanıcı bilgisi bulunamadı.
      </Typography>
    );
  }

  const { firstName, lastName, birthDate, email } = profile.data.profileInfo || {};

  return (
<Box
  maxWidth={480}
  mx="auto"
  mt={8}
  p={4}
  borderRadius={4}
  boxShadow="0px 4px 20px rgba(0,0,0,0.1)"
  bgcolor="#ffffff"
  sx={{
    transition: 'box-shadow 0.3s ease',
    '&:hover': {
      boxShadow: '0px 6px 30px rgba(0,0,0,0.15)',
    },
  }}
>
  <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center" color="black">
    Profil Bilgileri
  </Typography>

  <Box display="flex" flexDirection="column" gap={2}>
    <Typography variant="body1"><strong>👤 Ad:</strong> {firstName}</Typography>
    <Typography variant="body1"><strong>👥 Soyad:</strong> {lastName}</Typography>
    <Typography variant="body1"><strong>🎂 Doğum Tarihi:</strong> {birthDate}</Typography>
    <Typography variant="body1"><strong>📧 Email:</strong> {email}</Typography>
  </Box>
</Box>

  );
};

export default ProfilePage;
