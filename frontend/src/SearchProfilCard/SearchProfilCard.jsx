import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

export default function SearchProfilCard({ profil }) {
  const navigate = useNavigate();

  const imagePath = profil?.profil_image
    ? (profil.profil_image.startsWith('http')
        ? profil.profil_image
        : `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}${profil.profil_image.startsWith('/') ? '' : '/'}${profil.profil_image}`)
    : null;

  const goToPortfolio = () => {
    navigate(`/static_portfolio/${profil.id}`); 
  };

  return (
    <Card sx={{ width: 400, display: 'flex', flexDirection: 'row' }}>
      <CardMedia
        sx={{ width: 200, height: 80 }}
        image={imagePath}
        title={profil.sudoname}
      />

      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start'
        }}
      >
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {profil.sudoname}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
          }}
        >
          {profil.about_you}
        </Typography>

        <Button
          size="small"
          onClick={goToPortfolio}
          sx={{
            padding: 0,
            textTransform: "none",
            marginTop: "4px"
          }}
        >
          En savoir plus
        </Button>
      </CardContent>
    </Card>
  );
}
