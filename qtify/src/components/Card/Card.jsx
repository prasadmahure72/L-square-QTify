import Chip from "@mui/material/Chip";
import styles from "./Card.module.css";

function Card({ image, title, follows }) {
  return (
    <div className={styles.card} data-testid="card">
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />
        <div className={styles.chipWrapper}>
          <Chip
            label={`${follows} Follows`}
            size="small"
            sx={{
              backgroundColor: "#121212",
              color: "#ffffff",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              fontSize: "0.7rem",
              height: "24px",
              "& .MuiChip-label": {
                padding: "0 10px",
              },
            }}
          />
        </div>
      </div>
      <p className={styles.title}>{title}</p>
    </div>
  );
}

export default Card;
