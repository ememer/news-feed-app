import { createContext } from 'react';

import { NewsFeedContextTypes } from './../types/NewsFeedProvider';

export const NewsFeedContext = createContext<NewsFeedContextTypes | null>(null);
