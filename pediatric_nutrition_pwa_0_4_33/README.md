# Pediatric Nutrition PWA 0.4.33

## New in 0.4.33

- Custom Database snapshot updated from `ped-nutrition-backup-2026-09-11-3.json` (133 records).
- Migration replaces only `foodDB` once (`customDbSnapshotV0432`); patient/cases, PNIF/Review Intake, Diet Design, and Daily Modular Diet are preserved.
- Keeps 0.4.31 rounding and Diet Design behavior unchanged.


## New in 0.4.31
- Custom Database replaced once from the latest user backup `ped-nutrition-backup-2026-09-11-2.json` while preserving cases/intakes/designs.
- Diet Design Formula, fortifier, and Modular generated/manual numeric amounts are normalized to 1 decimal place; diet household amounts remain whole numbers.
- Protein requirement can target either **Total protein** or **Meat + egg + milk + formula protein**.
- Diet Design balancing now rechecks Energy, selected Protein target, Fat target derived from % energy, Calcium, Na and K after combining Diet + Milk/Formula + Fortifiers + Modular Diet. It attempts to rebalance selected sources and reports when exact matching is prevented by selected items or whole-unit rounding.
- Generated Diet household amounts are rounded to whole units. Default household units prefer: rice/starch = ทัพพี, meat = ช้อนโต๊ะ, egg = ฟอง, vegetable = ทัพพี, fruit = ผล/ลูก (when supported by Custom DB), oil = mL when supported.
- Nutrient Recheck now shows Total protein and counted meat/egg/milk/formula protein separately, both with g/kg/day when weight is available.
- Nutrient Recheck displays P:CHO:Fat as % of total calculated energy (4/4/9 kcal/g).
- Existing 0.4.27 calcium-first Milk/Formula and modular formula concentration constraints remain.


## New in 0.4.27
- Added Generate draft prescription: creates editable Diet / Milk-Formula / Modular prescription draft from Requirements and Custom Database.
- Diet draft pre-populates rice/starch, lean protein, egg, vegetable, fruit and oil when available.
- Milk/formula draft chooses a generic Custom DB milk/formula candidate when none is selected, then calculates amount to source energy target.
- Modular draft can build whey + carbohydrate + LCT/MCT components from nutrient requirements; all values remain editable and require Recheck before Save.

- Diet Design can auto-calculate selected Diet / Milk-Formula / Modular amounts from the Energy requirement.
- Editable energy allocation (%) by source; if allocations do not sum to 100%, the app can normalize them.
- Auto-calculation scales only items already selected from Custom Database; it does not choose a clinical diet or formula automatically.
- All generated amounts remain editable, with Protein/Ca/Na/K and other nutrients checked in Recheck.

- Custom Database now supports a `Medication / mineral` type.
- Added Magnesium (Mg) to the nutrient schema.
- Na, K, Ca, Mg and P in Custom Database are stored as **mg per defined basis**.
- Added editable starter templates: NaCl tab, CaCO3 tab, Trace element, Na-K-Cl solution and Ca-Mg-P powder. Product-specific strengths are intentionally left blank.
- Medication/mineral templates with no entered mineral values are flagged and not silently calculated.

## New in 0.4.22
- Patient age is now stored/displayed as **years + months + days**.
- Added optional **Date of birth (DOB)**. When DOB and Visit date are both entered, chronological age is calculated automatically.
- Age fields remain editable after automatic calculation.
- Existing legacy decimal-year age is migrated non-destructively into years/months/days where possible.
- Existing cases, Custom Database, Diet Design, Review Intake, and Modular Diet remain preserved.

# Pediatric Nutrition PWA 0.4.27

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


## 0.4.22
- Added gestational age at birth (weeks + days) to Patient Profile.
- For GA <37 weeks, calculates corrected age using a 40-week reference.
- Displays postmenstrual age (PMA) and handles visits before term as “Not yet term”.
- GA ≥37 weeks displays corrected age as not applicable.
- Existing cases remain compatible; new preterm fields are optional.


## 0.4.27
- Modular Diet Builder is organized by nutrient role: Protein, CHO, Fat—LCT, Fat—MCT, Medication/minerals, and Other.
- Protein candidates include formula/milk/whey/casein-type Custom DB items; CHO candidates include rice/starch/dextrin/dextrose/sucrose/fruit; fat is separated into LCT and MCT; medication/minerals uses Custom DB type `medication`.
- Added **Prepare component template** so the recipe can be composed first, before amounts are calculated.
- Auto draft no longer deletes a user-selected modular component set. It uses selected role-specific sources when calculating draft amounts.


## 0.4.31
- Diet Design uses capacity-based drafting: energy allocation is a soft target. Diet rows now have Preferred and Maximum household portions.
- Auto recalculation does not increase Diet beyond Preferred/current unless Maximum is explicitly higher; unmet Diet energy cascades to Milk/Formula then Modular when enabled.
- Added “Calculate current values — no recalc” so clinician-edited amounts can be kept exactly and only Summary/Recheck recalculated.
- Recheck current values never mutates prescription amounts.

### 0.4.31
- Diet Design rounding is configurable per row: step 1, step 5, or 1 decimal.
- Defaults: household food units step 1; food g/mL step 5; ready milk/formula volume step 5; powder formula step 1; fortifier step 1; modular components step 1.
- Removed Preferred from Diet rows. Current Amount is the starting value; Maximum is optional.
- Added Lock controls so Auto/Recalculate does not change locked Diet, Milk/Formula, fortifier, or Modular component amounts.
- Auto/Recalculate now calculates continuously, applies final rounding once, then Nutrient Recheck uses the rounded actual prescription without silently rebalancing again.
- Modular final/feed volume is rounded to 5 mL; component amounts default to step 1.


## 0.4.33 hotfix
- Paginated Custom Database rendering (25 rows/page default) to prevent UI freezing.
- Defensive rendering keeps navigation usable if an individual database row is malformed.
- Preserves custom/unknown basis units in the editor.
