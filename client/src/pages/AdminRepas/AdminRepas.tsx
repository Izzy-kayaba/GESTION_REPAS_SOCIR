import React, { useState, useEffect } from 'react';
import Tableau from '../../elements/Tableau';
import useFetch from '../../hooks/useFetch';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


type Aliment = {
    id_aliment: number;
    nom_aliment: string;
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AdminRepas: React.FC = () => {

    const aliments: any = useFetch({ endpoint: "api/aliments" });
    const condiments = useFetch({ endpoint: "api/condiments" });
    const accompagnements = useFetch({ endpoint: "api/accompagnements" });

    const storedSelectedAliments = localStorage.getItem("selectedAliments");
    const initialSelectedAliments: Aliment[] = storedSelectedAliments
        ? JSON.parse(storedSelectedAliments)
        : [];

    const [selectedAliments, setSelectedAliments] = useState<Aliment[]>(initialSelectedAliments);

    const handleAlimentChange = (event: React.ChangeEvent<{}>, value: Aliment[]) => {
        setSelectedAliments(value);
    };

    useEffect(() => {
        // Update localStorage whenever selectedAliments changes
        localStorage.setItem("selectedAliments", JSON.stringify(selectedAliments));
    }, [selectedAliments]);


    return (
        <div>
            <div>
                <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    options={aliments.data}
                    disableCloseOnSelect
                    getOptionLabel={(option: Aliment) => option.nom_aliment}
                    isOptionEqualToValue={(option, value) => option.nom_aliment === value.nom_aliment}
                    renderOption={(props, option: Aliment, { selected }) => (
                        <li {...props}>
                            <Checkbox
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            {option.nom_aliment}
                        </li>
                    )}
                    style={{ width: '100%' }}
                    onChange={handleAlimentChange}
                    value={selectedAliments}
                    renderInput={(params) => (
                        <TextField {...params} label="Selectionner les aliments du jour" placeholder="Aliments" />
                    )}
                />

                <form action="">

                    <div>
                        {selectedAliments.map((item) =>
                            <>
                                {item.nom_aliment}
                            </>)}
                    </div>
                </form>
            </div>

            {/* <Tableau /> */}
        </div>
    )
}

export default AdminRepas;

