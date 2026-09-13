# Pediatric Nutrition PWA 0.4.44

## New: Parenteral Nutrition tab

This version adds a **Parenteral Nutrition** calculator as a separate per-case module. It does not reuse the oral/enteral Daily Requirements object.

### PN requirements
- Total fluid is prescribed primarily as **% maintenance**.
- Maintenance fluid is calculated with the Holliday–Segar 100/50/20 mL/kg/day method.
- Separate PN targets: Energy, amino acid/protein, GIR, lipid, Na, K, Ca, P and Mg.
- ESPGHAN/ESPEN/ESPR/(CSPEN) 2018 ranges are displayed as references according to age/weight and clinical phase where a simple range is available.
- The calculator does **not** automatically prescribe guideline targets. The user must press a guideline-use button or enter/edit a target.

### TPN factor
- `Actually infused TPN = TPN rate × 24 h`.
- `Mixed TPN volume = actually infused TPN + line allowance`.
- `Factor = mixed TPN volume / actually infused TPN volume`.
- Non-lipid TPN-bag nutrient amounts are compounded with the factor; delivered nutrient amounts are calculated by dividing bag volumes by the factor.
- **20% lipid, Vitalipid N-infant and Soluvit are excluded from this factor.**

### Fixed product names in PN calculator
- 10% Aminovent infant
- 15% Aminoplasmal
- 50% dextrose
- 3% NaCl
- Na acetate (strength editable because product concentration may vary)
- KCl
- K acetate
- K2PO4
- 10% Ca gluconate
- Glycophos
- 50% MgSO4
- Peditrace
- Zinc
- Sterile water
- 20% lipid
- Vitalipid N-infant
- Soluvit

Product concentrations used for the initial calculator reproduce the logic in the supplied `calculate TPN.xlsx` where that workbook defines a concentration. Na acetate was requested as an additional product and its concentration is intentionally not invented.

### PN recheck
Shows:
- TF (mL/day and % maintenance)
- TE (kcal/day and kcal/kg/day)
- Protein / amino acid
- Lipid
- Na, K, Ca, P, Mg
- GIR
- Protein : CHO : Fat (% energy)
- NPC:P (non-protein kcal / g amino acid)

### Important scope
This is a guideline-assisted calculation draft, not a validated prescribing system. It does not validate calcium-phosphate compatibility/precipitation, osmolarity, venous access, infusion safety, or product-specific pharmacy limits.


## 0.4.44 PN guideline/table revision
- PN Total fluid target is physician-entered mL/day; Holliday–Segar is reference only for >1 month.
- Guideline tables revised from user-supplied ESPGHAN/ESPEN/ESPR 2018 summary images.
- Added chloride target/recheck and English vitamin/trace-element reference tables.
