import React from 'react';
import { useNavigate } from 'react-router-dom';
import useInactivityLogout from './useInactivityLogout';


function Dashboard() {
    
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        localStorage.removeItem('fullName');
        localStorage.removeItem('accountNumber');
        localStorage.removeItem('idNumber');
        navigate('/login'); // Redirect to login
    };

    const goToPayment = () => {
        navigate('/paymentForm');
    };
   
    useInactivityLogout(300000); // 5 minutes

    return (
        <div className="container-fluid">
            <nav class="navbar navbar-expand-lg bg-primary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Payment System</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarText">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                        </ul>
                        <span class="navbar-text">
                            <button className="btn btn-outline-danger" onClick={handleLogout}>
                                Logout
                            </button>
                        </span>
                    </div>
                </div>
            </nav>
            <div className="container mt-5">
                <h1 className="text-center">Welcome {localStorage.getItem('fullName')}</h1>
                <h3>Account number : {localStorage.getItem('accountNumber')}</h3>
                <h3>ID number : {localStorage.getItem('idNumber')}</h3>
                <button type="button" class="btn btn-primary" onClick={goToPayment}>Make Payment</button>
            </div>
        </div>
    );
}

export default Dashboard;
