import type { TheorySection } from '../data/lessons/model'

export function TheoryBlock({ section }: { section: TheorySection }) {
  return <section className="panel theory-block">
    <h2>{section.title}</h2>
    <p>{section.explanation}</p>
    <div className="theory-rule"><strong>Zapamätaj si</strong><p>{section.rule}</p></div>
    <div className="theory-examples">
      <h3>Príklady a frázy</h3>
      {section.examples.map(example => <p lang="de" key={example}>{example}</p>)}
    </div>
    {section.table && <table className="theory-table">
      <caption>Rýchly prehľad</caption>
      <tbody>{section.table.map(([label, example]) => <tr key={label}><th scope="row">{label}</th><td lang="de">{example}</td></tr>)}</tbody>
    </table>}
    <div className="theory-contrast">
      <h3>Častá chyba</h3>
      <dl>
        <div><dt>Chybný tvar</dt><dd lang="de">{section.mistake[0]}</dd></div>
        <div><dt>Správny tvar</dt><dd lang="de">{section.mistake[1]}</dd></div>
      </dl>
    </div>
  </section>
}
