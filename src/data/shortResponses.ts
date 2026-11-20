import type { Level, ShortResponse } from '../types'

export const shortResponses: Record<Level, ShortResponse[]> = {
  A1: [
    { prompt: 'Čo dnes robíš? Napíš vetu, ktorá sa začína slovom Heute.', note: 'Skontroluj poradie podmetu a časovaného slovesa.' },
    { prompt: 'Napíš, kam ideš po práci alebo po škole.', note: 'Skontroluj, či predložka s členom vyjadruje smer.' },
  ],
  A2: [
    { prompt: 'Napíš, čo si včera urobil a prečo. Použi Perfekt a weil.', note: 'Skontroluj pomocné sloveso a koniec vedľajšej vety.' },
    { prompt: 'Napíš, kam si včera nemohol ísť a prečo. Použi konnte a weil.', note: 'Skontroluj infinitív, smer a slovosled po weil.' },
  ],
  B1: [
    { prompt: 'Erzähl, was du gestern trotz eines Hindernisses geschafft hast. Verbinde zwei Aussagen mit obwohl.', note: 'Prüfe die Vergangenheitsform und die Position des Verbs nach dem Nebensatz.', language: 'de' },
    { prompt: 'Beschreib ein Ziel. Sag, was du diese Woche tun wirst, um es zu erreichen.', note: 'Prüfe das Futur I und die Stellung von zu im letzten Satzteil.', language: 'de' },
  ],
  B2: [
    { prompt: 'Der Kurs wurde kurzfristig verschoben. Schreib einer Kollegin, welche Lösung du vorschlagen würdest und warum.', note: 'Verbinde einen höflichen Vorschlag im Konjunktiv II mit einer Begründung.', language: 'de' },
    { prompt: 'Die Bibliothek soll abends länger geöffnet sein. Wäge in zwei Sätzen einen Vorteil und einen Einwand ab.', note: 'Verwende einerseits und andererseits oder obwohl und dennoch. Prüfe die Verbpositionen.', language: 'de' },
  ],
}
