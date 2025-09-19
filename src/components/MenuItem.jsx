import React, { useState } from 'react';

// Recursive component to render the nested "Russian Doll" menu.
const MenuItem = ({ name, items, level = 0, onActionClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = typeof items === 'object' && items !== null && !Array.isArray(items);
    const isActionGroup = Array.isArray(items);

    const toggleOpen = () => setIsOpen(!isOpen);

    const paddingLeft = `${20 * level}px`;
    const itemStyle = { paddingLeft };
    const textStyle = { fontWeight: level < 2 ? 'bold' : 'normal' };

    if (isActionGroup) {
        return (
            <div>
                <div className="menu-item" style={itemStyle} onClick={toggleOpen}>
                    <span className="menu-text" style={textStyle}>{name}</span>
                    <span className="caret">{isOpen ? '▼' : '▶'}</span>
                </div>
                {isOpen && items.map(action => (
                    <div key={action} className="menu-item action-item" style={{ paddingLeft: `${20 * (level + 1)}px` }} onClick={() => onActionClick(action)}>
                        <span className="menu-text">{action}</span>
                    </div>
                ))}
            </div>
        );
    }

    if (hasChildren) {
        return (
            <div>
                <div className="menu-item" style={itemStyle} onClick={toggleOpen}>
                    <span className="menu-text" style={textStyle}>{name}</span>
                    <span className="caret">{isOpen ? '▼' : '▶'}</span>
                </div>
                {isOpen && Object.entries(items).map(([key, value]) => (
                    <MenuItem key={key} name={key} items={value} level={level + 1} onActionClick={onActionClick} />
                ))}
            </div>
        );
    }

    return null;
};

export default MenuItem;
