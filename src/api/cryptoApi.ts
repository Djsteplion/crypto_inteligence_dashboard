
import { type Coin } from '../types/crypto';

export const fetchTopCoins = async (): Promise<Coin[]> => {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1'
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch market data');
  }
  
  return response.json();
};