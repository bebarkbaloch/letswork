import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { selectChips, selectDrink, selectChocolate, resetCombo } from '../store/comboSlice';

const ComboPicker: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { chips, drink, chocolate } = useSelector((state: RootState) => state.combo);
    const [combos, setCombos] = useState([]);
    const [selectedTab, setSelectedTab] = useState('chip');
    const [uniqueChips, setUniqueChips] = useState<any[]>([]);
    const [uniqueDrinks, setUniqueDrinks] = useState<any[]>([]);
    const [uniqueChocolates, setUniqueChocolates] = useState<any[]>([]);

    useEffect(() => {
        fetch('/combos.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setCombos(data?.data)

                setUniqueChips([...new Set(data?.data?.map((combo: any) => combo.chips))]) ;
                // setUniqueDrinks([...new Set(data?.data?.filter((combo: any) => combo.chips === chips).map((combo: any) => combo.drink))]) ;
                // setUniqueChocolates([...new Set(data?.data?.filter((combo: any) => combo.chips === chips && combo.drink === drink).map((combo: any) => combo.chocolate))]);

            })
            .catch((error) => console.error('Error fetching combos:', error));
    }, []);


    // let uniqueChips = [...new Set(combos?.map((combo: any) => combo.chips))];
    // let  uniqueDrinks = [...new Set(combos?.filter((combo: any) => combo.chips === chips).map((combo: any) => combo.drink))];
    // let uniqueChocolates = [...new Set(combos?.filter((combo: any) => combo.chips === chips && combo.drink === drink).map((combo: any) => combo.chocolate))];


    useEffect(() => {
        // Update unique drinks when chips selection changes
        if (selectedTab ==='chip') {
            setUniqueChips([...new Set(combos?.map((combo: any) => combo.chips))]) ;
            setUniqueDrinks([]);
            setUniqueChocolates([]);
        } else if (selectedTab ==='drink') {
            setUniqueDrinks([...new Set(combos?.map((combo: any) => combo.drink))]) ;
            setUniqueChocolates([]);
            setUniqueChips([])
        }else{
            setUniqueChocolates([...new Set(combos?.map((combo: any) => combo.chocolate))]) ;
            setUniqueChips([])
            setUniqueDrinks([]);
        }
    }, [combos, selectedTab]);

    useEffect(() => {
        updateUniqueOptions();
    }, [combos, chips, drink, chocolate, selectedTab]);

    const updateUniqueOptions = () => {
        let uniqueChipsList: string[] = [];
        let uniqueDrinksList: string[] = [];
        let uniqueChocolatesList: string[] = [];

        switch (selectedTab) {
            case 'chip':
                uniqueChipsList = [...new Set(combos?.map((combo: any) => combo.chips))];
                break;
            case 'drink':
                uniqueDrinksList = [...new Set(combos?.filter((combo: any) => combo.chips === chips).map((combo: any) => combo.drink))];
                break;
            case 'chocolate':
                uniqueChocolatesList = [...new Set(combos?.filter((combo: any) => combo.chips === chips && combo.drink === drink).map((combo: any) => combo.chocolate))];
                break;
            default:
                break;
        }

        setUniqueChips(uniqueChipsList);
        setUniqueDrinks(uniqueDrinksList);
        setUniqueChocolates(uniqueChocolatesList);
    };



    const handleChipsChange = (chip: string) => {
        dispatch(selectChips(chip));
        dispatch(selectDrink(null));
        dispatch(selectChocolate(null));
    };

    const handleDrinkChange = (drink: string) => {
        dispatch(selectDrink(drink));
        dispatch(selectChocolate(null));
    };

    const handleChocolateChange = (chocolate: string) => {
        dispatch(selectChocolate(chocolate));
    };

    const handleTabClick = (tab: 'chip' | 'drink' | 'chocolate') => {
        if (tab === 'chip') {
            dispatch(selectChips(null));
            dispatch(selectDrink(null));
            dispatch(selectChocolate(null));
            setSelectedTab('chip')

            // setUniqueChips([...new Set(combos?.map((combo: any) => combo.chips))]) ;
            // setUniqueDrinks( [...new Set(combos?.filter((combo: any) => combo.chips === chips).map((combo: any) => combo.drink))]);
            // setUniqueChocolates( [...new Set(combos?.filter((combo: any) => combo.chips === chips && combo.drink === drink).map((combo: any) => combo.chocolate))]);

        } else if (tab === 'drink') {
            dispatch(selectChips(null));
            dispatch(selectDrink(null));
            dispatch(selectChocolate(null));
            setSelectedTab('drink')

            // setUniqueDrinks([...new Set(combos?.map((combo: any) => combo.drink))]);
            // setUniqueChips( [...new Set(combos?.filter((combo: any) => combo.drink === drink).map((combo: any) => combo.chips))]);
            // setUniqueChocolates( [...new Set(combos?.filter((combo: any) => combo.chips === chips && combo.drink === drink).map((combo: any) => combo.chocolate))]);

        } else if (tab === 'chocolate') {
            dispatch(selectChips(null));
            dispatch(selectDrink(null));
            dispatch(selectChocolate(null));
            setSelectedTab('chocolate')

            // setUniqueChocolates([...new Set(combos?.map((combo: any) => combo.chocolate))]);
            // setUniqueChips( [...new Set(combos?.filter((combo: any) => combo.chocolate === chocolate).map((combo: any) => combo.chips))]);
            // setUniqueDrinks([...new Set(combos?.filter((combo: any) => combo.chips === chips && combo.chocolate === chocolate).map((combo: any) => combo.drink))]);

        }
    };



    return (
        <div className={'combo_page'}>
            <h1>Combo Deals</h1>
            <p>Select your combo:</p>
            <table>
                <thead>
                <tr className="tabs">
                    <th className={`tab ${selectedTab === 'chip' ? 'active' : ''}`} onClick={() => handleTabClick('chip')}>Chips</th>
                    <th className={`tab ${selectedTab === 'drink' ? 'active' : ''}`} onClick={() => handleTabClick('drink')}>Drink</th>
                    <th className={`tab ${selectedTab === 'chocolate' ? 'active' : ''}`} onClick={() => handleTabClick('chocolate')}>Chocolate</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        {uniqueChips.map((chip, index) => (
                            <div key={index} className={'custom_labels'}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={chips === chip}
                                        onChange={() => handleChipsChange(chip)}
                                    />
                                    {chip}
                                </label>
                            </div>
                        ))}
                    </td>
                    <td>
                        {uniqueDrinks.map((item, index) => (
                            <div key={index} className={'custom_labels'}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={item === drink}
                                        onChange={() => handleDrinkChange(item)}
                                        // disabled={!chips} // Disable until chips is selected
                                    />
                                    {item}
                                </label>
                            </div>
                        ))}
                    </td>
                    <td>
                        {uniqueChocolates.map((choc, index) => (
                            <div key={index} className={'custom_labels'}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={chocolate === choc}
                                        onChange={() => handleChocolateChange(choc)}
                                        // disabled={!chips || !drink} // Disable until chips and drink are selected
                                    />
                                    {choc}
                                </label>
                            </div>
                        ))}
                    </td>
                </tr>
                </tbody>
            </table>
            {chips && drink && chocolate && (
                <div className={'selected_combo'}>
                    <h2>Selected Combo</h2>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                Chips
                            </td>
                            <td>
                                {chips}
                            </td>
                        </tr>
                        <tr>
                            <td>
                               Drinks
                            </td>
                            <td>
                                {drink}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Chocolates
                            </td>
                            <td>
                                {chocolate}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <button onClick={() => dispatch(resetCombo())}>Change Combo</button>
                </div>
            )}
        </div>
    );
};

export default ComboPicker;
