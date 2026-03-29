import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import LeftNavigationButton from "./LeftNavigationButton";
import RightNavigationButton from "./RightNavigationButton";
import styles from "./Carousel.module.css";

function Carousel({ data, renderItem }) {
  return (
    <div className={styles.carouselWrapper}>
      <LeftNavigationButton className={`${styles.navBtn} swiper-prev-custom`} />
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".swiper-prev-custom",
          nextEl: ".swiper-next-custom",
        }}
        breakpoints={{
          320:  { slidesPerView: 2, spaceBetween: 16 },
          600:  { slidesPerView: 3, spaceBetween: 16 },
          900:  { slidesPerView: 5, spaceBetween: 24 },
          1200: { slidesPerView: 7, spaceBetween: 24 },
        }}
        className={styles.swiper}
      >
        {data.map((item, index) => (
          <SwiperSlide key={item.id ?? index}>
            {renderItem(item)}
          </SwiperSlide>
        ))}
      </Swiper>
      <RightNavigationButton className={`${styles.navBtn} swiper-next-custom`} />
    </div>
  );
}

export default Carousel;
