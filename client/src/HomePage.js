import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <div>
            This is a sample home page
            <Link to="/">Go back to calculator</Link>
        </div>
    );
};
