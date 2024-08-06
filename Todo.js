import React, { useState, useEffect } from 'react';
import './style.css';
//import { json } from 'react-router-dom';

function Todo() {
    const [inputdata, setInputtype] = useState("");
    const [editdata, seteditdata] = useState("");
    const [toggle, settogglebtn] = useState(false);

    // Define getlocaldata function before its usage
    const getlocaldata = () => {
        const lists = localStorage.getItem("mytodolist");
        if (lists) {
            return JSON.parse(lists);
        } else {
            return [];
        }
    };
    const [items, setitems] = useState(getlocaldata());

    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items));
    }, [items]);

    const additems = () => {
        if (!inputdata) {
            alert("Please fill in the data");
        } else {
            if (toggle) {
                const updatedItems = items.map(item => {
                    if (item.id === editdata) {
                        return { ...item, name: inputdata };
                    }
                    return item;
                });
                setitems(updatedItems);
                setInputtype("");
                settogglebtn(false);
                seteditdata(null);
            } else {
                const mynewinputdata = {
                    id: new Date().getTime().toString(),
                    name: inputdata
                };
                setitems([...items, mynewinputdata]);
                setInputtype("");
            }
        }
    };

    const deleteItem = (id) => {
        const updatedItems = items.filter(item => item.id !== id);
        setitems(updatedItems);
    };

    const removeall = () => {
        setitems([]);
    }

    const updateItem = (id) => {
        const edititems = items.find((curele) => {
            return curele.id === id
        });
        setInputtype(edititems.name);
        seteditdata(id)
        settogglebtn(true)
    };


    return (
        <div className='main-div'>

            <div className='child-div'>
                <figure style={{ width: '200px', height: '100px' }}>
                    <img src='./images/todo.svg' alt='todologo' style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    <figcaption><h3>Add Your list here ✌️</h3></figcaption>
                </figure>
                <div className='additems'>
                    <input type='text' placeholder='✍️ Add Item' value={inputdata} onChange={(event) => setInputtype(event.target.value)} className='form-control' />
                    <i className={toggle ? "far fa-edit add-btn" : "fa fa-plus add-btn"} onClick={additems}></i>

                </div>
                {/* show item of todo */}
                <div className='showitems'>
                    {items.map((curele) => {
                        return (
                            <div className='eachitem' key={curele.id}>
                                <h3>{curele.name}</h3>
                                <div className='todo-btn'>
                                    <i className="far fa-edit add-btn" onClick={() => updateItem(curele.id)}></i>
                                    <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curele.id)}></i>
                                </div>

                            </div>
                        );

                    })}
                </div>
                <div className='showitems'>
                    <button className="btn-effect04" data-sm-link-text="Remove All" onClick={() => removeall()}>
                        <span>Remove All</span>
                    </button>
                </div>
            </div>
        </div>

    );
}
export default Todo;
