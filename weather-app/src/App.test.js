import {render, fireEvent, screen} from '@testing-library/react'
import iconSelector from "./iconSelector";
import wmoMapping from "./wmoMapping";
import clear from "./img/clear.gif";
import cloudy from "./img/part-cloudy.gif";
import fog from "./img/fog.gif";
import drizzle from "./img/drizzle.gif";
import rain from "./img/rain.gif";
import snow from "./img/snow.gif";
import storm from "./img/storm.gif";

/* Expected Descriptions
  0 - Clear sky
1,2,3 - Cloudy
45,48 - Fog
51,53,55,56,57 - Drizzle
61,63,65,66,67,80,81,82 - Rain
71,73,75,77,85,86 - Snow
95,96,99 - Thunderstorm
Anything else - Unknown code
*/
/* Expected Icons
  0 - clear
1,2,3 - cloudy
45,48 - fog
51,53,55,56,57 - drizzle
61,63,65,66,67,80,81,82 - rain
71,73,75,77,85,86 - snow
95,96,99 - storm
Anything else - clear
*/


test('Check correct icon is slected', () => {
  expect(iconSelector(0)).toBe(clear);
});
test('Check correct wmoMapping', () => {
  expect(wmoMapping(0)).toBe('Clear sky');
});

test('Check cloudy icon and mapping is slected', () => {
  expect(iconSelector(3)).toBe(cloudy);
  expect(wmoMapping(3)).toBe('Cloudy');
});

test('Check Fog icon and mapping is slected', () => {
  expect(iconSelector(45)).toBe(fog);
  expect(wmoMapping(45)).toBe('Fog');
});

test('Check Drizzle icon and mapping is slected', () => {
  expect(iconSelector(53)).toBe(drizzle);
  expect(wmoMapping(53)).toBe('Drizzle');
});

test('Check Rain icon and mapping is slected', () => {
  expect(iconSelector(80)).toBe(rain);
  expect(wmoMapping(80)).toBe('Rain');
});

test('Check Snow icon and mapping is slected', () => {
  expect(iconSelector(77)).toBe(snow);
  expect(wmoMapping(77)).toBe('Snow');
});

test('Check Thunderstorm icon and mapping is slected', () => {
  expect(iconSelector(99)).toBe(storm);
  expect(wmoMapping(99)).toBe('Thunderstorm');
});

test('Check Anything else icon and mapping is slected', () => {
  expect(iconSelector(10)).toBe(clear);
  expect(wmoMapping(10)).toBe('Unknown code');
});
