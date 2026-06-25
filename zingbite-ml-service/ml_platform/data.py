from __future__ import annotations

from pathlib import Path
from typing import Any

import pandas as pd
from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError

from ml_platform.config import MlConfig


DATABASE_QUERIES = {
    'users': '''
        select userid as user_id, USERNAME as user_name, EMAIL as email, ADDRESS as address,
               CREATEDON as created_on, LASTLOGIN as last_login, role, latitude, longitude,
               city, rider_status, blocked, vehicle_type
        from user
    ''',
    'restaurants': '''
        select RESTAURANTID as restaurant_id, RESTAURANTNAME as restaurant_name,
               DELIVERYTIME as delivery_time, CUSINETYPE as cuisine_type, ADDRESS as address,
               RATINGS as rating, ISACTIVE as is_active, ISOPEN as is_open,
               TOTALORDERS as total_orders, TOTALIMPRESSIONS as total_impressions,
               latitude, longitude
        from restaurant
    ''',
    'menu': '''
        select m.MENUID as menu_id, m.RESTAURANTID as restaurant_id, m.MENUNAME as menu_name,
               m.PRICE as price, m.ITEMDESCRIPTION as description, m.ISAVAILABLE as is_available,
               m.IMAGEPATH as image_path, m.ITEMTYPE as item_type, r.CUSINETYPE as cuisine_type,
               r.RATINGS as restaurant_rating
        from menu m
        left join restaurant r on r.RESTAURANTID = m.RESTAURANTID
    ''',
    'orders': '''
        select orderId as order_id, restaurantRefId as restaurant_id, userId as user_id,
               orderTime as order_time, totalAmount as total_amount, orderStatus as order_status,
               statusUpdatedAt as status_updated_at, paymentMethod as payment_method,
               riderId as rider_id, gpsProgress as gps_progress,
               surgeMultiplier as surge_multiplier, surgeFee as surge_fee, surgeReason as surge_reason
        from orders
    ''',
    'orderitem': '''
        select orderItemId as order_item_id, orderId as order_id, menuId as menu_id,
               quantity, subTotal as subtotal
        from orderitem
    ''',
    'reviews': '''
        select id, userId as user_id, restaurantId as restaurant_id, rating, reviewText as review_text,
               createdAt as created_at, restaurantReply as restaurant_reply
        from reviews
    ''',
    'wishlist': '''
        select wishlistId as id, userId as user_id, menuId as menu_id, NULL as created_at
        from wishlist
    ''',
    'analytics_events': '''
        select id, userId as user_id, eventType as event_type, search_query, eventData as event_data,
               timestamp, ipAddress as ip_address, userAgent as user_agent
        from analytics_events
    ''',
    'chat_messages': '''
        select id, order_id, application_id, sender_id, sender_name, receiver_id,
               message_text, timestamp, is_read
        from chat_messages
    ''',
}


class DataRepository:
    def __init__(self, config: MlConfig):
        self.config = config

    def load_all(self) -> dict[str, Any]:
        frames = self.load_database_frames()
        frames['route_samples'] = self.load_route_samples()
        frames['imports'] = self.load_imports()
        return frames

    def load_database_frames(self) -> dict[str, pd.DataFrame]:
        frames: dict[str, pd.DataFrame] = {}
        if not self.config.db_url:
            return frames

        try:
            engine = create_engine(self.config.db_url, pool_pre_ping=True)
            with engine.connect() as connection:
                for name, query in DATABASE_QUERIES.items():
                    try:
                        frames[name] = pd.read_sql(text(query), connection)
                    except SQLAlchemyError:
                        frames[name] = pd.DataFrame()
        except SQLAlchemyError:
            return frames
        return frames

    def load_route_samples(self) -> pd.DataFrame:
        if self.config.route_csv.exists():
            return pd.read_csv(self.config.route_csv)
        return pd.DataFrame({
            'distance': [1.4, 3.0, 6.5, 9.0, 12.5, 4.2],
            'traffic_level': ['Light', 'Moderate', 'Heavy', 'Light', 'Heavy', 'Moderate'],
            'weather': ['Sunny', 'Rainy', 'Rainy', 'Sunny', 'Rainy', 'Sunny'],
            'prep_time': [8, 15, 18, 10, 25, 14],
            'is_high_rise': [0, 0, 1, 0, 1, 0],
            'eta': [17, 29, 48, 36, 70, 31],
        })

    def load_imports(self) -> dict[str, pd.DataFrame]:
        imports: dict[str, pd.DataFrame] = {}
        if not self.config.imports_dir.exists():
            return imports
        for csv_path in sorted(Path(self.config.imports_dir).glob('*.csv')):
            try:
                imports[csv_path.stem] = pd.read_csv(csv_path)
            except (OSError, ValueError):
                imports[csv_path.stem] = pd.DataFrame()
        return imports
