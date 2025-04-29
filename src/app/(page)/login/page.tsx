'use client';

import React, { useState, useEffect } from 'react';
import {
  Box, TextField, Button, Typography, CircularProgress,
  Divider, InputAdornment, IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { login, fetchProfile } from '@/app/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import './login.css';

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { token, loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  useEffect(() => {
    if (token) {
      dispatch(fetchProfile());
      router.push('/');
    } 
  }, [token, dispatch, router]);


  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email) newErrors.email = 'Email boş olamaz.';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Geçerli bir email giriniz.';
    if (!password) newErrors.password = 'Şifre boş olamaz.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(login({ email, password }));
  };

  return (
    <>
      <div className="login-bg-mobile" />
      <div className="login-container">
        <div className="wide-desktop login-cnt">
          <div className="login-form-container">
            <div className="login-form-box">
              <Typography variant="h4" fontWeight="bold" textAlign="center" mb={1}>
                Merhaba
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" textAlign="center" mb={2}>
                beije’e hoş geldin!
              </Typography>

              <Box display="flex" justifyContent="center" mb={3}>
                <Box className="tab active-tab">Giriş Yap</Box>
                <Box className="tab">Üye Ol</Box>
              </Box>

              <Box className="social-login-row">
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  className="social-button"
                >
                  Google ile
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FacebookIcon />}
                  className="social-button"
                >
                  Facebook ile
                </Button>
              </Box>

              <Divider sx={{ my: 3 }}>veya</Divider>

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="E-mail adresin"
                  variant="outlined"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '& fieldset': {
                        borderColor: 'black',
                      },
                      '&:hover fieldset': {
                        borderColor: 'black',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'black',
                      },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Şifren"
                  variant="outlined"
                  margin="normal"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '& fieldset': {
                        borderColor: 'black',
                      },
                      '&:hover fieldset': {
                        borderColor: 'black',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'black',
                      },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <div className="forgot-password">
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ cursor: 'pointer' }}
                  >
                    Şifremi Unuttum
                  </Typography>
                </div>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  className="black-button"
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Giriş Yap'
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
