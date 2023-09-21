import { ImageBackground, Text, View } from "react-native";
import { s } from "./App.style";
import hotBackground from "./assets/hot.png";
import coldBackground from "./assets/cold.png";
import { InputTemperature } from "./components/InputTemperature/InputTemperature";
import { TemperatureDisplay } from "./components/TemperatureDisplay/TemperatureDisplay";
import { useEffect, useState } from "react";
import { DEFAULT_TEMPERATURE, DEFAULT_UNIT, UNITS } from "./constant";
import {
  getOppositUnit,
  convertTemperatureTo,
  isIceTemperature,
} from "./services/temperature-service";
import { ButtonConvert } from "./components/ButtonConvert/ButtonConvert";

export default function App() {
  const [inputValue, setinputValue] = useState(DEFAULT_TEMPERATURE);
  const [currentUnit, setCurrrentUnit] = useState(DEFAULT_UNIT);
  const [currentBackground, setCurrentBackground] = useState();
  const oppositeUnit = getOppositUnit(currentUnit);

  useEffect(() => {
    const temperatureAsFloat = Number.parseFloat(inputValue);
    if (!isNaN(temperatureAsFloat)) {
      const isColdBackground = isIceTemperature(inputValue, currentUnit);
      setCurrentBackground(isColdBackground ? coldBackground : hotBackground);
    }
  }, [inputValue, currentUnit]);

  function getConvertedTemperature() {
    const valueAsFloat = Number.parseFloat(inputValue);
    return isNaN(valueAsFloat)
      ? ""
      : convertTemperatureTo(oppositeUnit, valueAsFloat).toFixed(1);
  }

  return (
    <ImageBackground source={currentBackground} style={s.container}>
      <View style={s.workspace}>
        <TemperatureDisplay
          value={getConvertedTemperature()}
          unit={oppositeUnit}
        />
        <InputTemperature
          onChangeText={setinputValue}
          defaultValue={DEFAULT_TEMPERATURE}
          unit={currentUnit}
        />
        <View>
          <ButtonConvert
            onPress={() => {
              setCurrrentUnit(oppositeUnit);
            }}
            unit={currentUnit}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
