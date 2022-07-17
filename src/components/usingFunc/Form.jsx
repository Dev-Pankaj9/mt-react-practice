import React, { useState, useEffect } from 'react';

const Form = ({ users, handleSetUsers, updateData, handleUpdateData, handleEditUser }) => {
    const { list, colors } = users;
    const colors_keys = Object.keys(colors);
    // const [inputName, setInputName] = useState(() => updateData ? updateData.name : '');
    const [inputName, setInputName] = useState('');
    const [inputColor, setInputColor] = useState(colors_keys[0]);
    console.log({inputName, inputColor, updateData});
    const colors_jsx = colors_keys.map(color => <option key={color} value={color}>{color}</option>);

    const handleOnChange = (evt) => {
        const {name, value} = evt.target;
        switch(name){
            case 'name': setInputName(value); break;
            case 'color': setInputColor(value); break;
            default: return;
        }
    }

    const handleSubmitForm = (evt) => {
        evt.preventDefault();

        if(inputName === '' || inputColor === '') {
            alert('All fields are mandatory');
            return;
        }

        const name_key = inputName.toLowerCase();
        if(updateData){
            const prev_name_key = updateData.name.toLowerCase();
            if(prev_name_key === name_key && updateData.color === inputColor) return;
            handleEditUser(prev_name_key, inputColor);
        } else {
            if(list[name_key]){
                alert(`The name ${inputName} already exist. Please enter another name`);
                return;
            }
        }
        
        handleSetUsers(inputName, inputColor);
        // handleResetForm();
    }

    const handleResetForm = () => {
        setInputName('');
        setInputColor(colors_keys[0]);
    }

    useEffect(() => {
        //handleResetForm();
        setInputName('');
        setInputColor(colors_keys[0]);
    }, [users]);

    useEffect(() => {
        if(updateData){
            setInputName(updateData.name);
            setInputColor(updateData.color);
        }
    }, [updateData])
    
    return (
        <section>
            <div className='container'>
                <form onSubmit={handleSubmitForm}>
                    <div className='form-group'>
                        <label htmlFor="name">Name</label>
                        <input 
                            onChange={handleOnChange} 
                            id="name" 
                            name="name" 
                            type="text" 
                            placeholder="Enter name" 
                            value={inputName} 
                            disabled={updateData ? true : false}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="color">Color</label>
                        <select onChange={handleOnChange} id="color" name="color" defaultValue={setInputColor}>
                            {colors_jsx}
                        </select>
                    </div>
                    <div className="form-group form-group-cta">
                        <button type="submit" className="btn-submit">
                            {updateData ? 'Update': 'Save'}
                        </button>
                        <button type="button" className="btn-clear" onClick={handleResetForm}>Clear</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Form;