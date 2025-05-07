import React, { useState } from 'react';
import axios from 'axios';

function PaymentForm() {
    const [formData, setFormData] = useState({
        amount: '',
        currency: 'USD',
        provider: 'SWIFT',
        destinationAccount: '',
        swiftCode: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('jwt');
            await axios.post('/api/payments', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('Payment submitted successfully.');
        } catch (error) {
            console.error('Error submitting payment:', error);
            setMessage('Error submitting payment.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>International Payment</h2>
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
                <div className="mb-3">
                    <label className="form-label">Amount</label>
                    <input
                        type="text"
                        name="amount"
                        pattern="^\d+(\.\d{1, 2})?$"
                        className="form-control"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        min="1"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Currency</label>
                    <select
                        name="currency"
                        className="form-select"
                        value={formData.currency}
                        onChange={handleChange}
                    >
                        <option value="USD">USD</option>
                        <option value="ZAR">ZAR</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Provider</label>
                    <select
                        name="provider"
                        className="form-select"
                        value={formData.provider}
                        onChange={handleChange}
                    >
                        <option value="SWIFT">SWIFT</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Destination Account</label>
                    <input
                        type="text"
                        name="destinationAccount"
                        className="form-control"
                        value={formData.destinationAccount}
                        onChange={handleChange}
                        pattern="^\d{10,20}$"
                        title="10 to 20 digit account number"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">SWIFT Code</label>
                    <input
                        type="text"
                        name="swiftCode"
                        className="form-control"
                        value={formData.swiftCode}
                        onChange={handleChange}
                        pattern="^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$"
                        title="Valid SWIFT code"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Pay Now</button>

                {message && <div className="alert alert-info mt-3">{message}</div>}
            </form>
        </div>
    );
}

export default PaymentForm;
