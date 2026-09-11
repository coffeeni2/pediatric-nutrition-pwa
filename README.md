# Pediatric Nutrition PWA 0.4.20

## New in 0.4.20
- Added **Diet Design / Nutrition Prescription** as a separate saved per-case module.
- Added optional **Na and K requirements** in Patient Profile, with mg/day and mEq display.
- Added optional **Track total fluid** toggle; fluid comparison is shown only when enabled.
- Diet Design supports Diet, Milk/Formula, fortified Milk/Formula, and Modular Diet independently or in combination.
- Diet items use Custom Database units/conversions, including tablespoon/ladle when available.
- Milk/Formula supports mL and 180/200/225 mL carton units.
- Fortifiers can be added per day or per feed from Custom Database.
- Modular Diet Builder supports component-by-component amounts, final volume, mL/feed × feeds/day, and copy to Daily Modular Diet.
- Added Nutrient Recheck separated into Diet, Milk/Formula + fortifiers, Modular Diet, and Total Daily Prescription.
- Recheck displays Energy, Protein, CHO, Fat, MCT, Ca, Na, K and Na/K mEq where relevant.
- Added source contribution and remaining-target display.
- Existing patient cases, Custom Database, PNIF 0.3, Review Intake and Daily Modular Diet remain preserved.


Changes:
- Meat and egg default to cooked when PNIF does not specify raw/cooked.
- Portion Unit dropdown removes duplicate choices and narrows units to the selected conversion food.
- Custom Food Database is seeded/migrated with milk, meat, rice/starch/cereal and fruit exchange-list foods from the attached Nutrition book.
- Existing 0.4.x local data are preserved; new book foods are merged once.
- Cache/version bumped to 0.4.6.


## 0.4.6 exchange basis fix
- Nutrition book Food seeds now keep the printed exchange household measure as the nutrient basis.
- Example: ข้าวสวย = 1 ทัพพี (also 1/2 ถ้วยตวง or 8 ช้อนโต๊ะ) = 80 kcal, protein 2 g, CHO 18 g.
- Meat remains 30 g cooked edible portion per exchange.
- Milk remains in the book's mL/g basis; fruit remains in the book's listed household portion.
- Removes legacy Excel exchange rows that used conflicting/incorrect food bases, including ข้าวสวย (exchange) 60 g.
- User-created Custom rows are not removed.


## 0.4.6
- Explicit Save button per Custom Database row; Delete is next to the item name.
- Review Intake suggests close Custom Database food matches for each ingredient.
- Unit dropdown follows units supported by the selected matched food / portion conversion.
- Per-ingredient Needs review reason; clears automatically once calculation is possible.
- Add intake between recorded times.


## 0.4.8
- Custom Database uses one page-level Save button; Add/Edit/Delete remain pending until Save.
- Added Cancel changes and unsaved-change warning.
- Added editable per-food Conversion Units (amount, unit, basis multiplier, optional gram equivalent, source).
- Review Intake calculation uses saved Custom Database conversion units.


## 0.4.8 changes
- Custom Database persists across app upgrades using the same browser storage; user-modified items receive migration metadata and are not reset by this release.
- Custom Database is the only calculation source shown in the UI. Thai FCD/USDA choices are hidden until a real connector exists; Daily Modular Recipe calculations also require a Custom DB match.
- Review Intake menu and ingredient rows can match Food, Medical formula, or Modular component records from Custom Database, with unit choices derived from the selected record.
- Conversion Add/Delete actions are positioned at the left side of the expanded conversion editor.
- Summary adds protein g/kg/day from patient body weight, P:CHO:F (total-fat) ratio, sodium mEq = mg/23, and potassium mEq = mg/39.


## 0.4.12 changes
- Added persistent Protein source category to each Custom DB item.
- Automatic one-time classification for existing rows: Meat/Egg and Milk/Formula count toward protein excluding CHO-source protein; rice/starch is excluded; unclear rows are Unclassified.
- Custom Database Protein source is editable and saved with the database.
- Summary now shows Total protein and Protein excl. CHO-source protein, both in g/day and g/kg/day.
- P:CHO:F continues to use total protein.


## 0.4.12
- Removed Calculation and Source controls from Review Intake UI; calculation remains automatic from Custom Database.
- Formula matches can record kcal/oz and volume mL. For powder formulas stored per g, powder grams are derived as kcal/oz × volume/30 ÷ kcal per gram, then nutrients are calculated from those grams.
- Formula handling is available at both menu and ingredient level.
- + Add intake between inserts the new intake directly after the time card that was used, instead of appending it at the end.

### 0.4.12 summary refinements
- P:CHO:Fat is displayed as whole-number percent of macronutrient energy (protein 4 kcal/g, CHO 4 kcal/g, fat 9 kcal/g).
- Selected protein now counts only Custom DB rows categorized as Meat, Egg, Milk, or Formula. Existing combined 0.4.9/0.4.10 categories are migrated automatically.
- Both protein values display g/kg/day in parentheses immediately after g/day.


## 0.4.12
- Added Calculation Detail / Manual Recheck tab.
- Separate line-by-line calculation tables for Review Intake and Daily Modular Diet.
- Each row shows the Custom Database reference, amount/factor used, energy, protein, fat, calcium, sodium and potassium.
- Table footers show section totals; combined total is shown below.
- Custom Database storage remains persistent across app updates.


## 0.4.15
- PNIF item routing now supports `intake_type`: `food`, `formula`, `modular_diet`, and `unknown`. Food/formula remain in Review Intake; modular_diet is imported into Daily Modular Diet.
- Summary is split into Food + Formula, Modular Diet only, and Total daily intake. Review Intake modular-component matches remain in Food + Formula; they are not treated as Daily Modular Diet.
- Protein from meat/egg/milk/formula now reclassifies existing obvious Custom DB items once (without overriding later explicit Protein source edits) and calculation reads the matched Custom DB item.
- Protein g/kg/day stays in parentheses immediately after g/day and uses the same bold/large metric typography.
- Calculation Detail labels match Food + Formula vs Daily Modular Diet.
- Existing Custom Database remains in the same persistent browser storage and is not reset by this update.


0.4.15: fixes Custom Database schema migration persistence. Existing user nutrient/basis/conversion values are preserved; new structural fields such as protein_source are migrated and saved automatically.


## 0.4.15 Custom DB snapshot migration
- On the first launch of 0.4.15, Custom Database is replaced once with the `foodDB` snapshot from `ped-nutrition-backup-2026-09-08-3.json` (126 items).
- Patient/case, PNIF, meals, requirements, and modular-diet working data are not replaced by this migration.
- The migration is guarded by `settings.customDbSnapshotV0415`; subsequent edits saved in Custom Database are preserved on later reloads.
- Protein-source legacy categories in the snapshot are converted to the current schema (`meat`, `egg`, `milk`, `formula`, etc.) without changing nutrient/basis/conversion values.


## 0.4.17
- Added Delete Case with confirmation. Deleting the last case creates a new blank case so the app remains usable.
- Review Intake now uses a page-level draft. Edits, inserts, and deletes remain pending until **Save Review Intake**; **Cancel changes** restores the last saved intake.
- Modular Diet now uses a page-level draft. Recipe components, feed schedule, final volume, and notes remain pending until **Save Modular Diet**; **Cancel changes** restores the last saved modular diet.
- Leaving Review Intake or Modular Diet with unsaved changes prompts before discarding them.


## 0.4.18
- Harden PNIF import for smart/fullwidth/ornamental quote characters and zero-width characters copied from formatted chat.
- Add fallback repair for bare JSON property names and trailing commas.
- Accept `item` as an alias of `food` in PNIF meal and ingredient objects.
- Preserve the 0.4.17 Custom Database snapshot migration and all local case/intake data.

## 0.4.20
- Custom Database snapshot replaced once from the user-provided 2026-09-11 JSON backup (126 rows).
- Migration changes only `foodDB`; patient/case, PNIF/Review Intake, Diet Design, and Daily Modular Diet data are preserved.
- Fixed the stale snapshot constant reference in the 0.4.19 source.
