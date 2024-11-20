/* eslint-disable react/prop-types */
import { useState } from 'react';

const ConfigPanel = ({ config, onConfigChange }) => {

    // Initialize states with current config values
    const [groupSize, setGroupSize] = useState(config.groupSize);
    const [itemCount, setItemCount] = useState(config.itemCount);
    const [columns, setColumns] = useState(config.columns);

    // Update config immediately when values change
    const handleGroupSizeChange = (e) => {
        const newGroupSize = Number(e.target.value);
        setGroupSize(newGroupSize);
        onConfigChange({ groupSize: newGroupSize, itemCount, columns });
    };

    const handleItemCountChange = (e) => {
        const newItemCount = Number(e.target.value);
        setItemCount(newItemCount);
        onConfigChange({ groupSize, itemCount: newItemCount, columns });
    };

    const handleColumnsChange = (e) => {
        const newColumns = Number(e.target.value);
        setColumns(newColumns);
        onConfigChange({ groupSize, itemCount, columns: newColumns });
    };

    return (
        <form className="config-panel">
            <label>
                Group Size:
                <input
                    type="range"
                    value={groupSize}
                    onChange={handleGroupSizeChange}
                    min="2"
                    max="4"
                    step="1"
                    className='range-input'
                />
                <input
                    type="number"
                    value={groupSize}
                    onChange={handleGroupSizeChange}
                    min="2"
                    max="4"
                    step="1"
                    className='num-input'
                />
            </label>
            
            <label>
                Item Count:
                <input
                    type="range"
                    value={itemCount}
                    onChange={handleItemCountChange}
                    min="4"
                    max="10"
                    step="1"
                    className='range-input'
                />
                <input
                    type="number"
                    value={itemCount}
                    onChange={handleItemCountChange}
                    min="4"
                    max="10"
                    step="1"
                    className='num-input'
                />
            </label>
            
            <label>
                Columns:
                <input
                    type="range"
                    value={columns}
                    onChange={handleColumnsChange}
                    min="2"
                    max="4"
                    step="1"
                    className='range-input'
                />
                <input
                    type="number"
                    value={columns}
                    onChange={handleColumnsChange}
                    min="2"
                    max="4"
                    step="1"
                    className='num-input'
                />
            </label>
        </form>
    );
}

export default ConfigPanel;
