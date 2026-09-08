# Pediatric Nutrition PWA 0.3

เวอร์ชันนี้รวมการแก้ไขที่คุยกันล่าสุด:

- Patient: Anonymous name / Case ID, Age, Sex, Visit date, Weight, Length/Height, Note
- ตัด Measurement type, Measurement date, Lab และ Nutrition assessment
- Daily requirements เรียง Fluid → Energy → Protein → Total fat % → MCT % → Calcium (optional)
- PNIF รองรับ 24-h recall / food record และ `daily_modular_recipe`
- Modular PNIF นำ ingredients, final volume และ feeding plan เข้า Daily Modular Diet โดยตรง
- Review Intake แบบ compact cards: เวลา → เมนู → ส่วนประกอบ
- แก้/เพิ่ม/ลบ/Insert below และเพิ่ม ingredient ได้
- Portion ของเมนูไม่บังคับ หากไม่มี portion แต่มีส่วนประกอบที่มีปริมาณ จะคำนวณเฉพาะส่วนที่รายงานได้
- หากไม่มีทั้ง portion และส่วนประกอบที่คำนวณได้ จะไม่สมมติ portion และจะขึ้น Not calculated
- Whole dish / Ingredients / Hybrid / Auto calculation method โดยป้องกัน double counting
- หาก intake ไม่ครบ Summary จะแสดงว่า incomplete และรายงานจำนวนเมนูที่คำนวณได้
- Custom Database seed จากไฟล์ Excel เดิม: medical formulas + modular components + meat/rice exchanges
- Custom Database เพิ่ม/แก้/ลบรายการ manually ได้
- Default food-source preference = Thai FCD; เปลี่ยนเป็น Custom / USDA / All ได้

## หมายเหตุเรื่อง Food Source

ตัว Public PWA นี้ไม่ได้ฝัง Thai FCD ทั้งฐาน และยังไม่มี online Thai FCD connector ในตัว ดังนั้น Thai FCD/USDA ที่เลือกไว้เป็น source preference สำหรับ workflow การ match ส่วน Custom DB ใช้งาน local ได้ทันทีจาก Excel seed.

## Update GitHub Pages

แตก ZIP แล้ว upload ไฟล์ทั้งหมดในโฟลเดอร์นี้ทับไฟล์ใน repository `pediatric-nutrition-pwa` ที่ root จากนั้น Commit changes. GitHub Pages จะ deploy เวอร์ชันใหม่โดยอัตโนมัติ หาก cache ยังแสดงเวอร์ชันเก่า ให้ refresh/reopen หลัง deploy สักครู่.

## Privacy

Repository มีเฉพาะ source code และ seed food/formula database ไม่มีข้อมูลผู้ป่วย. ข้อมูล case ที่กรอกใน prototype เก็บใน browser local storage ของอุปกรณ์.
