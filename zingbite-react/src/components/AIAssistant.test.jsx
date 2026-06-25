import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import AIAssistant from './AIAssistant';

// Mock axios
vi.mock('axios');

// Mock react-router-dom's useNavigate and useLocation
const mockNavigate = vi.fn();
const mockLocation = { pathname: '/menu', search: '?restaurantId=12' };

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation,
  };
});

describe('AIAssistant Component tests', () => {
  let mockAddToCart;

  beforeEach(() => {
    vi.clearAllMocks();
    mockAddToCart = vi.fn().mockResolvedValue(true);
    // Reset location pathname to default
    mockLocation.pathname = '/menu';
    mockLocation.search = '?restaurantId=12';
    // Stub scrollIntoView as jsdom does not support it
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <CartContext.Provider value={{ addToCart: mockAddToCart }}>
          <AIAssistant />
        </CartContext.Provider>
      </MemoryRouter>
    );
  };

  test('should render the floating button initially', () => {
    renderComponent();
    const floatBtn = screen.getByTitle('ZingBite AI Assistant');
    expect(floatBtn).toBeInTheDocument();
    // Chat drawer should not be visible
    expect(screen.queryByText('ZingBite AI Assistant', { selector: 'span' })).not.toBeInTheDocument();
  });

  test('should open chat drawer when clicking the floating button', () => {
    renderComponent();
    const floatBtn = screen.getByTitle('ZingBite AI Assistant');
    fireEvent.click(floatBtn);

    // Chat drawer elements should show up
    expect(screen.getByText('ZingBite AI Assistant', { selector: 'span' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ask me to do something...')).toBeInTheDocument();
  });

  test('should send typed text and update messages list', async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        status: 'success',
        message: 'Searching for pizza...',
        action: 'SEARCH',
        payload: 'pizza'
      }
    });

    const { container } = renderComponent();
    const floatBtn = screen.getByTitle('ZingBite AI Assistant');
    fireEvent.click(floatBtn);

    const input = screen.getByPlaceholderText('Ask me to do something...');
    const sendBtn = container.querySelector('svg.lucide-send').closest('button');

    fireEvent.change(input, { target: { value: 'search pizza' } });
    fireEvent.click(sendBtn);

    // Check that user message is added
    expect(screen.getByText('search pizza')).toBeInTheDocument();

    // Wait for the mock API response and verification
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/ai/voice-command?restaurantId=12', { text: 'search pizza' });
      expect(screen.getByText('Searching for pizza...')).toBeInTheDocument();
    });
  });

  test('should handle ADD_TO_CART action correctly', async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        status: 'success',
        message: 'Added Biryani to cart',
        action: 'ADD_TO_CART',
        payload: {
          menuId: 45,
          quantity: 2
        }
      }
    });

    const { container } = renderComponent();
    const floatBtn = screen.getByTitle('ZingBite AI Assistant');
    fireEvent.click(floatBtn);

    const input = screen.getByPlaceholderText('Ask me to do something...');
    const sendBtn = container.querySelector('svg.lucide-send').closest('button');

    fireEvent.change(input, { target: { value: 'add biryani' } });
    fireEvent.click(sendBtn);

    await waitFor(() => {
      expect(mockAddToCart).toHaveBeenCalledWith(45, 2);
      expect(screen.getByText('Added Biryani to cart')).toBeInTheDocument();
    });
  });

  test('should handle NAVIGATE action correctly', async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        status: 'success',
        message: 'Navigating...',
        action: 'NAVIGATE',
        payload: '/checkout'
      }
    });

    const { container } = renderComponent();
    const floatBtn = screen.getByTitle('ZingBite AI Assistant');
    fireEvent.click(floatBtn);

    const input = screen.getByPlaceholderText('Ask me to do something...');
    const sendBtn = container.querySelector('svg.lucide-send').closest('button');

    fireEvent.change(input, { target: { value: 'checkout' } });
    fireEvent.click(sendBtn);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/checkout');
    });
  });
});
