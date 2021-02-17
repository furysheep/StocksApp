import axios from 'axios';
import Config from 'react-native-config';

const get = async (url: string): Promise<any> => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMostActiveStocks = async (): Promise<any> =>
  get(
    `${Config.IEXAPIS_HOST}/stable/stock/market/collection/list?collectionName=mostactive&token=${Config.PUBLISHABLE_TOKEN}`,
  );

export const getCompany = async (symbol: string): Promise<any> =>
  get(
    `${Config.IEXAPIS_HOST}/stable/stock/${symbol}/company?token=${Config.PUBLISHABLE_TOKEN}`,
  );

export const getHistoricalPrices = async (symbol: string): Promise<any> =>
  get(
    `${Config.IEXAPIS_HOST}/stable/stock/${symbol}/chart/30d?token=${Config.PUBLISHABLE_TOKEN}`,
  );

export const getPeerGroups = async (symbol: string): Promise<any> =>
  get(
    `${Config.IEXAPIS_HOST}/stable/stock/${symbol}/peers?token=${Config.PUBLISHABLE_TOKEN}`,
  );

export const getSearchKeywords = async (keyword: string): Promise<any> =>
  get(
    `${Config.IEXAPIS_HOST}/stable/search/${keyword}?token=${Config.PUBLISHABLE_TOKEN}`,
  );
