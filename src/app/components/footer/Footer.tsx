import './footer.css'; 
import { Box, Button, Container, IconButton, TextField } from "@mui/material";
import { Facebook, Instagram, Twitter, LinkedIn, YouTube } from "@mui/icons-material";

export default function Footer() {
  return (
    <>
      <img
        src="/assets/image/curves.svg"
        alt="Login Screen"
        className="footer-image"
      />
      <Box component="footer" className="footer">
        <Container maxWidth="lg">


          <Box className="footer-top">
            {/* 1. Kolon */}
            <Box className="footer-column large">
              <span className="footer-title">beije.</span>
              <span className="footer-text">
                Arayı açmayalım! <br />
                beije’deki yeni ürün ve gelişmeleri sana haber verelim & aylık e-pazartesi döngü'ye abone ol!
              </span>
              <Box component="form" className="footer-form">

                <TextField
                  size="small"
                  placeholder="E-mail Adresin"
                  variant="outlined"
                  fullWidth
                  className="footer-input"
                />


                <Button  className="footer-button">
                  Gönder
                </Button>
              </Box>
              <span className="footer-caption">
              Abone olarak, beije KVKK ve Gizlilik Politikası'nı kabul ediyor ve beije'den haber almayı onaylıyorum.
              </span>
            </Box>

            {/* 2. Kolon */}
            <Box className="footer-column">
              <span className="footer-subtitle">Ürünler</span>
              <Box className="footer-links">
                <span className="footer-link">beije Pod</span>
                <span className="footer-link">beije Günlük Pod</span>
                <span className="footer-link">beije Tampon</span>
              </Box>
            </Box>

            {/* 3. Kolon */}
            <Box className="footer-column">
              <span className="footer-subtitle">Kurumsal</span>
              <Box className="footer-links">
                <span className="footer-link">Biz Kimiz?</span>
                <span className="footer-link">Blog</span>
                <span className="footer-link">Sıkça Sorulan Sorular</span>
                <span className="footer-link">Ekibimize Katıl</span>
              </Box>
            </Box>

            {/* 4. Kolon */}
            <Box className="footer-column">
              <Box className="footer-social">
                <IconButton><Facebook fontSize="small" /></IconButton><span className="footer-link">Facebook</span>
              </Box>
              <Box className="footer-social">
                <IconButton><Instagram fontSize="small" /></IconButton><span className="footer-link">Instagram</span>
              </Box>
              <Box className="footer-social">
                <IconButton><Twitter fontSize="small" /></IconButton><span className="footer-link">Twitter</span>
              </Box>
              <Box className="footer-social">
                <IconButton><LinkedIn fontSize="small" /></IconButton><span className="footer-link">LinkedIn</span>
              </Box>
              <Box className="footer-social">
                <IconButton><YouTube fontSize="small" /></IconButton><span className="footer-link">YouTube</span>
              </Box>
            </Box>
          </Box>

          {/* Alt Kısım */}
          <Box className="footer-bottom">

            <span className="footer-caption alt-footer-link">
              2022 beije Tüm hakları saklıdır.
            </span>
            <Box className="footer-bottom-links">
              <span className="alt-footer-link">KVKK</span>
              <span className="alt-footer-link">KVKK Başvuru Formu</span>
              <span className="alt-footer-link">Üyelik Sözleşmesi</span>
              <span className="alt-footer-link">Gizlilik Politikası</span>
              <span className="alt-footer-link">Çerez Politikası</span>
              <span className="alt-footer-link">Test Sonuçları</span>
            </Box>

            <Box className="footer-language">
              <span className="footer-link">EN</span> |
              <span className="footer-link">TR</span>
            </Box>

          </Box>


          <Box className="footer-payment">
            <img  src="/assets/image/icons/pay1.svg"  alt="Mastercard" />
            <img  src="/assets/image/icons/pay2.svg" alt="Visa" />
          </Box>


        </Container>
      </Box>
    </>
  );
}
