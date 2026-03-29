import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Section.module.css";

function Section({ title, apiUrl }) {
  const [albums, setAlbums] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((res) => setAlbums(res.data))
      .catch((err) => console.error(err));
  }, [apiUrl]);

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <button
          className={styles.toggleBtn}
          onClick={() => setCollapsed((prev) => !prev)}
        >
          {collapsed ? "Show All" : "Collapse"}
        </button>
      </div>
      {!collapsed && (
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
      )}
    </div>
  );
}

export default Section;
