import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export function Cart() {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center" style={{ padding: '50px' }}>
        <h2>Your cart is empty</h2>
        <Link to="/shop" className="btn btn-primary mt-20">Go Shopping</Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-20">Your Cart</h2>
      <div className="card">
        {cart.map(item => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee', padding: '20px 0' }}>
            <img src={item.imageUrl} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', marginRight: '20px' }} />
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0 }}>{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="btn btn-secondary" style={{ padding: '5px 10px' }}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="btn btn-secondary" style={{ padding: '5px 10px' }}>+</button>
            </div>
            <button onClick={() => removeFromCart(item.id)} className="btn btn-danger" style={{ marginLeft: '20px' }}>Remove</button>
          </div>
        ))}
        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <h3>Total: ${total.toFixed(2)}</h3>
          <div style={{ marginTop: '20px' }}>
            <button onClick={clearCart} className="btn btn-danger" style={{ marginRight: '10px' }}>Clear Cart</button>
            <button onClick={() => alert('Checkout implementation coming soon!')} className="btn btn-primary">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
