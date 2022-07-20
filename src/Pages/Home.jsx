import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const menu_items = [
        { id:'using_func', title: 'Functional Component', url: '/usingfunc' },
        { id:'using_context_api', title: 'Context API', url: '/contextapi' }
    ];

    const menu_items_jsx = menu_items.map(({id, title, url}) => (
        <li key={id}>
            <Link to={url}>
                <span>{title}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </Link>
        </li>
    ))
    return (
        <section className='section-homepage'>
            <ul>{menu_items_jsx}</ul>
        </section>
    )
}

export default Home;