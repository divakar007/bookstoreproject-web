import React from "react";
import '../assets/css/CofirmationPage.css';
import ConfirmationTable from "./ConfirmationTable";
import { useContext } from "react";
import { OrderDetailsStore } from "../contexts/OrderDetailContext";

function ConfirmationPage() {
    const { orderDetails } = useContext(OrderDetailsStore);

    const orderDate = () => {
        let date = new Date(orderDetails.order.dateCreated);
        return date.toLocaleString();
    };
    let price = 0
    orderDetails.books.forEach((element, index, array) => {
        price+=element.price;
    });
    const formatPhoneNumber = (phoneNumber: string) => {
        // Assuming phoneNumber is a string containing digits only
        const cleaned = ('' + phoneNumber).replace(/\D/g, ''); // Remove non-numeric characters
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

        if (match) {
            return '('+ match[1] + ')' + match[2] + '-' + match[3];
        }

        // Return the original phone number if the format doesn't match
        return phoneNumber;
    };

    const ccExpDate = () => {
        const expDate = new Date(orderDetails.customer.ccExpDate);
        const formattedDate = expDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
        });

        // Extract and join month and year in MM-YYYY format
        const [month, year] = formattedDate.split('/');
        return month+' - '+year;
    };

    return (
        <div className="confirmationView">
            <div className="confirmationHeader">
                <h1>Order Confirmation</h1>
                <p>Thank you for your purchase! Here are the details of your order:</p>
            </div>
            <div className="confirmationDetails">
                <ul>
                    <li><strong>Confirmation #:</strong> {orderDetails.order?.confirmationNumber}</li><br/><br/>
                    <li><strong>Order Date:</strong> {orderDate()}</li>
                </ul>
                <ConfirmationTable />

                <ul className={"customer_details"}>
                    <li><strong>Name:</strong> {orderDetails?.customer?.customerName}</li><br/>
                    <li><strong>Address:</strong> {orderDetails?.customer?.address}</li><br/>
                    <li><strong>Email:</strong> {orderDetails?.customer?.email}</li><br/>
                    <li><strong>Phone:</strong> {formatPhoneNumber(orderDetails?.customer?.phone)}</li><br/>
                    <li><strong>Credit Card:</strong> {"** ** ** " +orderDetails?.customer?.ccNumber?.slice(-4) + "( "+ ccExpDate() + " )"} </li><br/>
                </ul>
            </div>
            <div className="confirmationFooter">
                <p>If you have any questions, please contact our customer support.</p>
            </div>
        </div>
    );
}

export default ConfirmationPage;