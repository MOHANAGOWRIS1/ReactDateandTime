import React, { useState, useEffect, useMemo } from 'react';
import './TimezoneDisplay.css';

const TimezoneDisplay = () => {
  // List of locations with their timezone identifiers
  const locations = useMemo(() => [
    { name: 'United States (New York)', timezone: 'America/New_York' },
    { name: 'United Kingdom (London)', timezone: 'Europe/London' },
    { name: 'Japan (Tokyo)', timezone: 'Asia/Tokyo' },
    { name: 'Australia (Sydney)', timezone: 'Australia/Sydney' },
    { name: 'India (New Delhi)', timezone: 'Asia/Kolkata' },
    { name: 'China (Beijing)', timezone: 'Asia/Shanghai' },
    { name: 'Germany (Berlin)', timezone: 'Europe/Berlin' },
    { name: 'Brazil (São Paulo)', timezone: 'America/Sao_Paulo' }
  ], []);

  // State for selected location and its time
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Get formatted time string with the correct timezone
  const getFormattedTimeForTimezone = (timezone) => {
    try {
      const options = {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      
      const formatter = new Intl.DateTimeFormat('en-US', options);
      const parts = formatter.formatToParts(currentTime);
      
      // Build the formatted date string in the desired format
      const year = parts.find(part => part.type === 'year').value;
      const month = parts.find(part => part.type === 'month').value;
      const day = parts.find(part => part.type === 'day').value;
      const hour = parts.find(part => part.type === 'hour').value;
      const minute = parts.find(part => part.type === 'minute').value;
      const second = parts.find(part => part.type === 'second').value;
      
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    } catch (error) {
      console.error("Error formatting time for timezone:", error);
      return "Time format error";
    }
  };

  // Handle location change from dropdown
  const handleLocationChange = (e) => {
    const selectedName = e.target.value;
    const location = locations.find(loc => loc.name === selectedName);
    setSelectedLocation(location || locations[0]);
  };

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    // Clean up interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="timezone-container">
      <h2>World Clock</h2>
      
      <div className="location-select">
        <h3>Select a Country:</h3>
        <select 
          value={selectedLocation.name} 
          onChange={handleLocationChange}
        >
          {locations.map(location => (
            <option key={location.name} value={location.name}>
              {location.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="location-time">
        <h3>{selectedLocation.name}</h3>
        <p className="timezone-info">{selectedLocation.timezone.replace('_', ' ')}</p>
        <p className="time-display">
          {getFormattedTimeForTimezone(selectedLocation.timezone)}
        </p>
      </div>
    </div>
  );
};

export default TimezoneDisplay;