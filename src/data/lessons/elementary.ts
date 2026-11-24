import type { LessonSeed } from './model'

export const elementary: LessonSeed[] = [
  {
    id: 'dativ', level: 'A2', title: 'Dativ a predložky s pevným pádom', goal: 'Použi správny tvar po mit, bei, zu a pri príjemcovi.', tags: ['dative', 'fixed-prep', 'personal', 'possessive'],
    sections: [
      ['mit + Dativ', 'Keď robíš niečo s niekým alebo niečím, po mit sa člen a zámeno prispôsobia Dativu.', 'Mit vždy vyžaduje Dativ.', 'mit einem Freund · mit einer Freundin · mit meinen Freunden', ['mit einen Freund', 'mit einem Freund'], 'dative', [
        ['Ich spreche mit ___ Nachbarn. (ein)', 'einem'], ['Ich gehe mit ___ Schwester ins Kino. (mein)', 'meiner'],
      ], [['der / ein', 'dem / einem'], ['die / eine', 'der / einer'], ['das / ein', 'dem / einem'], ['die Freunde', 'mit den Freunden']]],
      ['Príjemca a osobné zámená', 'Pri geben si polož otázku Wem? Kto vec dostáva? Dativ majú vždy aj predložky bei, zu a seit.', 'Ich → mir, du → dir, er → ihm, sie → ihr.', 'Ich gebe ihm den Schlüssel. Ich wohne bei meiner Tante.', ['Ich gebe ihn das Buch.', 'Ich gebe ihm das Buch.'], 'personal', [
        ['Ich gebe ___ den Schlüssel. (er)', 'ihm'], ['Ich wohne bei ___ Schwester. (mein)', 'meiner'],
      ]],
    ],
    errorRules: [['mit einen', 0], ['mit eine', 0]],
    review: { 0: [['Nina fährt mit ___ Freundin zum Bahnhof. (ein)', 'einer'], ['Tom lernt mit ___ Freunden. (mein)', 'meinen']] },
    transfer: ['Dnes idem s kamarátkou k lekárovi. Začni slovom Heute.', 'Heute gehe ich mit einer Freundin zum Arzt.', ['Heute gehe ich mit einer Freundin zu dem Arzt.'], 'sentence'],
    reading: ['Ein Schlüssel für Nina', 'Mara ist bei ihrer Schwester Nina. Nina fährt mit einem Freund zum Bahnhof. Mara gibt ihr den Schlüssel und bleibt zu Hause.', ['Wem gibt Mara den Schlüssel? Antworte in einem Satz.', 'Mara gibt Nina den Schlüssel.', ['Sie gibt Nina den Schlüssel.', 'Mara gibt ihrer Schwester den Schlüssel.', 'Mara gibt ihrer Schwester Nina den Schlüssel.', 'Sie gibt ihrer Schwester den Schlüssel.']]],
  },
  {
    id: 'wechselpraepositionen', level: 'A2', title: 'Wo alebo Wohin', goal: 'Rozlíš polohu od cieľa pohybu pri obojpádových predložkách.', tags: ['two-way', 'wo', 'wohin', 'dative', 'accusative'],
    sections: [
      ['Poloha s Dativom', 'In, an, auf, unter, über, vor, hinter, neben a zwischen používajú pri polohe Dativ. Aj pohyb môže prebiehať vnútri miesta.', 'Wo? opisuje miesto, kde dej prebieha.', 'Das Buch liegt auf dem Tisch. Wir laufen im Park.', ['Das Buch liegt auf den Tisch.', 'Das Buch liegt auf dem Tisch.'], 'wo', [
        ['Die Tasche liegt ___ Tisch. (unter + der)', 'unter dem'], ['Die Uhr hängt ___ Tür. (über + die)', 'über der'],
      ]],
      ['Smer s Akkusativom', 'Tie isté predložky majú pri cieli Akkusativ. Legen a stellen často menia polohu veci.', 'Wohin? označuje cieľ. In das sa môže skrátiť na ins.', 'Ich gehe ins Kino. Ich lege das Buch auf den Tisch.', ['Ich gehe im Kino. (smer)', 'Ich gehe ins Kino.'], 'wohin', [
        ['Leg die Tasche ___ Tisch. (unter + der)', 'unter den'], ['Stell den Stuhl ___ Fenster. (neben + das)', 'neben das'],
      ], [['Wo?', 'im Kino / auf dem Tisch'], ['Wohin?', 'ins Kino / auf den Tisch']]],
    ],
    transfer: ['Kniha leží na stole. Teraz ju položím pod stôl. Použi lege.', 'Das Buch liegt auf dem Tisch. Jetzt lege ich es unter den Tisch.', [], 'sentence'],
    reading: ['Der rote Stuhl', 'Der rote Stuhl steht neben dem Fenster. Paul stellt ihn vor den Schrank, weil er am Fenster Platz braucht. Danach legt er ein Kissen auf den Stuhl.', ['Wohin stellt Paul den Stuhl?', 'Paul stellt ihn vor den Schrank.', ['Er stellt ihn vor den Schrank.', 'Paul stellt den Stuhl vor den Schrank.', 'Er stellt den Stuhl vor den Schrank.']]],
  },
  {
    id: 'weil-dass-wenn', level: 'A2', title: 'Weil, dass a wenn', goal: 'Vyjadri dôvod alebo podmienku a rozlíš weil od deshalb.', tags: ['weil', 'dass', 'wenn', 'subordinate', 'main-link', 'v2', 'perfect'],
    sections: [
      ['Slovosled po weil', 'Weil znamená „pretože“. Vedľajšia veta odpovedá na otázku Warum?', 'Po weil patrí časované sloveso na koniec vedľajšej vety.', 'Ich trinke Kaffee, weil ich müde bin.', ['Ich bleibe hier, weil ich bin müde.', 'Ich bleibe hier, weil ich müde bin.'], 'weil', [
        ['Ergänze nur den Nebensatz. Ich bleibe zu Hause, weil ___. (ich / krank / sein)', 'ich krank bin'],
        ['Oprav vetu. Ich komme später, weil ich muss arbeiten.', 'Ich komme später, weil ich arbeiten muss.', [], 'correction', 'sk'],
      ]],
      ['Slovosled po weil v Perfekte', 'V Perfekte máš Partizip aj časované pomocné sloveso. Presúva sa práve habe alebo bin.', 'Na konci vedľajšej vety stojí Partizip a až za ním pomocné sloveso.', 'Ich bin müde, weil ich gestern gearbeitet habe.', ['Ich bleibe daheim, weil ich bin spät angekommen.', 'Ich bleibe daheim, weil ich spät angekommen bin.'], 'subordinate', [
        ['Oprav slovosled. Ich bin müde, weil ich habe gearbeitet.', 'Ich bin müde, weil ich gearbeitet habe.', [], 'correction', 'sk'],
        ['Oprav slovosled. Lea lacht, weil sie hat das Foto gesehen.', 'Lea lacht, weil sie das Foto gesehen hat.', [], 'correction', 'sk'],
      ]],
      ['Dass a wenn', 'Dass uvádza obsah správy. Wenn vyjadruje podmienku alebo opakovanie.', 'Aj po dass a wenn je časované sloveso na konci. Za prednou vetou s wenn nasleduje sloveso hlavnej vety.', 'Ich weiß, dass du kommst. Wenn ich Zeit habe, koche ich.', ['Wenn ich Zeit habe, ich koche.', 'Wenn ich Zeit habe, koche ich.'], 'wenn', [
        ['Ergänze nach dass. Ich weiß, dass ___. (Nina / heute / arbeiten)', 'Nina heute arbeitet'],
        ['Verbinde mit Wenn am Anfang. Ich habe Zeit. Ich rufe dich an.', 'Wenn ich Zeit habe, rufe ich dich an.'],
      ]],
      ['Weil alebo deshalb', 'Weil uvádza dôvod. Deshalb začína vetu s následkom a obsadí prvú pozíciu.', 'Po weil je sloveso na konci. Hneď po deshalb nasleduje časované sloveso.', 'Ich trinke Kaffee, weil ich müde bin. Ich bin müde. Deshalb trinke ich Kaffee.', ['Es regnet. Deshalb ich bleibe zu Hause.', 'Es regnet. Deshalb bleibe ich zu Hause.'], 'main-link', [
        ['Forme mit Deshalb in einem zweiten Satz. Es ist kalt. Ich ziehe eine Jacke an.', 'Es ist kalt. Deshalb ziehe ich eine Jacke an.'],
        ['Verbinde dieselben Aussagen mit weil. Ich ziehe eine Jacke an. Es ist kalt.', 'Ich ziehe eine Jacke an, weil es kalt ist.'],
      ], [['dôvod', 'weil ich müde bin'], ['následok', 'Deshalb trinke ich Kaffee.']]],
    ],
    errorRules: [['weil ich bin müde', 0], ['weil ich habe gearbeitet', 1], ['weil sie hat das Foto gesehen', 1], ['wenn ich Zeit habe ich', 2], ['deshalb ich bleibe', 3]],
    review: {
      0: [['Ergänze nach weil. Nina bleibt hier, weil ___. (sie / krank / sein)', 'sie krank ist'], ['Ergänze nach weil. Tom geht früh, weil ___. (er / arbeiten / müssen)', 'er arbeiten muss']],
      1: [['Ergänze nach weil. Ben ist müde, weil ___. (er / früh / aufstehen, Perfekt)', 'er früh aufgestanden ist'], ['Ergänze nach weil. Lea bleibt hier, weil ___. (sie / den Zug / verpassen, Perfekt)', 'sie den Zug verpasst hat']],
      2: [['Ich weiß, dass ___. (Lea / sich / freuen)', 'Lea sich freut'], ['Wenn ich Zeit habe, ___. (ich / kochen)', 'koche ich']],
      3: [['Ergänze nur den Satzanfang. Es regnet. Deshalb ___ zu Hause. (wir / bleiben)', 'bleiben wir'], ['Verbinde mit Deshalb im zweiten Satz. Der Bus kommt spät. Wir fahren mit dem Rad.', 'Der Bus kommt spät. Deshalb fahren wir mit dem Rad.']],
    },
    transfer: ['Včera som dlho pracoval, preto dnes ostávam doma. Použi deshalb.', 'Ich habe gestern lange gearbeitet. Deshalb bleibe ich heute zu Hause.', ['Gestern habe ich lange gearbeitet. Deshalb bleibe ich heute zu Hause.', 'Ich habe gestern lange gearbeitet, deshalb bleibe ich heute zu Hause.'], 'sentence'],
    reading: ['Ein Plan für heute', 'Lea ist müde, weil sie gestern lange gearbeitet hat. Sie weiß, dass Tom heute frei hat. Wenn er Zeit hat, kochen sie zusammen. Es regnet. Deshalb bleiben sie zu Hause.', ['Warum ist Lea müde? Antworte mit weil.', 'Lea ist müde, weil sie gestern lange gearbeitet hat.', ['Sie ist müde, weil sie gestern lange gearbeitet hat.', 'Weil sie gestern lange gearbeitet hat.', 'Lea ist müde, weil sie lange gearbeitet hat.', 'Sie ist müde, weil sie lange gearbeitet hat.']]],
    test: [
      ['Spoj s weil. Ich bleibe zu Hause. Es regnet.', 'Ich bleibe zu Hause, weil es regnet.', ['Weil es regnet, bleibe ich zu Hause.'], 'grammar', 'sk'],
      ['Oprav vetu. Ich weiß, dass du arbeitest heute.', 'Ich weiß, dass du heute arbeitest.', [], 'correction', 'sk'],
      ['Prelož. Keď mám čas, zavolám ti.', 'Wenn ich Zeit habe, rufe ich dich an.', ['Ich rufe dich an, wenn ich Zeit habe.'], 'sentence'],
      ['Spoj. Lea ist zufrieden. Sie hat die Aufgabe erledigt. Použi weil.', 'Lea ist zufrieden, weil sie die Aufgabe erledigt hat.', ['Weil sie die Aufgabe erledigt hat, ist Lea zufrieden.'], 'grammar', 'sk'],
      ['Oprav vetu. Der Bus kommt nicht. Deshalb wir fahren mit dem Rad.', 'Der Bus kommt nicht. Deshalb fahren wir mit dem Rad.', [], 'correction', 'sk'],
    ],
  },
  {
    id: 'reflexiv', level: 'A2', title: 'Reflexívne slovesá', goal: 'Zvoľ zvratné zámeno a umiestni ho aj pri modálnom slovese.', tags: ['reflexive', 'reflexive-prep', 'personal', 'v2'],
    sections: [
      ['Zámeno podľa podmetu', 'Pri sich fühlen alebo sich freuen sa subjekt a zámeno vzťahujú na tú istú osobu.', 'Pri ich je mich, pri du dich, pri wir uns a pri ihr euch.', 'Ich fühle mich gut. Wir freuen uns.', ['Wir treffen sich.', 'Wir treffen uns.'], 'reflexive', [
        ['Ich freue ___ auf das Wochenende.', 'mich'], ['Wie fühlt ihr ___ heute?', 'euch'],
      ]],
      ['Reflexívne spojenia', 'Niektoré slovesá majú stálu predložku. Pri sich freuen auf hovoríš o niečom budúcom.', 'Časované sloveso stojí vpredu, zvratné zámeno ostáva pri podmete.', 'Heute treffe ich mich mit Nina. Ich möchte mich ausruhen.', ['Heute treffe ich sich mit Nina.', 'Heute treffe ich mich mit Nina.'], 'reflexive-prep', [
        ['Schreib mit wollen. Wir ruhen uns aus.', 'Wir wollen uns ausruhen.'], ['Morgen treffe ich ___ mit Nina.', 'mich'],
      ]],
    ],
    review: { 1: [['Du freust ___ auf die Ferien. (reflexives Pronomen)', 'dich'], ['Schreib mit können. Wir treffen uns heute mit Tom.', 'Wir können uns heute mit Tom treffen.']] },
    transfer: ['Dnes si chcem oddýchnuť, pretože sa cítim unavený.', 'Heute möchte ich mich ausruhen, weil ich mich müde fühle.', ['Ich möchte mich heute ausruhen, weil ich mich müde fühle.'], 'sentence'],
    reading: ['Nach dem Training', 'Ben und Lena treffen sich im Park. Sie joggen zusammen. Danach ruht Ben sich aus. Lena freut sich schon auf das nächste Training.', ['Worauf freut sich Lena?', 'Lena freut sich auf das nächste Training.', ['Sie freut sich auf das nächste Training.', 'Lena freut sich schon auf das nächste Training.']]],
  },
  {
    id: 'modalverben-vergangenheit', level: 'A2', title: 'Modálne slovesá v minulosti', goal: 'Vyjadri, čo si mohol, musel alebo chcel urobiť.', tags: ['modal-past', 'preterite', 'verb-bracket', 'wohin'],
    sections: [
      ['Konnte, musste, wollte', 'V bežnej reči sa pri modálnych slovesách často používa Präteritum.', 'Können → konnte, müssen → musste a wollen → wollte.', 'Gestern konnte ich kommen. Nina musste arbeiten.', ['Gestern muss ich arbeiten.', 'Gestern musste ich arbeiten.'], 'modal-past', [
        ['Gestern ___ ich länger arbeiten. (müssen, Präteritum)', 'musste'], ['Früher ___ wir nicht so früh kommen. (können, Präteritum)', 'konnten'],
      ]],
      ['Viac slovies vo vete', 'Významové sloveso zostáva v infinitíve. V časti s weil stojí časované modálne sloveso na konci.', 'Hlavná veta má konnte … gehen, vedľajšia veta má gehen konnte.', 'Ich blieb zu Hause, weil ich nicht ins Kino gehen konnte.', ['…, weil ich konnte nicht kommen.', '…, weil ich nicht kommen konnte.'], 'verb-bracket', [
        ['Setze ins Präteritum. Ich kann heute zum Training gehen.', 'Ich konnte heute zum Training gehen.'], ['Ergänze nach weil. Ich blieb hier, weil ___. (ich / warten / müssen, Präteritum)', 'ich warten musste'],
      ]],
    ],
    transfer: ['Včera som nemohol ísť do fitka, pretože som musel dlho pracovať.', 'Gestern konnte ich nicht ins Fitnessstudio gehen, weil ich lange arbeiten musste.', ['Ich konnte gestern nicht ins Fitnessstudio gehen, weil ich lange arbeiten musste.'], 'sentence'],
    reading: ['Ein geänderter Plan', 'Nina wollte am Abend ins Kino gehen. Sie musste aber länger arbeiten. Danach konnte sie noch mit Tom essen gehen.', ['Warum konnte Nina nicht ins Kino gehen?', 'Nina konnte nicht ins Kino gehen, weil sie länger arbeiten musste.', ['Sie musste länger arbeiten.', 'Nina musste länger arbeiten.', 'Weil sie länger arbeiten musste.']]],
  },
  {
    id: 'vergleich', level: 'A2', title: 'Stupňovanie a porovnávanie', goal: 'Porovnaj dve možnosti a vyjadri najsilnejšiu vlastnosť.', tags: ['comparison', 'adjective-endings', 'v2'],
    sections: [
      ['Schneller als, so schnell wie', 'Pri rozdiele používaš komparatív s als. Pri rovnosti používaš so … wie.', 'Prvý stupeň + wie pri rovnosti. Komparatív + als pri rozdiele.', 'Der Zug ist schneller als der Bus. Der Bus ist so günstig wie die Bahn.', ['Der Zug ist schneller wie der Bus.', 'Der Zug ist schneller als der Bus.'], 'comparison', [
        ['Die Bahn ist ___ als der Bus. (schnell)', 'schneller'], ['Der Bus ist so günstig ___ die Bahn.', 'wie'],
      ]],
      ['Am schnellsten a nepravidelné tvary', 'Keď opisuješ najvyššiu mieru pri slovese, často použiješ am … -sten.', 'Gut má tvary gut – besser – am besten.', 'Mia fährt am schnellsten. Der spätere Termin passt mir besser.', ['Das ist mehr gut.', 'Das ist besser.'], 'comparison', [
        ['Mia fährt am ___. (schnell)', 'schnellsten'], ['Morgen passt mir ___. (gut, Komparativ)', 'besser'],
      ], [['gut', 'besser · am besten'], ['schnell', 'schneller · am schnellsten']]],
    ],
    review: { 0: [['Der Koffer ist so schwer ___ die Tasche.', 'wie'], ['Die Straße ist ___ als der Weg. (lang)', 'länger']] },
    transfer: ['Vlak je rýchlejší než autobus, ale bicykel je najlacnejší. Použi am günstigsten.', 'Der Zug ist schneller als der Bus, aber das Fahrrad ist am günstigsten.', [], 'sentence'],
    reading: ['Drei Wege', 'Lea vergleicht drei Wege zur Arbeit. Der Bus ist günstiger als die Bahn. Die Bahn ist am schnellsten. Mit dem Fahrrad fährt sie am liebsten.', ['Welches Verkehrsmittel ist am schnellsten?', 'Die Bahn ist am schnellsten.', ['Am schnellsten ist die Bahn.']]],
    test: [['Tom ist so groß ___ Ben.', 'wie'], ['Der Zug fährt ___ als das Fahrrad. (schnell)', 'schneller'], ['Dieser Plan ist ___. (gut, Komparativ)', 'besser'], ['Dieser Weg ist am ___. (kurz)', 'kürzesten'], ['Káva je lacnejšia než čaj. Použi günstiger.', 'Kaffee ist günstiger als Tee.', ['Der Kaffee ist günstiger als der Tee.'], 'sentence']],
  },
  {
    id: 'infinitiv-zu', level: 'A2', title: 'Infinitív s zu', goal: 'Vyjadri plán alebo cieľ a vlož zu na správne miesto.', tags: ['zu', 'um-zu', 'separable', 'verb-bracket'],
    sections: [
      ['Zu po versuchen a vorhaben', 'Pri slovese ako versuchen dopĺňa druhá činnosť, čo sa človek pokúša urobiť.', 'Pred bežným infinitívom stojí zu samostatne. Pri odlučiteľnom slovese patrí do slova.', 'Ich versuche, früher aufzustehen. Sie hat vor, mehr zu lesen.', ['Ich versuche, zu aufstehen.', 'Ich versuche, aufzustehen.'], 'zu', [
        ['Er versucht, den Termin ___. (verschieben)', 'zu verschieben'], ['Ich versuche, morgen ___. (mitkommen)', 'mitzukommen'],
      ]],
      ['Um … zu a modálne sloveso', 'Um … zu označuje účel, keď obe činnosti robí tá istá osoba. Po kann alebo muss samotnom sa zu nepoužíva.', 'V cieli s modálnym slovesom patrí zu pred posledný infinitív.', 'Ich fahre in die Stadt, um meine Tante zu besuchen. Ich muss jetzt gehen.', ['Ich muss jetzt zu gehen.', 'Ich muss jetzt gehen.'], 'um-zu', [
        ['Verbinde mit um … zu. Ich lerne. Ich will die Prüfung bestehen.', 'Ich lerne, um die Prüfung zu bestehen.'],
        ['Ich möchte morgen früher ___. (aufstehen)', 'aufstehen'],
      ]],
    ],
    review: {
      0: [['Sie versucht, die Aufgabe ___. (verstehen)', 'zu verstehen'], ['Er hat vor, heute ___. (einkaufen)', 'einzukaufen']],
      1: [['Setze um … zu ein. Er ruft an. Er will einen Termin vereinbaren.', 'Er ruft an, um einen Termin zu vereinbaren.'], ['Wir müssen pünktlich ___. (ankommen)', 'ankommen']],
    },
    transfer: ['Idem do mesta, aby som vyzdvihol svoj pas.', 'Ich fahre in die Stadt, um meinen Pass abzuholen.', ['Ich gehe in die Stadt, um meinen Pass abzuholen.', 'Um meinen Pass abzuholen, fahre ich in die Stadt.'], 'sentence'],
    reading: ['Ein Termin im Amt', 'Nina versucht, früher aufzustehen. Sie fährt mit dem Bus in die Stadt, um ihren Pass abzuholen. Danach möchte sie im Café frühstücken.', ['Warum fährt Nina in die Stadt? Antworte mit um … zu.', 'Sie fährt in die Stadt, um ihren Pass abzuholen.', ['Nina fährt in die Stadt, um ihren Pass abzuholen.', 'Um ihren Pass abzuholen.']]],
    test: [['Ich habe vor, heute mehr ___. (lesen)', 'zu lesen'], ['Sie versucht, früher ___. (ankommen)', 'anzukommen'], ['Verbinde zum Zweck mit um … zu. Ben fährt nach Wien. Er will seine Tante besuchen.', 'Ben fährt nach Wien, um seine Tante zu besuchen.'], ['Oprav vetu. Ich kann heute nicht zu kommen.', 'Ich kann heute nicht kommen.', [], 'correction', 'sk'], ['Chodím na kurz, aby som vedel lepšie hovoriť po nemecky.', 'Ich besuche einen Kurs, um besser Deutsch sprechen zu können.', ['Ich gehe zu einem Kurs, um besser Deutsch sprechen zu können.'], 'sentence']],
  },
  {
    id: 'verben-praepositionen', level: 'A2', title: 'Slovesá s predložkami', goal: 'Zapamätaj si predložku spolu so slovesom a správnym pádom.', tags: ['verb-prep', 'reflexive-prep', 'accusative', 'dative'],
    sections: [
      ['Warten auf a denken an', 'Sloveso často určuje predložku. Slovenská predložka nemusí byť rovnaká.', 'Čakaj s warten auf + Akkusativ a mysli s denken an + Akkusativ.', 'Ich warte auf den Bus. Ich denke an meinen Urlaub.', ['Ich warte für den Bus.', 'Ich warte auf den Bus.'], 'verb-prep', [
        ['Wir warten ___ den nächsten Bus. (na)', 'auf'], ['Ich denke oft ___ meinen ersten Kurs. (na)', 'an'],
      ]],
      ['Sprechen über, abhängen von', 'Über uvádza tému rozhovoru a von príčinu, od ktorej niečo závisí.', 'Sprechen über má Akkusativ, abhängen von má Dativ.', 'Wir sprechen über den Plan. Das hängt vom Wetter ab.', ['Das hängt aus dem Wetter ab.', 'Das hängt vom Wetter ab.'], 'verb-prep', [
        ['Wir sprechen ___ den neuen Film. (o)', 'über'], ['Die Fahrt hängt ___ dem Wetter ab. (od)', 'von'],
      ], [['warten auf · denken an · sprechen über', 'Akkusativ'], ['abhängen von', 'Dativ']]],
    ],
    review: {
      0: [['Wartet ihr ___ den Zug? (auf / an)', 'auf'], ['Denkst du ___ den Termin? (an / von)', 'an']],
      1: [['Der Beginn hängt ___ der Raumverfügbarkeit ab. (über / von)', 'von'], ['Wir sprechen ___ den Vertrag. (auf / über)', 'über']],
    },
    transfer: ['Čakáme na autobus a rozprávame sa o filme.', 'Wir warten auf den Bus und sprechen über den Film.', ['Wir warten auf den Bus. Dabei sprechen wir über den Film.'], 'sentence'],
    reading: ['Warten am Bahnhof', 'Mila wartet auf den Bus. Sie spricht mit Tom über den neuen Film. Ob sie später in den Park gehen, hängt vom Wetter ab.', ['Wovon hängt der Besuch im Park ab?', 'Der Besuch im Park hängt vom Wetter ab.', ['Er hängt vom Wetter ab.', 'Das hängt vom Wetter ab.', 'Das hängt von dem Wetter ab.']]],
    test: [['Sie interessiert sich ___ den Kurs. (für / auf)', 'für'], ['Wir freuen uns ___ den morgigen Ausflug. (auf / an)', 'auf'], ['Wartest du ___ den Zug? (auf / von)', 'auf'], ['Oprav vetu. Wir sprechen auf den Film.', 'Wir sprechen über den Film.', [], 'correction', 'sk'], ['Výlet závisí od počasia.', 'Der Ausflug hängt vom Wetter ab.', ['Der Ausflug hängt von dem Wetter ab.'], 'sentence']],
  },
]
