import { Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { FilterProps } from "../interfaces/filters.interface";

type MasterDataColumnsTypes  = {
    key : string,
    value : string
}

const masterDataColumns : MasterDataColumnsTypes[] = [
    {key : 'organizationId', value : 'Organization Id'},
    {key : 'organizationName', value : 'Organization Name'},
    {key : 'taxId', value : 'Tax Id'},
    {key : 'primaryContact', value : 'Primary Contact'},
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const Filters = ({ isDialogOpen, handleDialogAction, setIsDialogOpen }: FilterProps) => {
    const [selectedReportingFields, setSelectedReportingFields] = useState<string[]>([]);
    const [selectedMasterFields, setSelectedMasterFields] = useState<string[]>(['organizationName']);
    const [reportingDataColumns, setReportingDataColumns] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    ////Set when master data field is selected
    const handleReportingChange = (event: SelectChangeEvent<typeof selectedReportingFields>) => {
        const {
            target: { value },
        } = event;
        setSelectedReportingFields(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    ////Set when reporting data field is selected
    const handleMasterChange = (event: SelectChangeEvent<typeof selectedMasterFields>) => {
        const {
            target: { value },
        } = event;
        setSelectedMasterFields(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };


    ////Fetching the reporting columns while opening the dialog
    const fetchColumns = async () => {
        setIsLoading(true);
        const resData = [
            "Agency Name",
            "Fax Number:",
            "Insurance Carrier(s)"
          ]
          setReportingDataColumns(resData);
        setIsLoading(false);
    }

    useEffect(() => {
        if (isDialogOpen) {
            fetchColumns();
        }
    }, [isDialogOpen]);

    return (
        <div>
            <Dialog
                open={isDialogOpen}
            >
                <DialogTitle align="center">Reporting Columns</DialogTitle>
                <DialogContent className="dialog-content">
                    {isLoading &&
                        <div className="loader-container">
                            <CircularProgress className="loader" />
                        </div>

                    }
                    <div className="d-flex justify-content-between">
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-checkbox-label">Master Data</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={selectedMasterFields}
                                onChange={handleMasterChange}
                                input={<OutlinedInput label="Tag" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {masterDataColumns.map((item : MasterDataColumnsTypes, index : number) => (
                                    <MenuItem key={index} value={item?.key}>
                                        <Checkbox checked={selectedMasterFields.indexOf(item?.key) > -1} />
                                        <ListItemText primary={item?.value} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-checkbox-label">Reporting Data</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={selectedReportingFields}
                                onChange={handleReportingChange}
                                input={<OutlinedInput label="Tag" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {reportingDataColumns.map((name: string, index : number) => (
                                    <MenuItem key={index} value={name}>
                                        <Checkbox checked={selectedReportingFields.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => {
                        setIsDialogOpen(false)
                    }
                    }>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={() => {
                        handleDialogAction(selectedMasterFields, selectedReportingFields)
                    }
                    }>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default Filters;