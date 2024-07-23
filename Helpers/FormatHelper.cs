using System.Globalization;
using Microsoft.AspNetCore.Http;
using Serilog;

namespace IrigasiManganti.Helpers
{
    public static class FormatHelper
    {
        public static double FormatReading(double value)
        {
            if (double.IsNaN(value) || double.IsInfinity(value))
            {
                Log.Warning("Invalid input value: {InvalidValue}", value);
                return 0.0;
            }

            return Math.Round(value, 2);
        }

        public static string FormatMonthYear(string periode)
        {
            DateTime parsedDate = DateTime.ParseExact(periode, "yyyy-MM", CultureInfo.InvariantCulture);
            CultureInfo culture = new CultureInfo("id-ID");
            string formattedDate = parsedDate.ToString("MMMM yyyy", culture);
            return formattedDate;
        }
        public static string FormatDateId(DateTime input)
        {
            try
            {
                CultureInfo cultureId = new CultureInfo("id-ID");
                return input.ToString("dd MMMM yyyy", cultureId);
            }
            catch (CultureNotFoundException)
            {
                return input.ToString("dd MMMM yyyy", CultureInfo.InvariantCulture);
            }
            //return input.ToString("dd MMMM yyyy", new CultureInfo("id"));
        }

        public static string FormatMonthId(string periode)
        {
            DateTime parsedDate = DateTime.ParseExact(periode, "yyyy-MM", CultureInfo.InvariantCulture);
            string formattedDate = parsedDate.ToString("MMMM yyyy", new CultureInfo("id-ID"));
            return formattedDate;
        }

        public static string FormatDateTimeId(DateTime input)
        {
            try
            {
                CultureInfo cultureId = new CultureInfo("id-ID");
                return input.ToString("dd MMMM yyyy HH:mm", cultureId);
            }
            catch (CultureNotFoundException)
            {
                return input.ToString("dd MMMM yyyy HH:mm", CultureInfo.InvariantCulture);
            }
            return input.ToString("dd MMMM yyyy HH:mm", new System.Globalization.CultureInfo("id-ID"));
        }

        public static string FormatTimeId(DateTime input)
        {
            try
            {
                CultureInfo cultureId = new CultureInfo("id-ID");
                return input.ToString("HH:mm", cultureId);
            }
            catch (CultureNotFoundException)
            {
                return input.ToString("HH:mm", CultureInfo.InvariantCulture);
            }
            return input.ToString("HH:mm", new System.Globalization.CultureInfo("id-ID"));
        }

        public static bool IsDoubleValue(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                return false;
            }

            if (double.TryParse(value, out double result))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public static int TotalDays(string dateString)
        {

            int bulan = int.Parse(dateString.Split("-")[1]);
            int tahun = int.Parse(dateString.Split("-")[0]);

            if(bulan < 10){
                dateString = $"{tahun}-0{bulan}";   
            }

            // Parse the string to DateTime
            DateTime date = DateTime.ParseExact(dateString, "yyyy-MM", null);

            // Determine the number of days in the month
            int daysInMonth = DateTime.DaysInMonth(date.Year, date.Month);

            return daysInMonth;
        }
        public static DateTime ConvertToGmtPlus7FromLocal(DateTime localDateTime)
        {
            // Convert local time to UTC
            DateTime utcDateTime = localDateTime.ToUniversalTime();

            // Define the GMT+7 time zone
            TimeZoneInfo gmtPlus7 = TimeZoneInfo.CreateCustomTimeZone(
                "GMT+7", new TimeSpan(7, 0, 0), "GMT+7", "GMT+7");

            // Convert the UTC DateTime to GMT+7
            DateTime gmtPlus7DateTime = TimeZoneInfo.ConvertTimeFromUtc(utcDateTime, gmtPlus7);

            return gmtPlus7DateTime;
        }

    }
}
