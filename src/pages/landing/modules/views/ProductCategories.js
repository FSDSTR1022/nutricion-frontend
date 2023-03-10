import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import img1 from '../image/image-1.jpeg' 
import img2 from '../image/image-2.jpg' 
import img3 from '../image/image-3.jpg' 
import img4 from '../image/image-4.png' 
import img5 from '../image/image-5.jpg' 
import img6 from '../image/image-6.jpeg' 
import img7 from '../image/image-7.jpeg' 
import img8 from '../image/image-8.png' 
import img9 from '../image/image-9.png' 

const ImageBackdrop = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: '#000',
  opacity: 0.5,
  transition: theme.transitions.create('opacity'),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  padding: 0,
  borderRadius: 0,
  height: '40vh',
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover': {
    zIndex: 1,
  },
  '&:hover .imageBackdrop': {
    opacity: 0.15,
  },
  '&:hover .imageMarked': {
    opacity: 0,
  },
  '&:hover .imageTitle': {
    border: '4px solid currentColor',
  },
  '& .imageTitle': {
    position: 'relative',
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  '& .imageMarked': {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

const images = [
  {
    url: img1,
    title: 'Musculación',
    width: '40%',
  },
  {
    url: img2,
    title: 'Entrenamientos',
    width: '20%',
  },
  {
    url: img4,
    title: 'Deportes Acuáticos',
    width: '40%',
  },
  {
    url: img3,
    title: 'Crossfit',
    width: '38%',
  },
  {
    url: img5,
    title: 'Resistencia',
    width: '38%',
  },
  {
    url: img6,
    title: 'Ciclismo',
    width: '24%',
  },
  {
    url: img7,
    title: 'Rehabilitación',
    width: '40%',
  },
  {
    url: img8,
    title: 'Fitness',
    width: '20%',
  },
  {
    url: img9,
    title: 'Yoga',
    width: '40%',
  },
];

export default function ProductCategories() {
  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        Para todos los deportes y disciplinas
      </Typography>
      <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image) => (
          <ImageIconButton
            key={image.title}
            style={{
              width: image.width,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
                backgroundImage: `url(${image.url})`,
                /* backgroundImage: `url(${img1})`, */
                /* backgroundImage: {img1}, */
                
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'common.white',
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className="imageTitle"
              >
                {image.title}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </Box>
    </Container>
  );
}
