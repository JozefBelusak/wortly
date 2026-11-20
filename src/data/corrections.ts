import { support } from './exerciseGlossary'
import { makeExercises } from './exercises'

export const corrections = [
  ...makeExercises('correction', 'a1-korrektur', 'A1', [
    ['Heute ich muss arbeiten.', 'Heute muss ich arbeiten.', ['word-order', 'modal'], 'Keď je na začiatku heute, sloveso musí prísť hneď po ňom.', 'Po časovom údaji nasleduje časované muss a potom podmet ich.', ['Ich muss heute arbeiten.'], support(['heute', 'müssen', 'arbeiten'])],
    ['Ich habe keinen Zeit.', 'Ich habe keine Zeit.', ['akkusativ', 'articles'], 'Skontroluj rod podstatného mena Zeit.', 'Zeit je ženského rodu. V Akkusative má záporný člen keine.', [], support(['haben', 'die Zeit'])],
    ['Ich möchte Deutsch lerne.', 'Ich möchte Deutsch lernen.', ['modal', 'conjugation'], 'V hlavnej vete už je jedno časované sloveso.', 'Po möchte patrí na koniec infinitív lernen.', [], support(['möchten', 'lernen', 'Deutsch'])],
    ['Ich spreche mit einen Freund.', 'Ich spreche mit einem Freund.', ['dativ', 'articles'], 'Mit vždy vyžaduje ten istý pád.', 'Po mit je Dativ. Pri der Freund potrebujeme einem Freund.', ['Mit einem Freund spreche ich.'], support(['sprechen', 'mit', 'der Freund'])],
    ['Du haben heute frei.', 'Du hast heute frei.', ['conjugation'], 'Použi tvar haben pre du.', 'V druhej osobe jednotného čísla má haben tvar hast.', ['Heute hast du frei.'], support(['heute frei haben'])],
    ['Wo du wohnst?', 'Wo wohnst du?', ['word-order'], 'Za opytovacím slovom ide sloveso.', 'V otázke s wo nasleduje sloveso pred podmetom.', [], support(['wo', 'wohnen'])],
    ['Wir kaufen einen Bier.', 'Wir kaufen ein Bier.', ['articles', 'akkusativ'], 'Bier je stredného rodu.', 'Das Bier má v Akkusative neurčitý člen ein.', [], support(['kaufen', 'das Bier'])],
    ['Ich stehe auf um sieben Uhr.', 'Ich stehe um sieben Uhr auf.', ['separable', 'word-order'], 'Kam patrí oddelená predpona auf?', 'Odlučiteľná predpona stojí v hlavnej vete na konci.', ['Um sieben Uhr stehe ich auf.', 'Ich stehe um sieben auf.', 'Um sieben stehe ich auf.'], support(['aufstehen', 'um sieben'])],
    ['Ich sehe er.', 'Ich sehe ihn.', ['pronouns', 'akkusativ'], 'Po sehen má byť osobné zámeno v Akkusative.', 'Er sa v Akkusative mení na ihn.', [], support(['sehen', 'er'])],
    ['Ich rufe meiner Freundin an.', 'Ich rufe meine Freundin an.', ['akkusativ', 'possessive', 'separable'], 'Anrufen vyžaduje priamy predmet.', 'Predmet meine Freundin je v Akkusative. Predpona an ostáva na konci.', [], support(['anrufen', 'die Freundin'])],
  ]),
  ...makeExercises('correction', 'a2-korrektur', 'A2', [
    ['Ich bin gestern gearbeitet.', 'Ich habe gestern gearbeitet.', ['perfekt-aux'], 'Arbeiten netvorí Perfekt so sein.', 'Perfekt od arbeiten je habe gearbeitet.', ['Gestern habe ich gearbeitet.'], support(['arbeiten', 'gestern'])],
    ['Wenn ich Zeit habe, ich lerne Deutsch.', 'Wenn ich Zeit habe, lerne ich Deutsch.', ['subordinate', 'word-order'], 'Prvú pozíciu už tvorí celá vedľajšia veta.', 'Hneď za čiarkou stojí časované lerne.', ['Ich lerne Deutsch, wenn ich Zeit habe.'], support(['wenn', 'die Zeit', 'lernen', 'Deutsch'])],
    ['Ich gehe im Fitnessstudio.', 'Ich gehe ins Fitnessstudio.', ['location', 'akkusativ'], 'Zamýšľaný význam je smer do fitnescentra.', 'Pri smere do cieľa je po in Akkusativ. Ins je skratka in das.', ['Ich gehe in das Fitnessstudio.'], support(['gehen', 'das Fitnessstudio'])],
    ['Ich habe gestern meine Freundin anruft.', 'Ich habe gestern meine Freundin angerufen.', ['participle', 'separable'], 'Potrebuješ Partizip II od anrufen. Kde je ge?', 'Anrufen má Partizip II angerufen.', ['Gestern habe ich meine Freundin angerufen.', 'Ich habe meine Freundin gestern angerufen.'], support(['gestern', 'die Freundin', 'anrufen'])],
    ['Sie hat nach Hause gegangen.', 'Sie ist nach Hause gegangen.', ['perfekt-aux', 'location'], 'Gehen vyjadruje presun a v Perfekte má sein.', 'Správny tvar v jednotnom čísle je ist gegangen.', ['Sie ist nachhause gegangen.'], support(['gehen', 'nach Hause'])],
    ['Ich weiß, dass du arbeitest heute.', 'Ich weiß, dass du heute arbeitest.', ['subordinate', 'word-order'], 'Vo vete s dass má časované sloveso osobitné miesto.', 'Časované arbeitest je na konci vedľajšej vety.', ['Ich weiss, dass du heute arbeitest.'], support(['wissen', 'dass', 'arbeiten', 'heute'])],
    ['Ich bin müde, deshalb ich trinke Kaffee.', 'Ich bin müde, deshalb trinke ich Kaffee.', ['word-order', 'subordinate'], 'Deshalb zaberá prvú pozíciu, po ňom nasleduje sloveso.', 'Správne poradie je deshalb trinke ich.', ['Ich bin müde. Deshalb trinke ich Kaffee.', 'Ich bin müde; deshalb trinke ich Kaffee.'], support(['müde', 'deshalb', 'trinken', 'der Kaffee'])],
    ['Wir treffen sich am Bahnhof.', 'Wir treffen uns am Bahnhof.', ['reflexive', 'pronouns'], 'Zámeno sa musí zhodovať s wir.', 'Zvratné zámeno pre wir je uns.', ['Am Bahnhof treffen wir uns.'], support(['sich treffen', 'am Bahnhof'])],
    ['Ich bin in die Stadt.', 'Ich bin in der Stadt.', ['location', 'dativ'], 'Byť niekde vyjadruje polohu.', 'Pri polohe používame po in Dativ.', ['In der Stadt bin ich.'], support(['sein', 'die Stadt'])],
    ['Gestern ich musste arbeiten.', 'Gestern musste ich arbeiten.', ['word-order', 'preterite'], 'Časované musste stojí na druhej pozícii.', 'Gestern je prvý vetný člen. Nasleduje musste a až potom ich.', ['Ich musste gestern arbeiten.'], support(['gestern', 'müssen', 'arbeiten'])],
    ['Ich bin mit meiner Freundin im Café getrinkt.', 'Ich habe mit meiner Freundin im Café getrunken.', ['participle', 'perfekt-aux'], 'Trinken potrebuje v Perfekte haben a nepravidelné Partizip II.', 'Správny Perfekt od trinken je habe getrunken.', ['Im Café habe ich mit meiner Freundin getrunken.', 'Ich habe im Café mit meiner Freundin getrunken.'], support(['trinken', 'die Freundin', 'das Café'])],
  ]),
]
