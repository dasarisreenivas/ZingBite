import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { ShoppingBag, AlertTriangle, Clock } from 'lucide-react';

export default function AgentMessageCard({ card }) {
  const { addToCart } = useContext(CartContext);

  if (!card || !card.type || !card.data) return null;

  const { type, data } = card;

  switch (type) {
    case 'food_results':
    case 'recommendations': {
      const items = data.items || [];
      return (
        <div className="mt-2 w-full space-y-2">
          <div className="grid grid-cols-1 gap-2">
            {items.map((item, index) => (
              <div
                key={item.menuId || item.id || index}
                className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-3 shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <div className="min-w-0 flex-1 pr-3">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-sm font-semibold text-gray-900">
                      {item.menuName || item.name}
                    </span>
                    {item.recommend_score && (
                      <span className="rounded-full bg-red-50 px-1.5 py-0.5 text-[10px] font-bold text-red-500">
                        {Math.round(item.recommend_score * 100)}% Match
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-xs text-gray-500">
                    {item.description || 'Tasty selection from the menu'}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs font-bold text-red-500">Rs {item.price}</span>
                    {item.restaurantName && (
                      <span className="truncate text-[10px] text-gray-400">by {item.restaurantName}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => addToCart(item.menuId || item.id, 1)}
                  className="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-sm transition-transform hover:scale-105 hover:bg-red-600 active:scale-95"
                >
                  <ShoppingBag size={12} /> Add
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case 'order_status': {
      const steps = ['PLACED', 'ACCEPTED', 'PREPARING', 'READY_FOR_PICKUP', 'PICKED_UP', 'OUT_FOR_DELIVERY', 'DELIVERED'];
      const statusAliases = {
        CONFIRMED: 'ACCEPTED',
        DELIVERING: 'OUT_FOR_DELIVERY'
      };
      const normalizedStatus = statusAliases[data.orderStatus] || data.orderStatus || 'PLACED';
      const activeIdx = Math.max(steps.indexOf(normalizedStatus), 0);

      return (
        <div className="mt-2 w-full rounded-lg border border-gray-100 bg-white p-3.5 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-800">Order #{data.orderId}</span>
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-600">
              {normalizedStatus.replace(/_/g, ' ')}
            </span>
          </div>

          <div className="relative mt-3 flex items-center justify-between">
            {steps.map((step, idx) => {
              const completed = idx <= activeIdx;
              return (
                <div key={step} className="relative z-10 flex flex-1 flex-col items-center">
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold transition-colors duration-300 ${
                      completed ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span className="mt-1 w-full truncate text-center text-[8px] font-semibold text-gray-400">
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex items-center gap-1.5 border-t border-gray-50 pt-2 text-xs text-gray-500">
            <Clock size={12} className="text-red-500" />
            <span>Delivery Partner ID: #{data.riderId || 'N/A'}</span>
          </div>
        </div>
      );
    }

    case 'demand_forecast': {
      const forecasts = data.forecasts || [];
      return (
        <div className="mt-2 w-full space-y-2 rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
          <div className="border-b pb-1.5 text-xs font-bold text-gray-800">Tomorrow's Sales Forecast</div>
          {forecasts.map((forecast) => (
            <div key={forecast.menuId} className="flex flex-col gap-0.5 text-xs">
              <div className="flex justify-between font-semibold text-gray-700">
                <span>{forecast.itemName}</span>
                <span className={forecast.trend === 'HIGH_DEMAND_WARNING' ? 'font-bold text-red-500' : 'text-gray-500'}>
                  {forecast.predictedQuantity} orders
                </span>
              </div>
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>Historical Avg: {forecast.historicalAverage}</span>
                <span>{forecast.reason}</span>
              </div>
            </div>
          ))}
        </div>
      );
    }

    case 'fraud_alert': {
      const clusters = data.clusters || [];
      return (
        <div className="mt-2 w-full space-y-2 rounded-lg border border-red-100 bg-red-50/50 p-3.5 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-bold text-red-600">
            <AlertTriangle size={14} /> Security Scan Anomalies
          </div>
          {clusters.map((cluster, index) => (
            <div key={index} className="rounded-lg border border-red-100 bg-white p-2 text-xs">
              <div className="flex justify-between font-bold text-gray-800">
                <span>Threat: {cluster.threatLevel}</span>
                <span className="text-red-500">ID List: {cluster.userIds?.join(', ')}</span>
              </div>
              <p className="mt-1 text-[10px] text-gray-500">{cluster.description}</p>
            </div>
          ))}
        </div>
      );
    }

    case 'knowledge':
      return (
        <div className="mt-2 w-full space-y-1.5 rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
          <div className="border-b pb-1 text-xs font-bold text-gray-800">Food Insights - {data.food_item}</div>
          {data.cuisines?.length > 0 && (
            <div className="text-xs text-gray-600">Cuisine: <span className="font-semibold">{data.cuisines.join(', ')}</span></div>
          )}
          {data.dietary?.length > 0 && (
            <div className="text-xs text-gray-600">Dietary: <span className="font-semibold">{data.dietary.join(', ').toUpperCase()}</span></div>
          )}
          {data.pairings?.length > 0 && (
            <div className="mt-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Perfect Pairings:</div>
              <div className="mt-1 flex flex-wrap gap-1">
                {data.pairings.map((pairing, index) => (
                  <span key={index} className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-500">
                    + {pairing}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      );

    default:
      return null;
  }
}
