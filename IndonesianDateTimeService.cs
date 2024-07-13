using System;
using System.Globalization;

public class IndonesianDateTimeService
{
    public string FormatDate(DateTime dateTime)
    {
        string[] monthNames = GetIndonesianMonthNames();
        string formattedDate = $"{dateTime.Day} {monthNames[dateTime.Month - 1]} {dateTime.Year}";
        return formattedDate;
    }

    public string FormatDateTime(DateTime dateTime)
    {
        string[] monthNames = GetIndonesianMonthNames();
        string formattedDateTime = $"{dateTime.Day} {monthNames[dateTime.Month - 1]} {dateTime.Year} {dateTime.ToString("HH:mm")}";
        return formattedDateTime;
    }

    public string FormatMonth(DateTime dateTime)
    {
        string[] monthNames = GetIndonesianMonthNames();
        string formattedDateTime = $"{monthNames[dateTime.Month - 1]} {dateTime.Year}";
        return formattedDateTime;
    }

    public string FormatTime(DateTime dateTime)
    {
        string[] monthNames = GetIndonesianMonthNames();
        string formattedDateTime = $"{dateTime.ToString("HH:mm")}";
        return formattedDateTime;
    }

    private string[] GetIndonesianMonthNames()
    {
        return new string[]
        {
            "Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        };
    }
}

