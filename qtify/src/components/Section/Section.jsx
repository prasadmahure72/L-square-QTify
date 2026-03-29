import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";
import styles from "./Section.module.css";

function Section({ title, apiUrl, defaultView = "grid", showToggle = true, children }) {
  const [albums, setAlbums] = useState([]);
  // "grid" = showing full grid, "carousel" = showing carousel
  const [view, setView] = useState(defaultView);

  useEffect(() => {
    if (apiUrl) {
      axios
        .get(apiUrl)
        .then((res) => setAlbums(res.data))
        .catch((err) => console.error(err));
    }
  }, [apiUrl]);

  const isGrid = view === "grid";

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {showToggle && (
          <button
            className={styles.toggleBtn}
            onClick={() => setView(isGrid ? "carousel" : "grid")}
          >
            {isGrid ? "Collapse" : "Show all"}
          </button>
        )}
      </div>

      {children ? (
        children
      ) : isGrid ? (
        <div className={styles.grid}>
          {albums.map((album) => (
            <Card
              key={album.id}
              image={album.image}
              title={album.title}
              follows={album.follows}
            />
          ))}
        </div>
      ) : (
        <Carousel
          data={albums}
          renderItem={(album) => (
            <Card
              image={album.image}
              title={album.title}
              follows={album.follows}
            />
          )}
        />
      )}
    </div>
  );
}

export default Section;
