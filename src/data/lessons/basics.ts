import type { LessonSeed } from './model'

export const basics: LessonSeed[] = [
  {
    id: 'sein-haben', level: 'A1', title: 'Sein a haben', goal: 'Povedz, kto si, ako ti je a čo máš.', tags: ['conjugation'],
    sections: [
      ['Sein', 'Sein vyjadruje stav, totožnosť alebo miesto.', 'Priraď si ku každému podmetu jeho tvar.', 'Ich bin zu Hause. Du bist im Büro.', ['Du ist müde.', 'Du bist müde.'], 'conjugation', [
        ['Ich ___ heute zu Hause. (sein)', 'bin'], ['Ihr ___ schon da. (sein)', 'seid'],
      ], [['ich / du / er', 'bin / bist / ist'], ['wir / ihr / sie', 'sind / seid / sind']]],
      ['Haben', 'Haben používaš pri veciach, čase aj pocitoch ako hlad.', 'Pri du a er/sie/es si zapamätaj hast a hat.', 'Ich habe Hunger. Sie hat Zeit.', ['Er habt Hunger.', 'Er hat Hunger.'], 'conjugation', [
        ['Du ___ eine Frage. (haben)', 'hast'], ['Wir ___ morgen frei. (haben)', 'haben'],
      ]],
    ],
    transfer: ['Dnes som doma a mám čas.', 'Heute bin ich zu Hause und habe Zeit.', ['Ich bin heute zu Hause und habe Zeit.'], 'sentence'],
    reading: ['Ein Nachmittag zu Hause', 'Mara ist heute zu Hause. Ihr Bruder ist im Büro. Mara hat Zeit und kocht eine Suppe. Dazu hat sie noch Brot.', ['Wo ist Mara heute? Antworte in einem Satz.', 'Mara ist heute zu Hause.', ['Sie ist heute zu Hause.', 'Heute ist Mara zu Hause.', 'Mara ist zu Hause.', 'Sie ist zu Hause.']]],
    test: [['Er ___ in der Küche. (sein)', 'ist'], ['Du ___ Hunger. (haben)', 'hast'], ['Sie (Plural) ___ am Bahnhof. (sein)', 'sind'], ['Ihr ___ zwei Fahrräder. (haben)', 'habt'], ['Dnes som v práci a mám veľa času.', 'Heute bin ich bei der Arbeit und habe viel Zeit.', ['Ich bin heute bei der Arbeit und habe viel Zeit.', 'Heute bin ich auf der Arbeit und habe viel Zeit.'], 'sentence']],
  },
  {
    id: 'praesens', level: 'A1', title: 'Prítomný čas', goal: 'Vyber správne zakončenie podľa podmetu.', tags: ['conjugation', 'v2'],
    sections: [
      ['Pravidelné koncovky', 'Pri pravidelnom slovese zmeň koncovku, kmeň zostáva.', 'Ich má často -e, du -st a er/sie/es -t.', 'Ich wohne in Wien. Du wohnst in Linz.', ['Du wohne hier.', 'Du wohnst hier.'], 'conjugation', [
        ['Ich ___ jeden Tag Deutsch. (lernen)', 'lerne'], ['Du ___ im Zentrum. (wohnen)', 'wohnst'],
      ], [['ich · du · er/sie/es', '-e · -st · -t'], ['wir · ihr · sie/Sie', '-en · -t · -en']]],
      ['Zmena v kmeni', 'Niektoré slovesá menia samohlásku pri du a er/sie/es.', 'Pri fahren používaj fährst a fährt, pri sprechen sprichst a spricht.', 'Heute fährt Mia nach Hause. Wir fahren morgen.', ['Er sprecht Deutsch.', 'Er spricht Deutsch.'], 'conjugation', [
        ['Du ___ heute nach Hause. (fahren)', 'fährst'], ['Sie (Singular) ___ sehr leise. (sprechen)', 'spricht'],
      ]],
    ],
    transfer: ['Zajtra cestuje Nina do Berlína a ja pracujem doma.', 'Morgen fährt Nina nach Berlin und ich arbeite zu Hause.', ['Nina fährt morgen nach Berlin und ich arbeite zu Hause.'], 'sentence'],
    reading: ['Zwei Arbeitswege', 'Jana wohnt in Ulm und arbeitet im Zentrum. Sie fährt morgens mit dem Bus. Ihr Bruder arbeitet in der Nähe und geht zu Fuß.', ['Wie fährt Jana morgens zur Arbeit?', 'Sie fährt morgens mit dem Bus.', ['Jana fährt morgens mit dem Bus.', 'Sie fährt mit dem Bus.', 'Jana fährt mit dem Bus.']]],
  },
  {
    id: 'fragen', level: 'A1', title: 'Otázky', goal: 'Spýtaj sa na miesto, čas alebo potvrdenie.', tags: ['conjugation', 'v2', 'wo'],
    sections: [
      ['Otázka s opytovacím slovom', 'Wo zisťuje miesto, wann čas a wie spôsob.', 'Po opytovacom slove stojí časované sloveso a potom podmet.', 'Wo wohnst du?', ['Wo du wohnst?', 'Wo wohnst du?'], 'v2', [
        ['Ordne die Frage. (wo / du / arbeiten)', 'Wo arbeitest du?'],
        ['Spýtaj sa: Kedy prídeš?', 'Wann kommst du?', [], 'sentence'],
      ]],
      ['Otázka áno alebo nie', 'Keď sa pýtaš na potvrdenie, opytovacie slovo vynecháš.', 'Časované sloveso stojí na začiatku.', 'Hast du morgen Zeit?', ['Du hast morgen Zeit? (neutrálna otázka)', 'Hast du morgen Zeit?'], 'conjugation', [
        ['Forme eine Ja-Nein-Frage. Du lernst Deutsch.', 'Lernst du Deutsch?'], ['Forme eine Ja-Nein-Frage. Ihr seid fertig.', 'Seid ihr fertig?'],
      ]],
    ],
    transfer: ['Kde bývaš a máš zajtra čas?', 'Wo wohnst du und hast du morgen Zeit?', ['Wo wohnst du? Hast du morgen Zeit?'], 'sentence'],
    reading: ['Eine kurze Nachricht', 'Nina schreibt Tom: Kommst du morgen? Wann bist du am Bahnhof? Tom antwortet: Ja, ich komme. Um acht bin ich dort.', ['Um wie viel Uhr ist Tom am Bahnhof?', 'Tom ist um acht Uhr am Bahnhof.', ['Er ist um acht Uhr am Bahnhof.', 'Tom ist um acht am Bahnhof.', 'Um acht Uhr ist Tom am Bahnhof.']]],
    test: [['Ordne. (wann / ihr / kommen)', 'Wann kommt ihr?'], ['Ordne. (was / du / trinken)', 'Was trinkst du?'], ['Spýtaj sa, či Lea dnes pracuje. Použi arbeitet.', 'Arbeitet Lea heute?', [], 'sentence'], ['Forme eine Ja-Nein-Frage. Ihr kommt aus Wien.', 'Kommt ihr aus Wien?'], ['Ako sa voláš?', 'Wie heißt du?', [], 'sentence']],
  },
  {
    id: 'hauptsatz', level: 'A1', title: 'Základný slovosled', goal: 'Začni vetu osobou, časom alebo miestom a udrž sloveso na druhej pozícii.', tags: ['v2', 'conjugation', 'wo'],
    sections: [
      ['Podmet na začiatku', 'V neutrálnej vete často najprv povieš, kto niečo robí.', 'Časované sloveso je druhý vetný člen.', 'Mia lernt heute Deutsch.', ['Mia heute lernt Deutsch.', 'Mia lernt heute Deutsch.'], 'v2', [
        ['Ordne neutral. (Mia / heute / kocht / Suppe)', 'Mia kocht heute Suppe.'], ['Ordne mit Tom am Anfang. (Tom / morgen / arbeitet)', 'Tom arbeitet morgen.'],
      ]],
      ['Čas alebo miesto na začiatku', 'Dnes alebo doma môže stáť na prvom mieste. Podmet sa presunie za sloveso.', 'Po Heute alebo Zu Hause nasleduje časované sloveso.', 'Heute lerne ich Deutsch. Zu Hause koche ich.', ['Heute ich lerne Deutsch.', 'Heute lerne ich Deutsch.'], 'v2', [
        ['Beginne mit Morgen. Ich kaufe Brot.', 'Morgen kaufe ich Brot.'], ['Beginne mit Im Büro. Nina arbeitet am Nachmittag.', 'Im Büro arbeitet Nina am Nachmittag.'],
      ]],
    ],
    transfer: ['Dnes pracujem doma a zajtra pracujem v kancelárii. Začni slovom Heute.', 'Heute arbeite ich zu Hause und morgen arbeite ich im Büro.', ['Heute arbeite ich zu Hause. Morgen arbeite ich im Büro.'], 'sentence'],
    reading: ['Ein Wochenplan', 'Heute arbeitet Nina im Büro. Am Nachmittag kauft sie Gemüse. Morgen bleibt sie zu Hause. Dort kocht sie für ihre Familie.', ['Wo arbeitet Nina heute?', 'Heute arbeitet Nina im Büro.', ['Nina arbeitet heute im Büro.', 'Sie arbeitet heute im Büro.', 'Sie arbeitet im Büro.']]],
  },
  {
    id: 'artikel', level: 'A1', title: 'Členy, Nominativ a množné číslo', goal: 'Uč sa podstatné meno s rodom aj množným číslom.', tags: ['gender', 'nominative', 'plural'],
    sections: [
      ['Der, die, das', 'Rod nemeckého slova si najlepšie zapamätáš spolu so slovom. Môže sa líšiť od slovenčiny.', 'Podmet v jednotnom čísle môže mať der, die alebo das.', 'Der Tisch ist neu. Die Lampe ist alt. Das Fenster ist offen.', ['Die Tisch ist neu.', 'Der Tisch ist neu.'], 'gender', [
        ['___ Fenster ist offen. (určitý člen)', 'Das', ['das']], ['___ Lampe ist alt. (určitý člen)', 'Die', ['die']],
      ], [['mužský', 'der Tisch'], ['ženský', 'die Lampe'], ['stredný', 'das Fenster']]],
      ['Množné číslo', 'Tvar množného čísla sa môže zmeniť koncovkou, prehláskou alebo sa vôbec nezmení.', 'V Nominative má množné číslo určitý člen die.', 'Die Bücher liegen hier. Die Taschen sind neben der Tür.', ['Das Bücher liegen hier.', 'Die Bücher liegen hier.'], 'plural', [
        ['Schreib den Plural mit Artikel. das Buch', 'die Bücher'], ['Schreib den Plural mit Artikel. die Tasche', 'die Taschen'],
      ]],
    ],
    review: { 1: [['Schreib den Plural mit Artikel. der Stuhl', 'die Stühle'], ['Schreib den Plural mit Artikel. die Tür', 'die Türen']] },
    transfer: ['Stôl je nový a knihy sú staré.', 'Der Tisch ist neu und die Bücher sind alt.', ['Der Tisch ist neu. Die Bücher sind alt.'], 'sentence'],
    reading: ['Im neuen Zimmer', 'Der Tisch ist klein. Die Lampen sind neu. Das Fenster ist groß. Zwei Bücher liegen auf dem Tisch.', ['Was ist neu?', 'Die Lampen sind neu.', ['Neu sind die Lampen.']]],
    test: [['Ergänze den bestimmten Artikel. ___ Tisch ist klein.', 'Der', ['der']], ['Ergänze den bestimmten Artikel. ___ Buch ist neu.', 'Das', ['das']], ['Setze in den Plural. die Lampe', 'die Lampen'], ['Setze in den Plural. das Fenster', 'die Fenster'], ['Nové okná sú veľké. Použi Die Fenster.', 'Die Fenster sind groß.', [], 'sentence']],
  },
  {
    id: 'akkusativ', level: 'A1', title: 'Akkusativ a priamy predmet', goal: 'Rozlíš, kto koná a koho alebo čo dej zasahuje.', tags: ['accusative', 'personal', 'possessive'],
    sections: [
      ['Mužský člen', 'Vidieť, hľadať alebo kupovať má často priamy predmet.', 'Der sa mení na den a ein na einen.', 'Ich sehe den Hund. Ich brauche einen Stift.', ['Ich sehe der Hund.', 'Ich sehe den Hund.'], 'accusative', [
        ['Ich suche ___ Schlüssel. (der)', 'den'], ['Ich bestelle ___ Kaffee. (ein)', 'einen'],
      ], [['der / ein', 'den / einen'], ['die / eine', 'die / eine'], ['das / ein', 'das / ein']]],
      ['Zámeno a vlastníctvo', 'Meno alebo vec môžeš nahradiť zámenom. Koncovka sa mení aj pri mein.', 'Er sa v Akkusative mení na ihn a mein Freund na meinen Freund.', 'Ich rufe meinen Bruder an. Ich rufe ihn an.', ['Ich sehe er.', 'Ich sehe ihn.'], 'personal', [
        ['Ersetze den Mann. Ich sehe ___.', 'ihn'], ['Ich rufe ___ Vater an. (mein)', 'meinen'],
      ]],
    ],
    transfer: ['Dnes vidím svojho kamaráta a zajtra mu zavolám. Druhýkrát použi zámeno.', 'Heute sehe ich meinen Freund und morgen rufe ich ihn an.', ['Heute sehe ich meinen Freund. Morgen rufe ich ihn an.'], 'sentence'],
    reading: ['Im Laden', 'Mila sucht einen Stift. Sie sieht auch ein Heft und kauft es. Danach trifft sie ihren Bruder.', ['Was kauft Mila?', 'Mila kauft ein Heft.', ['Sie kauft ein Heft.']]],
  },
  {
    id: 'negation', level: 'A1', title: 'Zápor s kein a nicht', goal: 'Rozlíš, či popieraš vec, vlastnosť alebo dej.', tags: ['negation-choice', 'negation-position', 'accusative'],
    sections: [
      ['Kein pred podstatným menom', 'Kein je záporný náprotivok ein. Používa sa aj tam, kde by v kladnej vete nebol člen.', 'Koncovky zodpovedajú tvarom ein, eine a einen.', 'Ich habe keinen Hund. Wir haben keine Milch.', ['Ich habe nicht Hund.', 'Ich habe keinen Hund.'], 'negation-choice', [
        ['Ich habe ___ Zeit. (kein)', 'keine'], ['Ich brauche ___ Stift. (kein)', 'keinen'],
      ]],
      ['Nicht pri deji a vlastnosti', 'Nicht môže popierať vlastnosť alebo celý dej.', 'Pred prídavným menom stojí nicht priamo. Pri modálnom slovese často pred infinitívom.', 'Der Kaffee ist nicht heiß. Ich kann heute nicht kommen.', ['Der Kaffee ist kein heiß.', 'Der Kaffee ist nicht heiß.'], 'negation-position', [
        ['Verneine den Satz. Das Zimmer ist groß.', 'Das Zimmer ist nicht groß.'], ['Verneine kommen. Ich kann morgen kommen.', 'Ich kann morgen nicht kommen.'],
      ]],
    ],
    review: { 1: [['Verneine den Infinitiv. Wir wollen heute arbeiten.', 'Wir wollen heute nicht arbeiten.'], ['Verneine heiß. Der Tee ist heiß.', 'Der Tee ist nicht heiß.']] },
    transfer: ['Dnes nemám čas a nemôžem prísť.', 'Heute habe ich keine Zeit und kann nicht kommen.', ['Ich habe heute keine Zeit und kann nicht kommen.', 'Heute habe ich keine Zeit. Ich kann nicht kommen.'], 'sentence'],
    reading: ['Heute kein Training', 'Leon hat heute keine Zeit. Er ist nicht zu Hause und kann nicht trainieren. Morgen hat er wieder Zeit.', ['Kann Leon heute trainieren?', 'Nein, er kann heute nicht trainieren.', ['Er kann heute nicht trainieren.', 'Nein, Leon kann heute nicht trainieren.', 'Leon kann heute nicht trainieren.']]],
    test: [['Das ist ___ Problem. (kein)', 'kein'], ['Wir trinken heute ___ Kaffee. (kein)', 'keinen'], ['Verneine schlafen. Ich kann heute schlafen.', 'Ich kann heute nicht schlafen.'], ['Verneine die Eigenschaft. Die Küche ist groß.', 'Die Küche ist nicht groß.'], ['Nemám auto, ale dnes nejdem autobusom.', 'Ich habe kein Auto, aber heute fahre ich nicht mit dem Bus.', ['Ich habe kein Auto, aber ich fahre heute nicht mit dem Bus.'], 'sentence']],
  },
  {
    id: 'modalverben', level: 'A1', title: 'Modálne slovesá', goal: 'Vyjadri schopnosť, nutnosť, dovolenie a želanie.', tags: ['modal-present', 'verb-bracket', 'v2'],
    sections: [
      ['Können a müssen', 'Können vyjadruje schopnosť alebo možnosť. Müssen vyjadruje nutnosť.', 'Modálne sloveso časuj, významový infinitív daj na koniec.', 'Ich kann morgen kommen. Du musst heute lernen.', ['Ich kann komme morgen.', 'Ich kann morgen kommen.'], 'modal-present', [
        ['Ich ___ Deutsch sprechen. (können)', 'kann'], ['Ordne. (Heute / arbeiten / muss / ich)', 'Heute muss ich arbeiten.'],
      ]],
      ['Dürfen, wollen a möchten', 'Dürfen znamená smieť, wollen chcieť. Möchten znie zdvorilejšie.', 'Aj pri zákaze a želaní zostáva významové sloveso v infinitíve.', 'Hier darfst du nicht rauchen. Ich möchte Tee trinken.', ['Ich möchte Tee trinke.', 'Ich möchte Tee trinken.'], 'verb-bracket', [
        ['Du ___ hier nicht parken. (dürfen)', 'darfst'], ['Ordne mit Ich am Anfang. (ich / möchte / heute / kochen)', 'Ich möchte heute kochen.'],
      ]],
    ],
    transfer: ['Zajtra musím pracovať, ale potom chcem uvariť polievku.', 'Morgen muss ich arbeiten, aber danach möchte ich eine Suppe kochen.', ['Morgen muss ich arbeiten, aber danach will ich eine Suppe kochen.'], 'sentence'],
    test: [['Ich ___ schwimmen. (können)', 'kann'], ['Du ___ heute lernen. (müssen)', 'musst'], ['Ergänze das Modalverb. Hier ___ du nicht parken. (dürfen)', 'darfst'], ['Ordne mit Ich am Anfang. (möchte / ich / trinken / Tee)', 'Ich möchte Tee trinken.'], ['Zajtra musím zavolať do kancelárie. Začni Morgen.', 'Morgen muss ich im Büro anrufen.', ['Morgen muss ich das Büro anrufen.'], 'sentence']],
    reading: ['Vor dem Kino', 'Lea möchte einen Film sehen. Tom muss noch arbeiten und kann erst um acht kommen. Lea kann vor dem Kino warten.', ['Wann kann Tom kommen?', 'Tom kann erst um acht kommen.', ['Er kann erst um acht kommen.', 'Tom kann erst um acht Uhr kommen.', 'Er kann erst um acht Uhr kommen.']]],
  },
  {
    id: 'trennbare-verben', level: 'A1', title: 'Odlučiteľné slovesá', goal: 'Rozdeľ predponu v hlavnej vete a spoj ju v infinitíve.', tags: ['separable', 'v2', 'verb-bracket'],
    sections: [
      ['Predpona v hlavnej vete', 'Pri bežnej oznamovacej vete sa napríklad anrufen zmení na rufe … an.', 'Časovaný tvar je druhý a oddelená predpona stojí na konci.', 'Heute rufe ich meine Schwester an.', ['Heute anrufe ich meine Schwester.', 'Heute rufe ich meine Schwester an.'], 'separable', [
        ['Ordne. (Morgen / ich / um sieben / aufstehen)', 'Morgen stehe ich um sieben auf.'],
        ['Beginne mit Am Samstag. Ich kaufe am Samstag ein.', 'Am Samstag kaufe ich ein.'],
      ]],
      ['Predpona v infinitíve', 'Keď je sloveso po kann, muss alebo will v infinitíve, predpona ostáva spolu.', 'Po modálnom slovese použi celý tvar, napríklad aufstehen.', 'Ich muss morgen früh aufstehen.', ['Ich muss morgen früh stehen auf.', 'Ich muss morgen früh aufstehen.'], 'verb-bracket', [
        ['Ich möchte morgen früh ___. (aufstehen)', 'aufstehen'], ['Schreib mit können. Ich rufe dich später an.', 'Ich kann dich später anrufen.'],
      ]],
    ],
    transfer: ['Dnes vstávam skoro, ale zajtra môžem vstávať neskôr.', 'Heute stehe ich früh auf, aber morgen kann ich später aufstehen.', [], 'sentence'],
    test: [['Ordne mit Heute am Anfang. (heute / du / anrufen / Tom)', 'Heute rufst du Tom an.'], ['Schreib mit können. Ich kaufe am Samstag ein.', 'Ich kann am Samstag einkaufen.'], ['Oprav. Heute aufstehe ich um sechs.', 'Heute stehe ich um sechs auf.', [], 'correction', 'sk'], ['Forme eine Ja-Nein-Frage. Ihr steht um sieben auf.', 'Steht ihr um sieben auf?'], ['Zajtra jej môžem zavolať. Začni Morgen.', 'Morgen kann ich sie anrufen.', [], 'sentence']],
    reading: ['Ein früher Start', 'Lea steht um sechs Uhr auf. Sie kauft vor der Arbeit ein. Am Abend möchte sie ihre Mutter anrufen.', ['Wen möchte Lea am Abend anrufen?', 'Lea möchte ihre Mutter anrufen.', ['Sie möchte ihre Mutter anrufen.', 'Am Abend möchte Lea ihre Mutter anrufen.']]],
  },
  {
    id: 'perfekt', level: 'A1', title: 'Základy Perfektu', goal: 'Rozprávaj o včerajšku s haben alebo sein.', tags: ['perfect', 'participle', 'verb-bracket'],
    sections: [
      ['Haben a Partizip II', 'Pri väčšine slovies spoj haben s minulým tvarom na konci.', 'Pomocné sloveso časuj. Partizip zostane rovnaký.', 'Ich habe gestern gekocht.', ['Ich habe gestern kochen.', 'Ich habe gestern gekocht.'], 'participle', [
        ['Ich habe gestern ___. (arbeiten)', 'gearbeitet'], ['Wir ___ gestern Suppe gekocht. (haben)', 'haben'],
      ]],
      ['Sein pri presune', 'Pri gehen a fahren do cieľa sa bežne používa sein.', 'Spoj bin, bist, ist a podobné tvary s Partizipom.', 'Nina ist nach Hause gegangen.', ['Nina hat nach Hause gegangen.', 'Nina ist nach Hause gegangen.'], 'perfect', [
        ['Ich ___ gestern nach Wien gefahren. (haben oder sein)', 'bin'], ['Ich bin nach Hause ___. (gehen)', 'gegangen'],
      ]],
    ],
    review: {
      0: [['Wir haben heute früh ___. (frühstücken)', 'gefrühstückt'], ['Ihr habt die Tür ___. (öffnen)', 'geöffnet']],
      1: [['Lena ___ gestern nach Graz gefahren. (haben oder sein)', 'ist'], ['Setze ins Perfekt. Ich gehe in den Garten.', 'Ich bin in den Garten gegangen.']],
    },
    transfer: ['Včera som pracoval a potom som išiel domov.', 'Gestern habe ich gearbeitet und bin danach nach Hause gegangen.', ['Ich habe gestern gearbeitet und bin danach nach Hause gegangen.', 'Gestern habe ich gearbeitet. Danach bin ich nach Hause gegangen.'], 'sentence'],
    reading: ['Ein Samstag', 'Am Samstag hat Ben Brot gekauft. Danach ist er zu seiner Schwester gefahren. Sie haben zusammen gekocht.', ['Was hat Ben am Samstag gekauft?', 'Ben hat Brot gekauft.', ['Er hat Brot gekauft.', 'Ben hat am Samstag Brot gekauft.', 'Am Samstag hat Ben Brot gekauft.']]],
    test: [['Mia ___ gestern lange gearbeitet. (haben oder sein)', 'hat'], ['Wir ___ ins Kino gegangen. (haben oder sein)', 'sind'], ['Ich habe einen Kaffee ___. (trinken)', 'getrunken'], ['Setze ins Perfekt. Tom kauft Brot.', 'Tom hat Brot gekauft.'], ['Večer som išiel domov a potom som varil.', 'Am Abend bin ich nach Hause gegangen und habe danach gekocht.', ['Ich bin am Abend nach Hause gegangen und habe danach gekocht.'], 'sentence']],
  },
]
