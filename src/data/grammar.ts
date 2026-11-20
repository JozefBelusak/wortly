import { makeExercises } from './exercises'

const drills = [
  ...makeExercises('grammar', 'a1-grammatik', 'A1', [
    ['Ich ___ müde. (sein)', 'bin', ['conjugation'], 'Pri ich používa sein nepravidelný tvar.', 'Prvá osoba jednotného čísla od sein je bin.'],
    ['Du ___ heute Zeit. (haben)', 'hast', ['conjugation'], 'Tvar pre du je nepravidelný a končí na -st.', 'Du má tvar hast, er/sie má hat.'],
    ['Wir ___ in Bratislava. (wohnen)', 'wohnen', ['conjugation'], 'Tvar pre wir je rovnaký ako infinitív.', 'Pri wir používame u pravidelných slovies koncovku -en.'],
    ['___ ihr Deutsch? (sprechen)', 'Sprecht', ['conjugation'], 'Pri ihr použiješ kmeň sprech- a koncovku -t.', 'Pre ihr platí sprecht. Zmena e → i je v tvaroch du a er/sie/es.', ['sprecht']],
    ['heute / ich / arbeiten / muss', 'Heute muss ich arbeiten.', ['word-order', 'modal'], 'Za heute patrí časovaný tvar. Infinitív stojí na konci.', 'Heute stojí na prvej pozícii, muss na druhej.', ['Ich muss heute arbeiten.']],
    ['wo / du / wohnen (časuj sloveso)', 'Wo wohnst du?', ['word-order', 'conjugation'], 'Za wo ide časované sloveso.', 'Otázka s wo má poradie opytovacie slovo, sloveso, podmet.'],
    ['Wir bestellen ___ Kaffee. (ein)', 'einen', ['akkusativ', 'articles'], 'Der Kaffee má v tejto vete funkciu priameho predmetu.', 'Pri mužskom rode je neurčitý člen v Akkusative einen.'],
    ['Ich habe ___ Zeit. (kein)', 'keine', ['akkusativ', 'articles'], 'Zeit je ženského rodu.', 'Záporný člen je pri die Zeit v Akkusative keine.'],
    ['Sie kauft ___ Bier. (ein)', 'ein', ['articles', 'akkusativ'], 'Bier je stredného rodu.', 'Stredný rod má v Nominative aj Akkusative ein.'],
    ['Ich spreche mit ___ Freund. (ein)', 'einem', ['dativ', 'articles'], 'Mit vyžaduje Dativ. Freund je mužského rodu.', 'Správne spojenie je mit einem Freund.'],
    ['Ich bin bei ___ Freundin. (mein)', 'meiner', ['dativ', 'possessive'], 'Bei vyžaduje Dativ. Freundin je ženského rodu.', 'Ženská datívna koncovka privlastňovacieho zámena je -er.'],
    ['Ich gehe ___ Arbeit. (zu + určitý člen)', 'zur', ['dativ', 'articles'], 'Práca je die Arbeit. Spoj zu s členom v Dative.', 'Zu der sa v tomto spojení skracuje na zur.', ['zu der']],
    ['Ich rufe ___ an. (er)', 'ihn', ['pronouns', 'akkusativ'], 'Pri anrufen potrebuješ priamy predmet.', 'Er má v Akkusative tvar ihn.'],
    ['Ich spreche mit ___. (du)', 'dir', ['pronouns', 'dativ'], 'Po mit patrí osobné zámeno do Dativu.', 'Dativ od du je dir.'],
    ['Dnes nemôžem pracovať.', 'Ich kann heute nicht arbeiten.', ['modal', 'word-order'], 'Použi können, zápor nicht a infinitív na konci.', 'Kann je časovaný tvar od können. Arbeiten ostáva v infinitíve.', ['Heute kann ich nicht arbeiten.']],
    ['du / hier / nicht / rauchen / dürfen (časuj sloveso)', 'Du darfst hier nicht rauchen.', ['modal', 'conjugation'], 'Dürfen sa pri du mení. Rauchen ostáva v infinitíve.', 'V jednotnom čísle má dürfen tvary darf, darfst, darf.', ['Hier darfst du nicht rauchen.']],
    ['ich / um sieben / aufstehen (hlavná veta)', 'Ich stehe um sieben auf.', ['separable', 'word-order'], 'Oddeľ predponu auf a umiestni ju na koniec.', 'Pri aufstehen sa v hlavnej vete časuje stehen a predpona stojí na konci.', ['Um sieben stehe ich auf.', 'Ich stehe um sieben Uhr auf.', 'Um sieben Uhr stehe ich auf.']],
    ['mein Freund → Akkusativ', 'meinen Freund', ['possessive', 'akkusativ'], 'Mužský rod mení koncovku privlastňovacieho zámena.', 'Mein Freund sa v Akkusative mení na meinen Freund.'],
  ]),
  ...makeExercises('grammar', 'a2-grammatik', 'A2', [
    ['Ich ___ nach Berlin gefahren. (haben/sein)', 'bin', ['perfekt-aux'], 'Je to presun z jedného miesta na druhé.', 'Fahren s cieľom tvorí Perfekt so sein.'],
    ['Sie ___ Kaffee getrunken. (ona, haben/sein)', 'hat', ['perfekt-aux', 'conjugation'], 'Trinken má v Perfekte pomocné sloveso haben.', 'Pre sie v jednotnom čísle sa haben mení na hat.'],
    ['Wir haben gestern Pizza ___. (essen)', 'gegessen', ['participle'], 'Essen tvorí nepravidelný tvar s koncovkou -en.', 'Partizip II od essen je gegessen.'],
    ['Ich habe meine Freundin ___. (anrufen)', 'angerufen', ['participle', 'separable'], 'Vlož ge medzi an a kmeň a použi správny tvar od rufen.', 'Partizip II od anrufen je angerufen.'],
    ['Ich bin heute früh ___. (aufstehen)', 'aufgestanden', ['participle', 'separable'], 'Od stehen máš tvar gestanden. Pridaj odlučiteľnú predponu.', 'Aufstehen → aufgestanden.'],
    ['Som unavený, pretože som včera pracoval.', 'Ich bin müde, weil ich gestern gearbeitet habe.', ['subordinate', 'word-order'], 'Po weil stojí časované pomocné sloveso až za Partizipom.', 'Vedľajšia veta je weil ich gestern gearbeitet habe.', ['Weil ich gestern gearbeitet habe, bin ich müde.']],
    ['dass / er / morgen / arbeiten / muss (zlož vetu)', 'dass er morgen arbeiten muss', ['subordinate', 'modal', 'word-order'], 'Časované muss patrí za infinitív.', 'Po dass je tu na konci poradie arbeiten muss.'],
    ['Wenn ich Zeit habe, ___ Deutsch. (ich / lernen)', 'lerne ich', ['subordinate', 'word-order'], 'Prvú pozíciu zaberá celá vedľajšia veta.', 'Za čiarkou je najprv lerne, potom podmet ich.'],
    ['Ich bin müde. Deshalb ___ Kaffee. (ich / trinken)', 'trinke ich', ['word-order', 'conjugation'], 'Deshalb je prvý vetný člen. Sloveso je nasledujúce.', 'Po deshalb stojí časovaný tvar na druhej pozícii.'],
    ['Ich freue ___ auf das Wochenende. (reflexívne zámeno)', 'mich', ['reflexive', 'pronouns'], 'Pri ich použiješ zvratný tvar v Akkusative.', 'Sich freuen sa spája s reflexívnym zámenom mich pri ich.'],
    ['Wir treffen ___ am Bahnhof. (reflexívne zámeno)', 'uns', ['reflexive', 'pronouns'], 'Hľadáš tvar pre prvú osobu množného čísla.', 'Pri wir je zvratné zámeno uns.'],
    ['Ich bin ___ Stadt. (in + určitý člen)', 'in der', ['location', 'dativ'], 'Pýtaš sa Wo? Stadt je ženského rodu.', 'Pri polohe je v tejto väzbe Dativ, preto in der Stadt.'],
    ['Ich gehe ___ Fitnessstudio. (in + určitý člen)', 'ins', ['location', 'akkusativ'], 'Pýtaš sa Wohin? Fitnessstudio je stredného rodu.', 'Pri smere je Akkusativ. In das sa dá skrátiť na ins.', ['in das']],
    ['mit / euer Freund → Dativ (napíš celé spojenie)', 'mit eurem Freund', ['possessive', 'dativ'], 'Po mit treba mužský Dativ. Pri euer vypadne druhé e.', 'Euer Freund sa s mit zmení na mit eurem Freund.'],
    ['Ich ___ gestern nicht schlafen. (können, Präteritum)', 'konnte', ['preterite', 'modal'], 'V Präterite nemá können prehlásku.', 'Konnte je pre ich správny tvar v Präterite.'],
    ['Gestern ___ ich zu Hause. (sein, Präteritum)', 'war', ['preterite', 'location'], 'Minulý tvar pre ich je krátky a nepravidelný.', 'Sein má v jednotnom čísle tvary war, warst, war.'],
  ]),
]

export const transformations = [
  ...makeExercises('grammar', 'a1-umformung', 'A1', [
    ['ich wohne → zmeň podmet na du', 'du wohnst', ['conjugation'], 'Pri du pridaj ku kmeňu koncovku -st.', 'Od wohnen je druhá osoba jednotného čísla du wohnst.', ['Du wohnst']],
    ['Du bist müde. → oslov viac ľudí cez ihr', 'Ihr seid müde.', ['conjugation'], 'Sein má osobitný tvar pre ihr.', 'Tvar pre ihr je seid.'],
    ['Ich arbeite heute. → začni slovom Heute', 'Heute arbeite ich.', ['word-order'], 'Po časovom údaji potrebuješ časované sloveso.', 'Heute zaberá prvú pozíciu, arbeite druhú.'],
    ['ein Kaffee → Akkusativ (objednávaš si ho)', 'einen Kaffee', ['akkusativ', 'articles'], 'Pri der Kaffee zmeň pád neurčitého člena.', 'Ein sa v mužskom Akkusative mení na einen.'],
    ['eine Freundin → pridaj mit a uprav pád', 'mit einer Freundin', ['dativ', 'articles'], 'Mit vyžaduje Dativ.', 'Neurčitý člen ženského rodu sa v Dative mení na einer.'],
    ['er → osobné zámeno v Dative', 'ihm', ['pronouns', 'dativ'], 'Hľadáš tvar, ktorý môže stáť napríklad po mit.', 'Dativ od er je ihm.'],
  ]),
  ...makeExercises('grammar', 'a2-umformung', 'A2', [
    ['Ich fahre nach Berlin. → Perfekt', 'Ich bin nach Berlin gefahren.', ['perfekt-aux', 'participle'], 'Pri presune do cieľa potrebuješ sein a Partizip II.', 'V tomto význame má fahren Perfekt bin gefahren.', ['Nach Berlin bin ich gefahren.']],
    ['Ich trinke Kaffee. → Perfekt', 'Ich habe Kaffee getrunken.', ['participle', 'perfekt-aux'], 'V Partizipe od trinken sa mení samohláska.', 'Perfekt od trinken je habe getrunken.', ['Kaffee habe ich getrunken.']],
    ['Ich rufe Julia an. → Perfekt', 'Ich habe Julia angerufen.', ['separable', 'participle'], 'Anruf- rozdeľ v Partizipe pomocou ge.', 'Anrufen → angerufen. V Perfekte predpona zostáva spolu s Partizipom.'],
    ['Ich arbeite heute. → vyjadri povinnosť pomocou müssen', 'Ich muss heute arbeiten.', ['modal', 'word-order'], 'Časuj müssen. Pracovať ostane v infinitíve.', 'Muss je na druhej pozícii, arbeiten uzatvára vetu.', ['Heute muss ich arbeiten.']],
    ['Ich habe Zeit. Ich lerne Deutsch. → začni podmienkou s wenn', 'Wenn ich Zeit habe, lerne ich Deutsch.', ['subordinate', 'word-order'], 'Po wenn má časované sloveso koncovú pozíciu. Čo príde hneď po čiarke?', 'V časti s wenn je habe na konci. Po čiarke nasleduje časované lerne.'],
    ['Ich treffe mich mit Nina. → zmeň podmet na wir', 'Wir treffen uns mit Nina.', ['reflexive', 'pronouns', 'conjugation'], 'Zmeň časovanie aj zvratné zámeno.', 'Pre wir je sloveso treffen a zvratné zámeno uns.', ['Mit Nina treffen wir uns.']],
    ['Ich bin im Fitnessstudio. → vyjadri smer cez gehen', 'Ich gehe ins Fitnessstudio.', ['location', 'akkusativ'], 'V tejto vete odpovedáš na Wohin?', 'Pri smere použijeme Akkusativ. In das sa môže skrátiť na ins.', ['Ins Fitnessstudio gehe ich.', 'Ich gehe in das Fitnessstudio.', 'In das Fitnessstudio gehe ich.']],
    ['Ich muss arbeiten. → Präteritum', 'Ich musste arbeiten.', ['preterite', 'modal'], 'V minulom tvare müssen sa stratí prehláska.', 'Modálne müssen má v Präterite pre ich tvar musste.'],
  ]),
]

export const grammar = [...drills, ...transformations]
