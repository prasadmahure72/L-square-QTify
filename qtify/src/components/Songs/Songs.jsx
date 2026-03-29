import { useState, useEffect } from "react";
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Section from "../Section/Section";
import Carousel from "../Carousel/Carousel";
import Card from "../Card/Card";
import styles from "./Songs.module.css";

function Songs() {
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");

  useEffect(() => {
    let mounted = true;

    axios
      .get("https://qtify-backend.labs.crio.do/songs")
      .then((res) => { if (mounted) setSongs(res.data); })
      .catch(() => {});

    axios
      .get("https://qtify-backend.labs.crio.do/genres")
      .then((res) => { if (mounted) setGenres(res.data.data ?? res.data); })
      .catch(() => {});

    return () => { mounted = false; };
  }, []);

  const filteredSongs =
    selectedGenre === "all"
      ? songs
      : songs.filter((song) => song.genre?.key === selectedGenre);

  const handleTabChange = (event, newValue) => {
    setSelectedGenre(newValue);
  };

  return (
    <Section title="Songs" showToggle={false}>
      <Tabs
        value={selectedGenre}
        onChange={handleTabChange}
        classes={{
          root: styles.tabsRoot,
          indicator: styles.tabIndicator,
        }}
      >
        <Tab
          label="All"
          value="all"
          classes={{ root: styles.tabRoot, selected: styles.tabSelected }}
        />
        {genres.map((genre) => (
          <Tab
            key={genre.key}
            label={genre.label}
            value={genre.key}
            classes={{ root: styles.tabRoot, selected: styles.tabSelected }}
          />
        ))}
      </Tabs>
      <div className={styles.carouselWrapper}>
        <Carousel
          data={filteredSongs}
          renderItem={(song) => (
            <Card
              image={song.image}
              title={song.title}
              likes={song.likes}
            />
          )}
        />
      </div>
    </Section>
  );
}

export default Songs;
