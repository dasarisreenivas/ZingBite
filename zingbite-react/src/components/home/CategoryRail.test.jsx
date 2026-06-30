import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { CategoryRail } from './CategoryRail';

const categories = [
  { name: 'Biryani', image: '/biryani.jpg' },
  { name: 'Burger', image: '/burger.jpg' }
];

describe('CategoryRail', () => {
  test('renders category buttons and marks the active category', () => {
    render(
      <CategoryRail
        title="Browse by craving"
        categories={categories}
        activeCategory="Burger"
        railRef={createRef()}
        onScroll={vi.fn()}
        onOpenCategory={vi.fn()}
      />
    );

    expect(screen.getByRole('heading', { name: 'Browse by craving' })).toBeInTheDocument();
    expect(screen.getByText('Biryani')).toBeInTheDocument();
    expect(screen.getByText('Burger').closest('button')).toHaveClass('active');
  });

  test('calls rail and category handlers', () => {
    const onScroll = vi.fn();
    const onOpenCategory = vi.fn();

    render(
      <CategoryRail
        categories={categories}
        activeCategory=""
        railRef={createRef()}
        onScroll={onScroll}
        onOpenCategory={onOpenCategory}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Scroll food categories left' }));
    fireEvent.click(screen.getByRole('button', { name: 'Scroll food categories right' }));
    fireEvent.click(screen.getByText('Biryani').closest('button'));

    expect(onScroll).toHaveBeenNthCalledWith(1, 'left');
    expect(onScroll).toHaveBeenNthCalledWith(2, 'right');
    expect(onOpenCategory).toHaveBeenCalledWith('Biryani');
  });
});
