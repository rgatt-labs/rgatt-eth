import React from 'react';
import Slider from 'react-slick';
import styles from './Vaults.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Vaults = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const vaultData = [
    { title: 'Vehicle Vault', description: 'explication...', tvl: '$XXX.XXX.XXX'},
    { title: 'Property Vault', description: 'explication...', tvl: '$XXX.XXX.XXX'},
    { title: 'Technology Item Vault', description: 'explication...', tvl: '$XXX.XXX.XXX'},
    { title: 'Travel Insurance', description: 'explication...', tvl: '$XXX.XXX.XXX'},
  ];

  return (
    <section className={styles.vaultSection}>
      <Slider {...settings}>
        {vaultData.map((vault, index) => (
          <div key={index} className={styles.vault}>
            <h2>{vault.title}</h2>
            <p>{vault.description}</p>
            <button className={styles.assetsButton}>Assets</button>
            <br />
            <button className={styles.chainButton}>Chain</button>
            <p>TVL {vault.tvl}</p>
            <button className={styles.simulateButton}>SIMULATE</button>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Vaults;
