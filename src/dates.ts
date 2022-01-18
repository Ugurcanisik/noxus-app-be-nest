export class Dates {
  day;
  month;
  year;
  monthAndYear;

  constructor() {
    this.day = new Date().toLocaleString('tr-TR', { day: '2-digit' });
    this.month = new Date().toLocaleString('tr-TR', { month: '2-digit' });
    this.year = new Date().toLocaleString('tr-TR', { month: '2-digit' });
    this.monthAndYear = new Date().toLocaleString('tr-TR', {
      month: '2-digit',
      year: 'numeric',
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
}
