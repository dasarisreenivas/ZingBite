import os

from ml_platform.service import create_app


app = create_app()


if __name__ == '__main__':
    host = os.getenv('ZINGBITE_ML_HOST', '127.0.0.1')
    port = int(os.getenv('ZINGBITE_ML_PORT', '5010'))
    app.run(host=host, port=port)
