import React from 'react';

interface CustomLabelProps {
    value: any;
    type: 'chip' | 'drink' | 'chocolate';
    data: string[];
    handleOptionChange: (type: 'chip' | 'drink' | 'chocolate', value: string) => void;
}

const CustomLabel: React.FC<CustomLabelProps> = ({ value,type, data, handleOptionChange }) =>{
    return <>
        {data?.length ? data?.map((item:string, index:number) => (
                <div key={index} className={'custom_labels'}>
                    <label>
                        <input
                            type="checkbox"
                            checked={item === value}
                            onChange={() => handleOptionChange(type,item)}
                        />
                        {item}
                    </label>
                </div>
            )) : null}
    </>
}

export default CustomLabel;