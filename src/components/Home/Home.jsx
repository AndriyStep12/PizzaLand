import { useState, useEffect } from 'react';
import React from "react";
import loadingImg from '../images/loading.gif'

function HomePage(){
    const [showPage, setShowPage] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPage(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return(
        <div className="screenRight" id="homepage">
            {showPage ? (
                <img src={loadingImg} alt="" />
            ) : <p className="special">Hello there! It is site menu for pizzeria "PizzaLand", made by Andriy Stepaniak. <span className="warn">WARNING: this is pet project, nobody will give you a pizza!</span> I hope you will enjoy this site.
        </p>}
        </div>
    )
}

export default HomePage;