import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const ImgMediaCard = props => (
	<div>
		<Card sx={{ minWidth: '350px', width: '60%', margin: 'auto' }}>
			<CardMedia
				component='img'
				alt={props.title + ' Imagen'}
				height='280px'
				image={props.image}
				sx={{ minWidth: '40%' }}
			/>
			<CardContent sx={{ minWidth: '60%' }}>
				<Typography
					gutterBottom
					variant='h4'
					component='div'>
					{props.title}
				</Typography>
				<Typography
					component={'ul'}
					variant='body2'
					color='text.secondary'
					sx={{ textAlign: 'left', fontSize: 16 }}>
					{props.description.map((lineText, key) => {
						return <li key={key}>{lineText}</li>;
					})}
				</Typography>
				<CardActions sx={{ justifyContent: 'center' }}>
					<Button variant='outlined'>
						<Link
							to={`/${props.buttonUrl}`}
							className='btn btn-primary'
							style={{ textDecoration: 'none', color: 'black' }}>
							{props.buttonText}
						</Link>
					</Button>
				</CardActions>
			</CardContent>
		</Card>
	</div>
);

export default ImgMediaCard;
