# Pediatric Nutrition PWA 0.4.6

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
