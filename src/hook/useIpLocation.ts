// eslint-disable
import { useEffect, useState } from 'react';

const URL = 'https://api.ipgeolocation.io/ipgeo?apiKey=ef47981cbba64960930278a37104a4a6';

const DEFAULT_STATE = {
  userLang: 'en',
  userCountry: 'US',
};

export const useIpLocation = () => {
  const [ipResponse, setIpResponse] = useState(DEFAULT_STATE);

  useEffect(() => {
    async () => {
      const response: Response = await fetch(URL);
      const resp = await response.json();
      console.log(resp);
      setIpResponse({
        userLang: resp?.languages as string,
        userCountry: resp?.country_code2 as string,
      });
    };
  }, []);
  return { ipResponse };
};
