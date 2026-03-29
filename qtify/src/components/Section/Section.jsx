import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Section.module.css";

function Section({ title, apiUrl, type = "grid" }) {
  const [albums, setAlbums] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((res) => setAlbums(res.data))
      .catch((err) => console.error(err));
  }, [apiUrl]);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const amount = 400;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  const isSlider = type === "slider";

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {isSlider ? (
          <button className={styles.toggleBtn} onClick={() => setShowAll((prev) => !prev)}>
            {showAll ? "Collapse" : "Show all"}
          </button>
        ) : (
          <button className={styles.toggleBtn} onClick={() => setCollapsed((prev) => !prev)}>
            {collapsed ? "Show All" : "Collapse"}
          </button>
        )}
      </div>

      {isSlider && !showAll ? (
        <div className={styles.sliderWrapper}>
          <button className={styles.arrowBtn} onClick={() => scroll("left")}>&#8249;</button>
          <div className={styles.slider} ref={sliderRef}>
            {albums.map((album) => (
              <Card
                key={album.id}
                image={album.image}
                title={album.title}
                follows={album.follows}
              />
            ))}
          </div>
          <button className={styles.arrowBtn} onClick={() => scroll("right")}>&#8250;</button>
        </div>
      ) : (
        !collapsed && (
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
        )
      )}
    </div>
  );
}

export default Section;
