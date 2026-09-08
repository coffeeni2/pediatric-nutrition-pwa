# Pediatric Nutrition PWA 0.4.3

Cache-recovery hotfix for Safari. On the first load, the app unregisters prior service workers and deletes only Cache Storage, then reloads with a version query. Patient/case data in localStorage/IndexedDB are not deleted. A fresh 0.4.3 service worker is then registered.

Upload the files inside this folder to the GitHub Pages repository root.
