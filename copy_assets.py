import shutil
import os

src_dir = r"C:\Users\perce\.gemini\antigravity\brain\b22ab6b4-a36f-4afb-bb09-baeaec85cf6c"
dst_dir = r"C:\Users\perce\.gemini\antigravity\scratch\odonto-santyx\images"

os.makedirs(dst_dir, exist_ok=True)

files_to_copy = {
    "media__1787162092499.jpg": "logo.jpg",
    "dental_hero_clinic_1787162114576.png": "hero_clinic.png",
    "dental_happy_smile_1787162126171.png": "happy_smile.png"
}

for src_name, dst_name in files_to_copy.items():
    src_path = os.path.join(src_dir, src_name)
    dst_path = os.path.join(dst_dir, dst_name)
    if os.path.exists(src_path):
        shutil.copy(src_path, dst_path)
        print(f"Copied {src_name} -> {dst_name}")
    else:
        print(f"File not found: {src_path}")
