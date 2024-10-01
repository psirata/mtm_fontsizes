"use client"; // This component will run on the client-side.

import { useState } from 'react';
import Image from 'next/image';
import mtmLogo from "./images/MTM_logo.svg";

export default function FontCalculator() {
  const [distance, setDistance] = useState(75); // Distance in cm (default to 1 meter)

  const distances = [
    { min: 0, max: 75, minFontSize: 24, maxFontSize: 24, minLetterHeight: 4.5, maxLetterHeight: 4.5 },
    { min: 75, max: 100, minFontSize: 24, maxFontSize: 48, minLetterHeight: 4.5, maxLetterHeight: 9 },
    { min: 100, max: 200, minFontSize: 48, maxFontSize: 100, minLetterHeight: 9, maxLetterHeight: 19 },
    { min: 200, max: 300, minFontSize: 100, maxFontSize: 148, minLetterHeight: 19, maxLetterHeight: 28 },
    { min: 300, max: 500, minFontSize: 148, maxFontSize: 255, minLetterHeight: 28, maxLetterHeight: 90 },
  ];

  const getFontSizeAndLetterHeight = (selectedDistance) => {
    for (let i = 0; i < distances.length; i++) {
      const range = distances[i];
      if (selectedDistance >= range.min && selectedDistance <= range.max) {
        const rangeProgress = (selectedDistance - range.min) / (range.max - range.min);
        const fontSize = Math.round(range.minFontSize + rangeProgress * (range.maxFontSize - range.minFontSize));
        const letterHeight = Math.round((range.minLetterHeight + rangeProgress * (range.maxLetterHeight - range.minLetterHeight)) * 10) / 10;
        return { fontSize, letterHeight };
      }
    }
    return { fontSize: 24, letterHeight: 4 }; // Default values rounded
  };

  const handleDistanceChange = (e) => {
    const selectedDistance = parseInt(e.target.value);
    setDistance(selectedDistance);
  };

  const { fontSize, letterHeight } = getFontSizeAndLetterHeight(distance);

  const calculateHeadingFontSize = (fontSize) => {
    return Math.round(fontSize * 2.7); // Apply coefficient of 1.5 and round
  };

  const dividerHeight = Math.round(letterHeight) * 2; // Dynamic divider height
  const dividerWidth = Math.round(letterHeight) * 8;
  const dividerMargin = calculateHeadingFontSize(fontSize) / 1.4;
  const bodyWidth = calculateHeadingFontSize(fontSize) * 7;

  return (
    <div style={styles.container}>
      <div>
    <Image
      priority
      src={mtmLogo}
      style={{ filter: 'invert(100%)' }}
      height={80}
      width={80}
      alt="logo"
    />
  </div>
      <h1 style={styles.heading}>Минимальный размер шрифта</h1>

      {/* Distance Slider */}
      <div style={styles.formGroup}>
        <label htmlFor="distance" style={styles.label}>Расстояние до текста (cm): {distance} cm</label>
        <input
          type="range"
          id="distance"
          min="0"
          max="500"
          value={distance}
          onChange={handleDistanceChange}
          style={styles.slider}
        />
        <input
          type="number"
          id="distanceInput"
          min="0"
          max="500"
          value={distance}
          onChange={handleDistanceChange}
          style={styles.numberInput}
        />
      </div>

      {/* Minimum Font Size Display */}
      <div style={styles.formGroup}>
        <label htmlFor="minFontSize" style={styles.label}>Минимальный кегль (pt): </label>
        <input
          type="text"
          id="minFontSize"
          value={`${fontSize}pt`}
          readOnly
          style={styles.input}
        />
      </div>

      {/* Letter Height Display */}
      <div style={styles.formGroup}>
        <label htmlFor="letterHeightMm" style={styles.label}>Минимальный строчная (mm): </label>
        <input
          type="text"
          id="letterHeightMm"
          value={`${Math.round(letterHeight)}mm`}
          readOnly
          style={styles.input}
        />
      </div>

      {/* Example Text Preview */}
      {fontSize && (
        <div style={styles.preview}>
          <h2 style={{ fontSize: `${calculateHeadingFontSize(fontSize)}pt`, color: 'white', textAlign: 'left', lineHeight: '105%', marginTop: '2vh'  }}>
            Заголовок мин*2.7
          </h2>

          {/* Yellow Divider */}
          <div style={{ ...styles.divider, height: `${dividerHeight}px`, width: `${bodyWidth}px`, margin: `${dividerMargin}px 0` }} />

          <p style={{ fontSize: `${fontSize}pt`, color: 'white', textAlign: 'left', marginLeft: '3vw', width: `${bodyWidth}px`, lineHeight: '120%' }}>
            Текст, который вы видите в этом абзаце элегантно набран минимально допустимым размером кегля — {fontSize}pt.
          </p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',  // Align content to the top
    alignItems: 'center',          // Center content horizontally
    minHeight: '100vh',            // Full height of viewport
    backgroundColor: '#333',       // Dark background for contrast
    color: 'white',                // Font color white
    padding: '20px',
    textAlign: 'center',           // Center text
  },
  heading: {
    fontSize: '2.5rem',
    color: 'grey',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    fontSize: '18px',
  },
  slider: {
    width: '300px',
    marginBottom: '10px',
  },
  numberInput: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    backgroundColor: '#444',  // Slightly lighter background for input
    color: 'white',
    textAlign: 'center',
    width: '100px',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    backgroundColor: '#444',  // Slightly lighter background for input
    color: 'white',
    textAlign: 'center',
    width: '100%',
  },
  preview: {
    marginTop: '40px',
    textAlign: 'left',         // Align text to the left
    width: '100%',
    maxWidth: '50vw',         // Limit the max width for better readability
  },
  divider: {
    // width: '35vw',
    backgroundColor: 'red',
    // margin: '5vh 0',  // Space around the divider
  },
};
