# Pediatric Nutrition PWA 0.4.76

## PN guideline revision

This build revises the Parenteral Nutrition module using the user-supplied ESPGHAN/ESPEN/ESPR/CSPEN 2018 summary tables. Guideline values are references only; the clinician must accept/edit targets.

### PN Requirements
- Total fluid target is clinician-entered **mL/day**.
- For age >1 month, Holliday-Segar 100/50/20 is shown only as a maintenance reference.
- Neonatal fluid/electrolyte reference uses day of life, birth-weight group and neonatal phase.
- Energy: acute / stable / recovery age-specific table.
- Amino acids: preterm DOL 1 vs DOL >=2, term infant, 1 month-3 y, 3-18 y.
- Glucose/GIR: neonatal DOL-specific target and absolute limits; older children by weight and clinical phase.
- ILE: clinician-entered dose with age-specific maximum dose and maximum infusion rate.
- Product-specific minimum ILE for EFAD prevention for Intralipid, Lipofundin MCT/LCT, ClinOleic, SMOFlipid and Lipidem.
- Na/K/Cl and Ca/P/Mg references revised to the supplied tables.
- Vitamin and trace-element reference tables revised and displayed in English.

### Venous access / osmolarity
- Select **Central line** or **Peripheral line**.
- Estimated osmolarity is clinician/pharmacy-entered in this build.
- Peripheral PN <=900 mOsm/L: within app threshold.
- Peripheral PN >900 mOsm/L: soft warning; saving as reviewed requires explicit acknowledgement.
- The app does not claim to calculate formulation osmolarity or validate compatibility.

### TPN factor
- Actually infused TPN = TPN rate x 24 h.
- Mixed TPN volume = actually infused TPN + line allowance.
- Factor = mixed TPN volume / actually infused TPN volume.
- TPN-bag nutrient amounts use the factor; delivered amounts reverse it.
- ILE, Vitalipid N-infant and Soluvit do not use the TPN factor.

### Recheck
Shows total fluid, energy, amino acids, GIR, ILE, Na, K, Cl, Ca, P, Mg, Ca:P molar ratio, Protein:CHO:Fat, NPC:P, TPN factor, venous access and osmolarity review status.

This remains a guideline-assisted calculation draft, not a validated prescribing system. Calcium-phosphate compatibility, precipitation, product-specific stability, and infusion safety require clinical/pharmacy review.


## 0.4.47 PN refinement
- Removed all Use midpoint actions from PN guideline references.
- Na/K/Cl remain editable PN requirement targets while guideline values remain visible as ranges.
- Guideline table now shows Maximum ILE dose as the ILE safety target/limit; EFAD-prevention minimum remains product-specific below.
- Estimated osmolarity and >900 mOsm/L peripheral acknowledgement moved from PN Requirements to PN Recheck.

## 0.4.47 PN redesign
- ILE + selected vitamins are treated as a separate 24-hour infusion. The app proposes an integer mL/hr rate; the clinician can edit it, and actual 24-hour infused volume is used in the fluid balance.
- Na/K requirement input supports mmol/kg/day or mEq/100 kcal/day using the Holliday–Segar maintenance-energy equivalent; Na and K use 1 mmol = 1 mEq.
- Dextrose supports synchronized GIR, g/kg/day and final main-TPN glucose % inputs. 50% dextrose volume in the mixed bag uses the TPN factor.
- Phosphate source is calculated first; Na/K contributed by phosphate is subtracted before residual Na/K allocation to chloride/acetate salts.
- Zinc target, Peditrace/Addamel zinc contribution, residual zinc sulfate, sterile water q.s., and heparin units/bag are included.
- PN Recheck order: 24-hour summary → Pharmacy Order / Mixed TPN Bag → Separate ILE + Vitamins → Actual Delivered to Patient.
- Actual-delivered table includes main/ILE-vitamin fluid, total-fluid % target, AA, dextrose, GIR, glucose %, ILE, Na/K, Ca/P/Mg, zinc, energy distribution, NPC:P and entered TPN osmolarity.
- Osmolarity remains clinician/pharmacy-entered; this version does not claim automatic osmolarity or calcium-phosphate compatibility validation.


## 0.4.48 PN patient header
- Added chronological Age card immediately to the left of Weight in the Parenteral Nutrition patient summary.


## 0.4.51 Independent PN patient data
- Parenteral Nutrition now has its own Term/Preterm, age (years/months/days), and weight inputs.
- PN guideline selection and all PN calculations use only the PN-tab demographics, not the Patient tab.
- Auto guideline age group is derived from PN age plus Term/Preterm status.
- Existing Patient-tab demographic data are not copied or synchronized into PN.


## 0.4.51 fix
- Fixed PN state-reference bug that caused Parenteral Components / PN Products “Amount to mix” to remain 0 mL after requirements and TPN rate were entered.
- Product volumes now recalculate from the active PN state and TPN factor.


## 0.4.53 PN actual vs mixed display
- Parenteral Components now shows both the component volume actually delivered to the patient and the factor-adjusted volume to mix in the pharmacy bag.
- Pharmacy Order recheck now shows Actual delivered and Amount to mix side-by-side for every main-bag component.
- Actual component volume is calculated as mixed volume / TPN factor; mixed volume remains the pharmacy compounding amount.


## 0.4.53 PN recheck layout
- Removed line allowance from PN Recheck display.
- Heparin is shown immediately after sterile water in the pharmacy order.
- ILE + vitamins recheck is condensed to product volumes + 24-hour rate.


## 0.4.57 PN pharmacy volume rounding
- Parenteral Components / PN Products pharmacy **Amount to mix** is rounded to the nearest **0.5 mL** (therefore results are whole or x.5 mL).
- **50% MgSO4** and **Sterile water** are rounded to the nearest **0.1 mL**.
- Actual delivered values are recalculated from the rounded mixed volume divided by the TPN factor, so the recheck reflects what the patient would actually receive from the rounded pharmacy order.
- Recheck keeps Pharmacy Order first, omits the line-allowance row, places Heparin after sterile water, and shows ILE + vitamins as a compact 24-hour infusion sentence.


## 0.4.57
- Restored clearly labeled Export full backup (.json) and Import full backup (.json) controls in Settings & Backup.
- Export syncs the active case before generating the JSON file.
- Import validates the JSON root and expected backup content before replacing local state, then refreshes all views.


## 0.4.60 PN component calculation fix
- Component volumes now calculate even before a prescribed main-TPN rate is entered: the calculated main-TPN rate is used temporarily as the effective rate.
- Entering a prescribed rate immediately replaces the temporary calculated rate and recalculates Factor, mixed volume, Amount to mix, and Actual delivered.
- PN weight/rate/allocation numeric inputs now sync on mobile input events, reducing stale-value calculations.
- Cache-busting versions in index.html were updated to 0.4.60.


## 0.4.60 PN calculation redesign
- Requirement references now appear beside each input instead of a large guideline table.
- Removed line allowance. Mixed TPN volume is clinician-entered; factor = mixed / actually infused main TPN volume.
- Actual component volumes are calculated directly from requirement and product concentration. Amount to mix = actual × factor; sterile water is q.s. separately for actual and mixed volumes.
- Peditrace is 1 mL/kg/day, max 10 mL/day. Zinc sulfate supplies only residual zinc after trace-element zinc.
- Dextrose uses one editable input (GIR, g/kg/day, or final glucose %) and calculates the other two automatically.
- Requested default rounding updated for concentrated products.


## 0.4.63 PN product/recheck redesign
- Removed the duplicate Pharmacy Order block from PN Recheck; Recheck now contains only Actual Delivered to Patient.
- PN Products table now carries the final order rows for heparin, main TPN actual/mixed volume, prescribed rate, TPN factor, ILE, and selected vitamins.
- Actual-delivered nutrient recheck is calculated back from the rounded mixed component volumes divided by the TPN factor.
- Recheck derives amino acids, dextrose g/kg/day/GIR/final glucose %, ILE g/kg/day, Na/K, Ca/P/Mg, zinc, total energy, Protein:CHO:Fat distribution, NPC:P, fluid percentages, and entered osmolarity from the final order.
- Energy constants: amino acids 4 kcal/g, dextrose 3.4 kcal/g, ILE 10 kcal/g.


## 0.4.63 PN delivered-dose corrections
- PN Recheck now treats prescribed ILE volume as the source of truth; the rounded ILE + vitamin rate is display-only and does not change delivered fat dose.
- Main TPN, ILE + vitamins, and total-fluid percentages are calculated against Holliday–Segar maintenance fluid requirement rather than the prescribed PN fluid target.
- Na/K Recheck is calculated from final mixed Na/K/phosphate product volumes divided by TPN factor; mEq/100 kcal uses Holliday–Segar kcal equivalent.
- Ca/P/Mg display mmol/kg/day plus mg/kg/day using Ca 40.08, P 30.97, Mg 24.305 mg/mmol.
- Zinc Recheck uses the selected trace product after rounding: Peditrace 250 mcg/mL or Addamel N 650 mcg/mL, plus zinc sulfate 1,000 mcg/mL, all divided by factor before dose/kg calculation.
- Energy and NPC:P continue to use delivered AA, dextrose, and ILE: 4, 3.4, and 10 kcal/g respectively.
- TPN osmolarity remains clinician/pharmacy-entered; peripheral >900 mOsm/L stays a review warning, not an automatic compatibility calculation.


## 0.4.64 PN requirements compact layout
- Removed the visible Guideline age group selector; guideline grouping is derived automatically from PN age and Term/Preterm status.
- Removed the large Selected ILE / EFAD reference box from PN Requirements.
- Compacted PN Requirements into a four-column desktop / two-column mobile-oriented grid.
- Dextrose uses one editable source input at a time; the other two remain visible read-only calculated fields without disabled/grey styling.
- GIR, dextrose g/kg/day, and final main TPN glucose % resync when PN rate/actual volume changes.


## 0.4.64 PN compact requirements + dextrose synchronization
- Removed the manual Guideline age group selector; PN guideline grouping now derives only from PN age plus Term/Preterm status.
- Removed the Selected ILE / EFAD summary boxes from PN Requirements; relevant ILE reference remains inline with the prescribed ILE field.
- Compacted the PN Requirements layout to reduce vertical space.
- GIR, dextrose g/kg/day and final glucose % remain visible together. Only the selected input is editable; the other two are read-only but remain visually clear rather than greyed out.
- Dextrose conversions use actual infused main TPN volume and prescribed/effective main TPN rate: GIR→%/gkg, gkg→%/GIR, and %→GIR/gkg.


## 0.4.67 PN AA guideline + dextrose/mixed-volume state fix
- Amino-acid guideline: preterm DOL 1 1.5–2.5 g/kg/day; preterm DOL >=2 2.5–3.5 g/kg/day; term 0–<2 months 1.5–3; 2 months–<3 years 1–2.5; 3–18 years 1–2 g/kg/day.
- Fixed GIR mode so dextrose g/kg/day and final main-TPN glucose % are derived reliably from GIR, PN weight, and effective main TPN rate/volume.
- Calculated dextrose fields are no longer read back from transient DOM values during rendering.
- Fixed intermittent loss of clinician-entered Mixed TPN volume by making PN product rendering state-to-DOM only.
- Changed the default rounding for sodium glycerophosphate (P source) from 0.1 mL to 0.5 mL; legacy 0.1 mL defaults migrate once to 0.5 mL while other clinician-selected values are preserved.
- Regression-tested the screenshot-equivalent PN case (10 kg, GIR 4, protein 3 g/kg/day, ILE 2 g/kg/day, 1000 mL/day fluid, main TPN rate 37 mL/hr, mixed 900 mL): factor 1.0135, AA 300→304 mL, dextrose 115.2→117 mL, P 2→2 mL, dex 5.76 g/kg/day and 6.4865%.


## 0.4.71 PN case controls + recheck formatting
- Added PN-specific anonymous name / ID and PN case selector.
- Added New case, Delete case, and Clear boxes controls inside the Parenteral Nutrition tab.
- Clear boxes resets PN calculation fields while keeping the anonymous name / ID.
- PN Recheck numeric display is limited to at most 1 decimal place.


## 0.4.71
- Added always-visible full backup Export/Import JSON controls in the app header.
- One JSON backup contains data across all tabs/cases, including PN and Custom Database.
- Settings & Backup controls remain available and use the same full-backup format.


## 0.4.72
- Added Copy Requirements, Copy Mixed TPN Order, and Copy Full PN Order in the PN tab.
- Copied mixed order uses final post-rounding pharmacy volumes, includes sterile water, infusion rate, ILE/vitamins, osmolarity, and negative-water warning.
- Copy Requirements includes current clinician-entered PN targets and calculated dextrose equivalents.

## 0.4.74
- Added compact responsive layout for Android/mobile screens (<=600 px).
- Reduced PN text, table, control, button, and spacing sizes on phones while preserving desktop/Mac sizing.
- Kept PN requirement fields in a compact two-column layout on phones and reduced wide-table minimum widths for easier horizontal viewing.


## 0.4.74
- PN Recheck zinc now recalculates from selected Peditrace/Addamel mixed volume divided by TPN factor, multiplied by product zinc concentration, then divided by body weight.
- Copy Full PN Order now copies Mixed TPN Order + actual main TPN volume + TPN factor + PN Recheck, rather than requirements.


## 0.4.75
- Added Clear Patient button: clears current Patient / Case fields only; keeps Daily Requirements and all other tabs.
- Added Clear Diet Design button: resets the entire Diet Design draft for the current case while keeping Patient, Requirements, PN, intake, and other tabs. The cleared Diet Design is saved only when Save Diet Design is pressed.


## 0.4.76
- Added Clear Daily Requirements button in Patient tab. It resets all Daily Requirements for the current case while keeping Patient, Diet Design, PN, intake, and other tabs.
