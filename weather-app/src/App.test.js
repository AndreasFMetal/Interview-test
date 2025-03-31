
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

test('Check correct icon is slected', () => {
  expect(iconSelector(0)).toBe(clear);
});
test('Check correct wmoMapping', () => {
  expect(wmoMapping(0)).toBe('Clear sky');
});
