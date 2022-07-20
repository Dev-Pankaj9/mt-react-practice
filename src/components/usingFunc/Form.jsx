import React, { useState, useEffect } from 'react';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import { handleize } from '../../util/util';

const Form = ({ users, handleAddUsers, updateData, handleEditUser, handleUpdateData }) => {
    // const [inputName, setInputName] = useState(() => updateData ? updateData.name : '');
    console.log('Form Comp');
    const { list, colors } = users;
    const colors_keys = Object.keys(colors);
    const DEFAULT_COLOR = 'none';
    const [inputFields, setInputFields] = useState({
        name: '',
        color: DEFAULT_COLOR
    });
    
    const colors_list = colors_keys.map(color => ({id: `color-${color}`, title: color, value: color, disabled: false}));
    colors_list.unshift({id:'none', title:"Select color", value:"none", disabled: true});

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
        if(name === '' || color === 'none') {
            alert('All fields are mandatory');
            return;
        }

        const NAME_KEY = handleize(name);
        if(updateData){
            const PREV_NAME_KEY = handleize(updateData.name);
            if(PREV_NAME_KEY === NAME_KEY && updateData.color === color) return;
            handleEditUser(PREV_NAME_KEY, color);
        } else {
            if(list[NAME_KEY]){
                alert(`The name ${name} already exist. Please enter another name`);
                return;
            }
            handleAddUsers(name, color);
        }
    }

    const handleResetForm = () => {
        if(updateData){
            handleUpdateData(null)
        } else {
            setInputFields({
                name: '',
                color: DEFAULT_COLOR
            });
        }
    }

    useEffect(() => {
        if(updateData) setInputFields({name: updateData.name, color: updateData.color});
        else setInputFields({ name: '', color: DEFAULT_COLOR });
    }, [updateData]);

    useEffect(() => {
        setInputFields({
            name: '',
            color: DEFAULT_COLOR
        });
    }, [users]);

    const { name, color } = inputFields;
    
    return (
        <section>
            <div className='container'>
                <form onSubmit={handleSubmitForm}>
                    <div className='form-group'>
                        <Input 
                            labelName="Name"
                            type="text" 
                            id="name" 
                            name="name" 
                            placeholder="Enter name" 
                            value={name} 
                            disabled={updateData ? true : false} 
                            handleOnChange={handleOnChange} />
                    </div>
                    <div className="form-group">
                        <Select  
                            labelName="Color" 
                            select_id="color" 
                            name="color" 
                            select_value={color} 
                            options={colors_list} 
                            handleOnChange={handleOnChange}
                        />
                    </div>
                    <div className="form-group form-group-cta">
                        <Button title={updateData ? 'Update': 'Save'} type="submit" class_names="btn-submit" />
                        <Button title="Clear" type="button" class_names="btn-clear" handleOnClick={handleResetForm} />
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Form;