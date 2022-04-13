import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/slices/ui';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const itemTotalQuantity = useSelector(state => state.cartReducer.totalQuantity)

  function toggleCart(){
    dispatch(uiActions.toggleVisibility());
  }

  return (
    <button className={classes.button} onClick={toggleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{itemTotalQuantity}</span>
    </button>
  );
};

export default CartButton;
