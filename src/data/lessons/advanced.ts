import type { LessonSeed } from './model'

export const advanced: LessonSeed[] = [
  {
    id: 'wortstellung-tekamolo', level: 'B2', title: 'Pokročilý slovosled a TeKaMoLo', goal: 'Usporiadaj viac údajov a dva predmety v jednej vete.', tags: ['tekamolo', 'pronoun-order', 'v2', 'future', 'verb-bracket'],
    sections: [
      ['Čas, príčina, spôsob, miesto', 'TeKaMoLo je pomôcka pre neutrálne poradie. Na zdôraznenie môžeš jeden celok presunúť na začiatok.', 'V neutrálnom vyjadrení často nasleduje čas, príčina, spôsob a miesto. Časované sloveso zostáva druhé.', 'Ich fahre morgen wegen der Bauarbeiten mit dem Bus zur Arbeit.', ['Morgen ich fahre mit dem Bus.', 'Morgen fahre ich mit dem Bus.'], 'tekamolo', [
        ['Ordne neutral nach TeKaMoLo. Wir fahren [mit dem Fahrrad / morgen / in die Stadt / wegen des Streiks].', 'Wir fahren morgen wegen des Streiks mit dem Fahrrad in die Stadt.'],
        ['Beginne mit Wegen des Streiks. Wir fahren morgen mit dem Fahrrad in die Stadt.', 'Wegen des Streiks fahren wir morgen mit dem Fahrrad in die Stadt.'],
      ], [['čas', 'morgen'], ['príčina', 'wegen des Streiks'], ['spôsob', 'mit dem Fahrrad'], ['miesto alebo cieľ', 'in die Stadt']]],
      ['Dve zámená a veta v budúcnosti', 'Pri dvoch neprízvučných zámenách je bežné Akkusativ pred Dativom. V budúcnosti stojí infinitív na konci po slove werden.', 'Den Schlüssel dem Kind → ihn ihm. Vo Futur I vznikne werde … geben.', 'Morgen werde ich ihn ihm geben.', ['Morgen werde ich ihm ihn geben. (neutrálne)', 'Morgen werde ich ihn ihm geben.'], 'pronoun-order', [
        ['Ersetze beide Objekte. Ich gebe dem Kind das Buch. Ich gebe ___.', 'es ihm'], ['Setze ins Futur I. Morgen schicke ich es ihr.', 'Morgen werde ich es ihr schicken.'],
      ]],
    ],
    transfer: ['Zajtra jej kvôli termínu pošlem dokument e-mailom. Nahraď dokument zámenom es a použi Futur I.', 'Morgen werde ich es ihr wegen des Termins per E-Mail schicken.', ['Ich werde es ihr morgen wegen des Termins per E-Mail schicken.'], 'sentence'],
    reading: ['Warum das Team anders plant', 'Wegen der Bauarbeiten wird das Team morgen mit dem Bus zum Amt fahren. Nina hat das Formular bereits ausgefüllt. Sie wird es ihrem Kollegen am Eingang geben. Er wird es dort mit den anderen Unterlagen einreichen, bevor das Amt mittags schließt.', ['Wie wird das Team morgen zum Amt fahren?', 'Das Team wird morgen mit dem Bus zum Amt fahren.', ['Es wird morgen mit dem Bus zum Amt fahren.', 'Das Team wird mit dem Bus fahren.', 'Es wird mit dem Bus fahren.']]],
    test: [['Ordne neutral. Ich fahre [zum Amt / mit der Bahn / morgen / wegen der Baustelle].', 'Ich fahre morgen wegen der Baustelle mit der Bahn zum Amt.'], ['Beginne mit Am Donnerstag. Die Redaktion schickt den Bericht am Donnerstag.', 'Am Donnerstag schickt die Redaktion den Bericht.'], ['Ersetze beide Objekte. Ich sende der Kollegin den Vertrag. Ich sende ___.', 'ihn ihr'], ['Setze ins Futur I und beginne mit Morgen. Ich gebe es ihm morgen.', 'Morgen werde ich es ihm geben.'], ['Zajtra kvôli štrajku pôjdem do práce pešo. Použi Futur I a začni Morgen.', 'Morgen werde ich wegen des Streiks zu Fuß zur Arbeit gehen.', [], 'sentence']],
  },
  {
    id: 'komplexe-nebensaetze', level: 'B2', title: 'Komplexné vedľajšie vety', goal: 'Udrž poradie aj pri viacerých vedľajších vetách a infinitívnych celkoch.', tags: ['subordinate', 'obwohl', 'weil', 'dass', 'zu', 'ohne-zu', 'statt-zu'],
    prerequisites: ['weil-dass-wenn'],
    sections: [
      ['Každá časť má vlastné sloveso', 'V dlhšom súvetí si rozdeľ význam na úseky. Keď celý hoci-úsek stojí na začiatku, zaberá prvú pozíciu hlavnej vety.', 'Po obwohl a weil je časované sloveso na konci vlastnej vetnej časti.', 'Obwohl es kalt war, blieb ich draußen, weil ich auf Nina wartete.', ['Obwohl es kalt war, ich blieb draußen.', 'Obwohl es kalt war, blieb ich draußen.'], 'subordinate', [
        ['Verbinde mit obwohl und weil. Es war spät. Lea blieb. Sie wollte den Film sehen. Beginne mit Obwohl.', 'Obwohl es spät war, blieb Lea, weil sie den Film sehen wollte.'],
        ['Oprav vetu. Weil der Bus kam spät, wir nahmen die Bahn.', 'Weil der Bus spät kam, nahmen wir die Bahn.', [], 'correction', 'sk'],
      ]],
      ['Ohne … zu a statt … zu', 'Ohne … zu vyjadruje vynechanú činnosť a statt … zu nahradenú možnosť. Po slovesách ako versuchen môže infinitívny celok stáť za čiarkou.', 'Pri odlučiteľnom slovese vlož zu do infinitívu. V bežnom zu-stave oddeľ tento celok od nadradenej vety.', 'Statt anzurufen, schrieb sie eine E-Mail. Er ging, ohne sich zu verabschieden.', ['Statt zu anrufen, schrieb sie.', 'Statt anzurufen, schrieb sie.'], 'statt-zu', [
        ['Verbinde mit ohne … zu. Tom ging. Er verabschiedete sich nicht.', 'Tom ging, ohne sich zu verabschieden.'],
        ['Verbinde mit statt … zu. Mia schrieb eine Nachricht. Sie rief nicht an. Beginne mit Statt.', 'Statt anzurufen, schrieb Mia eine Nachricht.'],
      ]],
    ],
    transfer: ['Hoci som bol unavený, aj tak som išiel do fitka, pretože som sa snažil dodržať svoj tréningový režim. Začni Obwohl a použi trotzdem.', 'Obwohl ich müde war, bin ich trotzdem ins Fitnessstudio gegangen, weil ich versucht habe, meine Trainingsroutine einzuhalten.', [], 'sentence'],
    reading: ['Training nach der Arbeit', 'Obwohl die Arbeit lange gedauert hatte, fuhr Mia noch ins Fitnessstudio. Sie ging dorthin, weil sie versucht, zweimal pro Woche zu trainieren. Statt lange zu laufen, machte sie an diesem Abend nur ein kurzes Krafttraining, damit sie später noch Zeit für ihre Familie hatte.', ['Warum fuhr Mia noch ins Studio?', 'Mia fuhr noch ins Studio, weil sie versucht, zweimal pro Woche zu trainieren.', ['Sie fuhr noch ins Studio, weil sie versucht, zweimal pro Woche zu trainieren.', 'Weil sie versucht, zweimal pro Woche zu trainieren.']]],
  },
  {
    id: 'passiv-vertiefung', level: 'B2', title: 'Pasívum v minulosti a s modálnym slovesom', goal: 'Popíš postup aj hotový stav v správnom čase.', tags: ['passive-past', 'passive-present', 'modal-present', 'participle', 'time-clause'],
    sections: [
      ['Wurde alebo ist … worden', 'Vo formálnej správe môže byť minulý dej vyjadrený tvarom wurde alebo v Perfekte tvarom ist … worden.', 'Im Präteritum wurde + Partizip. Im Perfekt ist + Partizip + worden.', 'Die Brücke wurde gestern gesperrt. Sie ist gestern gesperrt worden.', ['Sie ist gestern gesperrt geworden.', 'Sie ist gestern gesperrt worden.'], 'passive-past', [
        ['Schreib im Vorgangspassiv (Präteritum). Man öffnete die Halle.', 'Die Halle wurde geöffnet.'], ['Schreib im Vorgangspassiv (Perfekt). Man hat den Termin verschoben.', 'Der Termin ist verschoben worden.'],
      ]],
      ['Stav a modálne sloveso', 'Ist geschlossen vyjadruje stav. Wird geschlossen vyjadruje činnosť. Pri müssen je na konci Partizip a infinitív werden.', 'Modalverb → Partizip + werden. Stav → sein + Partizip.', 'Der Antrag muss geprüft werden. Die Tür ist geschlossen.', ['Der Antrag muss werden geprüft.', 'Der Antrag muss geprüft werden.'], 'passive-present', [
        ['Schreib im Passiv mit Modalverb. Man muss den Antrag heute prüfen.', 'Der Antrag muss heute geprüft werden.'], ['Die Tür ___ seit 18 Uhr geschlossen. (Zustand, Präsens)', 'ist'],
      ]],
    ],
    transfer: ['Po tom, čo boli dokumenty skontrolované, musela byť zmluva podpísaná. Použi nachdem a Plusquamperfekt vo vedľajšej vete.', 'Nachdem die Unterlagen geprüft worden waren, musste der Vertrag unterschrieben werden.', [], 'sentence'],
    reading: ['Die Baustelle am Rathaus', 'Der Eingang wurde am Montag gesperrt, nachdem ein Schaden festgestellt worden war. Bis zur Reparatur müssen alle Besucher den Seiteneingang nutzen. Ein provisorisches Schild ist bereits angebracht worden. Der Haupteingang bleibt geschlossen, bis die neuen Teile geprüft worden sind.', ['Welchen Eingang müssen Besucher bis zur Reparatur nutzen?', 'Sie müssen den Seiteneingang nutzen.', ['Die Besucher müssen den Seiteneingang nutzen.', 'Bis zur Reparatur müssen sie den Seiteneingang nutzen.']]],
  },
  {
    id: 'konnektoren', level: 'B2', title: 'Presné spojovacie výrazy', goal: 'Rozlišuj dôvod, podmienku, výhradu a súbeh dvoch tvrdení.', tags: ['paired-links', 'main-link', 'trotzdem', 'v2', 'subordinate'],
    sections: [
      ['Dennoch, allerdings, sofern', 'Dennoch a allerdings vyjadrujú výhradu alebo odpor. Sofern uvádza podmienku.', 'Dennoch a allerdings na začiatku majú za sebou sloveso. Po sofern je časované sloveso na konci.', 'Der Plan ist teuer. Dennoch stimmt der Rat zu. Der Raum ist frei, sofern niemand reserviert hat.', ['Dennoch der Rat stimmt zu.', 'Dennoch stimmt der Rat zu.'], 'main-link', [
        ['Oprav. Der Kurs ist teuer. Dennoch viele melden sich an.', 'Der Kurs ist teuer. Dennoch melden sich viele an.', [], 'correction', 'sk'],
        ['Verbinde mit sofern. Der Raum kann genutzt werden. Man meldet sich vorher an.', 'Der Raum kann genutzt werden, sofern man sich vorher anmeldet.'],
      ]],
      ['Párové spojky', 'Sowohl … als auch pridáva druhý prvok. Weder … noch popiera oba. Einerseits … andererseits proti sebe stavia dve stránky problému.', 'Spoj prvky rovnakej funkcie. Dve samostatné vety si zachovávajú V2.', 'Der Kurs ist sowohl günstig als auch praktisch. Einerseits ist er nah, andererseits beginnt er spät.', ['Der Kurs ist sowohl günstig und auch praktisch.', 'Der Kurs ist sowohl günstig als auch praktisch.'], 'paired-links', [
        ['Schreib mit weder … noch. Der Raum hat keinen Balkon und keinen Aufzug.', 'Der Raum hat weder einen Balkon noch einen Aufzug.'],
        ['Ergänze das Paar. Die Bank bietet sowohl Beratung ___ einen Online-Service.', 'als auch'],
      ], [['oba prvky', 'sowohl … als auch'], ['ani jeden prvok', 'weder … noch'], ['dve stránky', 'einerseits … andererseits']]],
    ],
    transfer: ['Na jednej strane je kurz lacný, na druhej strane začína neskoro. Použi einerseits a andererseits.', 'Einerseits ist der Kurs günstig, andererseits beginnt er spät.', ['Einerseits ist der Kurs günstig. Andererseits beginnt er spät.'], 'sentence'],
    reading: ['Ein Kurs für Berufstätige', 'Der Kurs ist sowohl günstig als auch gut erreichbar. Allerdings beginnt er erst um zwanzig Uhr. Einige Teilnehmende haben weder ein Auto noch eine direkte Busverbindung. Die Leitung will dennoch am Termin festhalten, sofern sich genug Personen anmelden.', ['Unter welcher Bedingung hält die Leitung am Termin fest?', 'Die Leitung hält am Termin fest, sofern sich genug Personen anmelden.', ['Sie hält am Termin fest, sofern sich genug Personen anmelden.', 'Sofern sich genug Personen anmelden.', 'Sie hält am Termin fest, wenn sich genug Personen anmelden.']]],
    test: [['Der Kurs findet sowohl am Montag ___ am Mittwoch statt.', 'als auch'], ['Oprav. Der Kurs ist teuer. Allerdings man bekommt Material.', 'Der Kurs ist teuer. Allerdings bekommt man Material.', [], 'correction', 'sk'], ['Verbinde mit sofern. Wir öffnen morgen. Das Wetter bleibt gut.', 'Wir öffnen morgen, sofern das Wetter gut bleibt.'], ['Forme mit weder … noch. Der Ort hat keinen Bus und keine Bahn.', 'Der Ort hat weder einen Bus noch eine Bahn.'], ['Na jednej strane je byt svetlý, na druhej strane je drahý.', 'Einerseits ist die Wohnung hell, andererseits ist sie teuer.', ['Einerseits ist die Wohnung hell. Andererseits ist sie teuer.'], 'sentence']],
  },
  {
    id: 'fortgeschrittene-praepositionen', level: 'B2', title: 'Pokročilé predložkové väzby', goal: 'Zvoľ väzbu podľa významu a správne pripoj pád alebo da-slovo.', tags: ['verb-prep', 'da-wo', 'genitive', 'fixed-prep', 'relative-prep'],
    sections: [
      ['Sich verlassen auf a bestehen aus', 'Predložka patrí k významu slovesa. Sich verlassen auf vyjadruje dôveru. Bestehen aus opisuje zloženie.', 'Auf má v sich verlassen auf Akkusativ. Aus vždy vyžaduje Dativ.', 'Wir verlassen uns auf den Bericht. Der Bericht besteht aus drei Teilen.', ['Das besteht von drei Teilen.', 'Das besteht aus drei Teilen.'], 'verb-prep', [
        ['Wir verlassen uns ___ die aktuellen Zahlen.', 'auf'], ['Der Bericht besteht ___ zwei Kapiteln.', 'aus'],
      ]],
      ['Aufgrund, trotz a anhand', 'V písanom texte sa dajú pomocou týchto predložiek zhustiť dôvody, výhrady a dôkazy.', 'V tomto formálnom použití zvoľ Genitiv. Aufgrund vyjadruje dôvod, trotz výhradu a anhand podklad.', 'Anhand der Zahlen lässt sich der Unterschied erklären. Trotz des Regens fand das Treffen statt.', ['Aufgrund die Verspätung wurde der Termin verschoben.', 'Aufgrund der Verspätung wurde der Termin verschoben.'], 'genitive', [
        ['Aufgrund ___ Streiks ändert sich der Fahrplan. (der, Genitiv)', 'des'], ['Anhand ___ Zahlen lässt sich die Lage erklären. (diese, Genitiv)', 'dieser'],
      ]],
    ],
    transfer: ['Pre meškanie bol termín presunutý, ale môžeme sa spoľahnúť na nový plán. Použi aufgrund a sich verlassen auf.', 'Aufgrund der Verspätung wurde der Termin verschoben, aber wir können uns auf den neuen Plan verlassen.', [], 'sentence'],
    reading: ['Eine Entscheidung anhand von Zahlen', 'Die Verwaltung ändert den Plan aufgrund der gestiegenen Kosten. Trotzdem wird die Beratung weiter angeboten. Anhand der letzten Anmeldungen lässt sich zeigen, dass viele Personen sie brauchen. Ob der nächste Termin verlängert wird, hängt davon ab, wie viele Beschäftigte zur Verfügung stehen.', ['Warum ändert die Verwaltung den Plan?', 'Die Verwaltung ändert den Plan aufgrund der gestiegenen Kosten.', ['Sie ändert den Plan aufgrund der gestiegenen Kosten.', 'Aufgrund der gestiegenen Kosten.']]],
  },
  {
    id: 'register', level: 'B2', title: 'Formálny a neformálny register', goal: 'Prispôsob oslovenie, zámená a prosbu tomu, komu píšeš.', tags: ['register', 'personal', 'subjunctive', 'indirect'],
    sections: [
      ['Oslovenie a zámená', 'V úradnom alebo prvom kontakte sa používa Sie. Pri známej osobe sa bežne používa du.', 'Vykanie píš Sie, Ihnen, Ihr. Tu je Ihnen Dativ.', 'Guten Tag, Frau Weber. Ich schreibe Ihnen wegen des Termins.', ['Guten Tag, Frau Weber. Ich schreibe dir wegen des Termins.', 'Guten Tag, Frau Weber. Ich schreibe Ihnen wegen des Termins.'], 'register', [
        ['Schreib förmlich. Ich sende dir die Unterlagen.', 'Ich sende Ihnen die Unterlagen.'],
        ['Schreib mit du. Haben Sie morgen Zeit?', 'Hast du morgen Zeit?'],
      ], [['známa osoba', 'Hallo Lea · du · dir'], ['formálny kontakt', 'Guten Tag, Frau Weber · Sie · Ihnen']]],
      ['Zdvorilá prosba', 'Könnten Sie zjemní priamy príkaz. V pracovnom e-maile môžeš krátko uviesť dôvod.', 'Könnten Sie mir bitte …? Nepriama otázka má časované sloveso na konci.', 'Könnten Sie mir bitte sagen, wann das Büro öffnet?', ['Schick mir den Vertrag. (formálny e-mail)', 'Könnten Sie mir bitte den Vertrag schicken?'], 'register', [
        ['Formuliere eine Bitte mit Könnten Sie. Senden Sie mir die Rechnung.', 'Könnten Sie mir bitte die Rechnung senden?', ['Könnten Sie mir die Rechnung senden?']],
        ['Beginne förmlich mit Könnten Sie mir sagen. Wann findet das Treffen statt?', 'Könnten Sie mir sagen, wann das Treffen stattfindet?', ['Könnten Sie mir bitte sagen, wann das Treffen stattfindet?']],
      ]],
    ],
    review: {
      0: [['Schreib förmlich. Ich helfe dir gern.', 'Ich helfe Ihnen gern.'], ['Schreib mit du. Haben Sie den Schlüssel?', 'Hast du den Schlüssel?']],
      1: [['Beginne höflich mit Könnten Sie. Warte bitte hier.', 'Könnten Sie bitte hier warten?', ['Könnten Sie hier bitte warten?']], ['Bilde eine höfliche Frage mit Können Sie mir sagen. Wo ist der Eingang?', 'Können Sie mir sagen, wo der Eingang ist?', ['Können Sie mir bitte sagen, wo der Eingang ist?']]],
    },
    transfer: ['Napíš formálne. Mohli by ste mi prosím potvrdiť, či bude stretnutie v stredu?', 'Könnten Sie mir bitte bestätigen, ob das Treffen am Mittwoch stattfindet?', ['Könnten Sie mir bitte bestätigen, ob das Treffen am Mittwoch ist?'], 'sentence'],
    reading: ['Zwei Nachrichten', 'An eine Kollegin schreibt Jonas: Hallo Lea, schickst du mir kurz die Unterlagen? An eine externe Ansprechpartnerin schreibt er: Guten Tag, Frau Weber. Könnten Sie mir bitte die Unterlagen zusenden? Ich brauche sie für den Termin am Donnerstag. In beiden Nachrichten bittet er um dieselbe Sache, aber die Anrede und die Verbform ändern sich.', ['Was bittet Jonas Frau Weber zu schicken?', 'Jonas bittet Frau Weber, ihm die Unterlagen zu schicken.', ['Er bittet sie, ihm die Unterlagen zu schicken.', 'Er bittet sie, ihm die Unterlagen zuzusenden.', 'Jonas bittet Frau Weber, ihm die Unterlagen zuzusenden.']]],
    test: [['Schreib förmlich. Ich danke dir für die Nachricht.', 'Ich danke Ihnen für die Nachricht.'], ['Schreib mit du. Möchten Sie morgen mitkommen?', 'Möchtest du morgen mitkommen?'], ['Schreib höflich mit Könnten Sie. Zeigen Sie mir den Raum.', 'Könnten Sie mir bitte den Raum zeigen?', ['Könnten Sie mir den Raum zeigen?']], ['Formuliere förmlich mit Könnten Sie mir sagen. Ist die Rechnung bezahlt?', 'Könnten Sie mir sagen, ob die Rechnung bezahlt ist?', ['Könnten Sie mir bitte sagen, ob die Rechnung bezahlt ist?']], ['Formálne. Mohli by ste mi prosím zajtra zavolať?', 'Könnten Sie mich bitte morgen anrufen?', ['Könnten Sie mich morgen bitte anrufen?'], 'sentence']],
  },
  {
    id: 'text-argumentation', level: 'B2', title: 'Dlhší text a argumentácia', goal: 'Rozlíš tvrdenie od dôkazu a napíš čitateľný argument s protiargumentom.', tags: ['text-cohesion', 'paired-links', 'obwohl', 'genitive', 'subjunctive'],
    sections: [
      ['Tvrdenie a podklad', 'Jedna hlavná myšlienka môže byť v krátkej vete. Potom uveď, z čoho ju vyvodzuješ.', 'Anhand pomenúva podklad. Weil vysvetľuje dôvod a presúva sloveso na koniec.', 'Die Beratung ist wichtig. Anhand der Anmeldungen lässt sich der Bedarf zeigen.', ['Anhand die Anmeldungen lässt sich der Bedarf zeigen.', 'Anhand der Anmeldungen lässt sich der Bedarf zeigen.'], 'text-cohesion', [
        ['Ergänze den Beleg. Anhand ___ Zahlen lässt sich der Bedarf zeigen. (die, Plural)', 'der'],
        ['Verbinde mit weil. Die Beratung ist wichtig. Viele Personen brauchen Hilfe.', 'Die Beratung ist wichtig, weil viele Personen Hilfe brauchen.'],
      ]],
      ['Pripusť výhradu a navrhni riešenie', 'Dobrý argument vysvetlí aj slabinu vlastného návrhu. Napokon môže odporučiť krok, ktorý pri výhrade pomôže.', 'Obwohl alebo einerseits/andererseits uvedie výhradu. Mit würde alebo könnte zjemníš návrh.', 'Obwohl die Beratung Geld kostet, würde ich sie einmal pro Woche anbieten.', ['Obwohl die Beratung kostet Geld, würde ich sie anbieten.', 'Obwohl die Beratung Geld kostet, würde ich sie anbieten.'], 'text-cohesion', [
        ['Verbinde mit Obwohl. Der Plan ist teuer. Wir würden ihn ausprobieren.', 'Obwohl der Plan teuer ist, würden wir ihn ausprobieren.'],
        ['Forme mit einerseits und andererseits. Der Kurs hilft vielen. Er kostet Geld.', 'Einerseits hilft der Kurs vielen, andererseits kostet er Geld.', ['Einerseits hilft der Kurs vielen. Andererseits kostet er Geld.']],
      ]],
    ],
    review: {
      0: [['Anhand ___ Berichts erklären wir die Änderung. (der)', 'des'], ['Verbinde mit weil. Wir warten. Der Raum ist noch besetzt.', 'Wir warten, weil der Raum noch besetzt ist.']],
      1: [['Verbinde mit Obwohl am Anfang. Der Weg ist lang. Ich würde zu Fuß gehen.', 'Obwohl der Weg lang ist, würde ich zu Fuß gehen.'], ['Formuliere einen Vorschlag mit würde. Ich öffne das Fenster.', 'Ich würde das Fenster öffnen.']],
    },
    transfer: ['Hoci je riešenie drahé, navrhol by som ho skúsiť jeden mesiac. Použi obwohl a würde.', 'Obwohl die Lösung teuer ist, würde ich vorschlagen, sie einen Monat lang auszuprobieren.', ['Obwohl die Lösung teuer ist, würde ich vorschlagen, sie einen Monat auszuprobieren.'], 'sentence'],
    reading: ['Ein Vorschlag für die Bibliothek', 'Längere Öffnungszeiten helfen Menschen, die tagsüber arbeiten. Anhand der Besucherzahlen lässt sich erkennen, dass der Lesesaal abends oft voll ist. Allerdings verursacht zusätzliche Beratung Kosten. Deshalb schlägt die Leitung vor, an einem Abend pro Woche eine Beratung anzubieten und nach drei Monaten anhand der Anmeldungen über eine Verlängerung zu entscheiden.', ['Wie oft soll Beratung zunächst angeboten werden?', 'Die Beratung soll zunächst an einem Abend pro Woche angeboten werden.', ['Sie soll an einem Abend pro Woche angeboten werden.', 'Die Beratung soll einmal pro Woche angeboten werden.', 'Zunächst soll die Beratung an einem Abend pro Woche angeboten werden.']]],
    test: [['Ergänze den Beleg. Anhand ___ Anmeldungen prüfen wir den Bedarf. (diese)', 'dieser'], ['Formuliere mit obwohl. Der Lesesaal ist voll. Das Gebäude bleibt ruhig. Beginne mit Obwohl.', 'Obwohl der Lesesaal voll ist, bleibt das Gebäude ruhig.'], ['Ergänze die Folgerung mit deshalb. Die Stelle ist frei. Wir bewerben uns. Verwende zwei Sätze.', 'Die Stelle ist frei. Deshalb bewerben wir uns.'], ['Formuliere einen Vorschlag im Konjunktiv II. Ich teste den Plan drei Monate lang. Verwende würde.', 'Ich würde den Plan drei Monate lang testen.'], ['Formuliere mit allerdings. Der Termin passt. Ich kann erst später kommen. Verwende zwei Sätze.', 'Der Termin passt. Allerdings kann ich erst später kommen.']],
  },
  {
    id: 'satzvariation', level: 'B2', title: 'Prirodzené obmeny viet', goal: 'Zachovaj obsah a zmeň začiatok, väzbu alebo dôraz vety.', tags: ['sentence-variation', 'v2', 'relative', 'main-link', 'da-wo'],
    sections: [
      ['Zmeň začiatok vety', 'Na začiatok sa dá dať známy čas, miesto alebo téma. Tak veta prirodzene nadviaže na predchádzajúcu.', 'Na prvú pozíciu presuň jeden celok. Časované sloveso ostane druhé.', 'Gestern haben wir den Bericht gelesen. Den Bericht haben wir gestern gelesen.', ['Den Bericht wir haben gestern gelesen.', 'Den Bericht haben wir gestern gelesen.'], 'sentence-variation', [
        ['Beginne mit Den Vertrag. Wir haben den Vertrag gestern geprüft.', 'Den Vertrag haben wir gestern geprüft.'],
        ['Beginne mit Im Lesesaal. Wir haben uns dort getroffen. Ersetze dort.', 'Im Lesesaal haben wir uns getroffen.'],
      ]],
      ['Spoj informácie, ktoré patria k sebe', 'Relatívna veta odstráni opakované meno. Da-slovo môže nadviazať na vec, ktorú už čitateľ pozná.', 'V relatívnej vete ide časované sloveso nakoniec. Da-slovo si zachová pôvodnú predložku.', 'Wir kennen den Plan, über den das Team spricht. Wir haben bereits darüber gesprochen.', ['Wir haben bereits davon gesprochen. (o pláne so sprechen über)', 'Wir haben bereits darüber gesprochen.'], 'sentence-variation', [
        ['Verbinde als Relativsatz. Wir lesen einen Bericht. Der Bericht wurde gestern veröffentlicht.', 'Wir lesen einen Bericht, der gestern veröffentlicht wurde.'],
        ['Ersetze über den Vorschlag. Das Team spricht lieber morgen über den Vorschlag. Beginne mit Das Team spricht lieber morgen …', 'Das Team spricht lieber morgen darüber.'],
      ]],
    ],
    review: {
      0: [['Beginne mit Den Entwurf. Ich habe den Entwurf gelesen.', 'Den Entwurf habe ich gelesen.'], ['Beginne mit Im Büro. Wir haben uns im Büro getroffen.', 'Im Büro haben wir uns getroffen.']],
      1: [['Ersetze über diese Frage. Wir sprechen über diese Frage.', 'Wir sprechen darüber.'], ['Verbinde als Relativsatz. Die Frau ist nett. Sie arbeitet hier.', 'Die Frau, die hier arbeitet, ist nett.']],
    },
    transfer: ['O návrhu sme už hovorili, preto o ňom rozhodneme zajtra. Začni Über den Vorschlag a použi deshalb.', 'Über den Vorschlag haben wir schon gesprochen. Deshalb entscheiden wir morgen darüber.', ['Über den Vorschlag haben wir bereits gesprochen. Deshalb entscheiden wir morgen darüber.'], 'sentence'],
    reading: ['Die zweite Version', 'Über den Bau eines Radwegs wurde im Ausschuss schon im Frühjahr gesprochen. Damals fehlten genaue Zahlen. In der zweiten Fassung, die gestern veröffentlicht wurde, finden sich Daten zu den Kosten und zur Nutzung. Darüber möchte der Ausschuss nächste Woche diskutieren, bevor er einen Beschluss fasst.', ['Worüber möchte der Ausschuss nächste Woche diskutieren?', 'Der Ausschuss möchte nächste Woche über die Daten zu den Kosten und zur Nutzung diskutieren.', ['Er möchte über die Daten zu den Kosten und zur Nutzung diskutieren.', 'Der Ausschuss möchte über die Daten diskutieren.', 'Der Ausschuss möchte über die zweite Fassung diskutieren.']]],
    test: [['Beginne mit Über das Ergebnis. Wir haben über das Ergebnis lange gesprochen.', 'Über das Ergebnis haben wir lange gesprochen.'], ['Verbinde. Lea liest einen Bericht. Der Bericht ist neu.', 'Lea liest einen Bericht, der neu ist.'], ['Wir sprechen über die Entscheidung. Ersetze über die Entscheidung.', 'Wir sprechen darüber.'], ['Beginne mit Morgen. Ich werde den Bericht morgen lesen.', 'Morgen werde ich den Bericht lesen.'], ['Spoj s deshalb. Ich kenne den Bericht. Ich kann dir helfen. Zachovaj dve vety.', 'Ich kenne den Bericht. Deshalb kann ich dir helfen.', [], 'grammar', 'sk']],
  },
]
