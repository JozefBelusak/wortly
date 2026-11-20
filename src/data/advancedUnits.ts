import type { Card, CourseUnit, CourseWriting, Exercise, Level, Topic } from '../types'
import { support } from './exerciseGlossary'
import { makeExercises } from './exercises'
import type { ExerciseRow } from './exercises'

type AdvancedLevel = Extract<Level, 'B1' | 'B2'>
type VocabularyRow = [cue: string, word: string, example: string]
type UnitSeed = Pick<CourseUnit, 'id' | 'title' | 'goal' | 'requires' | 'reading' | 'guide'> & {
  level: AdvancedLevel
  topic: Topic
  drills: ExerciseRow[]
  sentences: ExerciseRow[]
  translations?: ExerciseRow[]
  vocabulary: VocabularyRow[]
  writing: CourseWriting
}

function unit(seed: UnitSeed): CourseUnit {
  const { id, level, title, goal, requires, reading, writing, topic, guide } = seed
  const inGerman = (exercise: Exercise): Exercise => ({ ...exercise, promptLanguage: 'de' })
  const vocabulary: Card[] = seed.vocabulary.map(([front, back, example], index) => ({
    id: id + '-wort-' + (index + 1), mode: 'word', front, back, example, tags: [topic, 'vocabulary'],
    frontLanguage: id === 'b1-infinitiv' || id === 'b1-relativ' ? 'sk' : 'de',
  }))
  return {
    id, level, title, goal, requires, reading, writing, vocabulary, guide,
    minCorrect: 4,
    minSentences: 1,
    exercises: [
      ...makeExercises('grammar', id + '-drill', level, seed.drills).map(inGerman),
      ...makeExercises('sentence', id + '-satz', level, seed.sentences).map(inGerman),
      ...makeExercises('sentence', id + '-uebersetzung', level, seed.translations ?? []),
    ],
  }
}

export const advancedUnits = [
  unit({
    id: 'b1-infinitiv', level: 'B1', title: 'Zámery a ciele',
    goal: 'Vysvetli, čo máš v pláne a s akým cieľom niečo robíš. Nadviažeš na modálne slovesá a odlučiteľné predpony.',
    requires: ['a1-grundlagen', 'a2-verbformen', 'a2-satzbau'], topic: 'infinitive',
    guide: { rule: 'Po slovese ako versuchen nasleduje infinitív so zu. Pri odlučiteľnom slovese je zu vnútri slova. Um … zu vyjadruje účel, keď obe činnosti robí ten istý podmet.', example: 'Ich bleibe heute länger im Büro, um das Gespräch vorzubereiten.' },
    drills: [
      ['Ich versuche, morgen früher ___. (aufstehen)', 'aufzustehen', ['infinitive', 'separable'], 'Pri odlučiteľnom slovese vlož zu medzi predponu a sloveso.', 'Aufstehen sa mení na aufzustehen.', [], support(['versuchen', 'aufstehen'])],
      ['Wir haben vor, an dem Kurs ___. (teilnehmen)', 'teilzunehmen', ['infinitive', 'separable'], 'Teilnehmen funguje ako aufstehen. Kam patrí zu?', 'Pri teilnehmen vlož zu medzi teil a nehmen.', [], support(['vorhaben', 'teilnehmen'])],
      ['Verbinde mit um … zu. Ich fahre in die Stadt. Ich möchte meine Unterlagen abholen.', 'Ich fahre in die Stadt, um meine Unterlagen abzuholen.', ['infinitive', 'location', 'separable'], 'Keď obe činnosti robí tá istá osoba, môžeš použiť um … zu.', 'Bei abholen steht zu zwischen ab und holen.', ['Um meine Unterlagen abzuholen, fahre ich in die Stadt.'], support(['die Unterlagen', 'abholen'])],
      ['Er soll mich morgen ___. (anrufen)', 'anrufen', ['modal', 'separable'], 'Soll je modálne sloveso. Čo sa s zu deje po modálnom slovese?', 'Nach sollen steht der Infinitiv ohne zu.'],
    ],
    sentences: [
      ['Formuliere mit versuchen. Lea möchte ihren Termin verschieben.', 'Lea versucht, ihren Termin zu verschieben.', ['infinitive', 'possessive'], 'Sloveso verschieben sa neoddeľuje. Zu stojí pred ním.', 'Bei verschieben steht zu vor dem ganzen Verb.', [], support(['versuchen', 'der Termin', 'verschieben'])],
    ],
    translations: [
      ['Chodím na kurz, aby som sa mohol v práci lepšie dohovoriť.', 'Ich besuche einen Kurs, um mich bei der Arbeit besser verständigen zu können.', ['infinitive', 'modal', 'reflexive'], 'Pri dvoch slovesách stojí zu priamo pred modálnym infinitívom.', 'Am Ende stehen verständigen und zu können.', ['Ich gehe zu einem Kurs, um mich bei der Arbeit besser verständigen zu können.', 'Ich besuche einen Kurs, um mich auf der Arbeit besser verständigen zu können.']],
    ],
    vocabulary: [
      ['zúčastniť sa (na niečom)', 'an etwas teilnehmen', 'Ich nehme morgen an einem Kurs teil.'],
      ['vyzdvihnúť si', 'abholen', 'Ich hole meine Unterlagen im Büro ab.'],
      ['presunúť termín', 'einen Termin verschieben', 'Könnten wir den Termin auf Donnerstag verschieben?'],
      ['dohovoriť sa', 'sich verständigen', 'Wir können uns auf Deutsch verständigen.'],
    ],
    writing: {
      instruction: 'Schreib einer Freundin, was du in den nächsten Wochen lernen willst. Erkläre auch, welches Ziel du damit verfolgst und was du konkret vorhast.',
      minWords: 35,
      checklist: ['Einen Plan mit vorhaben oder versuchen formuliert', 'Ein Ziel mit um … zu erklärt'],
    },
  }),
  unit({
    id: 'b1-relativ', level: 'B1', title: 'Spresnenie pomocou vedľajšej vety',
    goal: 'Spoj dve informácie o osobe alebo veci. Pád zámena určíš podľa jeho úlohy vo vedľajšej vete.',
    requires: ['b1-infinitiv'], topic: 'relative',
    guide: { rule: 'Rod a číslo vyber podľa slova pred čiarkou. Pád zámena určuje jeho úloha vo vedľajšej vete. Časované sloveso stojí na konci.', example: 'Das ist der Kollege, dem ich die Schlüssel gegeben habe.' },
    drills: [
      ['Das ist die Kollegin, ___ mich gestern angerufen hat.', 'die', ['relative', 'participle'], 'Kto telefonoval? Relatívne zámeno je v tejto časti podmetom.', 'Die ersetzt die Kollegin als Subjekt des Relativsatzes.', [], support(['die Kollegin', 'anrufen'])],
      ['Ich suche den Ordner, ___ du gestern mitgebracht hast.', 'den', ['relative', 'akkusativ'], 'Du je podmet. Sloveso mitbringen má priamy predmet.', 'Im Relativsatz ist den ein Akkusativobjekt.', [], support(['der Ordner', 'mitbringen'])],
      ['Das ist der Nachbar, mit ___ ich gestern gesprochen habe.', 'dem', ['relative', 'dativ'], 'Pád určuje predložka mit.', 'Mit verlangt den Dativ. Das Relativpronomen lautet dem.'],
      ['Verbinde die Sätze. Die Wohnung ist frei. Sie liegt neben dem Bahnhof.', 'Die Wohnung, die neben dem Bahnhof liegt, ist frei.', ['relative', 'location', 'word-order'], 'Vlož relatívnu vetu za die Wohnung a oddeľ ju čiarkami.', 'Die bezieht sich auf die Wohnung. Liegt steht am Ende des Relativsatzes.'],
    ],
    sentences: [
      ['Beschreibe die Sache mit einem Relativsatz. In dem Ordner liegen unsere Unterlagen. Der Ordner ist blau.', 'Der Ordner, in dem unsere Unterlagen liegen, ist blau.', ['relative', 'dativ', 'location'], 'Poloha v obale sa vyjadruje predložkou in s Dativom.', 'In dem steht hier im Dativ, weil es um einen Ort geht.', ['Der blaue Ordner ist der Ordner, in dem unsere Unterlagen liegen.'], support(['der Ordner', 'die Unterlagen'])],
      ['Verbinde die Sätze. Ich habe eine Kollegin. Von ihr habe ich viel gelernt.', 'Ich habe eine Kollegin, von der ich viel gelernt habe.', ['relative', 'dativ', 'participle'], 'Nahradíš ihr relatívnym zámenom a zachováš von.', 'Von der gehört in den Relativsatz. Das Hilfsverb habe steht am Ende.'],
    ],
    vocabulary: [
      ['pracovná kolegyňa', 'die Kollegin', 'Die Kollegin, die mit mir arbeitet, kommt aus Graz.'],
      ['zakladač, spisový obal', 'der Ordner', 'Im Ordner liegen die Verträge.'],
      ['priniesť so sebou', 'mitbringen', 'Bring bitte deinen Ausweis mit.'],
      ['k dispozícii (napríklad byt)', 'frei', 'Ab Mai ist die Wohnung wieder frei.'],
    ],
    writing: {
      instruction: 'Beschreib einen Ort oder eine Person, die für deinen Alltag wichtig ist. Verwende zwei Relativsätze und ergänze, was du dort machst oder warum dir die Person wichtig ist.',
      minWords: 45,
      checklist: ['Zwei Relativsätze verwendet', 'Relativpronomen und Kommas überprüft'],
    },
    reading: { id: 'b1-tauschregal', minCorrect: 0 },
  }),
  unit({
    id: 'b1-adjektive', level: 'B1', title: 'Prídavné mená v opise',
    goal: 'Opíš byt, vec alebo službu presnejšie. Pri koncovkách si spoj typ člena s pádom a rodom.',
    requires: ['b1-relativ'], topic: 'adjectives',
    guide: { rule: 'Koncovka prídavného mena závisí od pádu, rodu a člena. Ak pád zreteľne označuje člen, prídavné meno má často koncovku -e alebo -en.', example: 'Ein kleiner Hund läuft mit dem großen Hund.' },
    drills: [
      ['Wir suchen eine ___ Wohnung in der Nähe der Schule. (ruhig)', 'ruhige', ['adjectives', 'akkusativ'], 'Pozri sa na rod Wohnung a tvar člena eine.', 'Im Akkusativ Femininum heißt es eine ruhige Wohnung.'],
      ['Ich fahre mit einem ___ Fahrrad zur Arbeit. (alt)', 'alten', ['adjectives', 'dativ'], 'Mit určuje pád. Koncovku pádu už nesie člen einem.', 'Nach einem im Dativ bekommt das Adjektiv die Endung -en.'],
      ['Der ___ Aufzug funktioniert wieder. (klein)', 'kleine', ['adjectives', 'articles'], 'Aufzug ist hier das Subjekt. Welcher Artikel steht davor?', 'Auf der im Nominativ Maskulinum folgt hier klein mit -e.'],
      ['Ich habe ___ Brot gekauft. (frisch, ohne Artikel)', 'frisches', ['adjectives', 'akkusativ', 'participle'], 'Bez člena musí prídavné meno vyjadriť rod aj pád.', 'Brot ist im Akkusativ Neutrum. Ohne Artikel heißt es frisches Brot.'],
    ],
    sentences: [
      ['Ergänze ruhig und alt an der passenden Stelle. Ich wohne in einem Haus in einer Straße. Das Haus ist alt, die Straße ist ruhig.', 'Ich wohne in einem alten Haus in einer ruhigen Straße.', ['adjectives', 'dativ', 'location'], 'Obe spojenia označujú polohu. Použi Dativ.', 'Im Dativ enden alt und ruhig hier beide auf -en.', ['In einer ruhigen Straße wohne ich in einem alten Haus.']],
      ['Verbinde mit einem Relativsatz und setze günstig vor Wohnung. Wir suchen eine Wohnung. Die Wohnung liegt in der Nähe des Bahnhofs.', 'Wir suchen eine günstige Wohnung, die in der Nähe des Bahnhofs liegt.', ['adjectives', 'relative', 'akkusativ'], 'Eine Wohnung je tu predmet. Vo vedľajšej vete je die podmet.', 'Günstig erhält nach eine die Endung -e. Im Relativsatz steht liegt am Ende.'],
    ],
    vocabulary: [
      ['nicht teuer oder vorteilhaft', 'günstig', 'Die Wohnung ist für diese Lage sehr günstig.'],
      ['ein Lift, der mehrere Stockwerke verbindet', 'der Aufzug', 'Das Gebäude hat einen kleinen Aufzug.'],
      ['ein Ort, an dem wenig Lärm zu hören ist', 'ruhig', 'In der ruhigen Straße fahren kaum Autos.'],
      ['nicht weit von einem Ort entfernt', 'in der Nähe', 'Die Haltestelle ist in der Nähe.'],
    ],
    writing: {
      instruction: 'Du suchst ein Zimmer oder eine Wohnung. Schreib eine kurze Anzeige. Beschreibe die Lage, den Preis und zwei Dinge, auf die du nicht verzichten möchtest.',
      minWords: 55,
      checklist: ['Mindestens drei Adjektive vor Nomen verwendet', 'Einen Ortsausdruck im Dativ überprüft'],
    },
  }),
  unit({
    id: 'b1-erzaehlen', level: 'B1', title: 'Rozprávanie v minulosti',
    goal: 'Rozlíš jednorazovú a opakovanú udalosť. Zoraď dej pomocou als, während a nachdem.',
    requires: ['b1-adjektive'], topic: 'temporal',
    guide: { rule: 'Als bezeichnet ein einmaliges Ereignis in der Vergangenheit. Wenn passt zu Wiederholungen, während zu Gleichzeitigkeit. Mit nachdem erzählst du, was zuerst passiert ist.', example: 'Nachdem er seine Schlüssel gefunden hatte, verließ er das Haus.', language: 'de' },
    drills: [
      ['___ ich letztes Jahr nach Graz zog, kannte ich dort niemanden. (als oder wenn)', 'als', ['temporal', 'preterite'], 'Der Umzug ist ein einzelnes Ereignis in der Vergangenheit.', 'Bei einem einzelnen vergangenen Ereignis verwendet man als.', ['Als']],
      ['Früher schrieb ich immer eine Nachricht, ___ ich später nach Hause kam. (als oder wenn)', 'wenn', ['temporal', 'preterite'], 'Immer zeigt hier, dass die Situation wiederholt vorkam.', 'Für wiederholte Situationen in der Vergangenheit passt wenn.'],
      ['Nachdem der Kurs ___, rief Lea ihre Kollegin an. (enden, Plusquamperfekt)', 'geendet hatte', ['temporal', 'participle', 'separable'], 'Der Kurs endete zuerst. Das Hilfsverb kommt ans Ende des Nebensatzes.', 'Nach nachdem zeigt hier das Plusquamperfekt, welches Ereignis zuerst geschah.'],
      ['Die Bahn ___ gestern eine halbe Stunde zu spät an. (ankommen, Präteritum)', 'kam', ['preterite', 'separable'], 'An steht schon am Satzende. Setze nur das Präteritum des Verbs ein.', 'Ankommen wird zu kam … an.'],
    ],
    sentences: [
      ['Verbinde die gleichzeitigen Ereignisse mit während. Ich wartete am Bahnhof. Meine Schwester organisierte ein Taxi.', 'Während ich am Bahnhof wartete, organisierte meine Schwester ein Taxi.', ['temporal', 'preterite', 'word-order'], 'Im Nebensatz steht wartete am Ende. Achte auf die Position von organisierte nach dem Komma.', 'Der ganze Nebensatz ist die erste Position des Hauptsatzes.', ['Meine Schwester organisierte ein Taxi, während ich am Bahnhof wartete.']],
      ['Bilde einen Satz mit nachdem. Zuerst brachte Nina die Unterlagen ins Büro. Danach fuhr sie nach Hause. Verwende Plusquamperfekt und Präteritum.', 'Nachdem Nina die Unterlagen ins Büro gebracht hatte, fuhr sie nach Hause.', ['temporal', 'preterite', 'location'], 'Bringen hat das Partizip gebracht. Zeige mit hatte, dass es zuerst passiert ist.', 'Gebracht hatte steht am Ende des vorzeitigen Nebensatzes.', ['Nina fuhr nach Hause, nachdem sie die Unterlagen ins Büro gebracht hatte.']],
    ],
    vocabulary: [
      ['den Wohnort wechseln', 'umziehen', 'Als ich umzog, halfen mir Freunde.'],
      ['später kommen, als es geplant war', 'sich verspäten', 'Die Bahn verspätete sich um eine halbe Stunde.'],
      ['etwas für andere vorbereiten und koordinieren', 'organisieren', 'Meine Schwester organisierte ein Taxi.'],
      ['ein Ereignis erreicht seinen Abschluss', 'enden', 'Nachdem der Kurs geendet hatte, ging sie ins Café.'],
    ],
    writing: {
      instruction: 'Erzähl von einem Tag, an dem etwas anders lief als geplant. Zeige zuerst, was du vorhattest, beschreibe dann das Problem und erkläre, wie du es gelöst hast.',
      minWords: 70,
      checklist: ['Die Ereignisse in eine klare Reihenfolge gebracht', 'Zwei passende Zeitausdrücke oder temporale Nebensätze verwendet', 'Vergangenheitsformen überprüft'],
    },
    reading: { id: 'b1-schichtwechsel', minCorrect: 3 },
  }),
  unit({
    id: 'b2-konjunktiv', level: 'B2', title: 'Návrhy, podmienky a hypotézy',
    goal: 'Formuluj zdvorilé návrhy a rozlíš reálnu situáciu od hypotézy v prítomnosti alebo minulosti.',
    requires: ['b1-erzaehlen'], topic: 'subjunctive',
    guide: { rule: 'Hätte, wäre und würde + Infinitiv markieren Wünsche und hypothetische Situationen. Für vergangene Möglichkeiten brauchst du hätte oder wäre mit Partizip II.', example: 'Wenn das Geschäft noch offen wäre, könnten wir heute dort einkaufen.', language: 'de' },
    drills: [
      ['Wenn ich mehr Zeit ___, würde ich an dem Kurs teilnehmen. (haben, Konjunktiv II)', 'hätte', ['subjunctive', 'subordinate'], 'Hier wird ein Wunsch beschrieben. Wähle die kurze Konjunktivform von haben.', 'Hätte markiert eine unrealistische oder hypothetische Bedingung.'],
      ['___ Sie mir bitte die Unterlagen schicken? (können, Konjunktiv II)', 'Könnten', ['subjunctive', 'modal'], 'Die Bitte richtet sich höflich an eine Person mit Sie.', 'Könnten Sie leitet eine höfliche Bitte ein.'],
      ['Wenn der Zug pünktlich gewesen wäre, ___ wir den Anschluss nicht verpasst. (haben, Konjunktiv II)', 'hätten', ['subjunctive', 'participle', 'subordinate'], 'Die Situation liegt in der Vergangenheit. Das Partizip steht schon am Ende.', 'Hätten verpasst bezeichnet eine nicht eingetretene Folge.'],
      ['Formuliere einen Rat mit würde. An deiner Stelle prüfe ich zuerst den Vertrag.', 'An deiner Stelle würde ich zuerst den Vertrag prüfen.', ['subjunctive', 'word-order'], 'Würde wird konjugiert. Prüfen bleibt ein Infinitiv.', 'Nach würde steht prüfen im Infinitiv am Satzende.', ['Ich würde an deiner Stelle zuerst den Vertrag prüfen.']],
    ],
    sentences: [
      ['Formuliere die gegenteilige Vorstellung. Ich kenne die neue Kollegin nicht. Deshalb frage ich sie nicht nach ihrer Meinung.', 'Wenn ich die neue Kollegin kennen würde, würde ich sie nach ihrer Meinung fragen.', ['subjunctive', 'adjectives', 'subordinate'], 'Beginne mit wenn und behalte die beiden Informationen in der hypothetischen Form.', 'Der Wenn-Satz und der Hauptsatz stellen hier eine Alternative zur Wirklichkeit dar.', ['Ich würde die neue Kollegin nach ihrer Meinung fragen, wenn ich sie kennen würde.', 'Wenn ich die neue Kollegin kennen würde, fragte ich sie nach ihrer Meinung.']],
      ['Formuliere eine verpasste Möglichkeit. Lea erfuhr erst heute von dem Treffen. Deshalb konnte sie gestern nicht teilnehmen. Beginne mit Wenn Lea …', 'Wenn Lea früher von dem Treffen erfahren hätte, hätte sie gestern teilnehmen können.', ['subjunctive', 'temporal', 'modal'], 'In der Bedingung brauchst du das Partizip erfahren. Bei können kommt ein zweiter Infinitiv dazu.', 'Hätte teilnehmen können ist Konjunktiv II der Vergangenheit mit einem Modalverb.', ['Wenn Lea rechtzeitig von dem Treffen erfahren hätte, hätte sie gestern teilnehmen können.']],
    ],
    vocabulary: [
      ['ein Vorschlag, den jemand einer anderen Person gibt', 'der Rat', 'An deiner Stelle würde ich ihren Rat annehmen.'],
      ['eine Verbindung, die man nach dem Umsteigen erreicht', 'der Anschluss', 'Hätte der Zug weniger Verspätung gehabt, hätten wir den Anschluss erreicht.'],
      ['eine schriftliche Vereinbarung', 'der Vertrag', 'Könnten Sie mir den Vertrag morgen zur Prüfung schicken?'],
      ['früh genug, bevor es zu spät ist', 'rechtzeitig', 'Wenn wir rechtzeitig davon erfahren hätten, wären wir gekommen.'],
    ],
    writing: {
      instruction: 'Deine Arbeitsgruppe sucht nach einer besseren Lösung für ihre Besprechungen. Schreib einen höflichen Vorschlag mit zwei Alternativen und erkläre, welche davon du bevorzugen würdest.',
      minWords: 80,
      checklist: ['Einen Vorschlag höflich im Konjunktiv II formuliert', 'Eine hypothetische Bedingung und ihre Folge beschrieben', 'Zwei Alternativen verglichen'],
    },
  }),
  unit({
    id: 'b2-passiv', level: 'B2', title: 'Keď je dôležitý dej',
    goal: 'Prepíš oznam alebo postup do trpného rodu. Rozlíš prebiehajúci dej od výsledného stavu.',
    requires: ['b2-konjunktiv'], topic: 'passive',
    guide: { rule: 'Werden + Partizip II beschreibt einen Vorgang. Sein + Partizip II beschreibt einen Zustand. Mit einem Modalverb kommt werden als Infinitiv hinter das Partizip.', example: 'Die Fenster werden gerade geputzt. Seit gestern ist die Eingangstür gestrichen.', language: 'de' },
    drills: [
      ['Die Anträge ___ heute geprüft. (Vorgangspassiv, Präsens)', 'werden', ['passive', 'conjugation'], 'Das Subjekt steht im Plural. Verwende werden als Hilfsverb.', 'Werden und Partizip II beschreiben im Vorgangspassiv den Ablauf.'],
      ['Die Tür ___ seit gestern geschlossen. (Zustandspassiv, Präsens)', 'ist', ['passive', 'conjugation'], 'Hier geht es um den Zustand der Tür und nicht um den Vorgang des Schließens.', 'Das Zustandspassiv entsteht aus sein und Partizip II.'],
      ['Die Unterlagen müssen bis Freitag ___ ___. (einreichen, Passiv)', 'eingereicht werden', ['passive', 'modal', 'separable'], 'Mit müssen bleibt werden ein Infinitiv und steht nach dem Partizip.', 'Die Reihenfolge lautet müssen … eingereicht werden.'],
      ['Der Antrag ist gestern ___. (ablehnen, Vorgangspassiv im Perfekt)', 'abgelehnt worden', ['passive', 'participle'], 'Beim Perfekt des Vorgangspassivs brauchst du worden.', 'Das Vorgangspassiv im Perfekt verwendet sein, Partizip II und worden.'],
    ],
    sentences: [
      ['Formuliere im Vorgangspassiv. Die Stadt hat die alte Brücke im Frühjahr saniert. Nenne weiterhin die Stadt als Handelnde.', 'Die alte Brücke ist im Frühjahr von der Stadt saniert worden.', ['passive', 'dativ', 'adjectives'], 'Verwende für die Handelnde von. Behalte das Perfekt bei.', 'Im Perfekt steht die Folge saniert worden am Ende.', ['Die alte Brücke ist von der Stadt im Frühjahr saniert worden.', 'Im Frühjahr ist die alte Brücke von der Stadt saniert worden.']],
      ['Formuliere den zweiten Satz im Passiv und verbinde beide mit weil. Die Frist endet morgen. Man muss den Bericht heute veröffentlichen.', 'Weil die Frist morgen endet, muss der Bericht heute veröffentlicht werden.', ['passive', 'subordinate', 'modal'], 'Beginne mit dem Grund. Drücke danach die Pflicht mit müssen und Passiv aus.', 'Der Weil-Satz endet mit endet. Im Hauptsatz steht muss vor dem Subjekt.', ['Der Bericht muss heute veröffentlicht werden, weil die Frist morgen endet.']],
    ],
    vocabulary: [
      ['einen Antrag offiziell abgeben', 'einen Antrag einreichen', 'Der Antrag muss bis Freitag eingereicht werden.'],
      ['einer Bitte oder einem Antrag nicht zustimmen', 'ablehnen', 'Der Antrag ist abgelehnt worden.'],
      ['ein Gebäude oder Bauwerk gründlich erneuern', 'sanieren', 'Die alte Brücke wird seit Montag saniert.'],
      ['einen Text für alle zugänglich machen', 'veröffentlichen', 'Der Bericht wurde gestern veröffentlicht.'],
    ],
    writing: {
      instruction: 'Die Stadt ändert den Ablauf für Anträge. Verfasse eine kurze Mitteilung für Einwohnerinnen und Einwohner. Beschreibe, was eingereicht werden muss, wann die Prüfung stattfindet und wie die Entscheidung mitgeteilt wird.',
      minWords: 90,
      checklist: ['Zwei Arbeitsschritte im Vorgangspassiv beschrieben', 'Eine Pflicht mit Modalverb und Passiv ausgedrückt', 'Fristen und Ansprechpersonen klar genannt'],
    },
    reading: { id: 'b2-bibliothek', minCorrect: 0 },
  }),
  unit({
    id: 'b2-verknuepfen', level: 'B2', title: 'Súvislosti a protiargumenty',
    goal: 'Spoj dôvod, výhradu a dôsledok. Precvič obwohl, dennoch, sofern, während a je … desto.',
    requires: ['b2-passiv'], topic: 'connectors',
    guide: { rule: 'Obwohl und sofern leiten Nebensätze ein. Dennoch verbindet Aussagen und kann die erste Position im Hauptsatz einnehmen. Danach folgt das konjugierte Verb.', example: 'Obwohl es spät war, stellte sie noch eine Frage. Dennoch endete das Treffen pünktlich.', language: 'de' },
    drills: [
      ['___ das Projekt teuer wird, hält der Ausschuss daran fest. (obwohl oder deshalb)', 'obwohl', ['connectors', 'subordinate'], 'Der Ausschuss setzt das Projekt trotz der hohen Kosten fort.', 'Obwohl leitet einen Nebensatz mit einem Einwand ein.', ['Obwohl']],
      ['Der Plan ist teuer. ___ stimmt die Mehrheit dafür. (dennoch oder daher)', 'dennoch', ['connectors', 'word-order'], 'Die Zustimmung ist trotz der Kosten überraschend.', 'Dennoch steht hier an erster Stelle. Danach folgt das Verb.', ['Dennoch']],
      ['Die Räume können genutzt werden, ___ vorher eine Anmeldung erfolgt. (Bedingung mit sofern)', 'sofern', ['connectors', 'passive'], 'Drücke mit einem Nebensatz aus, unter welcher Voraussetzung die Nutzung erlaubt ist.', 'Sofern leitet eine Bedingung ein.'],
      ['Je genauer wir die Daten prüfen, ___ zuverlässiger wird das Ergebnis.', 'desto', ['connectors', 'word-order'], 'Zwei Entwicklungen nehmen gemeinsam zu. Welcher Ausdruck ergänzt je?', 'Je … desto verbindet zwei abhängige Entwicklungen.', ['umso']],
    ],
    sentences: [
      ['Stelle die unterschiedlichen Positionen mit während gegenüber. Der Vorstand möchte schnell entscheiden. Das Team fordert eine weitere Prüfung.', 'Während der Vorstand schnell entscheiden möchte, fordert das Team eine weitere Prüfung.', ['connectors', 'modal', 'word-order'], 'Während bezeichnet hier einen Gegensatz. Setze möchte ans Ende des Nebensatzes.', 'Der Nebensatz steht an der ersten Position. Im Hauptsatz folgt fordert direkt auf das Komma.', ['Das Team fordert eine weitere Prüfung, während der Vorstand schnell entscheiden möchte.']],
      ['Verbinde mit je … desto. Je mehr Beiträge die Redaktion erhält, … (Der Bericht wird vielfältiger.)', 'Je mehr Beiträge die Redaktion erhält, desto vielfältiger wird der Bericht.', ['connectors', 'word-order'], 'Setze im zweiten Teil den gesteigerten Ausdruck direkt nach desto.', 'Desto vielfältiger steht an der ersten Position des Hauptsatzes.', ['Je mehr Beiträge die Redaktion erhält, umso vielfältiger wird der Bericht.']],
    ],
    vocabulary: [
      ['eine Gruppe, die Vorschläge prüft und Empfehlungen gibt', 'der Ausschuss', 'Der Ausschuss hält trotz der hohen Kosten an dem Plan fest.'],
      ['mehr als die Hälfte einer Gruppe', 'die Mehrheit', 'Eine Mehrheit stimmte für den Vorschlag.'],
      ['trotz des zuvor genannten Grundes', 'dennoch', 'Der Plan ist teuer. Dennoch stimmt die Mehrheit dafür.'],
      ['unter der Voraussetzung, dass etwas gilt', 'sofern', 'Der Raum kann genutzt werden, sofern er frei ist.'],
    ],
    writing: {
      instruction: 'In deinem Betrieb wird über einen festen Tag im Homeoffice diskutiert. Schreib einen Beitrag, in dem du ein Argument dafür und einen ernsthaften Einwand abwägst. Begründe dein Urteil und nenne eine Bedingung, unter der dein Vorschlag funktionieren könnte.',
      minWords: 105,
      checklist: ['Ein Gegenargument fair formuliert', 'Eine Bedingung mit sofern oder wenn ausgedrückt', 'Absätze mit passenden Konnektoren verbunden'],
    },
  }),
  unit({
    id: 'b2-abwaegen', level: 'B2', title: 'Argumentácia s presnými väzbami',
    goal: 'Použi presnejšie predložky a zosúlaď vlastný názor, dôkaz a protiargument v súvislom texte.',
    requires: ['b2-verknuepfen'], topic: 'prepositions',
    guide: { rule: 'Aufgrund nennt den Grund, trotz einen Einwand und anhand die Grundlage einer Aussage. In formellen Texten kannst du sie mit einer Nominalgruppe im Genitiv verwenden.', example: 'Anhand der aktuellen Zahlen lässt sich der Unterschied erklären.', language: 'de' },
    drills: [
      ['Aufgrund ___ muss die Sitzung verschoben werden. (der Streik, Genitiv)', 'des Streiks', ['prepositions', 'passive'], 'Der Grund steht hier nach aufgrund. Achte auch auf die Endung am Nomen.', 'Im schriftlichen Standard steht der maskuline Genitiv des Streiks.'],
      ['Trotz ___ wurde der Versuch fortgesetzt. (die technischen Schwierigkeiten, Genitiv)', 'der technischen Schwierigkeiten', ['prepositions', 'adjectives', 'passive'], 'Das Nomen steht im Plural. Suche nach dem Genitivartikel im Plural.', 'Im Genitiv Plural heißt es der technischen Schwierigkeiten.'],
      ['Im Gegensatz ___ ersten Vorschlag berücksichtigt die neue Fassung auch die Kosten. (zu + dem)', 'zum', ['prepositions', 'dativ', 'adjectives'], 'Zu und dem können zusammengezogen werden.', 'Im Gegensatz zu verlangt den Dativ. Zum ist die Kurzform von zu dem.', ['zu dem']],
      ['Anhand ___ lässt sich die Veränderung gut erklären. (diese Zahlen, Genitiv)', 'dieser Zahlen', ['prepositions', 'adjectives'], 'Setze die Wortgruppe in den Genitiv Plural.', 'Anhand dieser Zahlen benennt die Grundlage der Erklärung.'],
    ],
    sentences: [
      ['Ersetze den Weil-Satz durch aufgrund. Weil die Nachfrage gesunken ist, wurde das Angebot geändert. Verwende sinkende Nachfrage.', 'Aufgrund der sinkenden Nachfrage wurde das Angebot geändert.', ['prepositions', 'adjectives', 'passive'], 'Nach aufgrund folgt hier eine Nominalgruppe im Genitiv. Behalte den Passivsatz bei.', 'Die Wortgruppe der sinkenden Nachfrage steht im Genitiv Femininum.', ['Das Angebot wurde aufgrund der sinkenden Nachfrage geändert.']],
      ['Drücke den Gegensatz mit trotz aus. Obwohl die Kosten gestiegen sind, würde der Ausschuss das Projekt fortsetzen. Verwende gestiegene Kosten.', 'Trotz der gestiegenen Kosten würde der Ausschuss das Projekt fortsetzen.', ['prepositions', 'subjunctive', 'adjectives'], 'Überführe den Einwand in eine Nominalgruppe. Würde … fortsetzen bleibt bestehen.', 'Trotz der gestiegenen Kosten fasst den Einwand als Nominalgruppe im Genitiv.', ['Der Ausschuss würde das Projekt trotz der gestiegenen Kosten fortsetzen.']],
    ],
    vocabulary: [
      ['wegen eines bestimmten Umstands', 'aufgrund', 'Aufgrund der sinkenden Nachfrage wurde das Angebot geändert.'],
      ['mithilfe von Daten, Beispielen oder anderen Belegen', 'anhand', 'Anhand der Zahlen lassen sich die Kosten vergleichen.'],
      ['das Interesse am Kauf oder an der Nutzung eines Angebots', 'die Nachfrage', 'Die Nachfrage sank im letzten Quartal deutlich.'],
      ['sich um einen bestimmten Punkt kümmern und ihn einbeziehen', 'berücksichtigen', 'Der Bericht berücksichtigt auch die Betriebskosten.'],
    ],
    writing: {
      instruction: 'Deine Stadt überlegt, einen Teil des Verkehrs aus dem Zentrum zu verlagern. Schreibe einen begründeten Beitrag. Stelle zwei Perspektiven gegenüber, nenne eine mögliche unbeabsichtigte Folge und mache einen konkreten Vorschlag.',
      minWords: 125,
      checklist: ['Position und Gegenargument mit Beispielen begründet', 'Zwei präzise Präpositionalausdrücke verwendet', 'Einen realistischen Vorschlag aus der Abwägung abgeleitet'],
    },
    reading: { id: 'b2-verkehr', minCorrect: 3 },
  }),
]
