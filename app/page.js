"use client"; // This component will run on the client-side.

import { useState } from 'react';

export default function FontCalculator() {
  const [distance, setDistance] = useState(null); // Distance in meters
  const [minFontSize, setMinFontSize] = useState(''); // Font size in points
  const [letterHeightMm, setLetterHeightMm] = useState(''); // Letter height in millimeters

  const distances = [
    { label: '<75 mm', value: '<75', fontSize: '24pt', letterHeightMm: '4.5mm' },
    { label: '1m (100cm)', value: '1m', fontSize: '48pt', letterHeightMm: '9mm' },
    { label: '2m (200cm)', value: '2m', fontSize: '100pt', letterHeightMm: '19mm' },
    { label: '3m (300cm)', value: '3m', fontSize: '148pt', letterHeightMm: '28mm' },
    { label: '5m (500cm)', value: '5m', fontSize: '255-510pt', letterHeightMm: '90-180mm' },
  ];

  const handleDistanceChange = (e) => {
    const selectedDistance = e.target.value;
    const selectedOption = distances.find(d => d.value === selectedDistance);

    if (selectedOption) {
      setDistance(selectedDistance); // Set selected distance
      setMinFontSize(selectedOption.fontSize); // Update font size state
      setLetterHeightMm(selectedOption.letterHeightMm); // Update letter height state
    } else {
      setMinFontSize('');
      setLetterHeightMm('');
    }
  };

  const calculateHeadingFontSize = (fontSize) => {
    if (!fontSize || !parseInt(fontSize)) return '';
    const numericFontSize = parseInt(fontSize); // Convert the font size to a number
    const headingFontSize = numericFontSize * 2; // Apply coefficient of 1.5
    return `${headingFontSize}pt`;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Minimum Font Size Calculator</h1>

      {/* Distance Selection */}
      <div style={styles.formGroup}>
        <label htmlFor="distance" style={styles.label}>Choose viewing distance to the text:</label>
        <select id="distance" onChange={handleDistanceChange} style={styles.select}>
          <option value="">Select distance</option>
          {distances.map((dist) => (
            <option key={dist.value} value={dist.value}>
              {dist.label}
            </option>
          ))}
        </select>
      </div>

      {/* Minimum Font Size Display */}
      <div style={styles.formGroup}>
        <label htmlFor="minFontSize" style={styles.label}>Minimum Font Size (pt): </label>
        <input
          type="text"
          id="minFontSize"
          value={minFontSize}
          readOnly
          style={styles.input}
        />
      </div>

      {/* Letter Height Display */}
      <div style={styles.formGroup}>
        <label htmlFor="letterHeightMm" style={styles.label}>Minimum Letter x-Height (mm): </label>
        <input
          type="text"
          id="letterHeightMm"
          value={letterHeightMm}
          readOnly
          style={styles.input}
        />
      </div>

      {/* Example Text Preview */}
      {minFontSize && (
        <div style={styles.preview}>
          <h2 style={{ fontSize: calculateHeadingFontSize(minFontSize), color: 'white', lineHeight: '100%', maxWidth: '50vw' }}>
            Example Heading multiply 2.0
          </h2>
          <p style={{ fontSize: minFontSize, color: 'white', marginTop: '40px', marginLeft: '7vw', lineHeight: '100%' }}>
            This text is displayed at the minimum font size of {minFontSize}.<br/>
            This text is displayed at the minimum font size of {minFontSize}.<br/>
            This text is displayed at the minimum font size of {minFontSize}.
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
    fontSize: '24px',
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
  select: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
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
    marginTop: '60px',
    textAlign: 'left',
    maxWidth: '75vw'
  },
};
