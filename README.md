Pediatric Nutrition PWA v0.4.118

Regression repair build: single case bar, combined Review Intake + Modular calculation, restored Nutrient Summary, shared modular calculation engine, aligned total rows, optimizer fat-target weighting, ingredient-first Review Intake.

Version 0.4.117

# Pediatric Nutrition PWA 0.4.114



## 0.4.112
- Fixed tab navigation so a draft autosave/render exception cannot freeze tab switching on Android.
- Added Delete Case beside New Case and Save Case in the persistent active-case bar.

## 0.4.111
- Custom Database updated from the user-provided 2026-09-15 full-backup JSON (`foodDB`: 134 entries).
- Added one-time migration `customDbSnapshotV04110` so existing browser installs receive the updated database while patient/case, PNIF, Review Intake, Modular Diet, Diet Design and PN data remain unchanged.
- Diet Design now separates **Calculate Intake** from **Optimize Again**.
- Calculate Intake recalculates Nutrient Recheck from the current manual prescription without changing component amounts, rounding, locks, or source allocation.
- Optimize Again is the only main action that rebalances the prescription toward requirements.
- Added a compact sticky Android action bar so Calculate Intake / Optimize Again stay reachable while editing without scrolling to the top or bottom.
- Target Gap remains sticky while editing, so manual changes can be checked against requirements without navigating away from the component editor.


## 0.4.107
- Compact Patient / Case and Daily Requirements layout on Android/mobile.
- Patient Note field removed from UI.
- Patient and requirement summaries become compact horizontal strips on phones.

## 0.4.105

- Auto Prescription Draft now performs explicit repeated nutrient-deficit rechecks after rounding.
- Added coordinated energy/protein-neutral pair rebalancing so milk/formula can increase while meat/CHO decreases in the same candidate move.
- Whole-prescription fat and calcium deficits remain active optimization targets instead of stopping when energy/protein are merely close.
- HBV protein now explicitly includes whey and casein; existing Custom DB items named whey/casein are migrated to counted HBV sources.
- Nutrient Recheck A/B/C tables add an HBV protein (g) column for Diet, Milk/Formula + Fortifiers, and Modular Diet.
- Total Daily Prescription order now places Total fat (% energy) and MCT (% energy) before CHO.
- Diet Design > Nutrient Recheck > Modular Diet: removed Calculation sequence from the recheck area.
- Modular Diet recheck rows now show food/formula/modular ingredients first and medication/mineral/trace-element items last.
- Added preparation instructions beside the recheck table: add water q.s. to final volume, mL/feed × feeds/day, daily prescribed volume, route, and per-feed energy.

## 0.4.98
- Modular Diet engine now uses rounded sequential recalculation at every step: calculate → round → recalculate actual delivered nutrients/energy → update remaining → next source.
- Protein sources now fill the actual remaining protein sequentially after rounded formula/milk amounts.
- MCT and LCT steps subtract actual nutrient delivery from all previously rounded components.
- CHO now fills the actual remaining kcal after prior rounded components; order is cooked rice → fruit → dextrin/glucose polymer → sucrose → other CHO, using Custom DB kcal/conversions.
- Tube-feeding rice warning/cap remains >8 and max 9 g/100 mL final modular volume.
- Removed the second blanket modular rounding pass so Manual/Locked amounts are not silently changed after calculation.

- Modular Diet calculation now fills selected protein, MCT/LCT and CHO sources sequentially in the visible row order instead of splitting the deficit equally across sources.
- Formula/milk remains calcium-first, limited by protein requirement and concentration.
- CHO remaining energy is filled sequentially from rice/dextrin/sucrose using each Custom DB item, with the tube-feeding rice concentration limit retained.


## 0.4.95
- Moved Diet / Milk-Formula / Modular Diet source checkboxes into Auto Prescription Draft so source selection is made before Generate/Recalculate. Removed duplicate Use checkboxes from each section header.

## 0.4.94

- Revised Modular Diet calculation sequence per clinical workflow.
- Step 5 is now energy-based: remaining kcal after protein + LCT + MCT are filled by selected CHO sources (e.g. cooked rice, dextrin, sucrose) using each Custom DB item’s actual kcal density.
- Removed the fixed assumption that remaining CHO energy must first be converted with 4 kcal/g; CHO grams shown in recheck now come from the selected Custom DB items.
- Cooked-rice tube-feeding warning/cap remains >8 g/100 mL warning and 9 g/100 mL Auto cap.
- Formula/milk Ca-first → remaining protein → MCT → LCT → CHO-source energy → Ca/Na/K → optional trace element sequence retained.

## 0.4.93
- Modular Diet cooked-rice CHO calculation now uses the selected Custom DB item nutrient density and unit conversion; removed the fixed 2.75 g rice = 1 g CHO assumption. Tube-feeding rice concentration limits remain unchanged.
- Diet Design > Modular Diet now has a dedicated clinical sequence calculator: formula/milk calcium-first while respecting protein and formula concentration limits → remaining protein → MCT → LCT → CHO → Ca/Na/K → optional trace element.
- MCT target uses `(MCT % × total energy)/8.3`; LCT uses `[(total fat % × total energy) − MCT kcal]/9`; CHO uses remaining energy after protein, LCT and MCT.
- Formula/milk inside Modular Diet is increased toward calcium requirement but stopped if the protein requirement or formula maximum concentration would be exceeded. Remaining protein is filled from selected non-formula protein sources.
- Added Modular Diet route (Oral / Tube feeding). For tube feeding, Auto cooked-rice is capped at 9 g/100 mL final recipe and a warning is shown above 8 g/100 mL.
- After macronutrients, selected/available medication-mineral sources are used to fill remaining Ca, Na and K when possible. Trace-element rows remain optional and are not auto-dosed without a requirement target.
- Added an on-screen calculation sequence trace so the generated amounts can be reviewed before saving. Manual/Locked rows remain unchanged.

## 0.4.91
- Diet Design > Modular Diet: Custom DB item is now a searchable dropdown. Type any part of an item name (for example `pan`) and tap/select the result; filtering still follows the selected component role while preserving direct DB item IDs.

- Fixed Diet Design > Modular Diet Custom DB selection. Replaced the text/datalist picker with a real clickable dropdown grouped by Formula / Modular / Food / Medication.
- Broadened nutrient-role filtering so valid sources are not hidden; Protein includes all formulas (including Panenteral), protein-containing foods, and protein modular products.
- Selecting a Custom DB item now stores its ID directly, avoiding failed selection caused by exact-name text matching.


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


## 0.4.77
- Diet Design: added Copy Diet Order, Copy Milk/Formula Order, Copy Modular Order, and Copy Full Diet Order.
- Copy text uses the current Diet Design draft (including unsaved edits), formula feed schedule/concentration/fortifiers, and modular recipe/final volume/feed schedule for handoff.

## 0.4.76
- Added Clear Daily Requirements button in Patient tab. It resets all Daily Requirements for the current case while keeping Patient, Diet Design, PN, intake, and other tabs.


## 0.4.78
- Renamed protein summary to High biological value protein.
- PN GIR/dextrose/final glucose values now display/calculate to 2 decimal places.
- Separated ILE and vitamin volumes with independent rounding (ILE default 1 mL; vitamin default 0.5 mL).
- PN Products reordered to Component → Mixed → Actual delivered → Product/concentration; ILE/vitamin rows support rounding selection.
- PN Recheck is phone-friendly without forced horizontal scrolling, and Ca/P/Mg display delivered product volume to 2 decimals.


## 0.4.82
- Removed the Diet structure controls and structure-only optimizer rule.
- Added age-based Thai food-guide anchors for Diet generation using the user-provided recommendations (6–11 months, 12–23 months, 2–5 years, 6–11 years, 12–18 years).
- Generated Diet group amounts now start near the age guide and Auto optimization keeps food-group quantities generally within ±25% of the age anchor, while Manual/Locked rows remain clinician-controlled.
- Added the age-guide anchor to Diet recheck so extreme fruit/vegetable/starch/meat generation is visible.

## 0.4.82
- Corrected Thai food-guide anchor for age 12–23 months: rice/starch 15 tablespoons/day (about 3 ladles/day), not 12 ladles/day.
- Added plain-milk guidance to the age anchor: 2 glasses/day; 200 mL/glass for 12 months–11 years and 225–250 mL/glass for 12–18 years.
- Added clearer oil/fat guidance: 2 tsp/day at 12–23 months, 1.5 tsp/day at 2–5 years, no more than 3 tsp/day at 6–11 years, and no more than 4 tsp/day at 12–18 years.

## 0.4.82
- Infant Diet Design (6–11 months): standardized household unit wording to **ช้อนโต๊ะ (tbsp)**.
- Defined 1 ช้อนโต๊ะ (tbsp) = 15 mL for the age-guide display; gram conversion remains food-specific via database conversion.


## 0.4.84
- Diet Design > Diet rounding options changed to 0.5, 1, and 5 only.
- Default rounding for new/generated Diet items is 0.5.
- Added 0.5-step rounding support to the Diet calculation engine.

## 0.4.83
- Corrected generic fruit exchange in Custom Database to 1 portion = CHO 15 g = 60 kcal (protein 0 g, fat 0 g).
- Added migration for the seeded generic fruit item from 45 kcal to 60 kcal without overwriting a user-modified fruit item.


## 0.4.85
- Renamed the Patient protein target type label from “Meat + egg + milk + formula protein” / “Counted protein” to “High biological value protein”.
- Updated Diet Design target, remaining, recheck, and nutrient display labels to use “High biological value protein” consistently. Calculation logic is unchanged.


## 0.4.86
- Diet Design: Milk/Formula, fortifier, and Modular Diet rounding choices are now 0.5, 1, and 5.
- New Milk/Formula, fortifier, and Modular Diet items default to rounding 0.5.


## 0.4.87
- Diet Design Nutrient Recheck D reordered to Diet → Milk/Formula → Modular → Total → % target → Requirement and optimized for Android.
- D row order follows the requested clinical review sequence and uses 1 decimal display.
- Duplicate Protein/macronutrient recheck box removed.
- Milk/Formula + Fortifier amounts show per day or per feed with feeds/day.
- A/B/C column order standardized and Iron/Zn added.


## 0.4.91
- Patient > Daily Requirements: Sodium and Potassium can now be entered as either mg/day or mEq/100 kcal/day using the Holliday–Segar maintenance kcal equivalent.
- When mEq/100 kcal/day is selected, Diet Design converts the target internally to mg/day for optimization and recheck while preserving the entered unit/value in the Patient tab.
- Existing cases without a stored Na/K unit remain interpreted as mg/day for backward compatibility.


### v0.4.105
- Auto Prescription Draft now performs food/formula-first nutrient-profile-aware rebalancing before calcium medication correction. Selected milk/formula is evaluated from its actual Custom DB calcium, fat, protein, and energy profile; it is not assumed to be high-fat. Pair rebalancing can increase milk/formula while reducing other foods to preserve protein/energy targets. Calcium supplement is considered only after this food/formula pass. All moves respect rounding and are recalculated from rounded delivered amounts.


## v0.4.105
- Whole-prescription deficit correction now rechecks combined Diet + Milk/Formula + Modular after rounding.
- Modular clinical sequence is initial-build logic only; Auto/unlocked modular rows remain available for final fat/Ca/energy/protein rebalancing.
- Mixed orders can rebalance across sections (e.g. milk/formula up + meat/CHO down; oil up + CHO down) before mineral medication correction.


## 0.4.105
- Added persistent Active Patient / Case bar on every tab except Parenteral Nutrition.
- Save Case is available globally and commits Review Intake, Modular Diet, Diet Design, Patient/Requirements into the active case.
- Switching between non-PN tabs auto-saves case drafts instead of forcing a return to Patient.
- Replaced bundled Custom Database with the exact foodDB snapshot from ped-nutrition-full-backup-2026-09-15 (1).json; one-time migration updates existing browser data.


## v0.4.111
- Compact Android Patient Profile and Daily Requirements; hides nonessential summaries and GA block on phone to reduce scrolling.
- Diet Design Nutrient Recheck moved directly below Generate/Optimize.
- Added Quick adjust prescription table beside Recheck: edit component amounts in place, then Calculate Intake without re-optimizing.
- Existing full Diet/Milk/Modular editors remain below for advanced changes, units, rounding, locks and component setup.


## 0.4.113
- Tab navigation now has an independent capture-phase fallback in index.html, so tapping a tab changes the visible panel even if the main app initialization/render fails.
- Main showTab is exposed only after successful initial rendering; destination rendering remains available when the app is healthy.
- Removed duplicate Export/Import backup controls from the header. Full JSON Export/Import remains in Settings & Backup.
- Active Case bar retains New Case, Delete Case, Save Case.


## 0.4.114
- Fix Diet Design Optimize Again: when Diet is selected but diet rows are empty, initialize the age-guided Diet draft before optimization instead of silently optimizing only Milk/Formula.
- Preserve Manual/Locked Milk/Formula amounts; optimizer can use the newly initialized Diet rows to cover the remaining target.
- Actual energy allocation is synchronized only after a real Diet prescription exists.
