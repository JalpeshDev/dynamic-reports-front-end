import { Button, CircularProgress } from "@mui/material";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { useEffect, useRef, useState } from "react";
import Filters from "./filters";
import "../assets/styles/dashboard.scss";
import { getReportingData } from "../services/dashboard.service";
import { Report } from "../interfaces/reports.interface";



const Dashboard = () => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(true);
    const [colomns, setColomns] = useState<string[]>(['organizationName']);

    const [tableData, setTableData] = useState<Report[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const _export = useRef<ExcelExport | null>(null);
    const exportExport = () => {
        if (_export.current !== null) {
            _export.current.save(tableData);
        }
    };
    const handleDialogAction = (masterData: string[], reportingData: string[]) => {
        setColomns([...masterData, ...reportingData])
        setIsDialogOpen(!isDialogOpen);
    }

    const handleTitle = (text: string) => {
        const result = text.replace(/([A-Z])/g, " $1");
        return result.charAt(0).toUpperCase() + result.slice(1);
    }

    const fetchingData = async () => {
        setIsLoading(true);
        const res = await getReportingData();
        if (res) {
            const finalData = res.map((item: Report) => {
                return { ...item, ...item?.questionAnswer }
            })
            setTableData(finalData);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchingData();
    }, []);
    return (
        <div className="dashboard-container">
            {isLoading ?
                <div className="loader-container">
                    <CircularProgress className="loader" />
                </div>

                :
                <>
                    <div className="d-flex justify-content-end mt-20">
                        <Button title="Export Excel" variant="contained" onClick={exportExport}>Download</Button>

                        <Button className="filter-btn" variant="contained" onClick={() => { setIsDialogOpen(true) }}>Selected</Button>
                    </div>
                    <Filters isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} handleDialogAction={handleDialogAction} />
                    <div className="mt-20">
                        <ExcelExport ref={_export}>
                            <Grid data={tableData}>
                                {colomns.length > 0 && colomns.map((column, index: number) => {
                                    return (
                                        <GridColumn key={index} field={`${column}` || `questionAnswer.${column}`} title={handleTitle(column)} />
                                    );
                                })}
                            </Grid>
                        </ExcelExport>
                    </div>
                </>
            }
        </div>
    )
};

export default Dashboard;