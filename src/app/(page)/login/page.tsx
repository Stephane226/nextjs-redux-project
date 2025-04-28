'use client';

import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, CircularProgress, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { login ,fetchProfile } from '@/app/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import './login.css';

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { token, loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});


  useEffect(() => {
    if (token) {
      dispatch(fetchProfile());
      router.push('/');
    }
  }, [token, dispatch, router]);


  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email boş olamaz.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Geçerli bir email giriniz.';
    }

    if (!password) {
      newErrors.password = 'Şifre boş olamaz.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(login({ email, password }));
  };

  return (
    <div className="login-container">
      <div className="login-image" />

      <div className="login-form-container">
        <div className="login-form-box">
          <Typography variant="h4" fontWeight="bold" textAlign="center" mb={1}>
            Merhaba
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" textAlign="center" mb={4}>
            beije'ye hoş geldin!
          </Typography>

          <div className="social-login-buttons">
            <Button variant="outlined" fullWidth startIcon={<GoogleIcon />} sx={{ textTransform: 'none' }}>
              Google ile Giriş Yap
            </Button>
            <Button variant="outlined" fullWidth startIcon={<FacebookIcon />} sx={{ textTransform: 'none' }}>
              Facebook ile Giriş Yap
            </Button>
          </div>

          <Divider sx={{ my: 3 }}>veya email ile</Divider>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email adresin"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />

            <TextField
              fullWidth
              label="Şifren"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />

            <div className="forgot-password">
              <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
                Şifremi Unuttum
              </Typography>
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ py: 1.5, fontWeight: 'bold' }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Giriş Yap'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
