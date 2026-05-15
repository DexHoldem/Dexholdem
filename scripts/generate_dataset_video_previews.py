#!/usr/bin/env python
"""Generate browser MP4 previews for TexasPokerRobot dataset samples."""

from __future__ import annotations

import argparse
import sys
import tempfile
import urllib.request
from pathlib import Path
from urllib.error import URLError

import cv2
import imageio.v2 as imageio
import numpy as np


REPO_ID = "Winniechen2002/TexasPokerRobot-small"
DEFAULT_CACHE = Path(tempfile.gettempdir()) / "dexholdem-dataset-samples"
DEFAULT_OUTPUT = Path("assets/videos/dataset-samples")

SAMPLES = [
    ("pick_up_left", 437534065),
    ("pick_up_right", 374880446),
    ("put_down_left", 357126222),
    ("put_down_right", 185877805),
    ("show_left", 121314581),
    ("show_right", 134374080),
    ("push_5", 245675298),
    ("push_10", 562513469),
    ("push_50", 581024100),
    ("push_100", 398059812),
    ("pull_5", 271870374),
    ("pull_10", 255470222),
    ("pull_50", 430477545),
    ("pull_100", 342680284),
]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--tasks",
        nargs="+",
        default=["all"],
        help="Task names to generate, or 'all'.",
    )
    parser.add_argument(
        "--cache",
        type=Path,
        default=DEFAULT_CACHE,
        help="Directory for downloaded .npz files.",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=DEFAULT_OUTPUT,
        help="Output directory for MP4 previews.",
    )
    parser.add_argument("--fps", type=int, default=12, help="Output frames per second.")
    parser.add_argument("--max-height", type=int, default=360, help="Resize videos to this maximum height.")
    parser.add_argument("--stride", type=int, default=1, help="Use every Nth frame.")
    parser.add_argument("--overwrite", action="store_true", help="Regenerate existing MP4 files.")
    return parser.parse_args()


def resolve_tasks(requested: list[str]) -> list[tuple[str, int]]:
    sample_map = dict(SAMPLES)
    if requested == ["all"]:
        return SAMPLES

    unknown = sorted(set(requested) - set(sample_map))
    if unknown:
        raise SystemExit(f"Unknown task(s): {', '.join(unknown)}")
    return [(task, sample_map[task]) for task in requested]


def format_bytes(size: int) -> str:
    value = float(size)
    for unit in ("B", "KB", "MB", "GB"):
        if value < 1024 or unit == "GB":
            return f"{value:.1f} {unit}" if unit != "B" else f"{int(value)} B"
        value /= 1024
    return f"{size} B"


def download_npz(task: str, expected_size: int, cache_dir: Path) -> Path:
    cache_dir.mkdir(parents=True, exist_ok=True)
    target = cache_dir / f"{task}_data_0001.npz"
    if target.exists() and target.stat().st_size == expected_size:
        print(f"[cache] {target}")
        return target

    url = f"https://huggingface.co/datasets/{REPO_ID}/resolve/main/{task}/data_0001.npz"
    tmp = target.with_suffix(".npz.part")

    for attempt in range(1, 4):
        if tmp.exists():
            tmp.unlink()

        print(f"[download] {task} {format_bytes(expected_size)} attempt {attempt}/3")
        written = 0
        next_report = 0

        try:
            with urllib.request.urlopen(url, timeout=60) as response, tmp.open("wb") as handle:
                while True:
                    chunk = response.read(4 * 1024 * 1024)
                    if not chunk:
                        break
                    handle.write(chunk)
                    written += len(chunk)
                    percent = int(min(written / expected_size * 100, 100))
                    if percent >= next_report:
                        print(f"  {percent:3d}% {format_bytes(written)}")
                        next_report += 10
        except (OSError, URLError) as error:
            print(f"  retrying after download error: {error}")
            continue

        if written == expected_size:
            tmp.replace(target)
            return target

        print(f"  retrying after incomplete download: got {format_bytes(written)}")

    raise RuntimeError(f"Failed to download {task} after 3 attempts")


def resize_frame(frame: np.ndarray, max_height: int) -> np.ndarray:
    if max_height <= 0 or frame.shape[0] <= max_height:
        resized = frame
    else:
        scale = max_height / frame.shape[0]
        width = int(round(frame.shape[1] * scale))
        resized = cv2.resize(frame, (width, max_height), interpolation=cv2.INTER_AREA)

    height, width = resized.shape[:2]
    block = 16
    safe_width = max(block, width - (width % block))
    safe_height = max(block, height - (height % block))
    return resized[:safe_height, :safe_width]


def write_camera_video(
    frames: np.ndarray,
    output_path: Path,
    poster_path: Path,
    fps: int,
    max_height: int,
    stride: int,
) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    selected = frames[::stride]
    if selected.size == 0:
        raise RuntimeError(f"No frames available for {output_path}")

    poster = resize_frame(selected[0], max_height)
    imageio.imwrite(poster_path, poster)

    with imageio.get_writer(
        output_path,
        fps=fps,
        codec="libx264",
        quality=7,
        macro_block_size=16,
        ffmpeg_params=["-movflags", "+faststart"],
    ) as writer:
        for frame in selected:
            writer.append_data(resize_frame(frame, max_height))


def generate_task(
    task: str,
    npz_path: Path,
    output_dir: Path,
    fps: int,
    max_height: int,
    stride: int,
    overwrite: bool,
) -> None:
    task_output = output_dir / task
    expected_outputs = [task_output / f"cam{index}.mp4" for index in range(3)]
    if not overwrite and all(path.exists() for path in expected_outputs):
        print(f"[skip] {task} previews already exist")
        return

    print(f"[extract] {task}")
    episode = np.load(npz_path, allow_pickle=True)
    for index in range(3):
        key = f"images_cam{index}"
        if key not in episode:
            raise KeyError(f"{key} missing in {npz_path}")
        video_path = task_output / f"cam{index}.mp4"
        poster_path = task_output / f"poster_cam{index}.jpg"
        if video_path.exists() and not overwrite:
            print(f"  [keep] {video_path}")
            continue
        print(f"  [write] {video_path}")
        write_camera_video(episode[key], video_path, poster_path, fps, max_height, stride)


def main() -> int:
    args = parse_args()
    tasks = resolve_tasks(args.tasks)

    for task, size in tasks:
        npz_path = download_npz(task, size, args.cache)
        generate_task(task, npz_path, args.output, args.fps, args.max_height, args.stride, args.overwrite)

    return 0


if __name__ == "__main__":
    sys.exit(main())
