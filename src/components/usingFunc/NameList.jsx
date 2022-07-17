import React from 'react';

const NameList = ({ users, handleUpdateData, handleDeleteUser }) => {
    const { list, colors } = users;
    const user_names = Object.keys(list);
    const color_keys = Object.keys(colors);
    
    console.log(colors, list);

    const colors_jsx = user_names.length > 0 ? (
        user_names.map(key => {
            const {id, name, color} = list[key];
            if(!name || !color) return null;
            
            return <li className='list-item' key={id}>
                <span>{name}</span>
                <span>{color}</span>
                <div className='action-cta'>
                    <button type="button" onClick={() => handleUpdateData({id,name,color})}>Edit</button>
                    <span>|</span>
                    <button type="button" onClick={() => handleDeleteUser(name)}>Delete</button>   
                </div>
            </li>
        })
    ): <li className="empty">No Data Found</li>;

    const ballsJsx = color_keys.length ? (
        color_keys.map(color => <li key={color} style={{backgroundColor: color}}>{colors[color]}</li>)
    ): <li className='empty-balls'>No Balls Found</li>;

    return (
        <section>
            <div className='container'>
                <ul className='list'>
                    <li className='list-heading'>
                        <h3>Name</h3>
                        <h3>Color</h3>
                        <h3>Action</h3>
                    </li>
                    {colors_jsx}
                </ul>
                <ul className='list list--balls'>{ballsJsx}</ul>
            </div>
        </section>
    )
}

export default NameList;