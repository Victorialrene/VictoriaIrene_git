"""Generate the Heavy Spear textures and mod icon from VanillaBackport's
netherite spear sprite.

The source jar is not redistributed with this mod. Put
VanillaBackport-neoforge-1.2.21.1-1.2.2.jar in ../libs/ (or edit SRC_JAR)
before running this script.

Usage:
    python tools/make_textures.py
"""

from __future__ import annotations

import io
import zipfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC_JAR = ROOT / "libs" / "VanillaBackport-neoforge-1.2.21.1-1.2.2.jar"
TEXTURE = ROOT / "src/main/resources/assets/heavyspear/textures/item/heavy_spear.png"
ICON = ROOT / "src/main/resources/icon.png"

# A restrained mace-like steel ramp.  The warm ramp keeps the grip readable
# against the blade without bringing the original netherite purple back.
OUTLINE = (20, 23, 29, 255)
WARM = [
    (35, 39, 47, 255),
    (53, 59, 69, 255),
    (73, 81, 95, 255),
    (95, 104, 120, 255),
]
STEEL = [
    (46, 51, 59, 255),
    (66, 71, 82, 255),
    (85, 92, 105, 255),
    (124, 132, 145, 255),
    (153, 161, 174, 255),
    (191, 206, 231, 255),
]


def load_sprite() -> Image.Image:
    with zipfile.ZipFile(SRC_JAR) as jar:
        data = jar.read("assets/minecraft/textures/item/netherite_spear_in_hand.png")
    return Image.open(io.BytesIO(data)).convert("RGBA")


def luminance(pixel: tuple[int, int, int, int]) -> float:
    r, g, b, _ = pixel
    return 0.299 * r + 0.587 * g + 0.114 * b


def recolor(sprite: Image.Image) -> Image.Image:
    pixels = [
        (x, y, sprite.getpixel((x, y)))
        for y in range(sprite.height)
        for x in range(sprite.width)
        if sprite.getpixel((x, y))[3] > 0
    ]

    # Separate the reddish netherite grip from the neutral blade, then map each
    # group onto its own ramp.  This preserves the original shading order.
    warm = [(x, y, p) for x, y, p in pixels if p[0] - p[2] > 9 and luminance(p) > 35]
    steel = [(x, y, p) for x, y, p in pixels if (x, y, p) not in warm]
    warm.sort(key=lambda item: luminance(item[2]))
    steel.sort(key=lambda item: luminance(item[2]))

    out = Image.new("RGBA", sprite.size, (0, 0, 0, 0))
    for group, ramp in ((warm, WARM), (steel, STEEL)):
        if not group:
            continue
        for index, (x, y, pixel) in enumerate(group):
            if luminance(pixel) <= 38:
                color = OUTLINE
            else:
                # lowest pixel -> darkest ramp entry; highest -> lightest
                position = 0 if len(group) == 1 else index / (len(group) - 1)
                color = ramp[round(position * (len(ramp) - 1))]
            out.putpixel((x, y), color)
    return out


def make_icon(sprite: Image.Image) -> Image.Image:
    size = 128
    icon = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(icon)

    # Dark steel plate.
    for y in range(size):
        t = y / (size - 1)
        r = round(14 + 18 * t)
        g = round(17 + 22 * t)
        b = round(23 + 28 * t)
        draw.line([(0, y), (size, y)], fill=(r, g, b, 255))

    # Diagonal sheen on its own layer so alpha is blended, not overwritten.
    sheen = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    sd = ImageDraw.Draw(sheen)
    for i in range(-size, size * 2, 14):
        sd.line([(i, 0), (i + size, size)], fill=(204, 220, 244, 12), width=5)
    icon = Image.alpha_composite(icon, sheen)

    # Soft central glow behind the spear.
    glow = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((22, 22, 106, 106), fill=(116, 137, 170, 52))
    glow = glow.filter(ImageFilter.GaussianBlur(14))
    icon = Image.alpha_composite(icon, glow)

    # Scale the 32x32 sprite 3x and center it.
    big = sprite.resize((96, 96), Image.Resampling.NEAREST)
    shadow = Image.new("RGBA", big.size, (0, 0, 0, 0))
    shadow.putalpha(big.getchannel("A").filter(ImageFilter.GaussianBlur(3)))
    shadow = shadow.point(lambda value: value // 2)
    icon.alpha_composite(shadow, (19, 21))
    icon.alpha_composite(big, (16, 16))

    # Thin bevel.
    border = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    bd = ImageDraw.Draw(border)
    bd.rounded_rectangle((5, 5, size - 6, size - 6), radius=12, outline=(154, 171, 196, 150), width=2)
    bd.rounded_rectangle((8, 8, size - 9, size - 9), radius=9, outline=(0, 0, 0, 110), width=1)
    icon = Image.alpha_composite(icon, border)

    return icon


def main() -> None:
    if not SRC_JAR.exists():
        raise SystemExit(
            f"Missing {SRC_JAR}. Copy VanillaBackport-neoforge-1.2.21.1-1.2.2.jar into libs/."
        )
    sprite = recolor(load_sprite())
    TEXTURE.parent.mkdir(parents=True, exist_ok=True)
    sprite.save(TEXTURE)
    ICON.parent.mkdir(parents=True, exist_ok=True)
    make_icon(sprite).save(ICON)
    print(f"wrote {TEXTURE}")
    print(f"wrote {ICON}")


if __name__ == "__main__":
    main()
