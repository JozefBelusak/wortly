import { spiral } from './spiral'

export const spiralAdvanced = [
  ...spiral('b1-infinitiv', 'B1', [
    ['grammar', ['ohne-zu'], 'Er ist gegangen, ohne sich ___. (verabschieden)', 'zu verabschieden', 'Ohne … zu beschreibt eine Handlung, die nicht stattfindet.'],
    ['grammar', ['statt-zu'], 'Sie hat geschrieben, statt ___. (anrufen)', 'anzurufen', 'Bei statt … zu steht zu in anrufen zwischen an und rufen.'],
    ['grammar', ['verb-prep'], 'Wir warten seit zehn Minuten ___ den Bus. (an, auf oder von)', 'auf', 'Warten auf bezeichnet, auf wen oder was man wartet.'],
    ['sentence', ['ohne-zu', 'perfect', 'inseparable', 'reflexive'], 'Verbinde mit ohne … zu. Er hat die Besprechung verlassen. Er hat sich nicht verabschiedet.', 'Er hat die Besprechung verlassen, ohne sich zu verabschieden.', 'Verlassen und verabschieden haben untrennbare Vorsilben. Ohne … zu übernimmt das Subjekt des Hauptsatzes.', [], [
      ['ohne-zu', ['ohne dass sich', 'ohne sich verabschiedet', 'ohne sich verabschieden'], 'Gesucht ist die Konstruktion ohne … zu mit einem Infinitiv.'],
    ]],
    ['correction', ['statt-zu', 'separable', 'perfect', 'v2'], 'Statt zu anrufen, hat sie geschrieben.', 'Statt anzurufen, hat sie geschrieben.', 'Beim trennbaren anrufen steht zu zwischen an und rufen. Der Infinitivsatz kann vor dem Hauptsatz stehen.', ['Sie hat geschrieben, statt anzurufen.'], [
      ['statt-zu', ['statt zu anrufen', 'statt anrufen'], 'Bei anrufen sitzt zu innerhalb des Wortes.'],
      ['v2', ['statt anzurufen sie hat'], 'Nach dem vorangestellten Infinitivsatz folgt das konjugierte Verb.'],
    ]],
    ['sentence', ['um-zu', 'modal-present', 'verb-bracket', 'wohin', 'v2'], 'Verbinde mit um … zu. Lea fährt morgen in die Stadt. Dort möchte sie ihren Pass abholen können.', 'Lea fährt morgen in die Stadt, um ihren Pass abholen zu können.', 'Beim Infinitiv mit Modalverb steht zu vor können. In die Stadt bezeichnet die Richtung.', ['Morgen fährt Lea in die Stadt, um ihren Pass abholen zu können.', 'Um ihren Pass abholen zu können, fährt Lea morgen in die Stadt.'], [
      ['um-zu', ['um ihren pass zu abholen können', 'abzuholen können'], 'Bei einem Modalverb setzt du zu vor das letzte Verb.'],
      ['wohin', ['in der stadt fährt', 'fährt morgen in der stadt'], 'Die Stadt ist hier das Ziel der Fahrt.'],
    ]],
  ]),
  ...spiral('b1-relativ', 'B1', [
    ['grammar', ['verb-prep'], 'Denkst du oft ___ deinen ersten Urlaub? (an oder auf)', 'an', 'Denken an verbindet eine Person mit dem Gegenstand des Gedankens.'],
    ['grammar', ['verb-prep'], 'Ob wir fahren, hängt ___ dem Wetter ab. (mit oder von)', 'von', 'Abhängen von bezeichnet, wodurch etwas bestimmt wird.'],
    ['grammar', ['da-wo'], 'Frag mit einem Wo-Wort nach einer Sache. Ich warte auf den Bus. ___ wartest du?', 'Worauf', 'Worauf erfragt die Sache hinter warten auf.', ['worauf']],
    ['grammar', ['da-wo'], 'Ergänze ein Da-Wort zu mit. Ich öffne die Kiste mit diesem Schlüssel. Ich öffne sie ___.', 'damit', 'Damit ersetzt mit diesem Schlüssel.'],
    ['grammar', ['da-wo'], 'Frag mit einem Wo-Wort nach dem Werkzeug. Ich öffne die Tür mit einem Schlüssel. ___ öffnest du die Tür?', 'Womit', 'Womit erfragt die Sache hinter mit.', ['womit']],
    ['grammar', ['da-wo'], 'Frag mit einem Wo-Wort nach dem Gedanken. Ich denke an den neuen Plan. ___ denkst du?', 'Woran', 'Woran erfragt die Sache hinter denken an.', ['woran']],
    ['grammar', ['indirect', 'subordinate'], 'Bilde eine indirekte Ja-Nein-Frage. Ich weiß nicht, ___ der Bus heute fährt.', 'ob', 'Eine indirekte Ja-Nein-Frage beginnt mit ob.'],
    ['sentence', ['relative-prep', 'relative', 'dative', 'verb-bracket', 'subordinate', 'verb-prep'], 'Verbinde mit einem Relativsatz. Das ist der Kollege. Mit ihm habe ich über den Plan gesprochen.', 'Das ist der Kollege, mit dem ich über den Plan gesprochen habe.', 'Mit dem bleibt im Dativ. Über den Plan gehört zu sprechen über. Habe schließt den Relativsatz ab.', [], [
      ['relative-prep', ['mit den ich', 'mit ihn ich', 'mit der ich'], 'Nach mit brauchst du hier das passende Relativpronomen im Dativ.'],
      ['subordinate', ['mit dem ich habe', 'gesprochen ich habe'], 'Schiebe das konjugierte Hilfsverb an das Ende des Relativsatzes.'],
    ]],
    ['sentence', ['da-wo', 'verb-prep', 'subordinate', 'dass'], 'Ersetze an den ersten Kurs durch ein Da-Wort und nenne den Grund. Ich denke oft an den ersten Kurs. Er hat mir gezeigt, dass ich Deutsch lernen kann.', 'Ich denke oft daran, weil der erste Kurs mir gezeigt hat, dass ich Deutsch lernen kann.', 'Daran übernimmt an den ersten Kurs. In beiden Nebensätzen steht die konjugierte Verbform am Ende.', ['Ich denke oft daran, weil mir der erste Kurs gezeigt hat, dass ich Deutsch lernen kann.'], [
      ['da-wo', ['ich denke oft darauf', 'ich denke daran an'], 'Die Präposition an bleibt im Da-Wort erhalten.'],
    ]],
    ['sentence', ['indirect', 'wohin', 'subordinate', 'verb-bracket'], 'Mach daraus eine höfliche indirekte Frage mit Können Sie mir sagen. Wohin muss ich die Unterlagen bringen?', 'Können Sie mir sagen, wohin ich die Unterlagen bringen muss?', 'Das Fragewort wohin bleibt. Im Nebensatz steht muss nach dem Infinitiv.', [], [
      ['indirect', ['wohin muss ich', 'ob wohin ich'], 'Bei einer Frage mit wohin bleibt das Fragewort und der Satz folgt der Nebensatzstellung.'],
    ]],
    ['correction', ['verb-prep', 'reflexive-prep', 'da-wo', 'accusative'], 'Ich interessiere mich an den Kurs und freue mich schon daran.', 'Ich interessiere mich für den Kurs und freue mich schon darauf.', 'Sich interessieren für und sich freuen auf haben unterschiedliche Präpositionen.', ['Ich interessiere mich für den Kurs und freue mich darauf.'], [
      ['reflexive-prep', ['interessiere mich an', 'interessiere mich auf'], 'Sich interessieren braucht eine feste Präposition.'],
      ['da-wo', ['freue mich schon daran', 'freue mich daran'], 'Die Präposition der Zukunftserwartung muss im Da-Wort erhalten bleiben.'],
    ]],
  ]),
  ...spiral('b1-adjektive', 'B1', [
    ['grammar', ['noun-declension'], 'Ich habe einen ___ im Zug getroffen. (der Student)', 'Studenten', 'Student ist ein schwaches Maskulinum und bekommt im Akkusativ Singular -en.'],
    ['grammar', ['genitive'], 'Das ist das Fahrrad ___ Nachbarn. (mein)', 'meines', 'Im maskulinen Genitiv heißt das Possessivwort meines. Die Form Nachbarn steht bereits da.'],
    ['grammar', ['pronoun-order'], 'Ersetze beide Objekte in dieser Antwort durch Pronomen. Ich gebe dem Kind das Buch. Ich gebe ___.', 'es ihm', 'Bei zwei unbetonten Pronomen steht gewöhnlich der Akkusativ vor dem Dativ.'],
    ['grammar', ['word-formation'], 'Bilde das passende Nomen zu wohnen mit Artikel. Gesucht ist ein Ort, an dem man wohnt.', 'die Wohnung', 'Aus wohnen entsteht mit -ung das feminine Nomen Wohnung.'],
    ['sentence', ['adjective-endings', 'noun-declension', 'dative', 'reflexive-prep', 'relative'], 'Verbinde mit einem Relativsatz. Ich unterhalte mich mit einem Studenten. Der Student ist neu und wohnt neben uns. Setze neu vor Student.', 'Ich unterhalte mich mit einem neuen Studenten, der neben uns wohnt.', 'Mit fordert Dativ. Student und neu bekommen hier -en. Der steht im Relativsatz im Nominativ.', [], [
      ['noun-declension', ['mit einem neuen Student'], 'Student bekommt außerhalb des Nominativs im Singular gewöhnlich -en.'],
      ['adjective-endings', ['mit einem neue studenten', 'mit einem neuer studenten'], 'Nach einem steht das Adjektiv im Dativ mit -en.'],
    ]],
    ['sentence', ['pronoun-order', 'personal', 'dative', 'accusative', 'perfect'], 'Ersetze Frau Meyer und den Schlüssel durch zwei Pronomen und setze ins Perfekt. Ich gebe Frau Meyer den Schlüssel.', 'Ich habe ihn ihr gegeben.', 'Ihn steht für den Schlüssel, ihr steht für Frau Meyer. Bei zwei Pronomen kommt hier der Akkusativ zuerst.', [], [
      ['pronoun-order', ['habe ihr ihn', 'habe ihr den'], 'Wenn beide Objekte Pronomen sind, kommt hier der Akkusativ vor dem Dativ.'],
    ]],
    ['correction', ['comparison', 'adjective-endings', 'relative', 'dative'], 'Die günstigste Wohnung, die wir besichtigt haben, ist näher zu Bahnhof wie die andere. Beginne mit Die günstigste Wohnung und verwende näher am Bahnhof.', 'Die günstigste Wohnung, die wir besichtigt haben, ist näher am Bahnhof als die andere.', 'Nach dem Komparativ steht hier als. Der Relativsatz behält das Hilfsverb am Ende.', [], [
      ['comparison', ['näher am Bahnhof wie', 'näher zum Bahnhof wie'], 'Pri rozdiele po stupňovanom prídavnom mene použi správnu porovnávaciu spojku.'],
    ]],
    ['sentence', ['genitive', 'adjective-endings', 'relative-prep', 'wo'], 'Verbinde mit einem Relativsatz und verwende den Genitiv. Das alte Fahrrad gehört meinem Nachbarn. Wir fahren oft damit. Es steht hier. Beginne mit Das alte Fahrrad meines …', 'Das alte Fahrrad meines Nachbarn, mit dem wir oft fahren, steht hier.', 'Meines Nachbarn steht im Genitiv. Mit dem ist Dativ im Relativsatz.'],
  ]),
  ...spiral('b1-erzaehlen', 'B1', [
    ['grammar', ['future'], 'Schreib nur die beiden Teile des Futur I. Ab morgen ___ ich früher ___. (aufstehen)', 'werde aufstehen', 'Futur I entsteht aus werden und dem Infinitiv.'],
    ['grammar', ['time-clause', 'subordinate'], 'Ergänze die passende Konjunktion. ___ ich die Arbeitsstelle gewechselt habe, fahre ich mit dem Zug. (seitdem oder bis)', 'seitdem', 'Seitdem leitet einen Zeitraum ein, der bis jetzt andauert.', ['Seitdem']],
    ['grammar', ['tekamolo'], 'Ordne neutral. Ich fahre [mit dem Bus / morgen / zum Bahnhof / wegen der Baustelle].', 'Ich fahre morgen wegen der Baustelle mit dem Bus zum Bahnhof.', 'In der neutralen Reihenfolge steht oft Zeit vor Grund, Art und Ort. Andere Reihenfolgen können einen Schwerpunkt setzen.'],
    ['sentence', ['obwohl', 'preterite', 'modal-past', 'perfect', 'wohin', 'v2', 'subordinate'], 'Verbinde mit obwohl und beginne mit dem Nebensatz. Ich musste gestern lange arbeiten. Danach bin ich noch ins Fitnessstudio gegangen.', 'Obwohl ich gestern lange arbeiten musste, bin ich danach noch ins Fitnessstudio gegangen.', 'Musste schließt den Nebensatz. Der folgende Hauptsatz beginnt mit bin. Ins bezeichnet das Ziel.', [], [
      ['subordinate', ['obwohl ich musste gestern', 'obwohl ich gestern lange musste arbeiten'], 'Bei obwohl steht das konjugierte Verb im Nebensatz am Ende.'],
      ['v2', ['musste ich bin danach'], 'Der ganze Nebensatz belegt Position eins. Direkt danach folgt bin.'],
      ['perfect', ['habe ich danach noch', 'danach noch ins fitnessstudio gegangen habe'], 'Gehen bildet das Perfekt mit sein.'],
      ['wohin', ['im Fitnessstudio gegangen'], 'Es geht um die Richtung zum Fitnessstudio.'],
    ]],
    ['correction', ['trotzdem', 'v2', 'perfect', 'negation-position'], 'Der Bus kam nicht. Trotzdem wir haben den Anschluss nicht verpasst.', 'Der Bus kam nicht. Trotzdem haben wir den Anschluss nicht verpasst.', 'Trotzdem belegt die erste Stelle im Hauptsatz. Das konjugierte Verb folgt.', ['Der Bus kam nicht, trotzdem haben wir den Anschluss nicht verpasst.'], [
      ['v2', ['trotzdem wir haben'], 'Trotzdem gehört in einen Hauptsatz. Danach steht das Verb.'],
    ]],
    ['sentence', ['time-clause', 'pluperfect', 'preterite', 'separable', 'v2'], 'Erzähl mit nachdem. Zuerst holte Lea die Schlüssel ab. Danach fuhr sie zur Arbeit. Nutze Plusquamperfekt und Präteritum.', 'Nachdem Lea die Schlüssel abgeholt hatte, fuhr sie zur Arbeit.', 'Die frühere Handlung steht hier im Plusquamperfekt. Hatte steht am Ende des Nebensatzes.', ['Lea fuhr zur Arbeit, nachdem sie die Schlüssel abgeholt hatte.'], [
      ['pluperfect', ['abgeholt hat', 'hatte die schlüssel abgeholt'], 'Zeige die Vorzeitigkeit mit Partizip II und hatte am Ende des Nebensatzes.'],
    ]],
    ['sentence', ['time-clause', 'future', 'subordinate', 'verb-bracket', 'reflexive'], 'Formuliere mit bevor und Futur I im Hauptsatz. Zuerst ruhe ich mich aus. Dann gehe ich zur Arbeit.', 'Bevor ich zur Arbeit gehe, werde ich mich ausruhen.', 'Bevor steht bei der späteren Handlung. Werde und ausruhen bilden das Futur I.', ['Ich werde mich ausruhen, bevor ich zur Arbeit gehe.']],
    ['sentence', ['time-clause', 'modal-present', 'v2', 'subordinate', 'wo'], 'Verbinde mit bis. Ich kann hier bleiben. Du kommst zurück.', 'Ich kann hier bleiben, bis du zurückkommst.', 'Bis setzt einen Endpunkt. Zurückkommst steht am Ende des Nebensatzes.', ['Bis du zurückkommst, kann ich hier bleiben.']],
    ['sentence', ['als-wenn', 'preterite', 'reflexive-prep', 'subordinate', 'dative'], 'Nutze als für den einmaligen Umzug. Ich zog letztes Jahr um. Ich traf mich danach oft mit meinem neuen Nachbarn.', 'Als ich letztes Jahr umzog, traf ich mich danach oft mit meinem neuen Nachbarn.', 'Als bezeichnet den einmaligen Zeitraum. Mit meinem neuen Nachbarn bleibt im Dativ.', ['Ich traf mich danach oft mit meinem neuen Nachbarn, als ich letztes Jahr umzog.']],
    ['sentence', ['tekamolo', 'time-clause', 'future', 'v2', 'verb-bracket'], 'Ordne neutral und setze ins Futur I. Ich fahre [zum Amt / mit dem Bus / aus Zeitgründen / morgen früh], bevor ich arbeite.', 'Ich werde morgen früh aus Zeitgründen mit dem Bus zum Amt fahren, bevor ich arbeite.', 'Im neutralen Satz folgen Zeit, Grund, Art und Ziel aufeinander. Bevor leitet danach einen Nebensatz ein.', ['Bevor ich arbeite, werde ich morgen früh aus Zeitgründen mit dem Bus zum Amt fahren.']],
  ]),
  ...spiral('b2-konjunktiv', 'B2', [
    ['grammar', ['subjunctive'], 'Gib einen vorsichtigen Rat. Du ___ vor der Unterschrift den Vertrag lesen. (sollen, Konjunktiv II)', 'solltest', 'Solltest eignet sich, um einen Rat zu formulieren.'],
    ['sentence', ['subjunctive', 'verb-prep', 'da-wo', 'subordinate', 'verb-bracket'], 'Formuliere einen höflichen Vorschlag und ersetze über den Termin durch ein Da-Wort. Ich schlage vor, dass wir über den Termin erst morgen sprechen.', 'Ich würde vorschlagen, dass wir erst morgen darüber sprechen.', 'Würde vorschlagen macht den Vorschlag vorsichtiger. Darüber übernimmt über den Termin.', ['Ich würde vorschlagen, dass wir darüber erst morgen sprechen.'], [
      ['da-wo', ['morgen davon sprechen', 'morgen darauf sprechen'], 'Die Präposition über aus sprechen über bestimmt das Da-Wort.'],
    ]],
    ['sentence', ['subjunctive', 'indirect', 'verb-prep', 'subordinate', 'dative'], 'Frage höflich mit Könnten Sie mir sagen. Wovon hängt die Bearbeitungszeit ab?', 'Könnten Sie mir sagen, wovon die Bearbeitungszeit abhängt?', 'Wovon bleibt als Fragewort erhalten. Das trennbare Verb steht im Nebensatz am Ende zusammen.', ['Könnten Sie mir bitte sagen, wovon die Bearbeitungszeit abhängt?'], [
      ['indirect', ['wovon hängt die', 'wovon die bearbeitungszeit hängt ab'], 'Nach dem indirekten Fragewort braucht der Nebensatz Endstellung.'],
    ]],
    ['correction', ['subjunctive', 'relative-prep', 'dative', 'adjective-endings'], 'Wenn ich mehr Zeit hätte, würde ich mit der neuen Kollegin sprechen, mit die ich gestern gearbeitet habe.', 'Wenn ich mehr Zeit hätte, würde ich mit der neuen Kollegin sprechen, mit der ich gestern gearbeitet habe.', 'Die Kollegin bleibt der Bezug. Mit verlangt den Dativ der.', [], [
      ['relative-prep', ['mit die ich', 'mit ihr ich'], 'Behalte den Dativ und benutze ein Relativpronomen nach mit.'],
    ]],
    ['sentence', ['subjunctive', 'modal-past', 'obwohl', 'subordinate', 'wohin', 'verb-bracket'], 'Formuliere im Rückblick eine Möglichkeit mit hätte. Ich war müde. Trotzdem war es möglich, zum Training zu gehen. Beginne mit Obwohl ich müde war …', 'Obwohl ich müde war, hätte ich zum Training gehen können.', 'Hätte und die beiden Infinitive beschreiben eine vergangene Möglichkeit. Obwohl bleibt ein Nebensatz.'],
  ]),
  ...spiral('b2-passiv', 'B2', [
    ['grammar', ['passive-past'], 'Setze den Satz ins Präteritum. Der Antrag ___ gestern geprüft.', 'wurde', 'Im Präteritum lautet das Vorgangspassiv wurde + Partizip II.'],
    ['correction', ['passive-present', 'modal-present', 'verb-bracket', 'negation-position'], 'Der Antrag muss heute nicht werden eingereicht.', 'Der Antrag muss heute nicht eingereicht werden.', 'Bei Passiv mit Modalverb steht zuerst das Partizip, dann werden.', [], [
      ['passive-present', ['werden eingereicht'], 'Pri pasíve s modálnym slovesom presuň werden až za Partizip II.'],
    ]],
    ['sentence', ['passive-past', 'time-clause', 'pluperfect', 'adjective-endings', 'subordinate'], 'Verbinde mit nachdem. Das Team hatte die neuen Daten geprüft. Die Redaktion veröffentlichte den Bericht. Setze den zweiten Satz ins Passiv im Präteritum.', 'Nachdem das Team die neuen Daten geprüft hatte, wurde der Bericht veröffentlicht.', 'Der Nachdem-Satz endet mit hatte. Der Hauptsatz verwendet wurde und das Partizip.', ['Der Bericht wurde veröffentlicht, nachdem das Team die neuen Daten geprüft hatte.'], [
      ['passive-past', ['wird der bericht', 'bericht wird'], 'Der Hauptsatz soll im Präteritum des Vorgangspassivs stehen.'],
    ]],
    ['sentence', ['passive-present', 'future', 'relative', 'subordinate', 'fixed-prep'], 'Schreibe im Futur I und Passiv. Man prüft morgen alle Anträge, die bis Freitag eingegangen sind.', 'Alle Anträge, die bis Freitag eingegangen sind, werden morgen geprüft werden.', 'Das erste werden markiert das Futur I und das letzte werden das Vorgangspassiv. Im Relativsatz steht sind am Ende.', ['Morgen werden alle Anträge, die bis Freitag eingegangen sind, geprüft werden.']],
    ['correction', ['passive-past', 'participle', 'separable', 'time-clause'], 'Der Vertrag ist unterschrieben geworden, bevor die Daten eingetragen wurden.', 'Der Vertrag ist unterschrieben worden, bevor die Daten eingetragen wurden.', 'Im Perfekt des Vorgangspassivs verwendet man worden. Im Bevor-Satz steht wurden am Ende.', [], [
      ['passive-past', ['unterschrieben geworden'], 'Beim Vorgangspassiv im Perfekt benutzt du die besondere Form worden.'],
    ]],
    ['sentence', ['passive-past', 'indirect', 'subordinate', 'time-clause'], 'Schreibe die erste Frage indirekt und im Präteritum Passiv. Wann hat man den Raum reserviert? Die Gruppe wollte wissen …', 'Die Gruppe wollte wissen, wann der Raum reserviert wurde.', 'Die indirekte Frage behält wann. Das Präteritum Passiv endet mit wurde.'],
  ]),
  ...spiral('b2-verknuepfen', 'B2', [
    ['grammar', ['paired-links'], 'Der Kurs findet sowohl am Dienstag ___ am Donnerstag statt.', 'als auch', 'Sowohl … als auch schließt beide Aussagen ein.'],
    ['sentence', ['paired-links', 'relative', 'negation-choice', 'v2'], 'Verbinde mit weder … noch. Die Wohnung, die wir besichtigt haben, hat keinen Balkon. Auch einen Keller hat sie nicht.', 'Die Wohnung, die wir besichtigt haben, hat weder einen Balkon noch einen Keller.', 'Weder … noch übernimmt beide Verneinungen. Die Objekte stehen im Akkusativ.', ['Die Wohnung, die wir besichtigt haben, hat weder einen Keller noch einen Balkon.']],
    ['sentence', ['paired-links', 'v2', 'subjunctive', 'modal-present'], 'Wäge mit einerseits und andererseits ab. Der Kurs wäre hilfreich. Ich müsste dafür meine Arbeitszeit ändern.', 'Einerseits wäre der Kurs hilfreich, andererseits müsste ich dafür meine Arbeitszeit ändern.', 'Beide Adverbien können die erste Position einnehmen. Danach folgt jeweils das konjugierte Verb.', ['Einerseits wäre der Kurs hilfreich. Andererseits müsste ich dafür meine Arbeitszeit ändern.'], [
      ['v2', ['einerseits der kurs wäre', 'andererseits ich müsste'], 'Nach einerseits oder andererseits an Position eins kommt das Verb.'],
    ]],
    ['correction', ['main-link', 'v2', 'passive-present', 'verb-bracket'], 'Es fehlen Unterlagen. Außerdem die Frist kann nicht verlängert werden.', 'Es fehlen Unterlagen. Außerdem kann die Frist nicht verlängert werden.', 'Außerdem gehört zum Hauptsatz und besetzt die erste Position. Danach kommt kann.'],
    ['sentence', ['obwohl', 'trotzdem', 'weil', 'perfect', 'subordinate', 'wohin', 'zu', 'v2'], 'Verbinde die Aussagen mit obwohl und weil. Verwende trotzdem im Hauptsatz. Ich war eigentlich müde. Ich bin ins Fitnessstudio gegangen. Ich habe versucht, meine Trainingsroutine einzuhalten.', 'Obwohl ich eigentlich müde war, bin ich trotzdem ins Fitnessstudio gegangen, weil ich versucht habe, meine Trainingsroutine einzuhalten.', 'Im Hauptsatz folgt bin auf den vorangestellten Nebensatz. Im Weil-Teil steht habe vor der nachgestellten Infinitivgruppe.', [], [
      ['subordinate', ['obwohl ich war eigentlich', 'weil ich habe versucht'], 'Skontroluj koniec každej vedľajšej vety.'],
      ['v2', ['müde war ich bin', 'müde war trotzdem bin'], 'Nach dem vorangestellten Nebensatz steht das konjugierte Verb des Hauptsatzes.'],
      ['perfect', ['habe ich trotzdem ins', 'ins fitnessstudio gegangen habe'], 'Beim Gehen zum Ziel gehört sein ins Perfekt.'],
      ['zu', ['zu einhalten', 'trainingsroutine einhalten'], 'Bei einhalten steht zu zwischen der Vorsilbe und dem übrigen Verb.'],
    ]],
    ['sentence', ['paired-links', 'adjective-endings', 'passive-present', 'modal-present', 'verb-bracket'], 'Verbinde mit sowohl … als auch und setze ins Passiv. Man muss den alten Vertrag prüfen. Man muss den neuen Bericht prüfen.', 'Sowohl der alte Vertrag als auch der neue Bericht müssen geprüft werden.', 'Die verbundenen Subjekte bilden gemeinsam eine Mehrzahl. Danach stehen müssen, das Partizip und werden.', [], [
      ['paired-links', ['sowohl den alten vertrag', 'als die neue bericht'], 'Im Passiv werden beide früheren Objekte zu Subjekten im Nominativ.'],
    ]],
  ]),
  ...spiral('b2-abwaegen', 'B2', [
    ['grammar', ['genitive', 'fixed-prep'], 'Trotz ___ blieb die Bibliothek geöffnet. (das schlechte Wetter)', 'des schlechten Wetters', 'Trotz steht hier im formellen Genitiv. Das Wetter erhält -s.'],
    ['sentence', ['genitive', 'fixed-prep', 'adjective-endings', 'passive-past', 'subjunctive'], 'Ersetze den Weil-Satz durch aufgrund und die Wörter steigende Kosten. Weil die Kosten gestiegen sind, hätte der Vertrag neu verhandelt werden müssen.', 'Aufgrund der gestiegenen Kosten hätte der Vertrag neu verhandelt werden müssen.', 'Aufgrund verlangt hier den Genitiv. Hätte verhandelt werden müssen verbindet vergangene Hypothese, Passiv und Modalverb.', ['Aufgrund der steigenden Kosten hätte der Vertrag neu verhandelt werden müssen.'], [
      ['genitive', ['aufgrund die', 'aufgrund den'], 'Aufgrund führt hier eine Wortgruppe im Genitiv ein.'],
    ]],
    ['sentence', ['tekamolo', 'passive-present', 'modal-present', 'genitive', 'fixed-prep'], 'Formuliere im Passiv mit müssen. Ordne neutral. Man muss den Bericht [im Rathaus / aus Zeitgründen / schriftlich / morgen] einreichen.', 'Der Bericht muss morgen aus Zeitgründen schriftlich im Rathaus eingereicht werden.', 'Zeit, Grund, Art und Ort bilden hier eine neutrale Reihenfolge. Eingereicht werden schließt die Verbklammer.', [], [
      ['passive-present', ['muss morgen werden', 'werden eingereicht'], 'Setze eingereicht vor werden ans Ende.'],
    ]],
    ['correction', ['noun-declension', 'genitive', 'relative-prep', 'dative', 'passive-past'], 'Der Antrag des Student, mit dem wir gesprochen haben, wurde geprüft.', 'Der Antrag des Studenten, mit dem wir gesprochen haben, wurde geprüft.', 'Der schwache Singular Student erhält im Genitiv -en. Das Relativpronomen bleibt nach mit im Dativ.', [], [
      ['noun-declension', ['des student mit'], 'Student bekommt im Genitiv Singular die Endung -en.'],
    ]],
    ['sentence', ['word-formation', 'inseparable', 'genitive', 'fixed-prep', 'passive-past'], 'Formuliere mit aufgrund und dem Nomen zu verspätet. Weil der Zug verspätet war, wurde der Termin verschoben.', 'Aufgrund der Verspätung des Zuges wurde der Termin verschoben.', 'Aus verspätet wird Verspätung. Der Genitiv des Zuges macht deutlich, worauf sich die Verspätung bezieht.', ['Aufgrund der Verspätung des Zugs wurde der Termin verschoben.', 'Der Termin wurde aufgrund der Verspätung des Zuges verschoben.']],
    ['sentence', ['indirect', 'pronoun-order', 'perfect', 'subjunctive', 'subordinate'], 'Formuliere eine indirekte Frage mit ob und nutze zwei Pronomen. Hat die Verwaltung der Kollegin den Bericht schon geschickt? Beginne mit Ich würde gern wissen …', 'Ich würde gern wissen, ob die Verwaltung ihn ihr schon geschickt hat.', 'Ob leitet die indirekte Frage ein. Ihn steht vor ihr und hat steht im Nebensatz am Ende.', ['Ich würde gerne wissen, ob die Verwaltung ihn ihr schon geschickt hat.']],
  ]),
]
