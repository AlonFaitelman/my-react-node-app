import React from 'react';

function TransitionList({ transitions }) {
    return (
        <div>
            <h2>Transitions</h2>
            <ul>
                {transitions.map((transition, index) => (
                    <li key={index}>
                        {transition.name}: {transition.from} {"->"} {transition.to}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TransitionList;
