import type { LessonSeed } from './model'

export const intermediate: LessonSeed[] = [
  {
    id: 'adjektive', level: 'B1', title: 'Koncovky prídavných mien', goal: 'Použi člen ako vodidlo pre koncovku prídavného mena.', tags: ['adjective-endings', 'dative', 'accusative', 'gender'],
    sections: [
      ['S určitým členom', 'Keď der, die, das už jasne označuje rod a pád, v základných tvaroch často stačí -e. Po dem či den v mužskom akuzatíve je -en.', 'Der kleine Hund, ale mit dem kleinen Hund.', 'Das neue Fahrrad steht draußen. Ich sehe den kleinen Hund.', ['Ich sehe den kleine Hund.', 'Ich sehe den kleinen Hund.'], 'adjective-endings', [
        ['Das ___ Fahrrad steht vor dem Haus. (neu)', 'neue'], ['Wir sprechen mit dem ___ Nachbarn. (nett)', 'netten'],
      ]],
      ['S ein a bez člena', 'Tam, kde člen nemá koncovku, ju preberá prídavné meno. Podobne je to pri mein a kein.', 'Ein kleiner Hund, ein neues Fahrrad, ale mit einem kleinen Hund.', 'Sie braucht einen warmen Mantel und frisches Brot.', ['Ich kaufe ein neue Fahrrad.', 'Ich kaufe ein neues Fahrrad.'], 'adjective-endings', [
        ['Wir suchen eine ___ Wohnung. (ruhig)', 'ruhige'], ['Sie kauft ___ Brot. (frisch, ohne Artikel)', 'frisches'],
      ], [['ein + Nominativ', 'ein kleiner Hund · ein neues Haus'], ['einen + Akkusativ', 'einen kleinen Hund'], ['einem + Dativ', 'mit einem kleinen Hund']]],
    ],
    transfer: ['Hľadáme pokojný byt so svetlou kuchyňou.', 'Wir suchen eine ruhige Wohnung mit einer hellen Küche.', [], 'sentence'],
    reading: ['Eine Anzeige', 'Die Anzeige beschreibt eine günstige Wohnung. Sie hat eine helle Küche, aber keinen großen Balkon. Hinter dem alten Haus liegt ein kleiner Garten.', ['Wie ist die Küche? Antworte in einem Satz.', 'Die Küche ist hell.', ['Sie ist hell.', 'Die Wohnung hat eine helle Küche.']]],
  },
  {
    id: 'relativsaetze', level: 'B1', title: 'Relatívne vety', goal: 'Doplň opis osoby alebo veci vhodným zámenom.', tags: ['relative', 'relative-prep', 'dative', 'accusative', 'subordinate'],
    sections: [
      ['Rod a pád zámena', 'Rod a číslo preberáš z opisovaného slova. Pád určuje funkcia zámena v novej vete.', 'Der opisuje mužský podmet, den mužský priamy predmet.', 'Das ist der Mann, der hier arbeitet. Das ist der Mann, den ich kenne.', ['Das ist der Mann, der ich kenne.', 'Das ist der Mann, den ich kenne.'], 'relative', [
        ['Das ist der Kollege, ___ hier arbeitet.', 'der'], ['Das ist der Ordner, ___ ich gestern gekauft habe.', 'den'],
      ]],
      ['S predložkou', 'Predložka stojí priamo pred zámenom a určuje jeho pád.', 'Mit má Dativ. Veta sa skončí časovaným slovesom.', 'Das ist die Kollegin, mit der ich gestern gesprochen habe.', ['Das ist der Kollege, mit den ich arbeite.', 'Das ist der Kollege, mit dem ich arbeite.'], 'relative-prep', [
        ['Das ist der Freund, mit ___ ich fahre.', 'dem'], ['Das ist die Lehrerin, von ___ ich viel gelernt habe.', 'der'],
      ], [['Nominativ', 'der · die · das · die'], ['Akkusativ', 'den · die · das · die'], ['Dativ', 'dem · der · dem · denen']]],
    ],
    transfer: ['Toto je kamarát, s ktorým som včera hovoril o kurze.', 'Das ist der Freund, mit dem ich gestern über den Kurs gesprochen habe.', [], 'sentence'],
    reading: ['Ein neuer Kollege', 'Mia kennt einen Kollegen, der in Graz wohnt. Er hat einen Hund, den er oft ins Büro mitbringt. Mit der Kollegin, die im Erdgeschoss sitzt, geht er manchmal Kaffee trinken.', ['Was bringt der Kollege oft ins Büro mit?', 'Der Kollege bringt oft seinen Hund ins Büro mit.', ['Er bringt oft seinen Hund mit.', 'Er bringt seinen Hund ins Büro mit.', 'Er bringt oft seinen Hund ins Büro mit.']]],
  },
  {
    id: 'konjunktiv', level: 'B1', title: 'Konjunktiv II a zdvorilé návrhy', goal: 'Formuluj hypotézu, radu alebo zdvorilú prosbu.', tags: ['subjunctive', 'wenn', 'modal-present', 'subordinate'],
    sections: [
      ['Hätte, wäre a würde', 'Hypotéza s wenn hovorí o situácii, ktorú si predstavuješ. Pri haben a sein sú bežné krátke tvary hätte a wäre.', 'Vo vedľajšej vete ide hätte alebo wäre na koniec. Würde sa spája s infinitívom.', 'Wenn ich mehr Zeit hätte, würde ich öfter kochen.', ['Wenn ich hätte Zeit, würde ich kommen.', 'Wenn ich Zeit hätte, würde ich kommen.'], 'subjunctive', [
        ['Wenn ich mehr Zeit ___, würde ich kommen. (haben, Konjunktiv II)', 'hätte'], ['Wenn das Café offen ___, würde ich dort warten. (sein, Konjunktiv II)', 'wäre'],
      ]],
      ['Könnte a sollte', 'Könnten Sie zjemní prosbu. Du solltest dáva odporúčanie.', 'Pri návrhu alebo rade ostáva významové sloveso v infinitíve.', 'Könnten Sie mir helfen? Du solltest zuerst anrufen.', ['Könnten Sie mir helfen Sie?', 'Könnten Sie mir helfen?'], 'subjunctive', [
        ['Melde eine höfliche Bitte. Können Sie mir helfen? (Konjunktiv II)', 'Könnten Sie mir helfen?'],
        ['Du ___ vor dem Termin anrufen. (sollen, Konjunktiv II)', 'solltest'],
      ]],
    ],
    review: {
      0: [['Wenn das Büro morgen offen ___, würde ich dort anrufen. (sein, Konjunktiv II)', 'wäre'], ['Wenn wir mehr Geld ___, würden wir reisen. (haben, Konjunktiv II)', 'hätten']],
      1: [['Formuliere höflich. Können Sie hier warten? (Konjunktiv II)', 'Könnten Sie hier warten?'], ['Ihr ___ den Plan zuerst lesen. (sollen, Konjunktiv II)', 'solltet']],
    },
    transfer: ['Keby som mal viac času, častejšie by som chodil do fitka.', 'Wenn ich mehr Zeit hätte, würde ich öfter ins Fitnessstudio gehen.', ['Ich würde öfter ins Fitnessstudio gehen, wenn ich mehr Zeit hätte.'], 'sentence'],
    reading: ['Ein Rat von einer Freundin', 'Ben möchte einen Kurs besuchen, hat aber wenig Zeit. Lea sagt: Wenn ich an deiner Stelle wäre, würde ich nach einem Abendkurs fragen. Du könntest direkt im Büro anrufen.', ['Was würde Lea zuerst tun?', 'Lea würde nach einem Abendkurs fragen.', ['Sie würde nach einem Abendkurs fragen.']]],
    test: [['Wenn ich ein Auto ___, würde ich fahren. (haben, Konjunktiv II)', 'hätte'], ['Wenn das Wetter besser ___, könnten wir draußen essen.', 'wäre'], ['Formuliere die Bitte mit könnten. Sie schicken mir den Vertrag.', 'Könnten Sie mir den Vertrag schicken?'], ['Daj radu s sollte. On by mal menej pracovať.', 'Er sollte weniger arbeiten.', [], 'sentence'], ['Keby som tam bol, počkal by som na teba.', 'Wenn ich dort wäre, würde ich auf dich warten.', ['Ich würde auf dich warten, wenn ich dort wäre.'], 'sentence']],
  },
  {
    id: 'obwohl-trotzdem', level: 'B1', title: 'Obwohl a trotzdem', goal: 'Vyjadri prekvapivý výsledok napriek prekážke.', tags: ['obwohl', 'trotzdem', 'subordinate', 'v2', 'perfect'],
    sections: [
      ['Obwohl uvádza prekážku', 'Obwohl znamená „hoci“. Prekážka je vo vedľajšej vete.', 'Po obwohl stojí časované sloveso na konci.', 'Obwohl ich müde bin, gehe ich arbeiten.', ['Obwohl ich bin müde, gehe ich arbeiten.', 'Obwohl ich müde bin, gehe ich arbeiten.'], 'obwohl', [
        ['Verbinde mit Obwohl am Anfang. Es regnet. Wir gehen spazieren.', 'Obwohl es regnet, gehen wir spazieren.'],
        ['Oprav vetu. Obwohl ich bin krank, bleibe ich im Büro.', 'Obwohl ich krank bin, bleibe ich im Büro.', [], 'correction', 'sk'],
      ]],
      ['Trotzdem uvádza výsledok', 'Trotzdem znamená „napriek tomu“. Stojí v hlavnej vete rovnako ako deshalb.', 'Keď trotzdem začne vetu, hneď za ním je časované sloveso.', 'Ich bin müde. Trotzdem gehe ich arbeiten.', ['Es ist kalt. Trotzdem wir gehen raus.', 'Es ist kalt. Trotzdem gehen wir raus.'], 'trotzdem', [
        ['Forme zwei Sätze. Es ist kalt. Wir gehen raus. Verwende Trotzdem.', 'Es ist kalt. Trotzdem gehen wir raus.'],
        ['Oprav vetu. Der Bus war spät. Trotzdem wir haben den Zug erreicht.', 'Der Bus war spät. Trotzdem haben wir den Zug erreicht.', [], 'correction', 'sk'],
      ]],
    ],
    review: {
      0: [['Verbinde mit Obwohl. Es war laut. Nina blieb im Zimmer.', 'Obwohl es laut war, blieb Nina im Zimmer.'], ['Ergänze nach obwohl. Wir liefen, obwohl ___. (es / regnen, Präteritum)', 'es regnete']],
      1: [['Verbinde mit Trotzdem im zweiten Satz. Der Plan ist teuer. Wir versuchen es.', 'Der Plan ist teuer. Trotzdem versuchen wir es.'], ['Oprav. Es war spät. Trotzdem er lernte weiter.', 'Es war spät. Trotzdem lernte er weiter.', [], 'correction', 'sk']],
    },
    transfer: ['Hoci som včera musel dlho pracovať, potom som ešte išiel do fitka. Začni slovom Obwohl.', 'Obwohl ich gestern lange arbeiten musste, bin ich danach noch ins Fitnessstudio gegangen.', [], 'sentence'],
    reading: ['Ein Lauf im Regen', 'Obwohl es stark regnete, ging Nina laufen. Der Park war leer. Trotzdem blieb sie eine ganze Stunde draußen. Danach hat sie sich zu Hause ausgeruht.', ['Wie lange blieb Nina draußen?', 'Nina blieb eine ganze Stunde draußen.', ['Sie blieb eine ganze Stunde draußen.', 'Sie blieb eine Stunde draußen.', 'Eine ganze Stunde blieb sie draußen.']]],
    test: [['Verbinde mit Obwohl. Tom ist müde. Er fährt zur Arbeit.', 'Obwohl Tom müde ist, fährt er zur Arbeit.'], ['Oprav. Obwohl es hat geregnet, sind wir gefahren.', 'Obwohl es geregnet hat, sind wir gefahren.', [], 'correction', 'sk'], ['Ich war müde. Trotzdem ___ ich gekommen. (haben oder sein)', 'bin'], ['Oprav. Es war kalt. Trotzdem wir gingen raus.', 'Es war kalt. Trotzdem gingen wir raus.', [], 'correction', 'sk'], ['Hoci sa autobus oneskoril, prišli sme načas.', 'Obwohl der Bus sich verspätet hat, sind wir pünktlich angekommen.', ['Obwohl sich der Bus verspätet hat, sind wir pünktlich angekommen.'], 'sentence']],
  },
  {
    id: 'vergangenheit', level: 'B1', title: 'Präteritum a Plusquamperfekt', goal: 'Vyrozprávaj udalosti v minulosti a označ, čo sa stalo skôr.', tags: ['preterite', 'pluperfect', 'participle', 'time-clause'],
    sections: [
      ['Präteritum v príbehu', 'Tvary war a hatte sú časté aj v rozhovore. V písanom príbehu sa pridávajú tvary ako ging, kam a schrieb.', 'Pri zmene času zachovaj slovosled a zmeň časovaný tvar.', 'Lea war müde. Sie ging nach Hause.', ['Gestern ist Lea müde. (Präteritum)', 'Gestern war Lea müde.'], 'preterite', [
        ['Die Bahn ___ gestern zu spät an. (ankommen, Präteritum)', 'kam'], ['Tom ___ gestern eine Nachricht. (schreiben, Präteritum)', 'schrieb'],
      ]],
      ['Ktorý dej bol skôr', 'Plusquamperfekt pomáha odlíšiť skorší dej od neskoršieho. S nachdem vysvetlíš poradie.', 'Spoj hatte alebo war s Partizipom. Po nachdem je pomocné sloveso na konci.', 'Nachdem er die Tür geöffnet hatte, ging er hinein.', ['Nachdem er hatte die Tür geöffnet, ging er hinein.', 'Nachdem er die Tür geöffnet hatte, ging er hinein.'], 'pluperfect', [
        ['Nachdem sie gegessen ___, ging sie nach Hause. (Plusquamperfekt)', 'hatte'], ['Nachdem wir angekommen ___, riefen wir an. (Plusquamperfekt)', 'waren'],
      ]],
    ],
    transfer: ['Keď Ben dopísal e-mail, išiel domov. Použi nachdem, Plusquamperfekt a Präteritum.', 'Nachdem Ben die E-Mail geschrieben hatte, ging er nach Hause.', ['Ben ging nach Hause, nachdem er die E-Mail geschrieben hatte.'], 'sentence'],
    reading: ['Ein unerwarteter Anruf', 'Mia war spät dran. Nachdem sie das Büro verlassen hatte, rief ein Kollege an. Mia kam zurück, weil sie ihren Schlüssel vergessen hatte.', ['Warum kam Mia zurück?', 'Mia kam zurück, weil sie ihren Schlüssel vergessen hatte.', ['Sie kam zurück, weil sie ihren Schlüssel vergessen hatte.', 'Weil sie ihren Schlüssel vergessen hatte.', 'Sie hatte ihren Schlüssel vergessen.']]],
    test: [['Ben ___ am Morgen nach Hause. (gehen, Präteritum)', 'ging'], ['Nachdem Mia angekommen ___, begann das Treffen.', 'war'], ['Sie ___ schon gegessen, bevor der Besuch kam. (Plusquamperfekt)', 'hatte'], ['Oprav slovosled. Nachdem Tom hatte gekocht, aß er.', 'Nachdem Tom gekocht hatte, aß er.', [], 'correction', 'sk'], ['Oprav vetu. Nachdem wir sind angekommen, haben wir gewartet. Použi Plusquamperfekt v prvej časti.', 'Nachdem wir angekommen waren, haben wir gewartet.', [], 'correction', 'sk']],
  },
  {
    id: 'passiv-grundlagen', level: 'B1', title: 'Základy pasíva', goal: 'Presuň pozornosť z osoby na dej alebo na to, čo sa spracúva.', tags: ['passive-present', 'conjugation', 'participle', 'accusative', 'nominative'],
    sections: [
      ['Werden a Partizip', 'V ozname často záleží na tom, čo sa robí. Kto to robí, môžeš vynechať.', 'Pri deji použi werden a Partizip II na konci.', 'Der Antrag wird geprüft. Die Türen werden repariert.', ['Die Türen wird repariert.', 'Die Türen werden repariert.'], 'passive-present', [
        ['Der Bericht ___ geprüft. (Passiv im Präsens)', 'wird'], ['Die Zimmer ___ gereinigt. (Passiv im Präsens)', 'werden'],
      ]],
      ['Z aktíva do pasíva', 'Priamy predmet môže byť v pasíve podmetom. Môžeš doplniť pôvodcu s von.', 'Den Bericht → der Bericht. Von der Redaktion používa Dativ.', 'Die Redaktion prüft den Bericht. Der Bericht wird von der Redaktion geprüft.', ['Den Bericht wird geprüft.', 'Der Bericht wird geprüft.'], 'passive-present', [
        ['Schreib im Passiv. Man öffnet das Fenster.', 'Das Fenster wird geöffnet.'], ['Schreib im Passiv. Man prüft die Anträge.', 'Die Anträge werden geprüft.'],
      ]],
    ],
    review: {
      0: [['Das Paket ___ heute geliefert. (Vorgangspassiv, Präsens)', 'wird'], ['Die Stühle ___ jetzt repariert. (Vorgangspassiv, Präsens)', 'werden']],
      1: [['Schreib im Passiv. Man öffnet die Türen.', 'Die Türen werden geöffnet.'], ['Schreib im Passiv mit von. Die Redaktion veröffentlicht den Text.', 'Der Text wird von der Redaktion veröffentlicht.']],
    },
    transfer: ['Správa sa kontroluje a žiadosti sa posielajú dnes.', 'Der Bericht wird geprüft und die Anträge werden heute verschickt.', ['Der Bericht wird geprüft. Die Anträge werden heute verschickt.'], 'sentence'],
    reading: ['Im Rathaus', 'Die Anträge werden morgens gesammelt. Danach werden die Unterlagen geprüft. Am Nachmittag wird eine Nachricht verschickt.', ['Was wird am Nachmittag verschickt?', 'Am Nachmittag wird eine Nachricht verschickt.', ['Eine Nachricht wird am Nachmittag verschickt.', 'Es wird eine Nachricht verschickt.']]],
    test: [['Die Pakete ___ morgen verschickt. (Passiv Präsens)', 'werden'], ['Der Vertrag ___ heute unterschrieben. (Passiv Präsens)', 'wird'], ['Schreib im Passiv. Man repariert die Brücke.', 'Die Brücke wird repariert.'], ['Oprav vetu. Das Zimmer werden geputzt.', 'Das Zimmer wird geputzt.', [], 'correction', 'sk'], ['Dnes sa opravuje hlavný vchod.', 'Heute wird der Haupteingang repariert.', ['Der Haupteingang wird heute repariert.'], 'sentence']],
  },
  {
    id: 'indirekte-fragen', level: 'B1', title: 'Nepriame otázky a wo-/da- tvary', goal: 'Pýtaj sa zdvorilo a nahraď spojenie predložky s vecou.', tags: ['indirect', 'da-wo', 'verb-prep', 'subordinate', 'v2'],
    sections: [
      ['Ob alebo opytovacie slovo', 'Nepriama otázka je súčasťou inej vety. Pri áno/nie použiješ ob. Pri wann, wo, wie či wohin slovo zostane.', 'Včlenená otázka končí časovaným slovesom.', 'Ich weiß nicht, ob der Bus kommt. Weißt du, wann der Bus kommt?', ['Ich weiß nicht, ob kommt der Bus.', 'Ich weiß nicht, ob der Bus kommt.'], 'indirect', [
        ['Ergänze nur die Frage nach ob. Fährt der Bus heute?', 'der Bus heute fährt'], ['Bilde mit Ich weiß nicht. Wann öffnet das Büro?', 'Ich weiß nicht, wann das Büro öffnet.'],
      ]],
      ['Worauf a darauf', 'S wo- sa pýtaš na vec, s da- sa na ňu odvoláš. Pred samohláskou sa pridáva r.', 'Auf → worauf/darauf, an → woran/daran, mit → womit/damit.', 'Worauf wartest du? Ich warte darauf, dass der Kurs beginnt.', ['Woauf wartest du?', 'Worauf wartest du?'], 'da-wo', [
        ['___ denkst du? (denken an, Frage nach einer Sache)', 'Woran', ['woran']], ['Ich öffne die Tür mit dem Schlüssel. Jetzt: Ich öffne sie ___.', 'damit'],
      ], [['auf', 'worauf · darauf'], ['an', 'woran · daran'], ['mit', 'womit · damit']]],
    ],
    transfer: ['Mohli by ste mi povedať, na čom závisí termín? Použi abhängen von.', 'Könnten Sie mir sagen, wovon der Termin abhängt?', ['Könnten Sie mir bitte sagen, wovon der Termin abhängt?'], 'sentence'],
    reading: ['Eine Frage zum Kurs', 'Mia weiß nicht, ob der Kurs am Montag beginnt. Sie fragt im Büro, wann der erste Termin ist. Die Antwort lautet: Der erste Termin hängt davon ab, ob der Raum frei ist.', ['Wovon hängt der erste Termin ab?', 'Der erste Termin hängt davon ab, ob der Raum frei ist.', ['Er hängt davon ab, ob der Raum frei ist.', 'Das hängt davon ab, ob der Raum frei ist.']]],
    test: [['Ich weiß nicht, ___ Tom heute kommt. (Ja-Nein-Frage)', 'ob'], ['Bilde mit Weißt du. Wo wohnt Nina?', 'Weißt du, wo Nina wohnt?'], ['Oprav vetu. Können Sie mir sagen, wann öffnet das Büro?', 'Können Sie mir sagen, wann das Büro öffnet?', [], 'correction', 'sk'], ['Ich warte auf die Antwort. Ich warte ___.', 'darauf'], ['___ öffnest du die Kiste? (Frage zum Werkzeug)', 'Womit', ['womit']]],
  },
  {
    id: 'temporalsaetze', level: 'B1', title: 'Časové vedľajšie vety', goal: 'Rozlíš jednorazový dej, opakovanie, súbeh a hranicu.', tags: ['als-wenn', 'time-clause', 'subordinate', 'pluperfect', 'v2'],
    sections: [
      ['Als alebo wenn', 'Als používaš pre jednorazový moment alebo obdobie v minulosti. Wenn je vhodné pri opakovaní alebo podmienke.', 'Hľadaj jeden konkrétny dej alebo signál opakovania ako immer.', 'Als ich nach Wien zog, kannte ich dort niemanden. Wenn ich Zeit hatte, ging ich laufen.', ['Wenn ich gestern ankam, wartete sie.', 'Als ich gestern ankam, wartete sie.'], 'als-wenn', [
        ['___ ich gestern nach Hause kam, war es still. (als / wenn)', 'Als', ['als']], ['Immer ___ der Bus spät kam, ging ich zu Fuß. (als / wenn)', 'wenn'],
      ]],
      ['Poradie a trvanie', 'Bevor a nachdem zoraďujú deje. Während ich čítaš ako súbeh alebo kontrast podľa kontextu. Seitdem a bis označujú začiatok a hranicu obdobia.', 'V časovej vedľajšej vete je časované sloveso na konci.', 'Während sie kochte, las ich. Ich warte, bis du zurückkommst.', ['Ich warte, bis du kommst zurück.', 'Ich warte, bis du zurückkommst.'], 'time-clause', [
        ['Verbinde mit bis. Ich bleibe hier. Du kommst zurück.', 'Ich bleibe hier, bis du zurückkommst.'],
        ['___ ich hier arbeite, fahre ich mit dem Zug. (seitdem / bis, od začiatku až doteraz)', 'Seitdem', ['seitdem']],
      ], [['súbeh', 'während'], ['predtým / potom', 'bevor · nachdem'], ['odvtedy / až do', 'seitdem · bis']]],
    ],
    review: { 0: [['___ ich letztes Jahr in Wien war, besuchte ich ein Museum. (als / wenn)', 'Als', ['als']], ['Immer ___ ich früh aufstand, war die Straße still. (als / wenn)', 'wenn']] },
    transfer: ['Keď sme včera prišli na stanicu, čakali sme, kým prišiel vlak. Použi als a bis.', 'Als wir gestern am Bahnhof ankamen, warteten wir, bis der Zug kam.', ['Wir warteten, bis der Zug kam, als wir gestern am Bahnhof ankamen.'], 'sentence'],
    test: [['___ ich gestern ankam, ging der Kurs los. (als / wenn)', 'Als', ['als']], ['Immer ___ sie Zeit hatte, fuhr sie mit dem Rad. (als / wenn)', 'wenn'], ['Verbinde mit Bevor am Anfang. Wir fahren los. Wir kaufen zuerst Brot.', 'Bevor wir losfahren, kaufen wir Brot.'], ['Oprav. Ich bleibe hier, bis du kommst zurück.', 'Ich bleibe hier, bis du zurückkommst.', [], 'correction', 'sk'], ['Kým si Lea varila, Tom čítal. Začni Während.', 'Während Lea kochte, las Tom.', [], 'sentence']],
    reading: ['Ein Nachmittag am Bahnhof', 'Als Ben am Bahnhof ankam, regnete es. Während er wartete, las er einen Artikel. Er blieb im Wartezimmer, bis der Zug kam.', ['Was machte Ben, während er wartete?', 'Ben las einen Artikel, während er wartete.', ['Er las einen Artikel.', 'Während er wartete, las Ben einen Artikel.', 'Während er wartete, las er einen Artikel.']]],
  },
  {
    id: 'genitiv-wortbildung', level: 'B1', title: 'Genitiv, n-Deklination a slovotvorba', goal: 'Rozpoznaj, komu niečo patrí, a ako vznikajú nové tvary slov.', tags: ['genitive', 'noun-declension', 'word-formation', 'inseparable', 'participle'],
    sections: [
      ['Vlastníctvo a koncovka -n', 'V písanom texte Genitiv vyjadruje príslušnosť. Niektoré mužské slová, ako Student, pridávajú v nepriamych pádoch -en.', 'Der Student → den Studenten / dem Studenten / des Studenten.', 'Das Fahrrad des Studenten ist neu. Ich helfe dem Studenten.', ['Das Fahrrad des Student ist neu.', 'Das Fahrrad des Studenten ist neu.'], 'noun-declension', [
        ['Ich sehe den ___. (der Student)', 'Studenten'], ['Das ist das Buch ___ Lehrers. (bestimmter Artikel)', 'des'],
      ]],
      ['Predpona alebo prípona', 'Be- a ver- sú neodlučiteľné. Prípona -ung často vytvára ženské podstatné meno zo slovesa.', 'Besuchen → besucht. Wohnen → die Wohnung.', 'Wir haben die Wohnung besichtigt. Der Zug hat Verspätung.', ['Wir haben die Wohnung gebesichtigt.', 'Wir haben die Wohnung besichtigt.'], 'word-formation', [
        ['Schreib das Partizip II. besuchen', 'besucht'], ['Bilde ein Nomen zu wohnen mit Artikel.', 'die Wohnung'],
      ]],
    ],
    review: {
      0: [['Wir helfen dem neuen ___. (der Kollege)', 'Kollegen'], ['Das Dach ___ Hauses ist rot. (bestimmter Artikel)', 'des']],
      1: [['Bilde ein Nomen mit -ung und Artikel. erklären', 'die Erklärung'], ['Schreib das Partizip II. verstehen', 'verstanden']],
    },
    transfer: ['Včera sme navštívili študenta a potom sme videli byt jeho učiteľa.', 'Gestern haben wir den Studenten besucht und danach die Wohnung seines Lehrers gesehen.', ['Wir haben gestern den Studenten besucht und danach die Wohnung seines Lehrers gesehen.'], 'sentence'],
    reading: ['Die Wohnung des Studenten', 'Die Wohnung des Studenten liegt neben der Universität. Seine Freundin besucht ihn oft. Gestern hat der Vermieter die Wohnung besichtigt und eine Reparatur vereinbart.', ['Wer hat die Wohnung gestern besichtigt?', 'Der Vermieter hat die Wohnung gestern besichtigt.', ['Gestern hat der Vermieter die Wohnung besichtigt.']]],
    test: [['Wir haben den ___ besucht. (der Student)', 'Studenten'], ['Die Tür ___ Hauses ist offen. (bestimmter Artikel)', 'des'], ['Schreib das Partizip II. verpassen', 'verpasst'], ['Bilde ein Nomen mit -ung und Artikel. verspätet', 'die Verspätung'], ['To je bicykel študenta. Použi Genitiv.', 'Das ist das Fahrrad des Studenten.', [], 'sentence']],
  },
]
