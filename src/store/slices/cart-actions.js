import { cartActions } from "./cart";
import { uiActions } from "./ui";

export function getCartData(){
    return async (dispatch) => {
        async function sendRequest(){
            const response = await fetch('https://earnest-triumph-293615-default-rtdb.europe-west1.firebasedatabase.app/cart.json');
            if(!response.ok){ 
                throw new Error('Failed fetching data'); 
            }
            const data = await response.json();
    
            return data;
        };

        try {
            const cartData = await sendRequest();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity
            }));
        }
        catch(error){
            dispatch(uiActions.showNotification({ status: 'error', title: 'Error!', message: 'Fetching cart data failed!' }));
        }
    }
}

export function sendCartData(cart){
    return async (dispatch) => {
        dispatch(uiActions.showNotification({ status: 'pending', title: 'Sending...', message: 'Sending cart data!' }));
    
        async function sendRequest(){
            const response = await fetch('https://earnest-triumph-293615-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
                method: 'PUT',
                body: JSON.stringify({ items: cart.items, totalQuantity: cart.totalQuantity }),
            });
            if(!response.ok){ throw new Error('Failed sending data.'); }
        };

        try {
            await sendRequest();
            dispatch(uiActions.showNotification({ status: 'success', title: 'Success!', message: 'Send cart data successfully!' }));
        }
        catch(error){
            dispatch(uiActions.showNotification({ status: 'error', title: 'Error!', message: 'Sending cart data!' }));
        }
    };
}