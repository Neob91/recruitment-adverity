import React, { useState } from 'react';
import Select from 'react-select';
import { LineChart, Line, XAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

import { fetchGraph, fetchFilterOptions } from './api';
import { useDataFetch } from './hooks';
import { appStyle } from './style';


export const App = () => {
  const [dataSources, setDataSources] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  const filterOptions = useDataFetch(fetchFilterOptions);
  const data = useDataFetch(async () => {
    return await fetchGraph(dataSources, campaigns);
  }, [dataSources, campaigns]);

  return (
    <div className={appStyle}>
      <div>
        <Select
          placeholder="Filter by data sources"
          value={dataSources}
          onChange={setDataSources}
          options={filterOptions && filterOptions.datasource}
          getOptionLabel={value => value}
          getOptionValue={value => value}
          isMulti={true}
        />
      </div>
      <div>
        <Select
          placeholder="Filter by campaigns"
          value={campaigns}
          onChange={setCampaigns}
          options={filterOptions && filterOptions.campaign}
          getOptionLabel={value => value}
          getOptionValue={value => value}
          isMulti={true}
        />
      </div>
      <div>
        {!data && 'Loading data'}
        {data && !data.length && 'No data available for selected filters'}
        {data && (
          <ResponsiveContainer width="100%" height={600}>
            <LineChart
              width={1200}
              data={data}
            >
              <XAxis dataKey="date" tick={{fontSize: 12 }} />
              <Tooltip />
              <CartesianGrid stroke="#f5f5f5" />
              <Line type="monotone" dataKey="clicks" stroke="#ff7300" yAxisId={0} />
              <Line type="monotone" dataKey="impressions" stroke="#387908" yAxisId={1} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
