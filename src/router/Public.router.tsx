import React from 'react';
import { Route, Routes } from 'react-router-dom';
import countriesData from "../data/countries";
import Table from "../components/Table";
import ChartPie from '../components/Pie';
import Current from '../components/Current';
import Inputs from '../components/Inputs';
import Hello from '../components/Hello';

const PublicRouter = (): React.ReactElement => {
    const [countries, setCountries] = React.useState([...countriesData]);

    return (
        <Routes>
            <Route path="/" element={<Hello />} />
            <Route path="/Table" element={<Table data={countries} setCountries={setCountries} rowsPerPage={2} />} />
            <Route path="/pie" element={<ChartPie />} />
            <Route path="/Current" element={<Current />} />
            <Route path="/Inputs" element={<Inputs />} />
        </Routes>
    );
}

export default PublicRouter;