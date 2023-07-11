import React, { useState, useEffect } from "react";
import './cart.css'
import * as XLSX from 'xlsx';
import exampleFile from '../database/database.xlsx';
import CartBlock from "./cartBlock";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import loadingImg from '../images/loading.gif'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Cart({ cart, setCart }) {
  const [items, setItems] = useState([]);
  const [price, setPrice] = useState(0)
  const [open, setOpen] = useState(false);
  const [table, setTable] = useState(1);
  const [options, setOptions] = useState([]);
  const [location, setLocation] = useState(undefined);
  const [showPage, setShowPage] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPage(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (event, newValue) => {
    setLocation(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // useEffect(()=>{})

  const handleBuy = () => {
    if (location !== undefined || location !== null || location !== ''){
      let data = cart
      data.push([location, table])
      setCart(data)
      sendCart(cart)
      setCart([])
      localStorage.setItem('cart', JSON.stringify([]))
    }
  };

  function sendCart(formData) {
    console.log(formData)
    fetch('https://pizzaland-server.onrender.com/send', { // Змінено URL-адресу
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(_ => {
        setCart([])
      })
      .catch(error => console.log(error))
  }
  

  const minTbl = () => {
    if (table > 1) {
      setTable(table - 1);
    }
  }

  const plusTbl = () => {
    if (table < 10) {
      setTable(table + 1);
    }
  }

  useEffect(() => {
    let numb = 0;
    cart.map(item => numb += item.totalPrice);
    setPrice(numb);
  }, [cart]);

  useEffect(()=>{console.log(location)}, [location])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(exampleFile);
        const blob = await response.blob();
        const file = new File([blob], 'example.xlsx');
        const reader = new FileReader();
        reader.onload = (e) => {
          const bufferArray = e.target.result;
          const wb = XLSX.read(bufferArray, { type: 'array' });
          const wsname = wb.SheetNames[3];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws);
          setItems(data);
        }
        reader.readAsArrayBuffer(file);
      } catch (error) {
        console.log('Error fetching the file:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const processedOptions = items.map((option) => {
      const firstLetter = option.city;
      return {
        firstLetter: firstLetter,
        ...option,
      };
    });
    setOptions(processedOptions);
  }, [items]);

  return (
    <div className="screenRight" id="cartPage">
      {showPage ? (
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
          <img src={loadingImg} alt="" />
        </div>
      ) : (
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <div className="up">
            <p className="text_up">Cart</p>
          </div>
          <div className="bottom">
            {
              cart.length >= 1 ?
              cart.map(item => (
                <CartBlock
                  key={item.id}
                  cart={cart}
                  setCart={setCart}
                  id={item.id}
                  name={item.name}
                  size={item.size}
                  quantity={item.quantity}
                  totalPrice={item.totalPrice}
                />
              )):
              <div className="emptyCart">
                Your cart is empty
              </div>
            }
            
            {price > 0 ? 
              <div className="end">
                <div className="price">Price: ${price}</div>
                <button className="buy" onClick={handleClickOpen}>
                  Buy Now!
                </button>
                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle>Ordering</DialogTitle>
                  <DialogContent>
                    <div className="block">
                      <div className="where_place">
                        In which our pizzeria you are?
                        <Autocomplete
                          id="grouped-demo"
                          options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                          groupBy={(option) => option.firstLetter}
                          getOptionLabel={(option) => option.name}
                          sx={{ width: 300 }}
                          renderInput={(params) => <TextField {...params} label="With categories" defaultValue={location} />}
                          value={location}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="your_table">
                        What number of your table?
                        <div className="cnt-er">
                          <div className="min" onClick={minTbl}>-</div>
                          <div className="count">{table}</div>
                          <div className="plus" onClick={plusTbl}>+</div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <button className='buyDialog' onClick={handleBuy}>Buy</button>
                    <button className='closeBtn' onClick={handleClose}>Close</button>
                  </DialogActions>
                </Dialog>
              </div>
            : ''}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
