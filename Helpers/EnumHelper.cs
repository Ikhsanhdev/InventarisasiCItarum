using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IrigasiManganti.Helpers
{
    public class EnumHelper
    {
        public enum EnumAwsSensors
        {
            humidity,
            pressure,
            rainfall,
            solarRadiation,
            temperature,
            windDirection,
            windSpeed,
            evaporation,
            battery
        }

        public static Dictionary<string, string> AwsSensorNames()
        {
            return new Dictionary<string, string>{
                {"IsHumidity", "humidity"},
                {"IsRainfall", "rainfall"},
                {"IsPressure", "pressure"},
                {"IsSolarRadiation", "solarRadiation"},
                {"temperature", "temperature"},
                {"IsWindDirection", "windDirection"},
                {"IsWindSpeed", "windSpeed"},
                {"IsEvaporation", "evaporation"},
            };
        }

        public static Dictionary<string, string> SensorTypeInId()
        {
            return new Dictionary<string, string>{
                {"AWLR", "Pos Duga Air"},
                {"ARR", "Pos Curah Hujan"},
                {"AWLR_ARR", "Pos Duga Air & Curah Hujan"},
                {"AWS", "Pos Duga Klimatologi"},
                {"V-Notch", "Pos V-Notch Weir"},
            };
        }
    }
}