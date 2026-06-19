import React, { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import StarRating from './ui/StarRating';
import { AlertCircle, CheckCircle2, MessageSquare, Award } from 'lucide-react';
import '../styles/reviews.css';

export default function ReviewsSection({ restaurantId }) {
  const { user } = useContext(AuthContext);
  
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  
  // Review form state
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  const fetchReviews = useCallback(async () => {
    if (!restaurantId) return;
    setLoading(true);
    try {
      const res = await axios.get(`/api/reviews?restaurantId=${restaurantId}`);
      setReviews(res.data || []);
    } catch (err) {
      console.error('[ZingBite] Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  }, [restaurantId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Handle review submit
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      setFormError('Please log in to submit a review.');
      return;
    }
    if (rating < 1 || rating > 5) {
      setFormError('Please select a star rating.');
      return;
    }
    if (reviewText.trim().length < 5) {
      setFormError('Your review must be at least 5 characters long.');
      return;
    }

    setSubmitting(true);
    setFormError(null);
    setFormSuccess(null);

    try {
      const payload = {
        restaurantId: parseInt(restaurantId),
        rating,
        reviewText: reviewText.trim()
      };
      
      const res = await axios.post('/api/reviews', payload);
      if (res.data && res.data.success) {
        setFormSuccess('Thank you! Your review has been submitted successfully.');
        setReviewText('');
        setRating(5);
        fetchReviews(); // reload list
        
        // Clear success message after 5 seconds
        setTimeout(() => setFormSuccess(null), 5000);
      }
    } catch (err) {
      console.error('[ZingBite] Submit review failed:', err);
      const errMsg = err.response?.data?.error || 'Failed to submit review. Make sure you have ordered from this restaurant.';
      setFormError(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  // Sort reviews
  const sortedReviews = useMemo(() => {
    const list = [...reviews];
    if (sortBy === 'newest') {
      // Sort by date descending
      return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    if (sortBy === 'highest') {
      return list.sort((a, b) => b.rating - a.rating);
    }
    if (sortBy === 'lowest') {
      return list.sort((a, b) => a.rating - b.rating);
    }
    return list;
  }, [reviews, sortBy]);

  // Average calculation
  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  return (
    <div className="reviews-section-container">
      {/* Header Block */}
      <div className="reviews-header-block">
        <div className="reviews-title-wrap">
          <h2>Customer Reviews</h2>
          <div className="reviews-subinfo">
            <span>{reviews.length} Review{reviews.length !== 1 ? 's' : ''}</span>
            {reviews.length > 0 && (
              <>
                <span className="dot" />
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <StarRating rating={Math.round(averageRating)} size={14} />
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{averageRating} out of 5</span>
                </div>
              </>
            )}
          </div>
        </div>

        {reviews.length > 0 && (
          <div className="reviews-filter-sort">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
          </div>
        )}
      </div>

      {/* Reviews List */}
      <div className="reviews-list">
        {loading ? (
          <div className="reviews-empty-state">Loading reviews...</div>
        ) : sortedReviews.length === 0 ? (
          <div className="reviews-empty-state">
            <MessageSquare size={32} strokeWidth={1.5} style={{ marginBottom: '10px' }} />
            <p>No reviews yet for this restaurant. Be the first to share your experience!</p>
          </div>
        ) : (
          sortedReviews.map((r) => (
            <div key={r.id} className="review-card">
              <div className="review-user-avatar">
                {(r.userName || 'U').charAt(0).toUpperCase()}
              </div>
              <div className="review-card-content">
                <div className="review-card-header">
                  <div>
                    <h4 className="review-user-name">{r.userName || 'Customer'}</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                      <StarRating rating={r.rating} size={13} />
                      <span className="dish-featured-tag" style={{ 
                        fontSize: '0.65rem', 
                        padding: '1px 6px', 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '2px',
                        background: 'rgba(46, 117, 89, 0.05)',
                        borderColor: 'rgba(46, 117, 89, 0.15)',
                        color: 'var(--success)'
                      }}>
                        <Award size={10} /> Verified Purchase
                      </span>
                    </div>
                  </div>
                  <span className="review-date">
                    {new Date(r.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <p className="review-text">{r.reviewText}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Review Submission Form */}
      <div className="review-form-box">
        <h3>Write a Review</h3>

        {formError && (
          <div className="review-error-banner">
            <AlertCircle size={16} />
            <span>{formError}</span>
          </div>
        )}

        {formSuccess && (
          <div className="review-success-banner">
            <CheckCircle2 size={16} />
            <span>{formSuccess}</span>
          </div>
        )}

        {user ? (
          <form onSubmit={handleSubmitReview}>
            <div className="review-form-stars-row">
              <label>Your Rating:</label>
              <StarRating rating={rating} onRatingChange={setRating} interactive={true} size={22} />
            </div>

            <div className="review-textarea-wrapper">
              <textarea
                placeholder="Share details of your experience (e.g., taste, delivery time, packaging)..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                maxLength={1000}
                required
              />
              <span className="review-char-count">{reviewText.length}/1000</span>
            </div>

            <button 
              type="submit" 
              className="submit-review-btn" 
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        ) : (
          <div className="reviews-empty-state" style={{ padding: '10px 0', textAlign: 'left' }}>
            <p style={{ margin: 0 }}>
              Please <a href="/zingbite/login" style={{ color: 'var(--brand-red)', fontWeight: 700, textDecoration: 'underline' }}>Login</a> to write a review. Reviews are only allowed for users who have completed orders.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
