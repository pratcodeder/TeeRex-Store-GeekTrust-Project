import {
  Grid,
  Chip,
  Typography,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Card,
} from "@mui/material";
import "./ProductCards.css";
const ProductCards = ({ product, HandleAddToCart }) => {
  return (
    <Card sx={{ maxWidth: 400 }} className="cardHeight">
      <Chip
        label={product.name}
        color="warning"
        size="medium"
        variant="outlined"
        className="cardChip"
      />

      <CardMedia
        // sx={{ height: 200, m:2, }}
        component="img"
        image={product.imageURL}
        title="green iguana"
        className="imageSize"
      />

      <CardContent className="CardContent">
        <Typography gutterBottom variant="h5" component="div">
          Rs {product.price}
        </Typography>

        <CardActions>
          <Button
            size="small"
            id="button"
            value={product.id}
            onClick={HandleAddToCart}
          >
            Add to Cart
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};
export default ProductCards;
