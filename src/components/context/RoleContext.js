import { createContext } from 'react';

const roleContext = createContext({
  role: null,
  setRole: () => {}
});

export default roleContext