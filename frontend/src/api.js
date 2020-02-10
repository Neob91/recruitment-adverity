import axios from 'axios';

export const fetchGraph = async (datasources, campaigns) => {
  const filters = encodeURIComponent(JSON.stringify({ datasources, campaigns }));
  const resp = await axios.get(`http://127.0.0.1:3030/graph?filters=${filters}`);
  return resp.data;
};

export const fetchFilterOptions = async () => {
  const resp = await axios.get('http://127.0.0.1:3030/graph/filters');
  return resp.data;
};
