import type { Exercise, ExerciseSupport, Reading } from '../types'

type Question = [
  prompt: string,
  answer: string,
  facts: string[][],
  hint: string,
  explanation: string,
  glossary: ExerciseSupport['glossary'],
  alternatives?: string[],
]

export function lesson(content: Omit<Reading, 'questions'>, questions: Question[]): Reading {
  return {
    ...content,
    questions: questions.map(([prompt, answer, readingFacts, hint, explanation, glossary, acceptedAnswers = []], index): Exercise => ({
      id: `${content.id}-${index + 1}`, type: 'reading', prompt, answer, readingFacts, hint, explanation, theorySectionId: 'answer-from-context',
      acceptedAnswers, support: { glossary }, tags: ['vocabulary'], skillTags: ['reading'], difficulty: content.difficulty,
    })),
  }
}

export const readings = [
  lesson({
    id: 'ein-morgen', title: 'Ein Morgen in Bratislava', description: 'Lea opisuje svoj bežný pracovný deň.', difficulty: 'A1', minutes: 3,
    paragraphs: [
      'Lea wohnt in Bratislava. Sie arbeitet in einem kleinen Café in der Stadt. Normalerweise steht sie um sechs Uhr auf. Am Morgen trinkt sie zu Hause einen Kaffee und isst ein Brot. Um sieben Uhr fährt sie mit dem Bus zur Arbeit. Die Fahrt dauert zwanzig Minuten.',
      'Im Café arbeitet Lea mit ihrer Freundin Nina. Nina kommt meistens um acht Uhr. Um zwölf Uhr haben sie eine Pause. Sie essen zusammen und sprechen über das Wochenende. Am Nachmittag kommen viele Leute ins Café. Lea macht Kaffee und Nina bringt den Kaffee an die Tische.',
      'Nach der Arbeit kauft Lea manchmal ein. Heute geht sie aber direkt nach Hause, weil sie müde ist. Am Abend kocht sie eine Suppe und sieht ein bisschen fern. Danach geht Lea ins Bett.',
    ],
    glossary: { Fahrt: 'jazda, cesta dopravným prostriedkom', dauert: 'trvá', Pause: 'prestávka' },
  }, [
    ['In welcher Stadt wohnt Lea?', 'Lea wohnt in Bratislava.', [['bratislava']], 'Hľadaj hneď v prvej vete.', 'Mesto bez člena sa pri polohe spája s predložkou in.', [['in welcher Stadt', 'v ktorom meste'], ['wohnen', 'bývať']], ['Sie wohnt in Bratislava.', 'In Bratislava wohnt Lea.']],
    ['Um wie viel Uhr steht Lea normalerweise auf?', 'Lea steht normalerweise um sechs Uhr auf.', [['sechs', '6']], 'V prvom odseku hľadaj sloveso aufstehen.', 'Po časovom um používame údaj o hodine. Predpona auf stojí na konci.', [['um wie viel Uhr', 'o koľkej'], ['normalerweise', 'zvyčajne'], ['aufstehen', 'vstať, vstávať']], ['Sie steht um sechs Uhr auf.', 'Lea steht um sechs Uhr auf.', 'Lea steht normalerweise um 6 Uhr auf.', 'Um sechs Uhr steht Lea normalerweise auf.']],
    ['Wie fährt Lea zur Arbeit?', 'Lea fährt mit dem Bus zur Arbeit.', [['bus']], 'V prvom odseku sa spomína dopravný prostriedok.', 'Mit vyžaduje Dativ. Der Bus sa zmení na dem Bus.', [['wie', 'ako'], ['fahren', 'ísť dopravným prostriedkom'], ['zur Arbeit', 'do práce']], ['Sie fährt mit dem Bus zur Arbeit.', 'Lea fährt mit dem Bus.', 'Sie fährt mit dem Bus.']],
    ['Mit wem arbeitet Lea im Café?', 'Lea arbeitet im Café mit Nina.', [['nina', 'ihrer freundin']], 'Hľadaj, kto s ňou pracuje v druhom odseku.', 'Po mit je Dativ. Pri vlastnom mene Nina netreba člen.', [['mit wem', 's kým'], ['arbeiten', 'pracovať'], ['im Café', 'v kaviarni']], ['Sie arbeitet mit Nina.', 'Lea arbeitet mit ihrer Freundin Nina.', 'Sie arbeitet mit ihrer Freundin Nina.', 'Lea arbeitet mit Nina.']],
    ['Warum geht Lea heute direkt nach Hause?', 'Lea geht direkt nach Hause, weil sie müde ist.', [['müde']], 'Dôvod nájdeš v poslednom odseku.', 'Po weil patrí časované ist na koniec.', [['warum', 'prečo'], ['direkt nach Hause gehen', 'ísť rovno domov']], ['Sie geht nach Hause, weil sie müde ist.', 'Sie geht direkt nach Hause, weil sie müde ist.', 'Weil sie müde ist, geht sie direkt nach Hause.', 'Sie ist müde.']],
  ]),
  lesson({
    id: 'samstag-im-studio', title: 'Samstag im Fitnessstudio', description: 'Spoločný tréning a plány na večer.', difficulty: 'A1', minutes: 3,
    paragraphs: [
      'Am Samstag steht Tom später auf als sonst. Um neun Uhr frühstückt er mit seiner Schwester. Danach geht er ins Fitnessstudio. Er trifft sich dort mit seinem Freund Jan. Die beiden gehen oft zusammen ins Studio, weil sie zusammen mehr Spaß haben.',
      'Heute trainiert Tom zuerst eine halbe Stunde auf dem Laufband. Jan fährt lieber Fahrrad. Danach trinken beide Wasser und machen eine kurze Pause. Um zwölf Uhr gehen sie aus dem Studio. Tom möchte noch in der Stadt einkaufen, aber Jan muss nach Hause. Dort wartet sein Bruder auf ihn.',
      'Am Abend kocht Tom zu Hause. Er macht Nudeln mit Tomaten. Danach ruft er Jan an. Die beiden wollen am Sonntag wieder zusammen trainieren.',
    ],
    glossary: { Laufband: 'bežecký pás', sonst: 'inak, inokedy', wartet: 'čaká' },
  }, [
    ['Mit wem frühstückt Tom?', 'Tom frühstückt mit seiner Schwester.', [['schwester']], 'V prvej časti hľadaj dej pri deviatej hodine.', 'Schwester je ženského rodu a po mit používame seiner.', [['mit wem', 's kým'], ['frühstücken', 'raňajkovať']], ['Er frühstückt mit seiner Schwester.', 'Um neun Uhr frühstückt er mit seiner Schwester.']],
    ['Wen trifft Tom im Fitnessstudio?', 'Tom trifft dort seinen Freund Jan.', [['jan']], 'Meno je v prvom odseku.', 'Treffen má priamy predmet v Akkusative. So sich treffen mit používame Dativ.', [['wen', 'koho'], ['treffen', 'stretnúť'], ['im Fitnessstudio', 'vo fitnescentre']], ['Er trifft Jan.', 'Tom trifft Jan.', 'Er trifft sich mit Jan.', 'Er trifft sich dort mit seinem Freund Jan.']],
    ['Was macht Tom zuerst im Fitnessstudio?', 'Tom trainiert zuerst auf dem Laufband.', [['laufband']], 'Hľadaj začiatok druhého odseku.', 'Pri polohe používame auf dem Laufband v Dative.', [['was machen', 'čo robiť'], ['zuerst', 'najprv'], ['im Fitnessstudio', 'vo fitnescentre']], ['Er trainiert zuerst auf dem Laufband.', 'Er trainiert eine halbe Stunde auf dem Laufband.', 'Tom trainiert zuerst eine halbe Stunde auf dem Laufband.', 'Zuerst trainiert Tom auf dem Laufband.']],
    ['Was kocht Tom am Abend?', 'Tom kocht Nudeln mit Tomaten.', [['nudeln'], ['tomaten']], 'V poslednej časti hľadaj názov jedla a zeleniny.', 'Po mit je Dativ. Množné číslo die Tomaten tu ďalšie -n nedostáva.', [['kochen', 'variť'], ['am Abend', 'večer']], ['Er kocht Nudeln mit Tomaten.', 'Er macht Nudeln mit Tomaten.', 'Am Abend kocht er Nudeln mit Tomaten.']],
    ['Wann wollen Tom und Jan wieder trainieren?', 'Sie wollen am Sonntag wieder trainieren.', [['sonntag']], 'Hľadaj poslednú vetu.', 'Wollen je časované, trainieren ide na koniec.', [['wann', 'kedy'], ['wollen', 'chcieť'], ['wieder trainieren', 'znova trénovať']], ['Sie wollen am Sonntag wieder zusammen trainieren.', 'Am Sonntag wollen sie wieder trainieren.', 'Sie wollen am Sonntag trainieren.']],
  ]),
  lesson({
    id: 'universitaet', title: 'Ein langer Tag an der Uni', description: 'Mila študuje, pracuje a učí sa nemčinu.', difficulty: 'A2', minutes: 4,
    paragraphs: [
      'Mila studiert in Wien. Gestern ist sie früh aufgestanden, weil sie um acht Uhr an der Universität sein musste. Sie ist zuerst mit der Straßenbahn gefahren. An der Haltestelle hat sie ihren Freund Ben getroffen. Ben studiert auch in Wien, aber er lernt kein Deutsch. Er spricht schon sehr gut Deutsch.',
      'Am Vormittag hat Mila in der Bibliothek gearbeitet. Nach der Mittagspause hat sie einen Deutschkurs besucht. Die Lehrerin hat gesagt, dass jeder fünf Sätze über seinen Tag schreiben soll. Mila hat zuerst über ihre Familie geschrieben. Danach hat sie sich an den Morgen erinnert und einen Satz über Ben geschrieben.',
      '„Ich hatte einen vollen Tag“, dachte Mila. Am Abend wollte sie noch einkaufen. Der Supermarkt war schon geschlossen. Deshalb hat sie bei Ben gegessen.',
    ],
    glossary: { Haltestelle: 'zastávka', Bibliothek: 'knižnica', geschlossen: 'zatvorený' },
  }, [
    ['Warum ist Mila gestern früh aufgestanden?', 'Sie ist früh aufgestanden, weil sie um acht Uhr an der Universität sein musste.', [['acht', '8'], ['universität', 'uni']], 'Nájdi dôvod v prvej vete o včerajšku.', 'Pri weil a modálnom slovese je na konci sein musste.', [['warum', 'prečo'], ['gestern früh', 'včera skoro ráno'], ['aufstehen', 'vstať, vstávať']], ['Weil sie um acht Uhr an der Universität sein musste, ist sie früh aufgestanden.', 'Mila musste um acht Uhr an der Universität sein.']],
    ['Wo hat Mila Ben getroffen?', 'Mila hat Ben an der Haltestelle getroffen.', [['haltestelle']], 'Kde je v prvom odseku spomenutý Ben?', 'An der Haltestelle vyjadruje miesto v Dative.', [['wo', 'kde'], ['treffen', 'stretnúť']], ['Sie hat Ben an der Haltestelle getroffen.', 'An der Haltestelle hat sie Ben getroffen.', 'Sie hat ihn an der Haltestelle getroffen.']],
    ['Wo hat Mila am Vormittag gearbeitet?', 'Mila hat in der Bibliothek gearbeitet.', [['bibliothek']], 'Prejdi na začiatok druhého odseku.', 'Pri polohe používame in der Bibliothek. Partizip gearbeitet ide na koniec.', [['wo', 'kde'], ['am Vormittag', 'dopoludnia'], ['arbeiten', 'pracovať']], ['Sie hat in der Bibliothek gearbeitet.', 'Am Vormittag hat Mila in der Bibliothek gearbeitet.']],
    ['Wie viele Sätze sollten die Schüler schreiben?', 'Die Schüler sollten fünf Sätze schreiben.', [['fünf', '5']], 'Učiteľka spomína konkrétny počet.', 'Pri množnom čísle používame sollten. Infinitív schreiben stojí na konci.', [['wie viele Sätze', 'koľko viet'], ['sollten schreiben', 'mali napísať']], ['Sie sollten fünf Sätze schreiben.', 'Jeder sollte fünf Sätze schreiben.', 'Die Schüler sollten 5 Sätze schreiben.']],
    ['Wo hat Mila am Abend gegessen?', 'Mila hat bei Ben gegessen.', [['bei ben']], 'Hľadaj poslednú vetu.', 'Bei Ben označuje, u koho jedla. Perfekt od essen je hat gegessen.', [['wo', 'kde'], ['am Abend', 'večer'], ['essen', 'jesť']], ['Sie hat bei Ben gegessen.', 'Am Abend hat Mila bei Ben gegessen.', 'Bei Ben hat sie gegessen.']],
  ]),
  lesson({
    id: 'berlin', title: 'Ein Wochenende in Berlin', description: 'Cesta vlakom, návšteva a zmena plánov.', difficulty: 'A2', minutes: 4,
    paragraphs: [
      'Am Freitag ist Nora mit dem Zug nach Berlin gefahren. Ihre Freundin Anna wohnt dort. Anna hat Nora am Bahnhof abgeholt. Danach sind sie zusammen zu Anna nach Hause gefahren. Am Abend haben sie Pizza gegessen und über die Pläne für das Wochenende gesprochen.',
      'Am Samstag wollten sie zuerst mit dem Fahrrad in den Park fahren. Es hat aber stark geregnet. Deshalb sind sie mit der U-Bahn in die Stadt gefahren und haben ein Museum besucht. Dort haben sie viel Zeit verbracht. Danach haben sie in einem kleinen Café Kaffee getrunken. Nora hat ihrer Mutter ein Foto aus dem Café geschickt.',
      'Am Sonntag hat Nora lange geschlafen. Am Nachmittag musste sie schon zurückfahren, weil sie am Montag wieder arbeiten musste. Am Bahnhof hat sie Anna gesagt, dass sie im Sommer wiederkommen möchte.',
    ],
    glossary: { abgeholt: 'vyzdvihla', geregnet: 'pršalo', verbracht: 'strávili (čas)' },
  }, [
    ['Wie ist Nora nach Berlin gefahren?', 'Nora ist mit dem Zug nach Berlin gefahren.', [['zug']], 'V prvej vete nájdi dopravný prostriedok.', 'Po mit je Dativ dem Zug. Pri ceste je v Perfekte ist gefahren.', [['wie', 'ako'], ['fahren', 'ísť dopravným prostriedkom']], ['Sie ist mit dem Zug nach Berlin gefahren.', 'Nora ist mit dem Zug gefahren.', 'Sie ist mit dem Zug gefahren.']],
    ['Wer hat Nora am Bahnhof abgeholt?', 'Anna hat Nora am Bahnhof abgeholt.', [['anna', 'ihre freundin']], 'Hľadaj abgeholt v prvom odseku.', 'Perfekt odlučiteľného abholen sa tvorí s haben a abgeholt.', [['wer', 'kto'], ['am Bahnhof', 'na stanici'], ['abholen', 'vyzdvihnúť']], ['Ihre Freundin Anna hat sie abgeholt.', 'Anna hat sie abgeholt.', 'Ihre Freundin Anna hat sie am Bahnhof abgeholt.']],
    ['Warum sind sie nicht mit dem Fahrrad in den Park gefahren?', 'Sie sind nicht in den Park gefahren, weil es stark geregnet hat.', [['geregnet', 'regen']], 'Dôvod hľadaj na začiatku druhého odseku.', 'Po weil stojí pomocné hat na konci.', [['warum', 'prečo'], ['mit dem Fahrrad', 'na bicykli'], ['in den Park', 'do parku']], ['Sie sind nicht mit dem Fahrrad in den Park gefahren, weil es stark geregnet hat.', 'Weil es geregnet hat, sind sie nicht in den Park gefahren.', 'Es hat stark geregnet.', 'Es hat geregnet.']],
    ['Wem hat Nora ein Foto geschickt?', 'Nora hat ihrer Mutter ein Foto geschickt.', [['ihrer mutter', 'mutter']], 'Posledná veta v druhom odseku spomína príjemcu.', 'Príjemcu slovesa schicken vyjadruje Dativ ihrer Mutter.', [['wem', 'komu'], ['ein Foto schicken', 'poslať fotku']], ['Sie hat ihrer Mutter ein Foto geschickt.', 'Ihrer Mutter hat sie ein Foto geschickt.']],
    ['Wann möchte Nora wiederkommen?', 'Nora möchte im Sommer wiederkommen.', [['sommer']], 'Plán na ďalšiu návštevu je v poslednej vete.', 'Po möchte stojí celý infinitív wiederkommen na konci.', [['wann', 'kedy'], ['möchte', 'chce, rada by'], ['wiederkommen', 'prísť znova']], ['Sie möchte im Sommer wiederkommen.', 'Im Sommer möchte sie wiederkommen.']],
  ]),
  lesson({
    id: 'fahrschule', title: 'Meine erste Fahrstunde', description: 'Prvé jazdy v autoškole a malý pokrok.', difficulty: 'A2', minutes: 4,
    paragraphs: [
      'Ich mache gerade meinen Führerschein. Letzten Mittwoch hatte ich meine erste Fahrstunde. Vor der Fahrstunde war ich aufgeregt. Ich musste um vier Uhr bei der Fahrschule sein. Mein Fahrlehrer heißt Herr Weber. Er war sehr ruhig und hat mir zuerst das Auto gezeigt. Danach bin ich langsam auf einem Parkplatz gefahren.',
      'Am Anfang war ich nervös, weil ich noch nie Auto gefahren bin. Herr Weber hat gesagt, dass ich mir Zeit lassen kann. Zuerst bin ich nur geradeaus gefahren. Danach durfte ich in eine kleine Straße fahren. Dort waren nicht viele Autos. Wenn ich etwas nicht verstanden habe, habe ich Herrn Weber gefragt.',
      'Nach der Stunde habe ich mich besser gefühlt. Ich bin mit dem Bus nach Hause gefahren und habe meiner Schwester von der Stunde erzählt. Nächste Woche habe ich wieder eine Fahrstunde.',
    ],
    glossary: { Führerschein: 'vodičský preukaz', Fahrstunde: 'praktická jazda v autoškole', geradeaus: 'rovno, priamo', aufgeregt: 'nervózny pred jazdou' },
  }, [
    ['An welchem Tag war die erste Fahrstunde?', 'Die erste Fahrstunde war letzten Mittwoch.', [['mittwoch']], 'Prvá časová informácia je v druhom súvetí.', 'Präteritum od sein je v tretej osobe war.', [['an welchem Tag', 'v ktorý deň'], ['die Fahrstunde', 'jazda v autoškole']], ['Sie war letzten Mittwoch.', 'Die erste Fahrstunde war am Mittwoch.', 'Letzten Mittwoch war die erste Fahrstunde.']],
    ['Wie heißt der Fahrlehrer?', 'Der Fahrlehrer heißt Herr Weber.', [['weber']], 'V prvom odseku je meno učiteľa.', 'Pri er používame tvar heißt.', [['wie heißt ...?', 'ako sa volá ...?'], ['der Fahrlehrer', 'inštruktor autoškoly']], ['Er heißt Herr Weber.', 'Der Fahrlehrer heißt Weber.']],
    ['Wo ist die Person zuerst mit dem Auto gefahren?', 'Die Person ist zuerst auf einem Parkplatz gefahren.', [['parkplatz']], 'Hľadaj poslednú vetu v prvom odseku.', 'Pri jazde po parkovisku opisujeme miesto, preto auf einem Parkplatz.', [['wo', 'kde'], ['zuerst', 'najprv'], ['mit dem Auto fahren', 'ísť autom']], ['Sie ist zuerst auf einem Parkplatz gefahren.', 'Sie ist auf einem Parkplatz gefahren.', 'Die Person ist auf einem Parkplatz gefahren.']],
    ['Warum war die Person am Anfang nervös?', 'Die Person war nervös, weil sie noch nie Auto gefahren ist.', [['noch nie', 'zum ersten mal'], ['auto', 'autofahren']], 'Hľadaj dôvod hneď na začiatku druhého odseku.', 'Vo vete s weil je ist až na konci.', [['warum', 'prečo'], ['am Anfang', 'na začiatku'], ['nervös', 'nervózny']], ['Sie war nervös, weil sie noch nie Auto gefahren ist.', 'Sie ist vorher noch nie Auto gefahren.', 'Sie ist noch nie Auto gefahren.']],
    ['Wem hat die Person von der Stunde erzählt?', 'Sie hat ihrer Schwester von der Stunde erzählt.', [['schwester']], 'Príjemca sa spomína v poslednom odseku.', 'Erzählen von sa tu spája s príjemcom v Dative ihrer Schwester.', [['wem', 'komu'], ['von etwas erzählen', 'rozprávať o niečom']], ['Die Person hat ihrer Schwester von der Stunde erzählt.', 'Sie hat ihrer Schwester davon erzählt.']],
  ]),
]
