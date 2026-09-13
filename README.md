# Pediatric Nutrition PWA 0.4.47

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
