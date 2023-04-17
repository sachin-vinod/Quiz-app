import React, { Component } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
 
function Timer({questionNumber, setStop}) {
    const [Time, setTime] = useState(30);

    useEffect(()=>{
        if(Time === 0){
            return setStop(true);
        }
        const interval = setTimeout(()=>{
            setTime((prev)=>prev-1);
        }, 1000);
        return () => clearInterval(interval);
    },[setStop, Time]);

    useEffect(()=>{
        setTime(30);
    },[questionNumber]);

    return ( 
        <div>
            {Time}
        </div>
     );
}

export default Timer;