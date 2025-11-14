import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function SearchProfilCard({ profil }) {
  const imagePath = profil?.profil_image
    ? (profil.profil_image.startsWith('http')
        ? profil.profil_image
        : `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}${profil.profil_image.startsWith('/') ? '' : '/'}${profil.profil_image}`)
    : null;

  console.log("🔍 Image URL:", imagePath); // ← vérifie dans la console

  return (
    <Card sx={{ width: 200, height: 300 }}>
      <CardMedia sx={{ height: 100 }} image={imagePath } title={profil.sudoname} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {profil.sudoname}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {profil.about_you}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
