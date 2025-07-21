import { Language } from "@/types/types";

export class CalendarUtil {
private static readonly monthMap: Record<Language, Record<string, string>> = {
  pl: {
    January: "Styczeń",
    February: "Luty",
    March: "Marzec",
    April: "Kwiecień",
    May: "Maj",
    June: "Czerwiec",
    July: "Lipiec",
    August: "Sierpień",
    September: "Wrzesień",
    October: "Październik",
    November: "Listopad",
    December: "Grudzień",
  },
  cz: {
    January: "Leden",
    February: "Únor",
    March: "Březen",
    April: "Duben",
    May: "Květen",
    June: "Červen",
    July: "Červenec",
    August: "Srpen",
    September: "Září",
    October: "Říjen",
    November: "Listopad",
    December: "Prosinec",
  }};

  static getMonthLocalized(month: string, lang: Language): string | undefined {
    return this.monthMap[lang][month] ?? undefined;
  }
}