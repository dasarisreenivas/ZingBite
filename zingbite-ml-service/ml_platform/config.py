from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path
from urllib.parse import quote_plus


@dataclass(frozen=True)
class MlConfig:
    root_dir: Path
    models_dir: Path
    imports_dir: Path
    route_csv: Path
    seed: int = 42
    db_url: str | None = None
    training_enabled: bool = True

    @classmethod
    def from_env(cls) -> 'MlConfig':
        root_dir = Path(__file__).resolve().parents[1]
        repo_root = root_dir.parent
        models_dir = Path(os.getenv('ZINGBITE_ML_MODELS_DIR', root_dir / 'models')).resolve()
        imports_dir = Path(os.getenv('ZINGBITE_ML_IMPORTS_DIR', root_dir / 'data' / 'imports')).resolve()
        route_csv = Path(
            os.getenv('ZINGBITE_ROUTE_SAMPLES_CSV', repo_root / 'zingbite' / 'routing-service' / 'routing_samples.csv')
        ).resolve()
        return cls(
            root_dir=root_dir,
            models_dir=models_dir,
            imports_dir=imports_dir,
            route_csv=route_csv,
            seed=int(os.getenv('ZINGBITE_ML_SEED', '42')),
            db_url=_resolve_db_url(),
            training_enabled=_flag_enabled('ZINGBITE_ML_TRAINING_ENABLED', True),
        )


def _flag_enabled(name: str, default: bool) -> bool:
    value = os.getenv(name)
    if value is None:
        return default
    return value.strip().lower() in {'1', 'true', 'yes', 'on'}


def _resolve_db_url() -> str | None:
    explicit = os.getenv('ZINGBITE_ML_DB_URL')
    if explicit:
        return explicit

    jdbc_url = os.getenv('ZINGBITE_DB_URL')
    user = os.getenv('ZINGBITE_DB_USER')
    password = os.getenv('ZINGBITE_DB_PASSWORD')
    if not jdbc_url or not user:
        return None

    if jdbc_url.startswith('jdbc:mysql://'):
        target = jdbc_url.removeprefix('jdbc:mysql://').split('?', 1)[0]
        password_part = f':{quote_plus(password)}' if password else ''
        return f'mysql+pymysql://{quote_plus(user)}{password_part}@{target}?charset=utf8mb4'

    return jdbc_url
