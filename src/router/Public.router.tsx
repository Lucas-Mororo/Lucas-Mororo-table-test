import React from 'react';
import { Route, Routes } from 'react-router-dom';
import countriesData from "../data/countries";
import Table from "../components/Table";
import ChartPie from '../components/pie';

const PublicRouter = (): React.ReactElement => {
    const [countries, setCountries] = React.useState([...countriesData]);

    return (
        <Routes>
            <Route path="/" element={<Table data={countries} setCountries={setCountries} rowsPerPage={2} />} />
            <Route path="/pie" element={<ChartPie />} />
        </Routes>
    );
}

export default PublicRouter;