# Codex prompt – interaktívna pomôcka na nemčinu

Vytvor webovú aplikáciu na interaktívne precvičovanie nemčiny pre študenta, ktorý sa učí približne od A1 smerom k B1/B2.

Aplikácia NEMÁ byť klon Duolinga. Nechcem XP, srdiečka, ligy, infantilné animácie, streak manipuláciu ani bezduché multiple-choice otázky. Primárny cieľ je aktívne vybavovanie vedomostí, skladanie vlastných viet, preklad, slovosled, gramatické tvary, slovná zásoba a čítanie s porozumením.

Použi:
- React
- TypeScript
- Vite
- čisté moderné UI
- responzívny dizajn vhodný aj na mobil
- localStorage na progres a vlastné slovíčka
- žiadny backend zatiaľ
- komponentová architektúra
- dáta lekcií drž oddelene od UI, napr. v TypeScript/JSON súboroch, aby sa dali jednoducho dopĺňať

## Hlavný princíp učenia

Aplikácia má používateľa nútiť NEMČINU TVORIŤ, nie iba rozpoznávať správnu odpoveď.

Preferuj:
- textové inputy,
- skladanie viet,
- dopĺňanie správnych tvarov,
- preklad zo slovenčiny do nemčiny,
- opravu chybných viet,
- recall flashcards,
- krátke reading comprehension texty,
- vlastné písanie.

Multiple choice používaj iba výnimočne, keď dáva pedagogický zmysel.

Po chybe nedávaj okamžite celé riešenie. Najprv:
1. označ, že odpoveď nie je správna,
2. zvýrazni typ chyby alebo daj krátky hint,
3. nech používateľ skúsi odpovedať druhýkrát,
4. až potom umožni zobraziť riešenie.

## Aktuálna úroveň a obsah

Používateľ už prešiel približne tieto témy:

### Základy
- ich, du, er, sie, es, wir, ihr, sie/Sie
- sein
- haben
- pravidelné slovesá
- základný slovosled
- otázky
- sloveso na 2. pozícii

### Slovná zásoba a základné frázy
- wohnen
- studieren
- lernen
- arbeiten
- trinken
- essen
- kaufen
- machen
- brauchen
- sehen
- sprechen
- fahren
- gehen
- schlafen
- kochen
- bestellen

### Akkusativ
- ein / eine / einen
- kein / keine / keinen
- einen Freund
- einen Kaffee
- eine Freundin
- ein Bier

### Dativ
- mit einem Freund
- mit einer Freundin
- bei einem Freund
- bei meiner Freundin
- zu einem Freund
- zum Arzt
- zur Arbeit
- mit mir
- mit dir
- mit ihm
- mit ihr
- bei meinen Freunden

### Modálne slovesá
- können
- möchten
- müssen
- wollen
- dürfen

Príklady:
- Ich kann Deutsch sprechen.
- Ich möchte Deutsch lernen.
- Ich muss morgen arbeiten.
- Ich will nach Berlin fahren.
- Du darfst hier nicht rauchen.

Pri modálnych slovesách má používateľ trénovať infinitív na konci.

### Perfekt
- haben/sein + Partizip II

Príklady:
- Ich habe gearbeitet.
- Ich habe Kaffee getrunken.
- Ich habe Pizza gegessen.
- Ich habe Deutsch gelernt.
- Ich bin nach Berlin gefahren.
- Ich bin nach Hause gegangen.
- Ich bin aufgestanden.

### Odlučiteľné slovesá
- aufstehen
- einkaufen
- anrufen
- fernsehen

Príklady:
- Ich stehe um sieben Uhr auf.
- Ich kaufe heute ein.
- Ich rufe meine Freundin an.
- Ich sehe am Abend fern.

Perfekt:
- aufgestanden
- eingekauft
- angerufen
- ferngesehen

### Časové výrazy
- heute
- gestern
- morgen
- früh
- spät
- am Morgen
- am Nachmittag
- am Abend
- am Wochenende
- danach
- dann
- später
- zuerst
- normalerweise
- manchmal
- oft
- meistens
- gegen Mitternacht

### Vedľajšie vety
- weil
- dass
- wenn

Kľúčové pravidlo:
časované sloveso ide na koniec.

Príklady:
- Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte.
- Ich weiß, dass du heute arbeitest.
- Wenn ich Zeit habe, lerne ich Deutsch.
- Ich bin müde, weil ich gestern gearbeitet habe.

### deshalb
Trénuj rozdiel:
- weil → sloveso na konci
- deshalb → sloveso na 2. pozícii

Príklad:
- Ich bin müde, deshalb trinke ich Kaffee.

### Reflexívne slovesá
- sich fühlen
- sich treffen
- sich freuen
- sich erinnern
- sich entspannen
- sich ausruhen

Príklady:
- Ich fühle mich müde.
- Wir treffen uns.
- Ich treffe mich mit Julia.
- Ich freue mich auf das Wochenende.
- Ich erinnere mich daran.
- Ich möchte mich ausruhen.

### Wo vs. Wohin
Trénuj:
- Wo? → Dativ
- Wohin? → Akkusativ

Príklady:
- Ich bin im Fitnessstudio.
- Ich gehe ins Fitnessstudio.
- Ich bin in der Stadt.
- Ich fahre in die Stadt.
- Ich bin zu Hause.
- Ich gehe nach Hause.
- Ich bin auf der Party.
- Ich gehe auf die Party.

### Privlastňovacie zámená
- mein
- dein
- sein
- ihr
- unser
- euer

Trénuj:
- mein Freund
- meinen Freund
- meinem Freund
- meine Freundin
- meiner Freundin

### Osobné zámená
Akkusativ:
- mich
- dich
- ihn
- sie
- uns
- euch

Dativ:
- mir
- dir
- ihm
- ihr
- uns
- euch
- ihnen

Príklady:
- Ich sehe ihn.
- Ich spreche mit ihm.
- Ich rufe sie an.
- Ich treffe mich mit ihr.
- Ich gebe ihm Kaffee.

### Präteritum základných slovies
- war
- hatte
- musste
- konnte
- wollte
- durfte

Príklady:
- Ich war gestern müde.
- Ich hatte gestern frei.
- Ich musste arbeiten.
- Ich konnte nicht schlafen.
- Ich wollte ins Fitnessstudio gehen.

## Hlavné obrazovky

### 1. Dashboard

Jednoduchý dashboard:
- Continue training
- Review weak topics
- Vocabulary
- Sentence Builder
- Reading
- Free Writing
- Progress

Zobraz:
- počet zvládnutých slov,
- počet viet,
- slabé témy,
- čo je vhodné zopakovať.

Žiadne XP ani ligy.

## 2. Sentence Builder

Toto je najdôležitejšia časť aplikácie.

Generuj slovenské zadanie, napríklad:

„Včera som pil kávu s kamarátkou.“

Používateľ musí napísať:

Ich habe gestern mit einer Freundin Kaffee getrunken.

Vyhodnotenie nech rozlišuje:
- úplne správne,
- gramaticky správne, ale iný prirodzený slovosled,
- drobný spelling mistake,
- nesprávny člen/pád,
- nesprávne časovanie,
- nesprávny slovosled,
- nesprávne pomocné sloveso haben/sein,
- chýbajúci infinitív/Partizip.

Nevyžaduj úplne identickú vetu, ak existuje viac správnych formulácií.

Pod odpoveďou zobraz krátke vysvetlenie, napríklad:

„mit vyžaduje Dativ → mit einer Freundin“

alebo:

„Po weil ide časované sloveso na koniec.“

## 3. Grammar Drills

Témy majú byť samostatne voliteľné.

Napríklad:

### Slovosled
Zadanie:
heute / ich / arbeiten / muss

Používateľ:
Heute muss ich arbeiten.

### Akkusativ vs. Dativ
Ich spreche mit ___ Freund.

Používateľ musí napísať:
einem

### haben vs. sein v Perfekte
Ich ___ nach Berlin gefahren.

Používateľ:
bin

### Modálne slovesá
„Dnes nemôžem pracovať.“

Používateľ:
Ich kann heute nicht arbeiten.

### weil/dass/wenn
„Som unavený, pretože som včera pracoval.“

Používateľ:
Ich bin müde, weil ich gestern gearbeitet habe.

## 4. Flashcards

Flashcards nemajú byť iba:
Deutsch → Slovensky.

Majú mať viac režimov:

### Vocabulary recall
Predná strana:
„unavený“

Používateľ si odpoveď vybaví a odhalí:
müde

### Phrase recall
„u mojej kamarátky“

→ bei meiner Freundin

### Grammar transformation
„mein Freund → Akkusativ“

→ meinen Freund

### Verb forms
fahren

→ fährt / ist gefahren

### Context card
„Som unavený, preto pijem kávu.“

→ Ich bin müde, deshalb trinke ich Kaffee.

Použi jednoduchý spaced repetition systém:
- Again
- Hard
- Good
- Easy

Ukladaj review dátumy do localStorage.

## 5. Vocabulary notebook

Používateľ musí vedieť:
- pridávať vlastné slová,
- editovať ich,
- označiť slovný druh,
- pridať člen,
- pridať plural,
- pridať Perfekt,
- pridať vlastnú príkladovú vetu,
- označiť slovo ako „learned“.

Pre podstatné mená preferuj formát:
der Freund – kamarát

Nie iba:
Freund – kamarát

Pre slovesá:
fahren – fährt – ist gefahren – cestovať

## 6. Reading comprehension

Každá reading lekcia:
- krátky text približne A1–A2,
- 100–250 slov,
- používa gramatiku, ktorú už používateľ pozná,
- maximálne niekoľko nových slov,
- nové slová zvýrazni,
- kliknutím sa zobrazí význam,
- pod textom 5–10 otázok.

Otázky majú vyžadovať odpoveď po nemecky cez text input.

Príklad textu:
denný režim, práca, univerzita, fitness, kamaráti, cestovanie, víkend, autoškola.

Po odpovedi ukáž:
- správnosť obsahu,
- gramatickú opravu odpovede.

## 7. Error Correction

Zobraz chybnú vetu:

Heute ich muss arbeiten.

Používateľ ju prepíše:

Heute muss ich arbeiten.

Ďalšie príklady:
- Ich habe keinen Zeit.
- Ich bin gestern gearbeitet.
- Ich möchte Deutsch lerne.
- Wenn ich Zeit habe, ich lerne Deutsch.
- Ich spreche mit einen Freund.
- Ich gehe im Fitnessstudio.
- Ich rufe meiner Freundin an.

Používaj hlavne reálne typy chýb, ktoré robí študent.

## 8. Translation Trainer

Dva režimy:

Slovensky → Nemecky
primárny režim.

Nemecky → Slovensky
sekundárny režim na comprehension.

Slovensky → Nemecky má byť výrazne častejší.

## 9. Free Writing

Zobraz tému:

„Napíš 5–8 viet o svojom dni.“

alebo:
- čo si robil včera,
- plány na víkend,
- práca,
- univerzita,
- fitness,
- kamarátka/kamaráti,
- cestovanie,
- prečo sa učíš nemčinu.

Aplikácia zatiaľ nemusí používať AI API.

Namiesto toho zobraz checklist:

Použil si:
- Perfekt?
- weil?
- wenn?
- časový výraz?
- Dativ?
- modálne sloveso?

Používateľ si môže text uložiť do histórie.

## 10. Weak Topics

Aplikácia má sledovať chyby podľa kategórie:

- verb conjugation
- word order
- Akkusativ
- Dativ
- articles
- Perfekt haben/sein
- Partizip II
- modal verbs
- separable verbs
- weil/dass/wenn
- reflexive verbs
- Wo/Wohin
- vocabulary

Ak používateľ robí opakovane chyby napr. pri Dative, dashboard má ponúknuť:

„Review Dativ – 8 mistakes recently“

## 11. Daily Review

Vytvor krátky režim na 10–15 minút:

1. 5 vocabulary flashcards
2. 5 sentence translations
3. 3 grammar transformations
4. 2 error corrections
5. 1 krátka vlastná veta

Obsah vyberaj hlavne zo slabých tém.

## 12. UX

UI má byť:
- jednoduché,
- čisté,
- dospelé,
- bez detských gamification prvkov,
- dark/light mode,
- dobre použiteľné na mobile.

Pri cvičení zobraz vždy iba jednu úlohu naraz.

Veľké textové pole.
Tlačidlo:
„Skontrolovať“

Po chybe:
„Skús ešte raz“

Potom:
„Zobraziť nápovedu“

A až nakoniec:
„Ukázať riešenie“

Kláves Enter môže odoslať odpoveď.

## 13. Seed content

Vytvor minimálne:
- 50 vocabulary cards,
- 50 translation sentences,
- 30 grammar drills,
- 20 error-correction sentences,
- 5 reading texts,
- 10 free-writing prompts.

Používaj slovnú zásobu a gramatiku z vyššie uvedených tém.

Nerob náhodné pokročilé B2/C1 vety. Obsah má zodpovedať približne A1–A2 a postupne sa komplikovať.

## 14. Architektúra

Navrhni napríklad:

src/
  components/
  pages/
  features/
    vocabulary/
    sentenceBuilder/
    grammar/
    reading/
    writing/
    review/
  data/
    vocabulary.ts
    sentences.ts
    grammarExercises.ts
    readings.ts
  hooks/
  utils/
  types/

Exercise nech má jednotný typ napríklad:

id
type
prompt
answer
acceptedAnswers
hint
explanation
tags
difficulty

Tagy používaj napríklad:

["dativ", "mit", "a1"]
["perfekt", "sein", "a2"]
["word-order", "weil", "a2"]

Tak bude možné generovať review podľa slabých miest.

## 15. Postup implementácie

Neimplementuj všetko naraz chaoticky.

Postupuj:

1. nastav projekt a základný layout,
2. navrhni dátový model,
3. vytvor spoločný Exercise komponent,
4. implementuj Sentence Builder,
5. implementuj Grammar Drill,
6. implementuj Flashcards,
7. implementuj Reading,
8. implementuj progress/error tracking,
9. implementuj Daily Review,
10. implementuj Vocabulary notebook,
11. doplň seed content,
12. polish UI a mobile layout.

Po každej väčšej časti aplikáciu spusti/buildni a oprav TypeScript/build chyby.

Nechcem iba mockup. Funkcie musia byť reálne použiteľné a progres musí prežiť refresh cez localStorage.

Najvyššia priorita aplikácie je:

**ACTIVE RECALL → TVORENIE VIET → OPRAVA CHÝB → OPAKOVANIE SLABÝCH MIEST**

Nie gamification.
