import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { CategoryCartOverlays, CategoryMenuSheet } from './CategoryMenuSheet';

const fallbackImage = '/fallback.jpg';

const buildProps = (overrides = {}) => ({
  categorySheet: { open: true, category: 'Biryani' },
  categoryMenuItems: [],
  categoryMenuLoading: false,
  categoryMenuError: '',
  fallbackImage,
  closeCategoryMenu: vi.fn(),
  getCategoryCartQuantity: vi.fn(() => 0),
  handleCategoryAddClick: vi.fn(),
  handleCategoryUpdateQuantity: vi.fn(),
  ...overrides
});

afterEach(() => {
  cleanup();
});

describe('CategoryMenuSheet', () => {
  test('does not render when closed', () => {
    render(<CategoryMenuSheet {...buildProps({ categorySheet: { open: false, category: 'Biryani' } })} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('renders loading and dialog accessibility state', () => {
    render(<CategoryMenuSheet {...buildProps({ categoryMenuLoading: true })} />);

    const dialog = screen.getByRole('dialog', { name: 'Biryani' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByText('Loading dishes...')).toBeInTheDocument();
  });

  test('adds an available item from the sheet', () => {
    const item = {
      menuId: 11,
      menuName: 'Chicken Biryani',
      description: 'Hyderabadi style',
      price: 249,
      restaurant: { restaurantId: 7, restaurantName: 'Biryani House', isOpen: true },
      isAvailable: true
    };
    const handleCategoryAddClick = vi.fn();

    render(
      <CategoryMenuSheet
        {...buildProps({
          categoryMenuItems: [item],
          handleCategoryAddClick
        })}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'ADD' }));

    expect(screen.getByText('Chicken Biryani')).toBeInTheDocument();
    expect(screen.getByText('Biryani House')).toBeInTheDocument();
    expect(handleCategoryAddClick).toHaveBeenCalledWith(item);
  });

  test('updates quantity when item is already in cart', () => {
    const item = {
      menuId: 12,
      menuName: 'Paneer Roll',
      price: 149,
      restaurant: { restaurantId: 8, restaurantName: 'Roll Point', isOpen: true },
      isAvailable: true
    };
    const handleCategoryUpdateQuantity = vi.fn();

    render(
      <CategoryMenuSheet
        {...buildProps({
          categoryMenuItems: [item],
          getCategoryCartQuantity: vi.fn(() => 2),
          handleCategoryUpdateQuantity
        })}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Decrease Paneer Roll quantity' }));
    fireEvent.click(screen.getByRole('button', { name: 'Increase Paneer Roll quantity' }));

    expect(handleCategoryUpdateQuantity).toHaveBeenNthCalledWith(1, item, 1);
    expect(handleCategoryUpdateQuantity).toHaveBeenNthCalledWith(2, item, 3);
  });
});

describe('CategoryCartOverlays', () => {
  test('renders cart error and resolves conflict action', () => {
    const setConflictPopup = vi.fn();
    const clearAndAdd = vi.fn();

    render(
      <CategoryCartOverlays
        cartError="Cart update failed"
        conflictPopup={{ itemId: 21, quantity: 2 }}
        setConflictPopup={setConflictPopup}
        clearAndAdd={clearAndAdd}
      />
    );

    expect(screen.getByRole('status')).toHaveTextContent('Cart update failed');
    expect(screen.getByRole('dialog', { name: 'Start a new cart?' })).toHaveAttribute('aria-modal', 'true');

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    fireEvent.click(screen.getByRole('button', { name: 'Start fresh' }));

    expect(setConflictPopup).toHaveBeenCalledWith(null);
    expect(clearAndAdd).toHaveBeenCalledWith(21, 2);
  });
});
