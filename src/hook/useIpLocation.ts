// eslint-disable
import { useEffect, useState } from 'react';

const URL = 'https://api.ipgeolocation.io/ipgeo?apiKey=ef47981cbba64960930278a37104a4a6';

export const useIpLocation = () => {
  const [ipResponse, setIpResponse] = useState({ userCountry: 'en', userLang: 'us' });

  useEffect(() => {
    const fetchLocation = async () => {
      const response: Response = await fetch(URL);
      const resp = await response.json();
      setIpResponse({
        userCountry: resp?.country_code2,
        userLang: resp?.country_code2,
      });
    };

    fetchLocation();
  }, []);
  return { ipResponse };
};
