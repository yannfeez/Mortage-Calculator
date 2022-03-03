import React, { useState, useEffect } from 'react'
import Slider from 'react-input-slider'

export default function SliderBox() {
    const [purchase, setPurchase] = useState({x:0});
    const [down, setDown] = useState({x:0});
    const [repayment, setRepayment] = useState({x:0});
    const [interest, setInterest] = useState({x:0});
    const [estimate, setEstimate] = useState(0);
    const [downMax, setDownMax] = useState(0);
    const [loanAmount, setLoanAmount] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
            if(down.x >= purchase.x || purchase.x == 0) {
                setDown({x:purchase.x})
                setDownMax(0)
            } else {
                setDownMax(purchase.x)
            }
        
    }, [purchase.x]);
    
    function format(res) {
            let nb = res
            let str = nb.toString()
            if(3 < str.length && str.length <= 6) {
                return str.match(/^(.*)(.{3})/).slice(1).join(',');
            } else if (str.length > 6 && str.length <= 9) {
                return str.match(/^(.*)(.{6})/).slice(1).join(',').match(/^(.*)(.{3})/).slice(1).join(',')
            } else {
                    return str
            }
    }

    function monthlyReport() {
        //M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
        let loanAmount = purchase.x - down.x;
        let n = repayment.x*12;
        let i = interest.x / 100 / 12;
        let pwr = Math.pow(1 + i, n);
        let M = loanAmount * ((i * pwr) / (pwr - 1));
        if(repayment.x === 0) {
                setError("Please, put a value greater than 0")
        } else {
                setEstimate(Math.round(M));
                setLoanAmount(loanAmount)
                setError(null)
        }
    }

    function result(res, sign) {
            let formate = format(res)
            if(sign === '$') {
                return <span className="result" >${formate}</span>
            } else if (sign ==='%') {
                return <span className="result" >{formate}%</span>
            } else {
                return <span className="result" >{res > 1 ? formate + " years" : formate + " year"}</span>
            }
    }
   
  return (
      <div className='slider_container'>
        <div className='slider'>
                <h3>Purchase price: {result(purchase.x, '$')}</h3>
                <Slider 
                axis="x" 
                x={purchase.x} 
                onChange={setPurchase} 
                xmax="1000000"
                styles={{
                        track: {
                          backgroundColor: "#fff"
                        },
                        active: {
                          backgroundColor: '#AF89FF'
                        },
                        thumb: {
                          width: 20,
                          height: 20
                        },
                        disabled: {
                          opacity: 0.5
                        }
                      }}
                />
        </div>
        <div className='slider'>
                <h3>Down payment: {result(down.x, '$')}</h3>
                <Slider 
                axis="x" 
                x={down.x} 
                onChange={setDown} 
                xmax={downMax}
                styles={{
                        track: {
                          backgroundColor: "#fff"
                        },
                        active: {
                          backgroundColor: '#AF89FF'
                        },
                        thumb: {
                          width: 20,
                          height: 20
                        },
                        disabled: {
                          opacity: 0.5
                        }
                      }}
                />
        </div>
        <div className='slider'>
                <h3>Repayment time: {result(repayment.x, 'year')}</h3>
                <Slider 
                axis="x" x={repayment.x} 
                onChange={setRepayment} 
                xmax="30"
                styles={{
                        track: {
                          backgroundColor: "#fff"
                        },
                        active: {
                          backgroundColor: '#AF89FF'
                        },
                        thumb: {
                          width: 20,
                          height: 20
                        },
                        disabled: {
                          opacity: 0.5
                        }
                      }}
                />
        </div>
        <div className='slider'>
                <h3>Interest rate: {result(interest.x, '%')}</h3>
                <Slider 
                axis="x" 
                x={interest.x} 
                onChange={setInterest} 
                xmax="20"
                styles={{
                        track: {
                          backgroundColor: "#fff"
                        },
                        active: {
                          backgroundColor: '#AF89FF'
                        },
                        thumb: {
                          width: 20,
                          height: 20
                        },
                        disabled: {
                          opacity: 0.5
                        }
                      }}
                />
        </div>
        <div className='loan_amount'>
                <h3>Loan Amount</h3>
                <h2>{result(loanAmount, '$')}</h2>
        </div>
        <div className='monthly_report'>
                <h3>Estimated pr. month:</h3>
                <h2>{result(estimate, '$')}</h2>
        </div>
        <div>
                <button className="btn_mortage" onClick={monthlyReport}>
                        Get a mortage quote
                </button>
                
        </div>
        <div className='div_error'>
                {error ? <p className='error'>{error}</p> : ""}
        </div>
      </div>
    
    
  )
}
