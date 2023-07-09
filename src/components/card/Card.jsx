import './Card.css'
import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Card(props) {
  const {cart, setCart} = props
  const [open, setOpen] = useState(false);
  const [count, setCnt] = useState(1);
  const [size, setSize] = useState(props.sizes.length > 1 ? 'Medium': 'Normal');
  const [sizePrice, setSizePrice] = useState(props.sizes.length > 1 ? props.price: '');

  // Retrieve the cart data from localStorage when the component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [setCart]);


  // Save the cart data to localStorage whenever the cart state changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleChange = (event: SelectChangeEvent) => {
    setSizePrice(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
    console.log(sizePrice)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const minCnt = () => {
    if (count > 1) {
      setCnt(count - 1);
    }
  }

  const plusCnt = () => {
    if (count < 10) {
      setCnt(count + 1);
    }
  }

  const handleBuyNow = () => {
    if (sizePrice !== ''){
      const newItem = {
        name: props.name,
        quantity: count,
        totalPrice: sizePrice * count,
        size: size,
        id: props.id,
        type: props.type,
        img: props.image
      };

      setCart((prevCart) => [...prevCart, newItem]);

      setSize('')
      setSizePrice('')
      setCnt('')

      handleClose();
    } else {
      alert(`Please select a ${props.type} size`);
    }
  };

  return (
    <div className="block" id='cardJSX'>
      <div className="card" id={`card${props.id}`} style={{ backgroundImage: `url(${props.image})` }}>
        <div className="textBg">
          {
            <div className="mainP" id={props.type === 'Drink' ? 'drink_item' : 'else_item'}>{props.type} "{props.name}"</div>
          }
          {
            props.type === "Pizza" || props.type === "Salad" ? (
              <div>
                <p><span className="greenText">Ingridients</span>: {props.ingridients}</p>
                <p><span className="greenText">Price</span>:
                {Array.isArray(props.price) ? props.price.map((price, index) => (
                  `${price}$ `
                )) :
                  `${props.price}$`
                }
                </p>
                <p><span className="greenText">Time to cook</span>: {props.time} minutes</p>
              </div>
            ) : (
              <p><span className="greenText">Price</span>:
                {Array.isArray(props.price) ? props.price.map((price, index) => (
                  `${price}$ `
                )) :
                  `${props.price}$`
                }
              </p>
            )
          }
          <button onClick={handleClickOpen} id={`btnAddToCart${props.id}`} className='addBtn'>Add to cart</button>
        </div>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        className='cardPopup'
      >
        <DialogTitle>PizzaLand</DialogTitle>
        <DialogContent>
          <div className="left">
            <div className="blockImg" style={{ backgroundImage: `url(${props.image})` }}></div>
          </div>
          <div className="right">
            <div className="mainP">{props.type} "{props.name}"</div>
            <div className="count_selection">
              <span className="cntS">Count</span>
              <div className="cnt-er">
                <div className="min" onClick={minCnt}>-</div>
                <div className="count">{count}</div>
                <div className="plus" onClick={plusCnt}>+</div>
              </div>
            </div>
            <div className="size">
              {Array.isArray(props.sizes) ? <div className='yes'>
                Size of {props.type}:
                <FormControl className='formControll'>
                  <InputLabel id="demo-simple-select-label">Size</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sizePrice}
                    label="Size"
                    onChange={handleChange}
                  >
                    {props.sizes.map((item, index) => <MenuItem value={props.price[index]}>{item}</MenuItem>)}
                  </Select>
                </FormControl>
              </div> : <div className='yes'>Size: {props.sizes}</div>}
            </div>
            <div className="price">
              {
                sizePrice * count > 0 | props.sizes.length === 1 ? <p>Price: {sizePrice * count}$</p>: <p></p>
              }
            </div>
            <button className="buyBtn" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </DialogContent>
        <DialogActions>
          <button className='closeBtn' onClick={handleClose}>Close</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Card;
