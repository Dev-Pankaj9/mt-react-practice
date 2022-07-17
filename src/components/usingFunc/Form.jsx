import React, { useState, useEffect } from 'react';

const Form = ({ users, handleSetUsers, updateData, handleEditUser, handleUpdateData }) => {
    const { list, colors } = users;
    const colors_keys = Object.keys(colors);
    // const [inputName, setInputName] = useState(() => updateData ? updateData.name : '');
    const [inputFields, setInputFields] = useState({
        name: '',
        color: colors_keys[0]
    });
    console.log({inputFields, updateData});
    const { name, color } = inputFields;
    const colors_jsx = colors_keys.map(opt_color => {
        if(color === opt_color) return <option key={opt_color} value={opt_color} selected>{opt_color}</option>
        else return <option key={opt_color} value={opt_color}>{opt_color}</option>
    });

    const handleOnChange = (evt) => {
        const {name, value} = evt.target;
        setInputFields({
            ...inputFields,
            [name]: value
        });
    }

    const handleSubmitForm = (evt) => {
        evt.preventDefault();
        const {name, color} = inputFields;
        if(name === '' || color === '') {
            alert('All fields are mandatory');
            return;
        }

        const name_key = name.toLowerCase();
        if(updateData){
            const prev_name_key = updateData.name.toLowerCase();
            if(prev_name_key === name_key && updateData.color === color) return;
            handleEditUser(prev_name_key, updateData.color, color);
        } else {
            if(list[name_key]){
                alert(`The name ${name} already exist. Please enter another name`);
                return;
            }
            handleSetUsers(name, color);
        }
        
        handleResetForm();
    }

    const handleResetForm = () => {
        if(updateData){
            handleUpdateData(null)
        } else {
            setInputFields({
                name: '',
                color: colors_keys[0]
            });
        }
    }

    // useEffect(() => {
    //     console.log('hello');
    //     handleResetForm()
    // }, [users]);

    useEffect(() => {
        if(updateData){
            setInputFields({
                name: updateData.name,
                color: updateData.color
            });
        } else {
            setInputFields({
                name: '',
                color: colors_keys[0]
            });
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
                            value={name} 
                            disabled={updateData ? true : false}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="color">Color</label>
                        <select onChange={handleOnChange} id="color" name="color" defaultValue={color}>
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