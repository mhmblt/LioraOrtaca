from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"
SCALE = 4


def render_icon(size: int, *, safe_area: bool = False, full_bleed: bool = False) -> Image.Image:
    canvas_size = size * SCALE
    background = "#1c251d" if safe_area or full_bleed else (0, 0, 0, 0)
    image = Image.new("RGBA", (canvas_size, canvas_size), background)
    draw = ImageDraw.Draw(image)

    inset = round(canvas_size * (0.125 if safe_area else 0))
    left, top = inset, inset
    right, bottom = canvas_size - inset, canvas_size - inset
    if not safe_area and not full_bleed:
        radius = round((right - left) * 0.25)
        draw.rounded_rectangle((left, top, right, bottom), radius=radius, fill="#1c251d")

    content_scale = (right - left) / 64
    def point(x: float, y: float) -> tuple[int, int]:
        return (round(left + x * content_scale), round(top + y * content_scale))

    draw.polygon(
        [point(20, 15), point(28, 15), point(28, 38), point(44, 38), point(44, 45), point(20, 45)],
        fill="#f6efe2",
    )
    cx, cy = point(42, 18)
    circle_radius = round(4 * content_scale)
    draw.ellipse(
        (cx - circle_radius, cy - circle_radius, cx + circle_radius, cy + circle_radius),
        fill="#dcb76d",
    )

    return image.resize((size, size), Image.Resampling.LANCZOS)


def main() -> None:
    ASSETS.mkdir(parents=True, exist_ok=True)
    outputs = {
        "favicon-48.png": (48, False, False),
        "favicon-96.png": (96, False, False),
        "apple-touch-icon.png": (180, False, True),
        "icon-192.png": (192, False, False),
        "icon-512.png": (512, False, False),
        "icon-maskable-512.png": (512, True, False),
    }

    rendered: dict[int, Image.Image] = {}
    for filename, (size, safe_area, full_bleed) in outputs.items():
        icon = render_icon(size, safe_area=safe_area, full_bleed=full_bleed)
        icon.save(ASSETS / filename, format="PNG", optimize=True)
        if not safe_area:
            rendered[size] = icon

    source = rendered[512]
    source.save(
        ROOT / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)],
    )
    print("Generated favicon.ico and responsive Liora icon assets.")


if __name__ == "__main__":
    main()
