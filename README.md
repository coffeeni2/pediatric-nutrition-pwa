# Pediatric Nutrition PWA 0.4.5

Changes:
- Meat and egg default to cooked when PNIF does not specify raw/cooked.
- Portion Unit dropdown removes duplicate choices and narrows units to the selected conversion food.
- Custom Food Database is seeded/migrated with milk, meat, rice/starch/cereal and fruit exchange-list foods from the attached Nutrition book.
- Existing 0.4.x local data are preserved; new book foods are merged once.
- Cache/version bumped to 0.4.5.


## 0.4.5 exchange basis fix
- Nutrition book Food seeds now keep the printed exchange household measure as the nutrient basis.
- Example: ข้าวสวย = 1 ทัพพี (also 1/2 ถ้วยตวง or 8 ช้อนโต๊ะ) = 80 kcal, protein 2 g, CHO 18 g.
- Meat remains 30 g cooked edible portion per exchange.
- Milk remains in the book's mL/g basis; fruit remains in the book's listed household portion.
- Removes legacy Excel exchange rows that used conflicting/incorrect food bases, including ข้าวสวย (exchange) 60 g.
- User-created Custom rows are not removed.
