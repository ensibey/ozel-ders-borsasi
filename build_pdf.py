import os
import glob
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image as RLImage, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def build_logo_pdf():
    pdf_filename = "c:/Users/hp/Desktop/özel ders borsası/public/Ozel_Ders_Borsasi_Logo_Katalogu.pdf"
    os.makedirs(os.path.dirname(pdf_filename), exist_ok=True)

    # Collect all logo images
    brain_dir = "C:/Users/hp/.gemini/antigravity/brain/64fa69d1-da46-4b59-aec5-c119adf009a0"
    all_images = sorted(glob.glob(os.path.join(brain_dir, "*logo*.jpg")))
    
    print(f"Bulunan logo sayısı: {len(all_images)}")

    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=A4,
        rightMargin=20,
        leftMargin=20,
        topMargin=25,
        bottomMargin=25
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'CatalogTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#4f46e5'),
        alignment=1,
        spaceAfter=4
    )

    subtitle_style = ParagraphStyle(
        'CatalogSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=14,
        textColor=colors.HexColor('#64748b'),
        alignment=1,
        spaceAfter=15
    )

    badge_style = ParagraphStyle(
        'LogoBadge',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=12,
        textColor=colors.HexColor('#0f172a'),
        alignment=1
    )

    story = []

    # Title Banner
    story.append(Paragraph("<b>ÖZEL DERS BORSASI</b>", title_style))
    story.append(Paragraph("DB Monogram Logo Tasarım Kataloğu (23 Özel Tasarım)", subtitle_style))

    logo_titles = [
        "1. Neon Indigo Glassmorphism", "2. Emerald Cyan 3D Metalik", "3. Gold & Navy Royal Crest",
        "4. Minimalist Line-Art Tech", "5. Neon Violet Cyberpunk Glow", "6. Clean White Modern Vector",
        "7. Stock Exchange Neon Line", "8. Hexagonal Shield Emblem", "9. Scandinavian Pastel Flat",
        "10. Iridescent Holographic Sphere", "11. Modern Metallic Chrome", "12. Abstract Geometric Origami",
        "13. Rose Gold & White Marble", "14. 3D Colorful Glass Ribbon", "15. Green Neon Circuit Tech",
        "16. Embossed Gold Leather Seal", "17. Fluid Liquid Mercury", "18. Academic Crest Shield",
        "19. Cyberpunk Orange & Yellow", "20. Platinum Diamond Faceted", "21. Eco Green Leaf Geometric",
        "22. Electric Blue Tech Badge", "23. Midnight Black & Copper Gold"
    ]

    table_data = []
    row = []

    for idx, img_path in enumerate(all_images):
        try:
            img = RLImage(img_path, width=2.5*inch, height=2.5*inch)
            title_text = logo_titles[idx] if idx < len(logo_titles) else f"{idx+1}. DB Logo Tasarımı"
            
            cell_content = [
                img,
                Spacer(1, 4),
                Paragraph(f"<b>{title_text}</b>", badge_style)
            ]
            row.append(cell_content)

            if len(row) == 2:
                table_data.append(row)
                row = []
        except Exception as e:
            print(f"Hata ({img_path}): {e}")

    if row:
        row.append([Paragraph("", badge_style)])
        table_data.append(row)

    grid_table = Table(table_data, colWidths=[3.6*inch, 3.6*inch])
    grid_table.setStyle(TableStyle([
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 12),
        ('TOPPADDING', (0,0), (-1,-1), 6),
    ]))

    story.append(grid_table)

    doc.build(story)
    print(f"PDF Başarıyla Oluşturuldu: {pdf_filename}")

if __name__ == '__main__':
    build_logo_pdf()
