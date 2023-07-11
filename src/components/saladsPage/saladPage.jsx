import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import exampleFile from '../database/database.xlsx';
import Card from '../card/Card';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import loadingImg from '../images/loading.gif'

function Salads({ cart, setCart }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(exampleFile);
        const blob = await response.blob();
        const file = new File([blob], 'example.xlsx');
        readExcel(file);
      } catch (error) {
        console.log('Error fetching the file:', error);
      }
    };

    fetchData();
  }, []);

  const readExcel = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const bufferArray = e.target.result;
      const wb = XLSX.read(bufferArray, { type: 'array' });
      const wsname = wb.SheetNames[1];
      const ws = wb.Sheets[wsname];
      const jsonData = XLSX.utils.sheet_to_json(ws);

      const arr = jsonData.map((item) => {
        if (typeof item.price === 'string' && item.price.includes(';')) {
          const priceArray = item.price.split(';').map(Number);
          return {
            ...item,
            price: priceArray,
          };
        }
        return item;
      });

      const data = arr.map((item) => {
        if (typeof item.sizes === 'string' && item.sizes.includes(';')) {
          const sizesArray = item.sizes.split(';').map(String);
          return {
            ...item,
            sizes: sizesArray,
          };
        }
        return item;
      });

      setItems(data);
      setTimeout(() => {
        setLoading(false);
      }, 2000); // Затримка протягом 2 секунд перед завершенням завантаження
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className='screenRight'>
      {loading ? (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <img src={loadingImg} alt="" />
        </div>
      ) : (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <div className="up">
            <p className='text_up'>Salads</p>
          </div>
          <div className="bottom">
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {items.map((item, index) => (
                <Grid key={index}>
                  <Card
                    key={item}
                    cart={cart}
                    setCart={setCart}
                    type={item.type}
                    name={item.name}
                    image={item.image}
                    ingridients={item.ingridients}
                    time={item.time}
                    price={item.price}
                    id={item.ID}
                    sizes={item.sizes}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      )}
    </div>
  );
}

export default Salads;
