// eslint-disable
import { useEffect, useState } from 'react';

const URL = 'https://api.ipgeolocation.io/ipgeo?apiKey=ef47981cbba64960930278a37104a4a6';

export const useIpLocation = () => {
  const [ipResponse, setIpResponse] = useState({ userCountry: 'us', userLang: 'en' });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response: Response = await fetch(URL);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const resp = await response.json();
        setIpResponse({
          userCountry: resp?.country_code2,
          userLang: resp?.languages,
        });
      } catch (error) {
        return error;
      }
    };

    fetchLocation();
  }, []);
  return { ipResponse };
};
