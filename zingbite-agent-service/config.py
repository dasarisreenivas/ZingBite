import os
from pathlib import Path
from urllib.parse import quote_plus

class AgentConfig:
    def __init__(self):
        self.root_dir = Path(__file__).resolve().parent
        self.models_dir = self.root_dir / 'models' / 'artifacts'
        self.models_dir.mkdir(parents=True, exist_ok=True)
        self.port = int(os.getenv('ZINGBITE_AGENT_PORT', '5020'))
        self.auto_train_models = os.getenv('ZINGBITE_AGENT_AUTO_TRAIN', 'false').lower() == 'true'
        self.db_url = self._resolve_db_url()
        self.ml_service_url = os.getenv('ZINGBITE_ML_SERVICE_URL', 'http://localhost:5010')

    def _resolve_db_url(self) -> str | None:
        explicit = os.getenv('ZINGBITE_ML_DB_URL') or os.getenv('ZINGBITE_AGENT_DB_URL')
        if explicit:
            return explicit

        jdbc_url = os.getenv('ZINGBITE_DB_URL')
        user = os.getenv('ZINGBITE_DB_USER', 'root')
        password = os.getenv('ZINGBITE_DB_PASSWORD', '')
        if not jdbc_url:
            # Fallback to local default DB
            return f'mysql+pymysql://{quote_plus(user)}:{quote_plus(password)}@localhost:3306/ZingBite?charset=utf8mb4'

        if jdbc_url.startswith('jdbc:mysql://'):
            target = jdbc_url.removeprefix('jdbc:mysql://').split('?', 1)[0]
            password_part = f':{quote_plus(password)}' if password else ''
            return f'mysql+pymysql://{quote_plus(user)}{password_part}@{target}?charset=utf8mb4'

        return jdbc_url
