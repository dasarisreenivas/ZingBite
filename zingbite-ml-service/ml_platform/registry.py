from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import joblib


class ModelRegistry:
    def __init__(self, models_dir: Path):
        self.models_dir = models_dir
        self.manifest_path = self.models_dir / 'model_manifest.json'
        self.models_dir.mkdir(parents=True, exist_ok=True)

    def load_manifest(self) -> dict[str, Any]:
        if not self.manifest_path.exists():
            return {'updatedAt': None, 'models': {}}
        with self.manifest_path.open('r', encoding='utf-8') as handle:
            return json.load(handle)

    def save_artifact(
        self,
        model_name: str,
        version: str,
        artifact: dict[str, Any],
        metrics: dict[str, Any],
        feature_schema: dict[str, Any],
    ) -> dict[str, Any]:
        model_dir = self.models_dir / model_name
        model_dir.mkdir(parents=True, exist_ok=True)
        artifact_path = model_dir / f'{version}.joblib'
        joblib.dump(artifact, artifact_path)

        manifest = self.load_manifest()
        model_entry = manifest.setdefault('models', {}).setdefault(model_name, {'versions': {}})
        for existing in model_entry.get('versions', {}).values():
            existing['active'] = False

        relative_path = artifact_path.relative_to(self.models_dir).as_posix()
        version_entry = {
            'modelName': model_name,
            'version': version,
            'active': True,
            'path': relative_path,
            'metrics': metrics,
            'featureSchema': feature_schema,
            'trainedAt': datetime.now(timezone.utc).isoformat(),
        }
        model_entry['activeVersion'] = version
        model_entry.setdefault('versions', {})[version] = version_entry
        manifest['updatedAt'] = datetime.now(timezone.utc).isoformat()

        with self.manifest_path.open('w', encoding='utf-8') as handle:
            json.dump(manifest, handle, indent=2, sort_keys=True)
        return version_entry

    def load_active(self, model_name: str) -> tuple[dict[str, Any], dict[str, Any]] | None:
        manifest = self.load_manifest()
        model_entry = manifest.get('models', {}).get(model_name)
        if not model_entry:
            return None
        active_version = model_entry.get('activeVersion')
        version_entry = model_entry.get('versions', {}).get(active_version)
        if not version_entry:
            return None

        artifact_path = self.models_dir / version_entry['path']
        if not artifact_path.exists():
            return None
        artifact = joblib.load(artifact_path)
        return artifact, version_entry
