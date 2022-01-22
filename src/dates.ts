export class Dates {
  day;
  month;
  year;
  monthAndYear;
  yesterday;

  constructor() {
    this.day = new Date().toLocaleString("tr-TR", { day: "2-digit" });
    this.month = new Date().toLocaleString("tr-TR", { month: "2-digit" });
    this.year = new Date().toLocaleString("tr-TR", { year: "numeric" });
    this.monthAndYear = new Date().toLocaleString("tr-TR", {
      month: "2-digit",
      year: "numeric"
    });
  }

  getDay() {
    return this.day;
  }

  getMonth() {
    return this.month;
  }

  getYear() {
    return this.year;
  }

  getMonthAndYear() {
    return this.monthAndYear;
  }

  yesterDay() {
    const yesterday = parseInt(this.day) - 1;
    if (yesterday > 9) {
      return yesterday + "." + this.getMonthAndYear();
    } else if (yesterday < 10) {
      return "0." + yesterday + this.getMonthAndYear();
    }
  }

  fullDate() {
    return this.day + '.' + this.monthAndYear;
  }
}
