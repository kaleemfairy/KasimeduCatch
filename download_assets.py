import os
import urllib.request
import zipfile

ASSETS = {
    # Ambiance & Hero
    "public/images/kasimedu-harbour-sunrise.jpg": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1400&q=80",
    "public/images/tiger-prawns-mud-crabs-ice.jpg": "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80",

    # Products (Daily Slate Catalog)
    "public/images/products/vanjaram-seer-fish.jpg": "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=800&q=80",
    "public/images/products/sankara-red-snapper.jpg": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    "public/images/products/kara-eraa-tiger-prawns.jpg": "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80",
    "public/images/products/neelam-nandu-sea-crab.jpg": "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80",
    "public/images/products/vaval-white-pomfret.jpg": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    "public/images/products/kanava-squid-calamari.jpg": "https://images.unsplash.com/photo-1606851094655-b2593a9af63f?auto=format&fit=crop&w=800&q=80",
    "public/images/products/nethili-anchovies.jpg": "https://images.unsplash.com/photo-1510130418428-e77526065529?auto=format&fit=crop&w=800&q=80",
    "public/images/products/paal-sura-shark.jpg": "https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=800&q=80"
}

def main():
    print("🚀 Downloading SSS Seafood assets...")
    zip_filename = "sss-seafood-images.zip"

    with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for file_path, url in ASSETS.items():
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            print(f"  ⬇️  Downloading: {file_path}")
            try:
                urllib.request.urlretrieve(url, file_path)
                zipf.write(file_path, arcname=file_path)
            except Exception as e:
                print(f"  ❌ Failed downloading {file_path}: {e}")

    print(f"\n✅ All assets saved to public/images/ and zipped into: {zip_filename}")

if __name__ == "__main__":
    main()
