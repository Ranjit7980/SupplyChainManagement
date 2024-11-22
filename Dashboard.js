import React, { useEffect, useState } from 'react';
import { fetchInventoryLevels, fetchShippingStatus } from '../../services/apiService';

const Dashboard = () => {
    const [inventoryLevels, setInventoryLevels] = useState([]);
    const [shippingStatus, setShippingStatus] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const inventoryData = await fetchInventoryLevels();
                setInventoryLevels(inventoryData);

                const shippingData = await fetchShippingStatus();
                setShippingStatus(shippingData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <h2>Inventory Levels</h2>
                <ul>
                    {inventoryLevels.map((item) => (
                        <li key={item.id}>
                            {item.productName}: {item.quantity}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Shipping Status</h2>
                <ul>
                    {shippingStatus.map((shipment) => (
                        <li key={shipment.id}>
                            Order #{shipment.orderId}: {shipment.status}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
