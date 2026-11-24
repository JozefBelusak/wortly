import type { Word } from '../types'
import { contextNouns } from './contextNouns'
import { contextVerbs } from './contextVerbs'

export const partsOfSpeech = {
  noun: 'Podstatné meno', verb: 'Sloveso', adjective: 'Prídavné meno',
  adverb: 'Príslovka', phrase: 'Fráza', pronoun: 'Zámeno', article: 'Člen',
  conjunction: 'Spojka', preposition: 'Predložka', particle: 'Častica', interjection: 'Citoslovce',
  numeral: 'Číslovka', proper: 'Vlastné meno', other: 'Výraz',
} as const

export interface ContextEntry {
  id: string
  lemma: string
  translation: string
  part: keyof typeof partsOfSpeech
  forms?: string[]
  article?: Word['article']
  plural?: string
  infinitive?: string
  perfect?: string
  meaning?: string
  germanMeaning?: string
  example?: string
  context?: RegExp
}

const special: ContextEntry[] = [
  {
    id: 'belebte-fussgaengerzone', lemma: 'volle Fußgängerzone', translation: 'rušná pešia zóna', part: 'phrase',
    forms: ['vollere Fußgängerzone'], meaning: 'Hovorí o väčšom počte ľudí v pešej zóne.',
    example: 'Am Samstag ist die Fußgängerzone voller als sonst.',
  },
  {
    id: 'morgen-tomorrow', lemma: 'morgen', translation: 'zajtra', part: 'adverb',
    context: /^Morgen\s/iu, example: 'Morgen gehe ich ins Kino.',
  },
  {
    id: 'sie-singular', lemma: 'sie', translation: 'ona', part: 'pronoun',
    context: /^Sie\s+(?:ist|hat|wird|war|hatte|arbeitet|wohnt|wartet|kommt|geht|fährt|erzählt|liest)\b/u,
    example: 'Sie arbeitet heute im Büro.',
  },
  {
    id: 'moechte-wish', lemma: 'möchte', translation: 'chcel by, rád by', part: 'verb',
    forms: ['möchtest', 'möchten', 'möchtet'], infinitive: 'mögen',
    meaning: 'Vyjadruje želanie alebo zdvorilú prosbu.', example: 'Ich möchte einen Kaffee, bitte.',
  },
  {
    id: 'geschlossen-state', lemma: 'geschlossen', translation: 'zatvorený', part: 'adjective',
    context: /\b(?:ist|war|bleibt|blieb|sind|waren)\b.+\bgeschlossen\b/iu,
    meaning: 'Miesto práve nemá otvorené.', example: 'Der Laden ist am Sonntag geschlossen.',
  },
  {
    id: 'vorfreude-aufgeregt', lemma: 'aufgeregt', translation: 'nervózny, vzrušený', part: 'adjective',
    forms: ['aufgeregte', 'aufgeregten', 'aufgeregter', 'aufgeregtes'],
    context: /Fahrstunde|Prüfung|Vorstellungsgespräch|vor dem ersten|vor der ersten/iu,
    meaning: 'Cíti napätie a očakávanie pred niečím, na čom mu záleží.',
    example: 'Ich bin vor der Fahrstunde aufgeregt.',
  },
  {
    id: 'voller-tag', lemma: 'voller Tag', translation: 'nabitý deň', part: 'phrase',
    forms: ['vollen Tag', 'voller Tag', 'vollem Tag', 'volle Tage'],
    meaning: 'Deň s množstvom povinností alebo naplánovaných vecí.',
    example: 'Ich habe heute einen vollen Tag.',
  },
  {
    id: 'nichts-taugen', lemma: 'nichts taugen', translation: 'byť nanič, nestáť za veľa', part: 'phrase',
    forms: ['taugt nichts', 'taugte nichts', 'taugten nichts', 'nichts getaugt', 'taugen nichts'],
    infinitive: 'taugen', perfect: 'hat nichts getaugt',
    meaning: 'Hovorovo hodnotí vec, ktorá je nepoužiteľná alebo zlej kvality.',
    example: 'Der kaputte Toaster taugt nichts.',
  },
  {
    id: 'ins-bett-gehen', lemma: 'ins Bett gehen', translation: 'ísť spať, ísť do postele', part: 'phrase',
    forms: ['ins Bett', 'gehe ins Bett', 'gehst ins Bett', 'geht ins Bett', 'ging ins Bett', 'ins Bett gegangen', 'ins Bett zu gehen'],
    infinitive: 'ins Bett gehen', perfect: 'ist ins Bett gegangen',
    meaning: 'Ukončiť deň a uložiť sa na spánok.',
    example: 'Ich gehe heute früher ins Bett.',
  },
  {
    id: 'bank-sitz', lemma: 'Bank', translation: 'lavička', part: 'noun', article: 'die', plural: 'Bänke',
    forms: ['Bänke', 'Bänken'], context: /sitz|setz|Park|Spielplatz/iu,
    meaning: 'Miesto na sedenie, napríklad v parku.', example: 'Wir sitzen auf einer Bank im Park.',
  },
  {
    id: 'bestand-bibliothek', lemma: 'Bestand', translation: 'knižničný fond', part: 'noun', article: 'der', plural: 'Bestände',
    forms: ['Bestands', 'Bestände'], context: /Bibliothek|Bücher|Medien|ausleihen/iu,
    meaning: 'Knihy a ďalšie médiá, ktoré má knižnica k dispozícii.', example: 'Das Buch gehört zum Bestand der Bibliothek.',
  },
]

const phrases = `
am Bahnhof|na stanici
am Abend|večer
am Morgen|ráno
am Vormittag|dopoludnia
am Nachmittag|popoludní
am Wochenende|cez víkend
auf jeden Fall|v každom prípade
auf dem Laufenden bleiben|byť stále v obraze
Bescheid sagen|dať vedieť|sagt Bescheid,sage Bescheid
eine Entscheidung treffen|urobiť rozhodnutie|eine Entscheidung getroffen
es geht um|ide o
frei haben|mať voľno|hat frei,habe frei,heute frei haben
gegen Mitternacht|približne o polnoci
ein bisschen|trochu, troška
ein paar|niekoľko, zopár
für etwas sprechen|hovoriť v prospech niečoho
im Laufe der Zeit|časom, postupom času
ins Gespräch kommen|dať sa do reči|kommt ins Gespräch
um wie viel Uhr|o koľkej
zu Fuß|pešo
geradeaus fahren|ísť rovno|fährt geradeaus
Guten Morgen|dobré ráno
guten Abend|dobrý večer
im Voraus|vopred
in der Nähe|neďaleko, v blízkosti
in Frage kommen|prichádzať do úvahy|kommt in Frage
ins Fitnessstudio gehen|ísť do fitka|gehe ins Fitnessstudio,geht ins Fitnessstudio,ins Fitnessstudio gegangen
mit dir|s tebou
mit ihr|s ňou
nach Hause|domov
sich freuen auf|tešiť sa na|freut sich auf,freue mich auf
sich interessieren für|zaujímať sa o|interessiere mich für,interessiert sich für
sich treffen|stretnúť sa|trifft sich,treffe mich
sowohl als auch|aj … aj
statt zu|namiesto toho, aby
unterwegs sein|byť na ceste|unterwegs war,unterwegs ist
vor Kurzem|nedávno
zur Arbeit|do práce
zu Hause|doma
Zeit haben|mať čas|habe Zeit,hat Zeit
zum Arzt|k lekárovi
zum Beispiel|napríklad
zur Verfügung stehen|byť k dispozícii|steht zur Verfügung,stehen zur Verfügung
vor allem|predovšetkým
mit dem Rad|na bicykli
ins Auge fallen|padnúť do oka
`

const adjectives = `
alt|starý|älter,ältere,ältesten
anders|iný
ärgerlich|mrzutý, nepríjemný
aufgeregt|rozrušený, nervózny
bequem|pohodlný
beruflich|pracovný, týkajúci sa zamestnania
besser|lepší, lepšie
billig|lacný
direkt|priamy
dringend|naliehavý
echt|skutočný, ozajstný
einfach|jednoduchý
eng|tesný
entspannt|uvoľnený, pokojný
enttäuscht|sklamaný
erfolgreich|úspešný
erschöpft|vyčerpaný
falsch|nesprávny
fertig|hotový
frei|voľný
freiwillig|dobrovoľný
freundlich|priateľský, milý
früh|skorý, skoro
gefüllt|naplnený
gemeinsam|spoločný, spoločne
genau|presný, presne
geöffnet|otvorený
geschlossen|zatvorený
gesund|zdravý
gleich|rovnaký
groß|veľký|größer,größere,größten
gut|dobrý|besser,bessere,besten
häufig|častý
heiß|horúci
hilfreich|užitočný
interessant|zaujímavý
jung|mladý
kalt|studený
kaputt|pokazený
klein|malý
kompliziert|komplikovaný
krank|chorý
kurz|krátky
lang|dlhý|lange,länger,längere,längeren,längerer,längsten
lecker|chutný
langsam|pomalý, pomaly
laut|hlasný
leicht|ľahký
leise|tichý
letzte|posledný, minulý|letzter,letztes,letzten
möglich|možný
müde|unavený
nachhaltig|udržateľný
nah|blízky|näher
nervös|nervózny
nett|milý
neu|nový
nötig|potrebný
nützlich|užitočný
offen|otvorený
praktisch|praktický
pünktlich|dochvíľny, načas
richtig|správny
ruhig|pokojný, tichý
schlecht|zlý
schnell|rýchly, rýchlo|schneller,schnellsten
schön|pekný
schwer|ťažký
schwierig|náročný
sicher|istý, bezpečný
sinnvoll|zmysluplný
spät|neskorý, neskoro|später,spätere,späteren
spannend|napínavý, zaujímavý
stressig|stresujúci
teuer|drahý|teure,teurer,teuren,teurem,teures
typisch|typický
unterschiedlich|rôzny, odlišný
verfügbar|dostupný
verlässlich|spoľahlivý
verantwortlich|zodpovedný
voll|plný
warm|teplý
wichtig|dôležitý
wirklich|skutočný, naozaj
zufrieden|spokojný
berechtigt|oprávnený
brauchbar|použiteľný
begrenzt|obmedzený
besetzt|obsadený
defekt|pokazený
erreichbar|dostupný, dosiahnuteľný
fehlend|chýbajúci
frisch|čerstvý
ganz|celý
günstig|výhodný, lacný
halb|polovičný
hell|svetlý
leer|prázdny
nächst|nasledujúci, najbližší
öffentlich|verejný
provisorisch|dočasný
regulär|riadny, bežný
rot|červený
stark|silný, silno
technisch|technický
unbeabsichtigt|nezamýšľaný
vergangen|minulý, uplynulý
vollständig|úplný
zusätzlich|dodatočný, doplnkový
ander|iný, druhý
extern|externý
kostenlos|bezplatný
mehrere|viacerí, niekoľkí
üblich|bežný
verschieden|rôzny
zweit|druhý
`

const adverbs = `
abends|večer, po večeroch
allerdings|pravdaže; avšak
also|teda, tak
anfangs|spočiatku
auch|aj, tiež
außerdem|okrem toho
bald|čoskoro
bereits|už
bislang|doteraz
dabei|pritom
dafür|za to, na to
damals|vtedy
damit|s tým, pomocou toho
danach|potom
daran|na tom, na to
darauf|na to
darum|preto, o to
dort|tam
drinnen|vnútri
draußen|vonku
deshalb|preto
deswegen|preto, z toho dôvodu
endlich|konečne
erst|až, najskôr
etwa|asi, približne
fast|takmer
früher|kedysi, skôr
gar|vôbec (pri zápore)
gerade|práve
geradeaus|rovno
gern|rád|gerne,am liebsten
gestern|včera
gleich|o chvíľu
heute|dnes
hier|tu
immer|vždy
inzwischen|medzitým
jedoch|avšak
jetzt|teraz
kaum|sotva, takmer vôbec
leider|žiaľ
manchmal|niekedy
meistens|väčšinou
mindestens|minimálne, aspoň
mittlerweile|medzitým, medzičasom
morgen|zajtra
nachmittags|popoludní
natürlich|samozrejme
neulich|nedávno
nie|nikdy
noch|ešte
normalerweise|zvyčajne
nur|iba
oft|často
plötzlich|zrazu
schon|už
selten|zriedkavo
sofort|ihneď
sonst|inak, za iných okolností
tatsächlich|skutočne
trotzdem|napriek tomu, aj tak
überall|všade
ungefähr|približne
unterwegs|na ceste
vielleicht|možno
vorher|predtým
warum|prečo
wann|kedy
wieder|zase, znovu
wo|kde
wohin|kam
woher|odkiaľ
woran|na čom, na čo
worauf|na čo
womit|s čím, čím
zuletzt|naposledy, nakoniec
zuerst|najskôr
zurück|späť
zusammen|spolu
allein|sám, iba
anhand|na základe
besonders|najmä, zvlášť
darüber|o tom, nad tým
dazu|k tomu, na to
davon|o tom, z toho
direkt|priamo
dorthin|tam, tým smerom
eigens|špeciálne na tento účel
fern|ďaleko; časť slovesa fernsehen
hinein|dovnútra
jederzeit|kedykoľvek
künftig|v budúcnosti, po novom
mehr|viac
mittags|na obed
öfter|častejšie
ohnehin|aj tak, tak či tak
sehr|veľmi
so|tak, takto
tagsüber|cez deň
unten|dole
wenig|málo|wenige,wenigen
weshalb|prečo, z akého dôvodu
weiterhin|naďalej
wie|ako
zugleich|zároveň
zunächst|najprv
andererseits|na druhej strane
anderweitig|iným spôsobom
daraus|z toho
dennoch|napriek tomu
dran|na tom, na rade (hovorovo)
einerseits|na jednej strane
einmal|raz
genug|dosť
insgesamt|spolu, celkovo
lieber|radšej
schließlich|napokon, veď
weiter|ďalej
zufolge|podľa
zweimal|dvakrát
`

const functionWords: [ContextEntry['part'], string][] = [
  ['pronoun', 'ich|ja;du|ty;er|on;es|ono;sie|ona, oni, ony;Sie|vy (zdvorilo);wir|my;ihr|vy;ihn|ho;ihm|jemu;ihnen|im;Ihnen|vám (zdvorilo);uns|nás, nám;euch|vás, vám;dir|tebe, ti;dich|teba, ťa;mir|mne, mi;mich|mňa, ma;sich|sa, si;wer|kto|wen,wem,wessen;was|čo;man|neurčitý podmet, ľudia všeobecne;jemand|niekto|jemandem,jemanden;niemand|nikto|niemanden,niemandem;alle|všetci, všetky|allen;beide|obaja, obe|beiden;dieser|tento|diese,dieses,diesem,diesen;dieselbe|tá istá;einige|niektorí, niekoľkí|einigen;jeder|každý|jede,jedem,jeden,jedes;manche|niektorí, niektoré|manchen;viel|veľa|viele,vielen;etwas|niečo;nichts|nič;welcher|ktorý|welche,welches,welchen,welchem;mein|môj|meine,meinen,meinem,meiner,meines;dein|tvoj|deine,deinen,deinem,deiner,deines;sein|jeho|seine,seinen,seinem,seiner,seines;unser|náš|unsere,unseren,unserem,unserer;Ihr|váš (zdvorilo)|Ihre,Ihren,Ihrem,Ihrer;euer|váš|eure,euren,eurem,eurer'],
  ['article', 'der|určitý člen|die,das,dem,den,des;ein|neurčitý člen|eine,einen,einer,einem,eines;kein|záporný člen, žiadny|keine,keinen,keiner,keines,keinem'],
  ['conjunction', 'als|keď (jednorazovo v minulosti), než (pri porovnaní);bevor|predtým, než;bis|kým, až kým;damit|aby;dass|že;denn|lebo;falls|v prípade, že;indem|tým, že;nachdem|potom, čo;ob|či;obwohl|hoci, aj keď;oder|alebo;seitdem|odvtedy, čo;sobald|len čo;sondern|ale (po zápore);sowie|ako aj;aber|ale;sofern|pokiaľ;weder|ani (s noch);sowohl|aj … aj (s als auch);und|a;während|zatiaľ čo;weil|pretože;wenn|keď, ak'],
  ['preposition', 'ab|od;aufgrund|na základe, kvôli;an|pri, k, na|am;auf|na;aus|z, zo;bei|pri, u|beim;durch|cez, prostredníctvom;für|pre, za;gegen|proti, okolo (o čase);hinter|za;in|v, do|im,ins;mit|s, so;nach|po, do, smerom k;neben|vedľa;ohne|bez;pro|za, na (jednotku);seit|od (čas);statt|namiesto;trotz|napriek;über|nad, cez, o;um|okolo, o (čase);unter|pod, medzi;von|od, z|vom;vor|pred;wegen|kvôli;zu|k, do|zum,zur;zwischen|medzi'],
  ['particle', 'doch|predsa;ja|áno, veď;nein|nie;nicht|nie, ne-;mal|raz, len tak (v rozhovore)'],
  ['numeral', 'eins|jeden;zwei|dva;drei|tri;vier|štyri;fünf|päť;sechs|šesť;sieben|sedem;acht|osem;neun|deväť;zehn|desať;elf|jedenásť;zwölf|dvanásť;zwanzig|dvadsať;zweite|druhý;erste|prvý|erster,ersten,erstes'],
  ['interjection', 'Hallo|ahoj'],
  ['other', 'Deutsch|nemčina, po nemecky;Montag|pondelok;Dienstag|utorok;Mittwoch|streda;Donnerstag|štvrtok;Freitag|piatok;Samstag|sobota;Sonntag|nedeľa'],
]

function words(part: ContextEntry['part'], source: string): ContextEntry[] {
  return source.trim().split('\n').map(row => {
    const [lemma, translation, forms = ''] = row.split('|')
    const endings = part === 'adjective' ? ['e', 'en', 'er', 'es', 'em'].map(ending => lemma + ending) : []
    return { id: part + ':' + lemma, lemma, translation, part, forms: [...forms.split(','), ...endings] }
  })
}

const examples: Record<string, string> = {
  'sein': 'Ich bin heute zu Hause.',
  'haben': 'Wir haben noch Zeit.',
  'aufstehen': 'Mia steht früh auf.',
  'wohnen': 'Meine Schwester wohnt in Wien.',
  'gehen': 'Wir gehen nach Hause.',
  'fahren': 'Nora fährt mit dem Bus.',
  'essen': 'Die Kinder essen eine Suppe.',
  'sprechen': 'Wir sprechen über das Wochenende.',
  'trinken': 'Mia trinkt morgens Kaffee.',
  'arbeiten': 'Er arbeitet heute im Büro.',
  'lernen': 'Ich lerne Deutsch.',
  'bestellen': 'Wir bestellen einen Kaffee.',
  'warten': 'Ich warte auf den Bus.',
  'mitbringen': 'Kannst du das Buch mitbringen?',
  'versuchen': 'Ich versuche, pünktlich zu sein.',
  'verschieben': 'Die Ärztin hat den Termin verschoben.',
  'teilnehmen': 'Kannst du an der Besprechung teilnehmen?',
  'aufgeregt': 'Vor dem Konzert ist sie aufgeregt.',
  'erschöpft': 'Nach der Arbeit ist er erschöpft.',
  'müde': 'Ich bin nach der Arbeit müde.',
  'voll': 'Die Flasche ist noch voll.',
  'frei': 'Ich habe am Freitag frei.',
  'Kaffee': 'Mara trinkt Kaffee.',
  'Büro': 'Er arbeitet heute im Büro.',
  'Termin': 'Der Termin ist am Dienstag.',
  'Fahrstunde': 'Meine Fahrstunde beginnt um vier Uhr.',
  'lecker': 'Die Suppe schmeckt lecker.',
  'weil': 'Ich bleibe zu Hause, weil ich krank bin.',
  'obwohl': 'Wir gehen spazieren, obwohl es regnet.',
  'dass': 'Sie sagt, dass sie später kommt.',
  'nach Hause': 'Nach der Arbeit gehe ich nach Hause.',
  'zu Hause': 'Mara bleibt heute zu Hause.',
}

export const contextEntries: ContextEntry[] = [
  ...special,
  ...words('phrase', phrases),
  ...contextNouns.trim().split('\n').map(row => {
    const [lemma, article, plural, translation, aliases = ''] = row.split('|')
    return {
      id: 'noun:' + lemma, lemma, translation, part: 'noun' as const, article: article as Word['article'],
      plural: ['Ferien', 'Leute', 'Daten'].includes(lemma) ? plural + ' (iba plurál)' : plural,
      forms: [plural, ...aliases.split(',')],
    }
  }),
  ...contextVerbs.trim().split('\n').map(row => {
    const [lemma, translation, perfect, aliases = ''] = row.split('|')
    const end = lemma.endsWith('en') ? 2 : 1
    const stem = lemma.slice(0, -end)
    const endings = /[dt]$/u.test(stem) ? ['e', 'est', 'et'] : ['e', 'st', 't']
    return {
      id: 'verb:' + lemma, lemma, translation, part: 'verb' as const, perfect, infinitive: lemma,
      forms: [...aliases.split(','), ...(lemma === 'sein' ? [] : endings.map(ending => stem + ending)), perfect.split(' ').at(-1) ?? '', perfect],
    }
  }),
  ...words('adjective', adjectives),
  ...words('adverb', adverbs),
  ...functionWords.flatMap(([part, rows]) => words(part, rows.replaceAll(';', '\n'))),
  ...words('proper', 'Wien|Viedeň\nBratislava|Bratislava\nBerlin|Berlín\nGraz|Graz\nLinz|Linz\nUlm|Ulm\nLindenau|Lindenau (názov miesta)'),
  ...words('proper', 'Anna Ben Clara Derya Jan Jana Jonas Lea Lena Leon Mara Mia Mila Nina Nora Paul Schuster Tom Weber'.split(' ')
    .map(name => name + '|' + name + ' (meno)').join('\n')),
].map(entry => ({ ...entry, example: ('example' in entry ? entry.example : undefined) ?? examples[entry.lemma] }))
