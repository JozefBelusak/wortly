import { ContextText } from '../components/ContextText'
import type { TheorySection } from '../data/lessons/model'

export function TheoryBlock({ section }: { section: TheorySection }) {
  return <section className="panel theory-block">
    <h2>{section.title}</h2>
    <p><ContextText text={section.explanation} mixed /></p>
    <div className="theory-rule"><strong>Zapamätaj si</strong><p><ContextText text={section.rule} mixed /></p></div>
    <div className="theory-examples">
      <h3>Príklady a frázy</h3>
      {section.examples.map(example => <p lang="de" key={example}><ContextText text={example} /></p>)}
    </div>
    {section.table && <table className="theory-table">
      <caption>Rýchly prehľad</caption>
      <tbody>{section.table.map(([label, example]) => <tr key={label}><th scope="row"><ContextText text={label} mixed /></th><td lang="de"><ContextText text={example} /></td></tr>)}</tbody>
    </table>}
    <div className="theory-contrast">
      <h3>Častá chyba</h3>
      <dl>
        <div><dt>Chybný tvar</dt><dd lang="de"><ContextText text={section.mistake[0]} /></dd></div>
        <div><dt>Správny tvar</dt><dd lang="de"><ContextText text={section.mistake[1]} /></dd></div>
      </dl>
    </div>
  </section>
}
