import { makeExercises } from './exercises'

export const corrections = [
  ...makeExercises('correction', 'a1-korrektur', 'A1', [
    ['Heute ich muss arbeiten.', 'Heute muss ich arbeiten.', ['word-order', 'modal'], 'Keď je na začiatku heute, sloveso musí prísť hneď po ňom.', 'Po časovom údaji nasleduje časované muss a potom podmet ich.', ['Ich muss heute arbeiten.']],
    ['Ich habe keinen Zeit.', 'Ich habe keine Zeit.', ['akkusativ', 'articles'], 'Skontroluj rod podstatného mena Zeit.', 'Zeit je ženského rodu. V Akkusative má záporný člen keine.'],
    ['Ich möchte Deutsch lerne.', 'Ich möchte Deutsch lernen.', ['modal', 'conjugation'], 'V hlavnej vete už je jedno časované sloveso.', 'Po möchte patrí na koniec infinitív lernen.'],
    ['Ich spreche mit einen Freund.', 'Ich spreche mit einem Freund.', ['dativ', 'articles'], 'Mit vždy vyžaduje ten istý pád.', 'Po mit je Dativ. Pri der Freund potrebujeme einem Freund.', ['Mit einem Freund spreche ich.']],
    ['Du haben heute frei.', 'Du hast heute frei.', ['conjugation'], 'Použi tvar haben pre du.', 'V druhej osobe jednotného čísla má haben tvar hast.', ['Heute hast du frei.']],
    ['Wo du wohnst?', 'Wo wohnst du?', ['word-order'], 'Za opytovacím slovom ide sloveso.', 'V otázke s wo nasleduje sloveso pred podmetom.'],
    ['Wir kaufen einen Bier.', 'Wir kaufen ein Bier.', ['articles', 'akkusativ'], 'Bier je stredného rodu.', 'Das Bier má v Akkusative neurčitý člen ein.'],
    ['Ich stehe auf um sieben Uhr.', 'Ich stehe um sieben Uhr auf.', ['separable', 'word-order'], 'Kam patrí oddelená predpona auf?', 'Odlučiteľná predpona stojí v hlavnej vete na konci.', ['Um sieben Uhr stehe ich auf.', 'Ich stehe um sieben auf.', 'Um sieben stehe ich auf.']],
    ['Ich sehe er.', 'Ich sehe ihn.', ['pronouns', 'akkusativ'], 'Po sehen má byť osobné zámeno v Akkusative.', 'Er sa v Akkusative mení na ihn.'],
    ['Ich rufe meiner Freundin an.', 'Ich rufe meine Freundin an.', ['akkusativ', 'possessive', 'separable'], 'Anrufen vyžaduje priamy predmet.', 'Predmet meine Freundin je v Akkusative. Predpona an ostáva na konci.'],
  ]),
  ...makeExercises('correction', 'a2-korrektur', 'A2', [
    ['Ich bin gestern gearbeitet.', 'Ich habe gestern gearbeitet.', ['perfekt-aux'], 'Arbeiten netvorí Perfekt so sein.', 'Perfekt od arbeiten je habe gearbeitet.', ['Gestern habe ich gearbeitet.']],
    ['Wenn ich Zeit habe, ich lerne Deutsch.', 'Wenn ich Zeit habe, lerne ich Deutsch.', ['subordinate', 'word-order'], 'Prvú pozíciu už tvorí celá vedľajšia veta.', 'Hneď za čiarkou stojí časované lerne.', ['Ich lerne Deutsch, wenn ich Zeit habe.']],
    ['Ich gehe im Fitnessstudio.', 'Ich gehe ins Fitnessstudio.', ['location', 'akkusativ'], 'Zamýšľaný význam je smer do fitnescentra.', 'Pri smere do cieľa je po in Akkusativ. Ins je skratka in das.', ['Ich gehe in das Fitnessstudio.']],
    ['Ich habe gestern meine Freundin anruft.', 'Ich habe gestern meine Freundin angerufen.', ['participle', 'separable'], 'Potrebuješ Partizip II od anrufen. Kde je ge?', 'Anrufen má Partizip II angerufen.', ['Gestern habe ich meine Freundin angerufen.', 'Ich habe meine Freundin gestern angerufen.']],
    ['Sie hat nach Hause gegangen.', 'Sie ist nach Hause gegangen.', ['perfekt-aux', 'location'], 'Gehen vyjadruje presun a v Perfekte má sein.', 'Správny tvar v jednotnom čísle je ist gegangen.', ['Sie ist nachhause gegangen.']],
    ['Ich weiß, dass du arbeitest heute.', 'Ich weiß, dass du heute arbeitest.', ['subordinate', 'word-order'], 'Vo vete s dass má časované sloveso osobitné miesto.', 'Časované arbeitest je na konci vedľajšej vety.', ['Ich weiss, dass du heute arbeitest.']],
    ['Ich bin müde, deshalb ich trinke Kaffee.', 'Ich bin müde, deshalb trinke ich Kaffee.', ['word-order', 'subordinate'], 'Deshalb zaberá prvú pozíciu, po ňom nasleduje sloveso.', 'Správne poradie je deshalb trinke ich.', ['Ich bin müde. Deshalb trinke ich Kaffee.', 'Ich bin müde; deshalb trinke ich Kaffee.']],
    ['Wir treffen sich am Bahnhof.', 'Wir treffen uns am Bahnhof.', ['reflexive', 'pronouns'], 'Zámeno sa musí zhodovať s wir.', 'Zvratné zámeno pre wir je uns.', ['Am Bahnhof treffen wir uns.']],
    ['Ich bin in die Stadt.', 'Ich bin in der Stadt.', ['location', 'dativ'], 'Byť niekde vyjadruje polohu.', 'Pri polohe používame po in Dativ.', ['In der Stadt bin ich.']],
    ['Gestern ich musste arbeiten.', 'Gestern musste ich arbeiten.', ['word-order', 'preterite'], 'Časované musste stojí na druhej pozícii.', 'Gestern je prvý vetný člen. Nasleduje musste a až potom ich.', ['Ich musste gestern arbeiten.']],
    ['Ich bin mit meiner Freundin im Café getrinkt.', 'Ich habe mit meiner Freundin im Café getrunken.', ['participle', 'perfekt-aux'], 'Trinken potrebuje v Perfekte haben a nepravidelné Partizip II.', 'Správny Perfekt od trinken je habe getrunken.', ['Im Café habe ich mit meiner Freundin getrunken.', 'Ich habe im Café mit meiner Freundin getrunken.']],
  ]),
]
