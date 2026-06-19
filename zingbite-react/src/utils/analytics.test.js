import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import { trackEvent, trackPageView } from './analytics';

vi.mock('axios');

describe('analytics.js tests', () => {
  let warnSpy;

  beforeEach(() => {
    vi.clearAllMocks();
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  test('trackEvent posts correctly on success', async () => {
    axios.post.mockResolvedValueOnce({ data: 'success' });

    await trackEvent('TEST_EVENT', { key: 'value' });

    expect(axios.post).toHaveBeenCalledWith('/api/analytics', {
      eventType: 'TEST_EVENT',
      eventData: JSON.stringify({ key: 'value' })
    });
    expect(warnSpy).not.toHaveBeenCalled();
  });

  test('trackEvent defaults eventData to empty object', async () => {
    axios.post.mockResolvedValueOnce({ data: 'success' });

    await trackEvent('TEST_EVENT_NO_DATA');

    expect(axios.post).toHaveBeenCalledWith('/api/analytics', {
      eventType: 'TEST_EVENT_NO_DATA',
      eventData: JSON.stringify({})
    });
  });

  test('trackEvent warns on API error', async () => {
    const errorMsg = 'Network Error';
    axios.post.mockRejectedValueOnce(new Error(errorMsg));

    await trackEvent('FAIL_EVENT', { dummy: 123 });

    expect(axios.post).toHaveBeenCalledWith('/api/analytics', {
      eventType: 'FAIL_EVENT',
      eventData: JSON.stringify({ dummy: 123 })
    });
    expect(warnSpy).toHaveBeenCalledWith(
      '[Analytics] Log failure:',
      'FAIL_EVENT',
      errorMsg
    );
  });

  test('trackPageView calls trackEvent with PAGE_VIEW type and page name', async () => {
    axios.post.mockResolvedValueOnce({ data: 'success' });

    trackPageView('/home');

    await vi.waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/analytics', {
        eventType: 'PAGE_VIEW',
        eventData: JSON.stringify({ page: '/home' })
      });
    });
  });
});
