import fitz
from pathlib import Path
src = Path('attached_assets/01306_BAMFORD_DOORS_SCOPED_OUT_1792570052923.pdf')
out = Path('.agents/outputs/bamford_brandbook')
out.mkdir(parents=True, exist_ok=True)
doc = fitz.open(src)
for i, page in enumerate(doc, 1):
    pix = page.get_pixmap(matrix=fitz.Matrix(1.25, 1.25), alpha=False)
    pix.save(out / f'page-{i:02}.png')
    if i in (1, 2, 5, 6, 7, 9, 10, 11, 18, 19):
        print(f'REVIEW page {i}: {page.rect.width:.0f}x{page.rect.height:.0f} pts; images={len(page.get_images(full=True))}')
print(f'Rendered {doc.page_count} pages to {out}')
