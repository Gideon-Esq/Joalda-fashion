import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  
  // Contact Form State
  const [email, setEmail] = useState('');
  const [subscribeToNews, setSubscribeToNews] = useState(true);
  
  // Delivery Form State
  const [country, setCountry] = useState('United States');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phone, setPhone] = useState('');
  const [subscribeToTexts, setSubscribeToTexts] = useState(false);
  
  // Payment Form State (non-functional placeholder)
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  
  // Calculate totals
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping: number = subtotal > 0 ? 0 : 0; // Free shipping for now
  const total = subtotal + shipping;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!email || !firstName || !lastName || !address || !city || !state || !zipCode) {
      alert('Please fill in all required fields');
      return;
    }
    
    // In a real app, this would process the order
    alert('Order placed successfully! (Demo mode - no actual payment processed)');
    clearCart();
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto', 
        padding: 'var(--spacing-xl)',
        textAlign: 'center'
      }}>
        <h2>Your cart is empty</h2>
        <p style={{ color: 'var(--text-light)', marginBottom: 'var(--spacing-lg)' }}>
          Add some items to your cart before checking out.
        </p>
        <button 
          onClick={() => navigate('/shop')}
          className="btn btn-primary"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* Left Side - Form */}
        <div className="checkout-form-section">
          <div className="checkout-header">
            <h1 style={{ fontSize: '1.5rem', fontWeight: '400', margin: '0 0 var(--spacing-lg) 0' }}>
              JOALDA FASHION
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Contact Section */}
            <section className="form-section">
              <div className="section-header">
                <h2>Contact</h2>
                <a href="/login" style={{ fontSize: '0.875rem', textDecoration: 'underline' }}>
                  Sign in
                </a>
              </div>
              
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
              
              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="subscribe-news"
                  checked={subscribeToNews}
                  onChange={(e) => setSubscribeToNews(e.target.checked)}
                />
                <label htmlFor="subscribe-news">
                  Stay up to date about new products and other news. Unsubscribe anytime.
                </label>
              </div>
            </section>

            {/* Delivery Section */}
            <section className="form-section">
              <h2>Delivery</h2>
              
              <div className="form-group">
                <label>Country/Region</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="form-input"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Australia</option>
                </select>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Apartment, suite, etc. (optional)"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                  className="form-input"
                />
              </div>
              
              <div className="form-row form-row-3">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    className="form-input"
                  >
                    <option value="">State</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="TX">Texas</option>
                    <option value="NY">New York</option>
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="ZIP code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    required
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <input
                  type="tel"
                  placeholder="Phone (optional)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-input"
                />
              </div>
              
              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="subscribe-texts"
                  checked={subscribeToTexts}
                  onChange={(e) => setSubscribeToTexts(e.target.checked)}
                />
                <label htmlFor="subscribe-texts">
                  Sign up for texts to be the first to know about new releases and special offers
                </label>
              </div>
            </section>

            {/* Payment Section */}
            <section className="form-section">
              <h2>Payment</h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: 'var(--spacing-md)' }}>
                All transactions are secure and encrypted.
              </p>
              
              <div className="payment-notice">
                <p style={{ fontSize: '0.875rem', margin: 0 }}>
                  💳 Payment processing is not yet active. This is a demo checkout form.
                </p>
              </div>
              
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Card number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="form-input"
                  disabled
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Expiration date (MM / YY)"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="form-input"
                    disabled
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Security code"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="form-input"
                    disabled
                  />
                </div>
              </div>
              
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Name on card"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  className="form-input"
                  disabled
                />
              </div>
            </section>

            {/* Submit Button */}
            <button 
              type="submit"
              className="btn btn-primary"
              style={{ 
                width: '100%', 
                padding: 'var(--spacing-md)',
                fontSize: '1rem',
                marginTop: 'var(--spacing-lg)'
              }}
            >
              Complete Order
            </button>
          </form>
        </div>

        {/* Right Side - Order Summary */}
        <div className="checkout-summary-section">
          <div className="order-summary">
            <h2 style={{ fontSize: '1.25rem', fontWeight: '400', marginBottom: 'var(--spacing-lg)' }}>
              Order Summary
            </h2>
            
            {/* Cart Items */}
            <div className="summary-items">
              {cart.map((item) => (
                <div key={item.id} className="summary-item">
                  <div className="summary-item-image">
                    <img src={item.imageUrl} alt={item.name} />
                    <span className="item-quantity">{item.quantity}</span>
                  </div>
                  <div className="summary-item-details">
                    <p className="item-name">{item.name}</p>
                    <p className="item-meta">{item.category}</p>
                  </div>
                  <div className="summary-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Discount Code */}
            <div className="discount-code-section">
              <input
                type="text"
                placeholder="Discount code or gift card"
                className="form-input"
                style={{ flex: 1 }}
              />
              <button 
                type="button"
                className="btn btn-outline"
                style={{ whiteSpace: 'nowrap' }}
              >
                Apply
              </button>
            </div>
            
            {/* Military Discount Notice */}
            <div className="military-discount">
              <p style={{ fontSize: '0.875rem', margin: 0 }}>
                🎖️ 10% Off Discount for Military, Veterans, and Students
              </p>
            </div>
            
            {/* Totals */}
            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>USD</span>{' '}
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .checkout-page {
          background: #FAFAFA;
          min-height: 100vh;
          padding: var(--spacing-md);
        }

        .checkout-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 450px;
          gap: var(--spacing-xl);
        }

        @media (max-width: 968px) {
          .checkout-container {
            grid-template-columns: 1fr;
          }
          
          .checkout-summary-section {
            order: -1;
          }
        }

        .checkout-form-section {
          background: white;
          padding: var(--spacing-xl);
          border: 1px solid var(--border);
        }

        .checkout-summary-section {
          background: #F9F9F9;
          padding: var(--spacing-lg);
          border: 1px solid var(--border);
          height: fit-content;
          position: sticky;
          top: 20px;
        }

        .form-section {
          margin-bottom: var(--spacing-xl);
          padding-bottom: var(--spacing-xl);
          border-bottom: 1px solid var(--border);
        }

        .form-section:last-of-type {
          border-bottom: none;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-md);
        }

        .section-header h2 {
          margin: 0;
        }

        .form-section h2 {
          font-size: 1.125rem;
          font-weight: 500;
          margin: 0 0 var(--spacing-md) 0;
        }

        .form-group {
          margin-bottom: var(--spacing-md);
        }

        .form-group label {
          display: block;
          font-size: 0.875rem;
          margin-bottom: var(--spacing-xs);
          color: var(--text);
        }

        .form-input {
          width: 100%;
          padding: var(--spacing-sm);
          border: 1px solid var(--border);
          border-radius: 0;
          font-size: 1rem;
          font-family: inherit;
          transition: border-color 0.2s;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--primary);
        }

        .form-input:disabled {
          background: #F5F5F5;
          cursor: not-allowed;
          color: var(--text-light);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-md);
        }

        .form-row-3 {
          grid-template-columns: 1fr 1fr 1fr;
        }

        @media (max-width: 640px) {
          .form-row,
          .form-row-3 {
            grid-template-columns: 1fr;
          }
        }

        .form-checkbox {
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-sm);
          margin-top: var(--spacing-md);
        }

        .form-checkbox input[type="checkbox"] {
          margin-top: 4px;
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        .form-checkbox label {
          font-size: 0.875rem;
          line-height: 1.5;
          color: var(--text);
          cursor: pointer;
        }

        .payment-notice {
          background: #FFF9E6;
          border: 1px solid #FFD700;
          padding: var(--spacing-md);
          margin-bottom: var(--spacing-md);
          text-align: center;
        }

        /* Order Summary Styles */
        .summary-items {
          margin-bottom: var(--spacing-lg);
        }

        .summary-item {
          display: grid;
          grid-template-columns: 60px 1fr auto;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-md);
          padding-bottom: var(--spacing-md);
          border-bottom: 1px solid var(--border);
        }

        .summary-item:last-child {
          border-bottom: none;
        }

        .summary-item-image {
          position: relative;
          width: 60px;
          height: 60px;
          background: white;
          border: 1px solid var(--border);
        }

        .summary-item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .item-quantity {
          position: absolute;
          top: -8px;
          right: -8px;
          background: var(--text);
          color: white;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .summary-item-details {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .item-name {
          font-size: 0.875rem;
          margin: 0 0 4px 0;
          font-weight: 500;
        }

        .item-meta {
          font-size: 0.75rem;
          color: var(--text-light);
          margin: 0;
        }

        .summary-item-price {
          display: flex;
          align-items: center;
          font-weight: 500;
        }

        .discount-code-section {
          display: flex;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-md);
        }

        .military-discount {
          background: #E8F5E9;
          border: 1px solid #4CAF50;
          padding: var(--spacing-sm);
          margin-bottom: var(--spacing-lg);
          text-align: center;
        }

        .summary-totals {
          border-top: 1px solid var(--border);
          padding-top: var(--spacing-md);
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: var(--spacing-sm);
          font-size: 0.875rem;
        }

        .summary-row.total {
          font-size: 1.125rem;
          font-weight: 600;
          margin-top: var(--spacing-md);
          padding-top: var(--spacing-md);
          border-top: 1px solid var(--border);
        }
      `}</style>
    </div>
  );
}
