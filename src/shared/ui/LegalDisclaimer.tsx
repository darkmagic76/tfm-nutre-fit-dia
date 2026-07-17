/**
 * RNF-01: Legal disclaimer per SPECS_RF.
 * Persistent banner — not blocking but always visible in Dashboard and Plan.
 */
export function LegalDisclaimer() {
  return (
    <div
      className="bg-amber-50 border border-amber-300 rounded-lg p-3 text-sm text-amber-900"
      role="alert"
      aria-label="Aviso legal dietista"
    >
      <strong>⚕️ Aviso legal:</strong> Este plan debe ser validado por un dietista-nutricionista colegiado.
    </div>
  )
}
