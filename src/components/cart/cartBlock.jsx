import React, { useEffect } from "react";

function CartBlock(item) {

  const { cart, setCart } = item;



  const handleClick = () => {
    console.log(cart);
  };

  const handleDelete = (itemId) => {
    if (cart.length > 1){
      const updatedCart = cart.filter((cartItem) => cartItem.id !== parseInt((itemId.target.id).slice(3)));
      setCart(updatedCart);
    } else{
      setCart([]);
      localStorage.setItem("cart", JSON.stringify([]));
      console.log("clear")
    }
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


  return (
    <div className="block" id={`block${item.id}`}>
      <p>{item.name}</p>
      <p>{item.size}</p>
      <p>{item.quantity}</p>
      <p>{item.totalPrice}$</p>
      <div className="delBtn" onClick={handleDelete} id={`del${item.id}`}>
        X
      </div>
    </div>
  );
}

export default CartBlock;
